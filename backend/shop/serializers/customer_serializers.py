from django.db.models import fields
from rest_framework import serializers

from ..models.customer import Customer, Order
from .product_serializers import ProductSerializer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['quantity', 'datetime', 'status',
                  'delivery_address', 'customer', 'product']
