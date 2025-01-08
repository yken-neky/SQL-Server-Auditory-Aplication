from django.contrib.auth import logout as django_logout
from django.contrib.auth.password_validation import validate_password
from rest_framework import viewsets, status
from rest_framework.authtoken.models import Token
from rest_framework.authentication import TokenAuthentication
from rest_framework.decorators import action
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from .serializer import UserSerializer
from .models import CustomUser
from django.core.exceptions import ValidationError
from .permissions import IsAdmin
from Connecting_App.permissions import NoOnServiceAccess

class UserViewSet(viewsets.ViewSet):
    permission_classes = [NoOnServiceAccess]

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
            user = serializer.save()
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

    @action(detail=False, methods=['put'], permission_classes=[IsAuthenticated], authentication_classes=[TokenAuthentication])
    def update_profile(self, request):
        user = request.user
        data = request.data.copy()  # Hacemos una copia de los datos para poder modificar el diccionario

        # Verificar si el usuario tiene permisos de administrador
        if not IsAdmin().has_permission(request, self):
            # Si el usuario no es administrador, eliminamos el campo 'role' de los datos
            data.pop('role', None)

        serializer = UserSerializer(user, data=data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated], authentication_classes=[TokenAuthentication])
    def change_password(self, request):
        user = request.user
        current_password = request.data.get('current_password')
        new_password = request.data.get('new_password')
        confirm_password = request.data.get('confirm_password')

        if not current_password or not new_password or not confirm_password: 
            return Response({"error": "All password fields are required"}, status=status.HTTP_400_BAD_REQUEST)

        if new_password != confirm_password:
            return Response({"error": "New passwords do not match"}, status=status.HTTP_400_BAD_REQUEST)

        print(f"Current Password: {current_password}") 
        print(f"Hash de la contraseña en la DB: {user.password}")

        if not user.check_password(current_password):
            return Response({"error": "Current password is incorrect"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            validate_password(new_password)
        except ValidationError as e:
            return Response({"error": e.messages}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(new_password)
        user.save()
        return Response({"message": "Password changed successfully"}, status=status.HTTP_200_OK)
    
    @action(detail=False, methods=['post'], permission_classes=[IsAuthenticated], authentication_classes=[TokenAuthentication])
    def deactivate_account(self, request):
        user = request.user
        user.is_active = False
        user.save()

        # Cerrar sesión del usuario automáticamente
        try:
            request.user.auth_token.delete()
            django_logout(request)
            response = Response({"message": "Account deactivated and logged out successfully"}, status=status.HTTP_200_OK)
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


