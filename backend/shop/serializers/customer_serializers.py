from rest_framework import serializers

from ..models.customer import Customer, Order
from .product_serializers import ProductSerializer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = ['first_name', 'last_name', 'phone']

    @staticmethod
    def get_or_create(data):
        # customer = self.Meta.model.objects.get(phone=self.validated_data.get('phone'))

        serializer = CustomerSerializer(data=data)
        if serializer.is_valid():
            customer, created = CustomerSerializer.Meta.model.objects.get_or_create(
                first_name=serializer.validated_data.get('first_name'),
                last_name=serializer.data.get('last_name'),
                phone=serializer.data.get('phone')
            )
            return customer, created
        else:
            print("NOT VALIDATED")
            return None, serializer.errors

        # if not customer:
        #     customer = self.Meta.model.objects.create()
        #     return customer
        # else:
        #     isSame = (customer.first_name == data.get('first_name')) and (
        #         customer.last_name == data.get('last_name'))

        #     if isSame:
        #         return customer
        #     else:
        #         customer = self.Meta.model.objects.create()
        #         return customer


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['quantity', 'date_ordered', 'status',
                  'delivery_address', 'customer', 'product']
