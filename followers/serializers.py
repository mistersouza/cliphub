from django.db import IntegrityError
from rest_framework import serializers
from .models import Follower


class FollowerSerializer(serializers.ModelSerializer):
    '''
    Serializer for the Follower model
    Create method handles the unique constraint on 'owner' and 'followed'
    '''
    owner = serializers.ReadOnlyField(source='owner.username')
    followed_by_name = serializers.ReadOnlyField(source='followed_by.username')

    class Meta:
        model = Follower
        fields = [
            'id',
            'created_at',
            'followed_by',
            'followed_by_name',
            'owner',
        ]
    
    def create(self, validated_data):
        try:
            return super().create(validated_data)
        except IntegrityError:
            raise serializers.ValidationError({
                'detail': 'possible duplicate'
            })
