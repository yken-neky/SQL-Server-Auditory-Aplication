from rest_framework.routers import DefaultRouter 
from django.urls import path, include 
from .views import *

router = DefaultRouter() 
router.register(r'connections', ConnectionViewSet, basename='connections') 

urlpatterns = [ 
    path('api/sql_conn/', include(router.urls)), 
    # http://localhost:8000/api/sql_conn/connections/connect/
    # http://localhost:8000/api/sql_conn/connections/disconnect/
    path('api/sql_conn/admin/active_connections/', ActiveConnectionListCreate.as_view(), name='activeconnection-list-create'), 
    path('api/sql_conn/admin/active_connections/<int:pk>/', ActiveConnectionDetail.as_view(), name='activeconnection-detail'), 
]