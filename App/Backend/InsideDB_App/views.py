from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status
from Connecting_App.utils import *
from threading import Lock
from .models import *
import pyodbc

connection_lock = Lock()

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def execute_all_queries(request):
    with connection_lock:
        user = request.user
        active_conn = ActiveConnection.objects.filter(user=user, is_connected=True).first()

        if not active_conn:
            return Response({"status": "no_connection"}, status=status.HTTP_400_BAD_REQUEST)

        connection_status = get_db_connection(
            active_conn.driver,
            active_conn.server,
            active_conn.db_user,
            active_conn.password,
            user
        )
        
        if connection_status["status"] != "connected":
            return Response({"status": "connection_failed", "error": connection_status["error"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        db_connection = connection_status["connection"]
        results = {}
        flags = {}

        try:
            queries = Controls_Scripts.objects.all()
            for query in queries:
                with db_connection.cursor() as cursor:
                    if query.control_type == 'manual':
                        print(query.control_script_id)
                        results[query.control_script_id.id] = {
                            "control_id": query.control_script_id.id,
                            "chapter": query.control_script_id.chapter,
                            "index": query.control_script_id.index,
                            "control_type": query.control_type,
                            "description": query.control_script_id.description,
                            "impact": query.control_script_id.impact,
                            "good_config": query.control_script_id.good_config,
                            "data": None,
                            "references": query.control_script_id.references,
                        }
                        flags[query.control_script_id.id] = True
                        continue
                    else:
                        if query.control_script_id.id == 2:
                            databases = get_user_databases(cursor)
                            all_data = []
                            flag = False
                            if not databases:
                                flag = True
                            for db in databases:
                                data, db_flag = handle_special_case_Control_2_2(cursor, db)
                                all_data.append({db: data})
                                if db_flag:
                                    flag = True

                            results[query.control_script_id.id] = {
                                "control_id": query.control_script_id.id,
                                "chapter": query.control_script_id.chapter,
                                "index": query.control_script_id.index,
                                "control_type": query.control_type,
                                "description": query.control_script_id.description,
                                "impact": query.control_script_id.impact,
                                "data": all_data,
                                "references": query.control_script_id.references,
                            }
                            if flag:
                                results[query.control_script_id.id]["good_config"] = query.control_script_id.good_config
                            else:
                                results[query.control_script_id.id]["bad_config"] = query.control_script_id.bad_config

                            flags[query.control_script_id.id] = flag
                        else:
                            cursor.execute(query.query_sql)
                            columns = [column[0] for column in cursor.description]
                            rows = cursor.fetchall()
                            
                            data = [dict(zip(columns, row)) for row in rows]
                            
                            flag = validate_results(data, query.expected_results, query.validation_type)
                            
                            results[query.control_script_id.id] = {
                                "control_id": query.control_script_id.id,
                                "chapter": query.control_script_id.chapter,
                                "index": query.control_script_id.index,
                                "control_type": query.control_type,
                                "description": query.control_script_id.description,
                                "impact": query.control_script_id.impact,
                                "data": data,
                                "references": query.control_script_id.references,
                            }
                            
                            if flag:
                                results[query.control_script_id.id]["good_config"] = query.control_script_id.good_config
                            else:
                                results[query.control_script_id.id]["bad_config"] = query.control_script_id.bad_config
                            
                            flags[query.control_script_id.id] = flag
                            
            return Response({"status": "queries_executed", "data": results, "flags": flags}, status=status.HTTP_200_OK)
        except pyodbc.Error as e:
            return Response({"status": "query_failed", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

  
@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def execute_specific_query(request, query_key):
    with connection_lock:
        user = request.user
        active_conn = ActiveConnection.objects.filter(user=user, is_connected=True).first()

        if not active_conn:
            return Response({"status": "no_connection"}, status=status.HTTP_400_BAD_REQUEST)

        connection_status = get_db_connection(
            active_conn.driver,
            active_conn.server,
            active_conn.db_user,
            active_conn.password,
            user
        )
        
        if connection_status["status"] != "connected":
            return Response({"status": "connection_failed", "error": connection_status["error"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        
        db_connection = connection_status["connection"]
        
        try:
            query = Controls_Scripts.objects.filter(control_script_id=query_key).first()
            if not query:
                return Response({"status": "error", "message": "Invalid query key"}, status=status.HTTP_400_BAD_REQUEST)
            
            with db_connection.cursor() as cursor:
                if query.control_type == 'manual':
                    result = {
                        "control_id": query.control_script_id.id,
                        "chapter": query.control_script_id.chapter,
                        "index": query.control_script_id.index,
                        "control_type": query.control_type,
                        "description": query.control_script_id.description,
                        "impact": query.control_script_id.impact,
                        "data": None,
                        "references": query.control_script_id.references,
                        "good_config": query.control_script_id.good_config
                    }
                    flag = True
                else:
                    if query_key == 2:
                        databases = get_user_databases(cursor)
                        all_data = []
                        flag = False
                        if not databases:
                            flag = True  # Si no hay bases de datos del usuario, no hay assemblies, por lo que está correcto el control
                        for db in databases:
                            data, db_flag = handle_special_case_Control_2_2(cursor, db)
                            all_data.append({db: data})
                            if db_flag:
                                flag = True
                        result = {
                            "control_id": query.control_script_id.id,
                            "chapter": query.control_script_id.chapter,
                            "index": query.control_script_id.index,
                            "control_type": query.control_type,
                            "description": query.control_script_id.description,
                            "impact": query.control_script_id.impact,
                            "data": all_data,
                            "references": query.control_script_id.references
                        }
                        if flag:
                            result["good_config"] = query.control_script_id.good_config 
                        else:
                            result["bad_config"] = query.control_script_id.bad_config
                    else:
                        cursor.execute(query.query_sql)
                        columns = [column[0] for column in cursor.description]
                        rows = cursor.fetchall()
                        data = [dict(zip(columns, row)) for row in rows]
                        flag = validate_results(data, query.expected_results, query.validation_type)
                        result = {
                            "control_id": query.control_script_id.id,
                            "chapter": query.control_script_id.chapter,
                            "index": query.control_script_id.index,
                            "control_type": query.control_type,
                            "description": query.control_script_id.description,
                            "impact": query.control_script_id.impact,
                            "data": data,
                            "references": query.control_script_id.references
                        }
                        if flag:
                            result["good_config"] = query.control_script_id.good_config 
                        else:
                            result["bad_config"] = query.control_script_id.bad_config
                        
                return Response({"status": "query_executed", "data": result, "flag": flag})
        except pyodbc.Error as e:
            return Response({"status": "query_failed", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

#Control #2 
def handle_special_case_Control_2_2(cursor, database_name):
    # Cambiar a la base de datos de usuario
    cursor.execute(f"USE [{database_name}]")
    
    # Ejecutar la consulta para buscar assemblies definidas por el usuario
    cursor.execute("SELECT name AS Assembly_Name, permission_set_desc FROM sys.assemblies WHERE is_user_defined = 1;")
    user_defined_assemblies = cursor.fetchall()
    
    if not user_defined_assemblies:
        data = []
        flag = True
        return data, flag  # No existen assemblies definidas por el usuario, flag = True
    
    # Ejecutar la consulta 'clr strict security'
    cursor.execute("SELECT name, CAST(value as int) as value_configured, CAST(value_in_use as int) as value_in_use FROM sys.configurations WHERE name = 'clr strict security';")
    columns = [column[0] for column in cursor.description]
    rows = cursor.fetchall()
    data = [dict(zip(columns, row)) for row in rows]
    
    # Verificar si ambos valores son 1
    flag = False
    for row in data:
        if not row['value_configured'] == 1 and row['value_in_use'] == 1:
            flag = True
            return data, flag
        else:
            # Ejecutar la consulta 'clr enabled'
            cursor.execute("SELECT name, CAST(value as int) as value_configured, CAST(value_in_use as int) as value_in_use FROM sys.configurations WHERE name = 'clr enabled';")
            clr_enabled_rows = cursor.fetchall()
            clr_enabled_data = [dict(zip(columns, row)) for row in clr_enabled_rows]
            
            # Verificar si ambos valores son 0
            for clr_row in clr_enabled_data:
                if clr_row['value_configured'] == 0 and clr_row['value_in_use'] == 0:
                    flag = True
                    break
            break
    return clr_enabled_data, flag

def validate_results(data, expected, validation_type):
    if validation_type == 'single_row':
        if len(data) == 1 and all(data[0].get(col) == expected.get(col) for col in expected):
            return True
    elif validation_type == 'no_rows':
        if len(data) == 0:
            return True
    return False

def get_user_databases(cursor):
    cursor.execute("SELECT name FROM sys.databases WHERE database_id > 4;")  # Excluye las bases de datos del sistema
    databases = [row[0] for row in cursor.fetchall()]
    return databases
