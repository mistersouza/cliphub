from rest_framework import generics, permissions
from django_filters.rest_framework import DjangoFilterBackend
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Comment
from .serializers import CommentSerializer, CommentsDetailSerializer

# Views
class CommentList(generics.ListCreateAPIView):
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Comment.objects.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
    
    filter_backends = [
        DjangoFilterBackend
    ]
    filterset_fields = [
        'post'
    ]

class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    permission_classes = [IsOwnerOrReadOnly]
    serializer_class = CommentsDetailSerializer
    queryset = Comment.objects.all()