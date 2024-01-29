from django.db import models
from django.contrib.auth.models import User


# Models
class Follower(models.Model):
    '''
    Follower model, related to 'owner' and 'followed'
    '''
    owner = models.ForeignKey(
    User,
    related_name='following',
    on_delete=models.CASCADE
    )
    followed_by = models.ForeignKey(
        User,
        related_name='followed',
        on_delete=models.CASCADE
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ['-created_at']
        unique_together = ['owner', 'followed_by']

    def __str__(self):
        return f'{self.owner} {self.followed_by}'