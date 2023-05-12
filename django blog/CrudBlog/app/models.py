from django.db import models
from django.contrib.postgres.fields import ArrayField

class BlogPost(models.Model):
    title = models.CharField(unique=True, max_length=255)
    date = models.DateTimeField(auto_now_add=True)
    thumbnail = models.CharField(unique=True, max_length=255)
    main_image = models.CharField(unique=True, max_length=255)
    description = models.CharField(max_length=512)
    content = ArrayField(models.JSONField())
