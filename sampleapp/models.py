from django.contrib.auth.models import User
from django.db import models


class Translation(models.Model):
    input = models.CharField(max_length=250)
    output = models.CharField(max_length=250)
    notes = models.CharField(max_length=500, null=True, blank=True)
    input_lang = models.CharField(max_length=10)
    output_lang = models.CharField(max_length=10)
    user = models.ForeignKey(User, on_delete=models.CASCADE)

    class Meta:
        ordering = ('input',)
