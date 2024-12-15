from django.contrib.auth import logout as django_logout
from rest_framework import viewsets, status
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.authtoken.models import Token
from .serializer import UserSerializer
from .models import CustomUser
from rest_framework.authentication import TokenAuthentication
from django.contrib.auth.password_validation import validate_password
from django.core.exceptions import ValidationError

class UserViewSet(viewsets.ViewSet):

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def register(self, request):
        data = request.data
        password = data.get('password', '')
        try:
            validate_password(password)
        except ValidationError as e:
            return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)

        serializer = UserSerializer(data=data)
        if serializer.is_valid():
            user = CustomUser.objects.create_user(
                username=serializer.validated_data['username'],
                password=serializer.validated_data['password'],
                email=serializer.validated_data['email'],
                first_name=serializer.validated_data.get('first_name', ''),
                last_name=serializer.validated_data.get('last_name', '')
            )
            token, created = Token.objects.get_or_create(user=user)
            response = Response({'user': serializer.data, 'token': token.key}, status=status.HTTP_201_CREATED)
            response.set_cookie('authToken', token.key, httponly=True, samesite='Lax')
            return response
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[AllowAny])
    def login(self, request):
        username = request.data.get('username')
        password = request.data.get('password')
        try:
            user = CustomUser.objects.get(username=username)
            if not user.check_password(password):
                return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)
            if not user.is_active:
                return Response({"error": "User is not active"}, status=status.HTTP_403_FORBIDDEN)
            
            # Verificar si el usuario ya está logueado 
            if Token.objects.filter(user=user).exists(): 
                return Response({"error": "User is already logged in"}, status=status.HTTP_400_BAD_REQUEST)

            token, created = Token.objects.get_or_create(user=user)
            serializer = UserSerializer(user)
            return Response({"token": token.key, "user": serializer.data}, status=status.HTTP_200_OK)
        except CustomUser.DoesNotExist:
            return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['get'], permission_classes=[IsAuthenticated], authentication_classes=[TokenAuthentication])
    def profile(self, request):
        user = request.user
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated], authentication_classes=[TokenAuthentication])
    def logout(self, request):
        try:
            request.user.auth_token.delete()
            django_logout(request)
            response = Response({"message": "Logged out successfully"}, status=status.HTTP_200_OK)
            response.delete_cookie('authToken')
            return response
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)



# En Django, el modelo de usuario incluye un campo is_active que es un booleano. 
# Este campo se utiliza para activar o desactivar la cuenta de un usuario. 
# Cuando is_active es False, el usuario no debería poder iniciar sesión. 
# Esto es útil, por ejemplo, cuando quieres desactivar una cuenta sin eliminarla, 
# o durante un proceso de verificación de cuenta donde el usuario debe 
# confirmar su dirección de correo electrónico antes de que la cuenta se active.