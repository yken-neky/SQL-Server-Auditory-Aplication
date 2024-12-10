from rest_framework import generics
from .models import ConnectionLog
from .serializer import ConnectionLogSerializer

# Create your views here.

class ConnectionLogListCreate(generics.ListCreateAPIView):
    queryset = ConnectionLog.objects.all()
    serializer_class = ConnectionLogSerializer

class ConnectionLogDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = ConnectionLog.objects.all()
    serializer_class = ConnectionLogSerializer
