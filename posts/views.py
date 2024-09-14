from django.db.models import Count
from rest_framework import filters, generics, permissions, status, views
from rest_framework.response import Response
from django_filters.rest_framework import DjangoFilterBackend
from drf_api.permissions import IsOwnerOrReadOnly
from .models import Post
from .serializers import PostSerializer

# Views
class PostList(generics.ListCreateAPIView):
    '''
    List posts or create a post if logged in
    '''
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    queryset = Post.objects.annotate(
        comments_count = Count('comment', distinct=True),
        likes_count = Count('likes', distinct=True)
    ).order_by('-created_at')
    filter_backends = [
        filters.OrderingFilter,
        filters.SearchFilter,
        DjangoFilterBackend
    ]
    filterset_fields = [
        'owner__followed__owner__profile',
        'likes__owner__profile',
        'owner__profile'
    ]
    search_fields = [
        'owner__username',
        'caption'
    ]
    ordering_fields = [
        'comments_count',
        'likes_count',
        'likes__created_at',
        'views_count',
    ]
    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    '''
    Retrieve a post and edit or delete it if you own it
    '''
    serializer_class = PostSerializer
    permission_classes = [IsOwnerOrReadOnly]
    queryset = Post.objects.annotate(
        comments_count = Count('comment', distinct=True),
        likes_count = Count('likes', distinct=True)
    ).order_by('-created_at')

class PlayClipView(views.APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request, pk):
        try:
            post = Post.objects.get(pk=pk)
            post.views_count += 1
            post.save()
            return Response({'message': 'Views incremented'}, status=status.HTTP_200_OK)
        except Post.DoesNotExist:
            return Response({'error': 'Clip not found'}, status=status.HTTP_404_NOT_FOUND)