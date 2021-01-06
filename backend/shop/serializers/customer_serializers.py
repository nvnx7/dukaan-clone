from rest_framework import serializers
from rest_framework.relations import PrimaryKeyRelatedField

from ..models.customer import Customer, Order
from .product_serializers import ProductSerializer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'phone']
        read_only_fields = ['first_name', 'last_name', 'phone']

    @staticmethod
    def get_or_create(data):
        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            customer, created = Customer.objects.get_or_create(
                first_name=data.get('first_name'),
                last_name=data.get('last_name'),
                phone=data.get('phone')
            )
            return customer, created
        else:
            return None, serializer.errors


class OrderSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    customer = CustomerSerializer(read_only=True)
    product = ProductSerializer(read_only=True)
    shop = PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = Order
        fields = ['id', 'quantity', 'date_ordered', 'status',
                  'delivery_address', 'customer', 'product', 'shop']

        read_only_fields = ['date_ordered']
