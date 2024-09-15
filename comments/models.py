from django.db import models
from django.contrib.auth.models import User
from posts.models import Post
from clips.models import Clip

# Models
class Comment(models.Model):
    """
    Comment model, related to User and Post
    """
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    clip = models.ForeignKey(
        Clip,
        related_name='comments',
        on_delete=models.CASCADE,
        null=True, 
    )
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    content = models.TextField()

    class Meta:
        ordering = ['-created_at']

    def __str__(self):
        return self.content