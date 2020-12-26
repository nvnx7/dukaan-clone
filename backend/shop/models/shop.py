from .auth import User
from django.db import models
import datetime


class Shop(models.Model):
    title = models.CharField(max_length=100, null=False)
    address = models.CharField(max_length=500, null=False)
    owner = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='owner_shops')
    revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    date_created = models.DateTimeField(
        default=datetime.datetime.now)
