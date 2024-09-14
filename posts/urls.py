from django.urls import path
from .views import *

urlpatterns = [
    path('posts/', PostList.as_view(), name='clip-list'),
    path('posts/<int:pk>/', PostDetail.as_view(), name='clip-detail'),
    path('posts/<int:pk>/play/', PlayClipView.as_view(), name='clip-play'),
]