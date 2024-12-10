from django.contrib.auth import logout as django_logout
from django.contrib.auth.models import User
from django.shortcuts import get_object_or_404
from rest_framework import status
from rest_framework.authentication import TokenAuthentication
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view, authentication_classes, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from .serializer import UserSerializer
from django.contrib.auth import get_user_model

User = get_user_model()

# Create your views here.

@api_view(['POST'])
def login(request):
    #serializer = UserSerializer(data = request.data)
    #if serializer.is_valid():
    try:
        user = User.objects.get(username=request.data['username'])
    except User.DoesNotExist:
        return Response({"error": "Invalid Credentials"}, status=status.HTTP_400_BAD_REQUEST)
    if not user.check_password(request.data['password']):
        return Response({"error": "Invalid Credentials"}, status = status.HTTP_400_BAD_REQUEST)
    
    token, created = Token.objects.get_or_create(user = user)
    serializer = UserSerializer(instance = user)
    
    return Response({"token": token.key, "user": serializer.data}, status = status.HTTP_200_OK) 
    #return Response({"error": serializer.errors})

@api_view(['POST'])
def register(request):
    serializer = UserSerializer(data = request.data)
    if serializer.is_valid():
        _user = serializer.save()
        token, created = Token.objects.get_or_create(user = _user)
        response = Response({'user': serializer.data, 'token': token.key}, status=status.HTTP_201_CREATED)
        response.set_cookie('authToken', token.key, httponly=True, samesite='Lax')
        return response

    return Response(serializer.errors, status = status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return Response({'username': user.username,'email': user.email}, status=status.HTTP_200_OK)


@api_view(['POST'])
@authentication_classes([TokenAuthentication])
@permission_classes([IsAuthenticated])
def logout_view(request):
    try:
        # Eliminar el token de autenticación
        request.user.auth_token.delete()
        # Cerrar la sesión del usuario
        django_logout(request)
        # Crear una respuesta
        response = Response(status=status.HTTP_200_OK)
        # Eliminar la cookie del token
        response.delete_cookie('authToken')
        return response
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)