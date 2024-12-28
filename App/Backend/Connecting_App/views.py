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
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['post'])
    def connect(self, request):
        driver = request.data.get('driver')
        server = request.data.get('server')
        db_user = request.data.get('db_user')
        password = request.data.get('password')
        user = request.user

        if not all([driver, server, db_user, password]):
            return Response({"error": "Todos los campos son obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

        active_conn = create_or_update_connection(user, driver, server, db_user, password)
        return Response({"message": "Conexión creada o actualizada.", "connection": active_conn.id}, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'])
    def disconnect(self, request):
        user = request.user
        disconnect_user(user)
        return Response({"message": "Desconexión exitosa."}, status=status.HTTP_200_OK)
