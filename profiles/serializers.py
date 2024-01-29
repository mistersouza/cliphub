from rest_framework import serializers
from .models import Profile
from followers.models import Follower

class ProfileSerializer(serializers.ModelSerializer):
    owner = serializers.ReadOnlyField(source='owner.username')
    is_owner = serializers.SerializerMethodField()
    following_id = serializers.SerializerMethodField()
    posts_count = serializers.ReadOnlyField()
    followers_count = serializers.ReadOnlyField()
    following_count = serializers.ReadOnlyField()

    def get_is_owner(self, object):
        request = self.context['request']
        return request.user == object.owner

    def get_following_id(self, object):
        user = self.context['request'].user
        if user.is_authenticated:
            following = Follower.objects.filter(
                owner=user, followed_by=object.owner
            ).first()
            return following.id if following else None
        return None

    class Meta:
        model = Profile
        fields = [
            'id',
            'following_id',
            'owner',
            'created_at',
            'updated_at',
            'name',
            'content',
            'image',
            'is_owner',
            'posts_count',
            'followers_count',
            'following_count'
        ]
