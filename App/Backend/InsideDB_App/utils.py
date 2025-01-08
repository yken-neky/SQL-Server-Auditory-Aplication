from rest_framework.response import Response
from Connecting_App.models import ActiveConnection
from Connecting_App.utils import *
from rest_framework import status
import pyodbc

def ejecutar_consulta(cursor, consulta_sql):
    try:
        cursor.execute(consulta_sql)
        filas = cursor.fetchall()
        if filas:
            resultado = filas[0][0]  
            return {"status": "success", "data": resultado}
        else:
            return {"status": "success", "data": 'FALSE'}  # En caso de no haber filas, retornar 'FALSE'
    except pyodbc.Error as e:
        return {"status": "query_failed", "error": str(e)}


def obtener_conexion_activa_db(user, connection_lock):
    with connection_lock:
        active_conn = ActiveConnection.objects.filter(user=user, is_connected=True).first()

        if not active_conn:
            return {"response": Response({"status": "no_connection"}, status=status.HTTP_400_BAD_REQUEST), "db_connection": None}

        connection_status = get_db_connection(
            active_conn.driver,
            active_conn.server,
            active_conn.db_user,
            active_conn.password,
            user
        )

        if connection_status["status"] != "connected":
            return {"response": Response({"status": "connection_failed", "error": connection_status["error"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR), "db_connection": None}

        return {"response": None, "db_connection": connection_status["connection"], "active_conn": active_conn}
