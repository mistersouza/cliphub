from rest_framework import serializers
from .models import Clip
from flags.models import Flag
from likes.models import Like

class ClipSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    profile_id = serializers.ReadOnlyField(source='owner.profile.id')
    profile_image = serializers.ReadOnlyField(source='owner.profile.image.url')
    like_id = serializers.SerializerMethodField()
    comments_count = serializers.ReadOnlyField()
    likes_count = serializers.ReadOnlyField()
    views_count = serializers.ReadOnlyField()
    flag_reason = serializers.SerializerMethodField()

    def validate_clip(self, value):    
        if value.size > 1024 * 1024 * 50:  # 50MB limit for clips
            raise serializers.ValidationError('Clip size larger than 50MB')
        return value

    def get_is_owner(self, obj):
        request = self.context['request']
        return request.user == obj.owner
    
    def get_like_id(self, obj):
        user = self.context['request'].user
        if user.is_authenticated:
            like = Like.objects.filter(owner=user, clip=obj).first()
            return like.id if like else None
        return None
    
    def get_flag_reason(self, obj):
        flag = Flag.objects.filter(clip=obj).first()
        return flag.reason if flag else None
        return None

    class Meta:
        model = Clip
        fields = [
            'id', 'owner', 'is_owner', 'profile_id', 'profile_image',
            'like_id', 'comments_count', 'likes_count', 'views_count',
            'flag_reason', 'clip', 
        ]
