from rest_framework import serializers
from .models import Post
from likes.models import Like

class PostSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    like_id = serializers.SerializerMethodField()
    comments_count = serializers.ReadOnlyField()
    likes_count = serializers.ReadOnlyField()
    views_count = serializers.ReadOnlyField()  # This is fine as ReadOnlyField

    
    def validate_clip(self, value):    
        if value.size > 1024 * 1024 * 50:  # 50MB limit
            raise serializers.ValidationError('Video size larger than 50MB')
        return value

    def get_is_owner(self, object):
        request = self.context['request']
        return request.user == object.owner
    
    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(owner=user, post=obj).first()
            return like.id if like else None
        return None

    class Meta:
        model = Post
        fields = [
            'id',
            'owner',
            'is_owner',
            'profile_id',
            'like_id',
            'profile_image',
            'created_at',
            'updated_at',
            'caption',
            'topic',
            'clip',
            'clip_filter',
            'comments_count',
            'likes_count',
            'views_count',
        ]
