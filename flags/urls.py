from django.urls import path
from . import views

urlpatterns = [
    path('flag/reasons/', views.FlagReasonsView.as_view(), name='flag-reasons'), 
    path('flag/clip/<int:clip_id>/', views.FlagClipView.as_view(), name='flag-clip'),
]