from rest_framework import serializers
from .models import ConnectionLog

class ConnectionLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = ConnectionLog
        fields = '__all__'
