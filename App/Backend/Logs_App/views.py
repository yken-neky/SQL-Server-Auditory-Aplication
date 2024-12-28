from rest_framework import generics
from .models import ConnectionLog, AuditoryLog
from .serializer import ConnectionLogSerializer, AuditoryLogSerializer
from Users_App.permissions import *

# Create your views here.

class AllConnectionLogList(generics.ListAPIView):
    permission_classes = [IsAdmin]
    queryset = ConnectionLog.objects.all()
    serializer_class = ConnectionLogSerializer

class ConnectionLogList(generics.ListAPIView):
    permission_classes = [IsClientAndOwner]
    serializer_class = ConnectionLogSerializer
    def get_queryset(self): 
        # Filtrar el queryset para que solo incluya los objetos del usuario autenticado 
        user = self.request.user 
        return ConnectionLog.objects.filter(user=user)

class ConnectionLogDetail(generics.RetrieveAPIView):
    permission_classes = [IsClient]
    queryset = ConnectionLog.objects.all()
    serializer_class = ConnectionLogSerializer

# Vista de administrador para listar todas las auditorías realizadas por los usuarios
class AllAuditoryLogList(generics.ListAPIView):
    permission_classes = [IsAdmin]
    queryset = AuditoryLog.objects.all()
    serializer_class = AuditoryLogSerializer

# Vista de usuario para listar sus auditorías
class AuditoryLogList(generics.ListAPIView):
    permission_classes = [IsClient]
    serializer_class = AuditoryLogSerializer 
    def get_queryset(self): 
        # Filtrar el queryset para que solo incluya los objetos del usuario autenticado 
        user = self.request.user 
        return AuditoryLog.objects.filter(user=user)
    
# Vista de usuario para acceder a la información de una auditoría específica 
class AuditoryLogDetail(generics.RetrieveAPIView):
    permission_classes = [IsClientAndOwner]
    queryset = AuditoryLog.objects.all()
    serializer_class = AuditoryLogSerializer