from rest_framework import serializers
from ..models.product import Product, ProductCategory


class ProductSerializer(serializers.ModelSerializer):
    id = serializers.ReadOnlyField()
    category = serializers.PrimaryKeyRelatedField(read_only=True)
    shop = serializers.PrimaryKeyRelatedField(
        read_only=True)

    class Meta:
        model = Product
        fields = ['id', 'title', 'description', 'price',
                  'unit', 'stock', 'image', 'category', 'shop']


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'
