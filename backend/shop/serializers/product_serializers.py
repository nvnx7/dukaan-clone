from rest_framework import serializers
from ..models.product import Product, ProductCategory


class ProductSerializer(serializers.HyperlinkedModelSerializer):
    category = serializers.StringRelatedField()
    shop = serializers.HyperlinkedRelatedField(
        read_only=True, view_name='shop-detail')

    class Meta:
        model = Product
        fields = ['title', 'description', 'price',
                  'unit', 'stock', 'image', 'category', 'shop']


class ProductCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductCategory
        fields = '__all__'
