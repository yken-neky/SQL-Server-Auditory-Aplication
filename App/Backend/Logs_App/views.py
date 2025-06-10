from rest_framework import generics, viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .models import ConnectionLog, AuditoryLog, AuditoryLogResult
from .serializer import ConnectionLogSerializer, AuditoryLogSerializer, AuditoryLogResultSerializer
from Users_App.permissions import *
from Connecting_App.permissions import *
from rest_framework.views import APIView

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
    serializer_class = ConnectionLogSerializer
    def get_queryset(self): 
        # Filtrar el queryset para que solo incluya los objetos del usuario autenticado 
        user = self.request.user 
        return ConnectionLog.objects.filter(user=user)

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

class DashboardViewSet(viewsets.ViewSet):
    permission_classes = [IsAuthenticated]

    @action(detail=False, methods=['get'], )
    def auditoryAmount(self, request):
        audits = AuditoryLog.objects.filter(user=request.user).count()
        return Response({"auditTotal": audits}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'], )
    def connectionAmount(self, request):
        connections = ConnectionLog.objects.filter(user=request.user).count()
        return Response({"connectionTotal": connections}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['get'])
    def correctRate(self, request): 
        lastAudit = AuditoryLog.objects.filter(user=request.user, type = 'Completa').last()
        if lastAudit is None:
            return Response({"percentage": 0})
        
        return Response({"percentage": lastAudit.criticidad}, status=status.HTTP_200_OK)

# Vista para obtener todos los resultados de controles de una auditoría específica
class AuditoryLogResultsByAudit(APIView):
    permission_classes = [IsClient]
    def get(self, request, audit_id):
        # Solo resultados de auditorías del usuario autenticado
        try:
            audit = AuditoryLog.objects.get(id=audit_id, user=request.user)
        except AuditoryLog.DoesNotExist:
            return Response({'detail': 'Auditoría no encontrada.'}, status=status.HTTP_404_NOT_FOUND)
        results = AuditoryLogResult.objects.filter(auditory_log=audit)
        serializer = AuditoryLogResultSerializer(results, many=True)
        return Response(serializer.data)