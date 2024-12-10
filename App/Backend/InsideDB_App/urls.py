from django.urls import path
from . import views

urlpatterns = [
    path('query/all/', views.execute_all_queries, name = 'query_all'),
    path('query/<int:query_key>/', views.execute_specific_query, name = 'query_specific'),
]