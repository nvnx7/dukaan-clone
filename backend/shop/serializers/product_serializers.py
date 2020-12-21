from ..serializers.customer_serializers import CustomerSerializer
from rest_framework import serializers
from ..models.product import Product, ProductCategory, Order


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    category = serializers.PrimaryKeyRelatedField(
        queryset=ProductCategory.objects.all())
    shop = serializers.HyperlinkedIdentityField(
        view_name='shop-detail')

    class Meta:
        model = Product
        fields = ['title', 'description', 'price',
                  'unit', 'stock', 'image', 'category', 'shop']


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'


class OrderSerializer(serializers.ModelSerializer):
    customer = CustomerSerializer(read_only=True)
    product = ProductSerializer(read_only=True)

    class Meta:
        model = Order
        fields = ['quantity', 'datetime', 'status',
                  'delivery_address', 'customer', 'product']
