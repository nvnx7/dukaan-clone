from django.db import models
from django.core.validators import MinValueValidator, MaxValueValidator
from django.db.models.fields import CharField
from .shop import Shop
from .customer import Customer
import datetime


class ProductCategory(models.Model):
    title = models.CharField(max_length=200)

    def __str__(self) -> str:
        return self.title


class Product(models.Model):
    UNITS = (
        ('pc', 'piece'),
        ('kg', 'kilogram'),
        ('g', 'gram'),
        ('l', 'litre'),
        ('ml', 'millilitre'),
        ('dz', 'dozen')
    )
    title = models.CharField(max_length=200, null=False)
    description = models.TextField(default='')
    price = models.DecimalField(
        max_digits=10, decimal_places=2, null=False, validators=[MinValueValidator(0.01)])
    category = models.ForeignKey(
        ProductCategory, on_delete=models.CASCADE, default=1, related_name='category_products')
    image = models.ImageField(upload_to='uploads/products/')
    stock = models.IntegerField(
        validators=[MinValueValidator(0), MaxValueValidator(9999999999)])
    unit = CharField(max_length=2, choices=UNITS)
    shop = models.ForeignKey(
        Shop, on_delete=models.CASCADE, related_name='shop_products')

    def __str__(self) -> str:
        return self.title


class Order(models.Model):
    ORDER_STATUS = (
        (0, 'pending'),
        (1, 'accepted'),
        (2, 'shipped'),
        (3, 'delivered')
    )
    quantity = models.IntegerField(null=False, validators=[
                                   MinValueValidator(1), MaxValueValidator(9999999999)])
    product = models.ForeignKey(
        Product, on_delete=models.CASCADE, related_name='product_orders')
    delivery_address = models.CharField(max_length=500, null=False)
    customer = models.ForeignKey(
        Customer, on_delete=models.CASCADE, related_name='customer_orders')
    datetime = models.DateTimeField(default=datetime.datetime.now)
    status = models.IntegerField(choices=ORDER_STATUS)
