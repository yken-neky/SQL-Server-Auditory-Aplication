from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import generics, status
from .models import ActiveConnection
from .serializer import ActiveConnectionSerializer
from .utils import *

# Create your views here.

class ActiveConnectionListCreate(generics.ListCreateAPIView):
    queryset = ActiveConnection.objects.all()
    serializer_class = ActiveConnectionSerializer

class ActiveConnectionDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ActiveConnection.objects.all()
    serializer_class = ActiveConnectionSerializer

# --------------------------------------------------------------------------------------- #

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def connect_view(request):
    if request.method == 'POST':
        driver = request.data.get('driver')
        server = request.data.get('server')
        db_user = request.data.get('db_user')
        password = request.data.get('password')
        user = request.user

        if not all([driver, server, db_user, password]):
            return Response({"error": "Todos los campos son obligatorios."}, status=status.HTTP_400_BAD_REQUEST)

        active_conn = create_or_update_connection(user, driver, server, db_user, password)
        return Response({"message": "Conexión creada o actualizada.", "connection": active_conn.id}, status=status.HTTP_200_OK)

    return Response({"error": "Método no permitido."}, status=status.HTTP_405_METHOD_NOT_ALLOWED)

@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def disconnect_view(request):
    user = request.user
    disconnect_user(user)
    return Response({"message": "Desconexión exitosa."}, status=status.HTTP_200_OK)

