from rest_framework import serializers
from .models import *

class ConnectionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectionLog
        fields = '__all__'

class AuditoryLogResultSerializer(serializers.ModelSerializer):
    control = serializers.PrimaryKeyRelatedField(read_only=True)
    class Meta:
        model = AuditoryLogResult
        fields = ['id', 'control', 'result']

class AuditoryLogSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username', read_only=True)
    server = serializers.SlugRelatedField(slug_field='server', read_only=True)
    results = AuditoryLogResultSerializer(many=True, read_only=True)  # Incluye resultados relacionados
    class Meta:
        model = AuditoryLog
        fields = '__all__'