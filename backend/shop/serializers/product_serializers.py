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

    @staticmethod
    def get_all_categories():
        product_categories = ProductCategory.objects.all()
        return list(ProductCategorySerializer(instance=product_categories, many=True).data)
