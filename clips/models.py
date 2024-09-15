from django.db import models
from django.contrib.auth.models import User
from cloudinary_storage.storage import MediaCloudinaryStorage

class Clip(models.Model):
    """
    Clip model, related to 'owner', i.e., a User instance.
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    caption = models.CharField(max_length=255)
    topic = models.TextField(blank=True)
    clip = models.FileField(
        upload_to='videos/',
        storage=MediaCloudinaryStorage(resource_type='video'),
    )
    clip_filter = models.CharField(
        max_length=32,
        default='classic'
    )
    views_count = models.IntegerField(default=0)

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return f'{self.id} {self.caption}'
