from django.urls import path
from .views import ClipList, ClipDetail, PlayClipView

urlpatterns = [
    path('clips/', ClipList.as_view(), name='clip-list'),
    path('clips/<int:pk>/', ClipDetail.as_view(), name='clip-detail'),
    path('clips/<int:pk>/play/', PlayClipView.as_view(), name='clip-play'),
]
