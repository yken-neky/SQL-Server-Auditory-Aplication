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
