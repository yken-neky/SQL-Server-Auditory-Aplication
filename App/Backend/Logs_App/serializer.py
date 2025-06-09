from rest_framework import serializers
from .models import *

class ConnectionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectionLog
        fields = '__all__'

class AuditoryLogSerializer(serializers.ModelSerializer):
    user = serializers.SlugRelatedField(slug_field='username', read_only=True)
    server = serializers.SlugRelatedField(slug_field='server', read_only=True)
    class Meta:
        model = AuditoryLog
        fields = '__all__'
