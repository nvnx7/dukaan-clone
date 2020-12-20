from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator
import datetime


class ShopOwner(models.Model):
    first_name = models.CharField(max_length=100, default='')
    last_name = models.CharField(max_length=100, default='')
    phone = models.IntegerField(null=False, unique=True, validators=[
                                MinLengthValidator(4), MaxLengthValidator(12)])
    password = models.CharField(max_length=128, null=False)
    joined = models.DateTimeField(default=datetime.datetime.now)


class Shop(models.Model):
    title = models.CharField(max_length=100, null=False)
    address = models.CharField(max_length=500, null=False)
    owner = models.ForeignKey(ShopOwner, on_delete=models.CASCADE)
    revenue = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    created = models.DateTimeField(default=datetime.datetime.now)
