from django.conf import settings
from django.db import models
from clips.models import Clip 

class Flag(models.Model):
    reasons = [
        ('spam', 'Spam'),
        ('inappropriate', 'Inappropriate Content'),
        ('other', 'Other'),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    clip = models.ForeignKey(Clip, on_delete=models.CASCADE)
    reason = models.CharField(max_length=50, choices=reasons)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.user} flagged {self.clip} for {self.reason}"
