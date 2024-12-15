from Users_App.models import CustomUser
from rest_framework import serializers
from .models import ActiveConnection
from django.core.exceptions import ValidationError
from django.contrib.auth.password_validation import validate_password

class ActiveConnectionSerializer(serializers.ModelSerializer):
    user = serializers.PrimaryKeyRelatedField(queryset=CustomUser.objects.all(), default=serializers.CurrentUserDefault())

    class Meta:
        model = ActiveConnection
        fields = '__all__'
        extra_kwargs = {'password': {'write_only': True}}

    def validate(self, data):
        password = data.get('password')
        try:
            validate_password(password)
        except ValidationError as e:
            raise serializers.ValidationError({'password': e.messages})
        return data

    def create(self, validated_data):
        user = self.context['request'].user
        obj, created = ActiveConnection.objects.update_or_create(
            user=user,
            defaults={
                'driver': validated_data['driver'],
                'server': validated_data['server'],
                'db_user': validated_data['db_user'],
                'password': validated_data['password']
            }
        )
        return obj