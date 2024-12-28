from django.urls import path
from .views import *

urlpatterns = [
    path('api/logs/admin/connection_logs_list/', AllConnectionLogList.as_view(), name='connection_log_list_admin'),
    path('api/logs/admin/auditory_logs_list/', AllAuditoryLogList.as_view(), name='auditory_log_list_admin'),
    path('api/logs/connection_logs_list/', ConnectionLogList.as_view(), name='connection_log_list'),
    path('api/logs/connection_logs_details/<int:pk>/', ConnectionLogDetail.as_view(), name='connection_log_detail'),
    path('api/logs/auditory_logs_list/', AuditoryLogList.as_view(), name='auditory_log_list'),
    path('api/logs/auditory_logs_detail/<int:pk>', AuditoryLogDetail.as_view(), name='auditory_log_detail'),
]