from rest_framework import viewsets 
from rest_framework.decorators import action
from rest_framework.authentication import TokenAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, status
from .models import ActiveConnection
from .serializer import ActiveConnectionSerializer
from .utils import *
from Users_App.permissions import *
from .permissions import HasOnServiceCookie, NoOnServiceAccess

# Create your views here.

class ActiveConnectionListCreate(generics.ListAPIView):
    permission_classes = [IsAdmin]
    queryset = ActiveConnection.objects.all()
    serializer_class = ActiveConnectionSerializer

class ActiveConnectionDetail(generics.RetrieveAPIView):
    permission_classes = [IsAdmin]
    queryset = ActiveConnection.objects.all()
    serializer_class = ActiveConnectionSerializer

class ConnectionViewSet(viewsets.ViewSet):
    authentication_classes = [TokenAuthentication]

    @action(detail=False, methods=['post'], 
            permission_classes=[IsAuthenticated, IsClient])
    def connect(self, request):
        driver = request.data.get('driver')
        server = request.data.get('server')
        db_user = request.data.get('db_user')
        password = request.data.get('password')
        user = request.user

        if not all([driver, server, db_user, password]):
            return Response({"error": "Todos los campos son obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

        # Verificar la conexión antes de crearla
        active_conn = ActiveConnection.objects.filter(user=user, server=server, db_user=db_user).first()

        if active_conn:
            if active_conn.is_connected == True:
                return Response({"error": "Ya existe una conexión existente bajo estos parámetros. "}, status=status.HTTP_400_BAD_REQUEST)
        
        connection_status = get_db_connection(driver, server, db_user, password, user)
        if connection_status["status"] != "connected":
            return Response({"error": "Conexión fallida", "details": connection_status["error"]}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

        # Crear o actualizar la conexión después de verificarla
        active_conn = create_or_update_connection(user, driver, server, db_user, password)
        response = Response({"message": "Conexión creada o actualizada.", "connection": active_conn.id}, status=status.HTTP_200_OK)
        # response.set_cookie('SQL_Auditory', 'active', httponly=True)
        return response

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated, HasOnServiceCookie, IsClient])
    def disconnect(self, request):
        user = request.user
        active_conn = ActiveConnection.objects.filter(user=user, is_connected=True).first()

        if not active_conn:
            return Response({"error": "No hay conexiones activas para desconectar."}, status=status.HTTP_400_BAD_REQUEST)

        disconnect_user(user)
        response = Response({"message": "Desconexión exitosa."}, status=status.HTTP_200_OK)
        # response.delete_cookie('SQL_Auditory')
        return response

# class VcenterConnectionView(viewsets.ViewSet):
#     
#     @action(detail = False, methods=['post', 'get'])
#     def connect(self, request):
#         print(request.data)
#         host = request.data.get('host', '')
#         user = request.data.get('user', '')
#         password = request.data.get('password', '')
# 
#         if not host or not user or not password:
#             return Response({"status": "Datos incompletos o incorrectos"}, status=status.HTTP_400_BAD_REQUEST)
# 
#         si = connect_to_vcenter(host, user, password)
#         if si is None:        
#             print("No se ha conectado")
#         else:
#             return Response({"status": si, "connected": True}, status=status.HTTP_200_OK)
#         #else:
#         #     return Response({"status": "No se pudo conectar", "connected": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)
# 
#     @action(detail=False, methods=['post'])
#     def disconnect(self, request):
#         result = disconnect_from_vcenter()
#         if result["status"] == "Desconectado del vCenter.":
#             return Response({"status": "Desconectado con éxito"}, status=status.HTTP_200_OK)
#         else:
#             return Response({"status": result["status"]}, status=status.HTTP_400_BAD_REQUEST)
# 
# 