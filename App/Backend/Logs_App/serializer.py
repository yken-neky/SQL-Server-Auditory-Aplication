from rest_framework import serializers
from .models import *

class ConnectionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectionLog
        fields = '__all__'

class AuditoryLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = AuditoryLog
        fields = '__all__'
