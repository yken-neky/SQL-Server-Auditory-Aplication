from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework import status, generics
from Connecting_App.utils import *
from Logs_App.models import *
from threading import Lock
from Users_App.permissions import IsAdmin, IsClient
from .models import *
from .utils import *
from .serializer import *
from Connecting_App.permissions import HasOnServiceCookie
import pyodbc

class ControlsInformationList(generics.ListAPIView):
    permission_classes = [IsAuthenticated, HasOnServiceCookie]
    queryset = Controls_Information.objects.all()
    serializer_class = Controls_Information_Serializer

class ControlInformationDetail(generics.RetrieveAPIView):
    permission_classes = [IsAuthenticated, HasOnServiceCookie]
    queryset = Controls_Information.objects.all()
    serializer_class = Controls_Information_Serializer

class ControlScriptsList(generics.ListAPIView):
    permission_classes = [IsAdmin, HasOnServiceCookie]
    queryset = Controls_Scripts.objects.all()
    serializer_class = Controls_Scripts_Serializer

class ControlScriptDetail(generics.RetrieveAPIView):
    permission_classes = [IsAdmin, HasOnServiceCookie]
    queryset = Controls_Scripts.objects.all()
    serializer_class = Controls_Scripts_Serializer

# ------------------------------------------------------------------------------- #

connection_lock = Lock()

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated, IsClient, HasOnServiceCookie])
def execute_query(request):
    # Llamar a la función auxiliar para obtener la conexión a la base de datos 
    conexion_resultado = obtener_conexion_activa_db(request.user, connection_lock) 
    
    if conexion_resultado["response"] is not None: 
        return conexion_resultado["response"] 
    
    db_connection = conexion_resultado["db_connection"]

    # Obtener los índices de controles desde los parámetros de la solicitud
    indexes = request.query_params.getlist('idxes', None)

    try:
        if indexes:
            queries = Controls_Scripts.objects.filter(control_script_id__idx__in=indexes)
            if not queries.exists(): 
                return Response({"status": "not_found", "error": "Uno o más controles con los índices proporcionados no existen."}, status=status.HTTP_404_NOT_FOUND)
        else:
            queries = Controls_Scripts.objects.all()

        control_results = {}
        for query in queries:
            with db_connection.cursor() as cursor:
                if query.control_type == 'manual':
                    control_results[query.control_script_id.idx] = "MANUAL"  # Asumimos que los manuales siempre son correctos
                else:
                    resultado = ejecutar_consulta(cursor, query.query_sql)
                    
                    if resultado["status"] == "success":                
                        flag = resultado["data"] 
                        control_results[query.control_script_id.idx] = flag                
                    else:                        
                        return Response({"status": "query_failed", "error": resultado["error"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
        # Crear el registro de auditoría
        server = ConnectionLog.objects.filter(user=request.user).last() 
        AuditoryLog.objects.create(user=request.user, control_results=control_results, server=server)

        return Response({"status": "queries_executed", "control_results": control_results}, status=status.HTTP_200_OK)
    except Controls_Scripts.DoesNotExist:
        return Response({"status": "not_found"}, status=status.HTTP_404_NOT_FOUND)
    except pyodbc.Error as e:
        return Response({"status": "query_failed", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    except UnboundLocalError as e:
        return Response({"status": "query_failed", "error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
