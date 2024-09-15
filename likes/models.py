from django.db import models
from django.contrib.auth.models import User
from posts.models import Post
from clips.models import Clip


# Models
class Like(models.Model):
    '''
    The Like model is associated with 'owner' and 'post' fields,
    representing instances of the User and Post models, respectively.
    The 'unique_together' constraint ensures that a user cannot
    like the same post more than once.
    '''
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    post = models.ForeignKey(
        Post,
        related_name='likes',
        on_delete=models.CASCADE
    )
    clip = models.ForeignKey(
        Clip,
        related_name='likes',
        on_delete=models.CASCADE,
        null=True,
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'post']

    def __str__(self):
        return f'{self.owner} {self.post}'

