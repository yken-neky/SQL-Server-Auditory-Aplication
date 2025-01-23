import pyodbc
from .models import *
from Logs_App.models import *

def get_db_connection(driver, server, db_user, password, user):
    try:
        connection_string = f"DRIVER={{{driver}}};SERVER={server};UID={db_user};PWD={password};TrustServerCertificate=yes;"
        connection = pyodbc.connect(connection_string, autocommit=True)
        return {"status": "connected", "connection": connection}
    except pyodbc.Error as e:
        return {"status": "connection_failed", "error": str(e)}

def create_or_update_connection(user, driver, server, db_user, password):
    active_conn, created = ActiveConnection.objects.update_or_create(
        user=user,
        defaults={
            'driver': driver,
            'server': server,
            'db_user': db_user,
            'password': password,
            'is_connected': True
        }
    )
    ConnectionLog.objects.create(
        user=user,
        driver=driver,
        server=server,
        db_user=db_user,
        status='connected' if created else 'reconnected'
    )
    return active_conn

def disconnect_user(user):
    active_conn = ActiveConnection.objects.filter(user=user).first()
    if active_conn:
        active_conn.is_connected = False
        active_conn.save()
        ConnectionLog.objects.create(
            user=user,
            driver=active_conn.driver,
            server=active_conn.server,
            db_user=active_conn.db_user,
            status='disconnected'
        )
    return active_conn


# --------------------------------------------------------------------------------------- #
# VCenter utils.py
# 
# from pyVim.connect import SmartConnect, Disconnect
# from pyVmomi import vim
# import ssl
# import os
# import django
# 
# # Configura Django
# os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'host_management.settings')
# django.setup()
# 
# # Ignorar advertencias de SSL para este ejemplo. No recomendado para producción
# ssl._create_default_https_context = ssl._create_unverified_context
# 
# 
# #Iniciamos una lista en blanco 
# global_connections = []
# 
# #Script para conectarme al servidor 
# def connect_to_vcenter(host, user, password):
#     global global_connections
#     if any(conn for conn in global_connections if conn['host'] == host and conn['user'] == user):
#         return {"status": "Ya hay una conexión activa", "connected": True}, 200
# 
#     print('Conectando ...')
#     try:
#         context = ssl.create_default_context()
#         context.check_hostname = False
#         context.verify_mode = ssl.CERT_NONE
#         
#         connection = SmartConnect(host=host, user=user, pwd=password, sslContext=context)
#         
#         if connection is None:
#             return {"status": "Error de conexión: No se pudo establecer la conexión", "connected": False}, 500
#         
#         print('Conectado...')
#         content = connection.RetrieveContent()
#         if content is not None:
#             global_connections.append({'host': host, 'user': user, 'connection': connection})  # Guardamos la conexión
#             return {"status": "Conexión exitosa", "connected": True}, 200
#         else:
#             return {"status": "Error de conexión: No se pudo recuperar el contenido", "connected": False}, 500
#     except Exception as e:
#         return {"status": f"Error de conexión: {str(e)}", "connected": False}, 500
# 
# #Script para desconectar del servidor 
# def disconnect_from_vcenter(host, user):
#     global global_connections
#     for conn in global_connections:
#         if conn['host'] == host and conn['user'] == user:
#             Disconnect(conn['connection'])
#             global_connections.remove(conn)
#             return {"status": "Desconectado del vCenter."}
#     return {"status": "No hay conexión activa para desconectar para este usuario y host"}
# 