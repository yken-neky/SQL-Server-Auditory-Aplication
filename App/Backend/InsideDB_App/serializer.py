from rest_framework import serializers
from .models import *

class Controls_Information_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Controls_Information
        fields = '__all__'
        
    def validate_unique_together(self, attrs):
        # Validación personalizada para unique_together
        index = attrs.get('index')
        chapter = attrs.get('chapter')
        
        # Verificar si ya existe un control con la misma combinación de index y chapter
        if Controls_Information.objects.filter(index=index, chapter=chapter).exists():
            raise serializers.ValidationError(
                "Ya existe un control con esta combinación de índice y capítulo."
            )
        return attrs
    
class Controls_Scripts_Serializer(serializers.ModelSerializer):
    class Meta:
        model = Controls_Scripts
        fields = '__all__'