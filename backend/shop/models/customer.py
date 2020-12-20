from django.db import models
from django.core.validators import MinLengthValidator, MaxLengthValidator


class Customer(models.Model):
    first_name = models.CharField(max_length=100)
    last_name = models.CharField(max_length=100)
    phone = models.IntegerField(null=False, validators=[
                                MinLengthValidator(4), MaxLengthValidator(12)])
    address = models.CharField(max_length=500, null=False)
