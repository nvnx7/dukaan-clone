from rest_framework import serializers
from rest_framework.relations import HyperlinkedIdentityField, HyperlinkedRelatedField
from ..models.shop import Shop
from ..models.auth import User
from ..serializers.product_serializers import ProductSerializer


class ShopSerializer(serializers.HyperlinkedModelSerializer):
    owner = HyperlinkedRelatedField(view_name='owner-detail', read_only=True)
    shop_products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = ['title', 'address', 'created',
                  'revenue', 'owner', 'shop_products']


class ShopOwnerSerializer(serializers.HyperlinkedModelSerializer):
    owner_shops = HyperlinkedRelatedField(
        many=True, view_name='shop-detail', read_only=True)

    class Meta:
        model = User
        fields = ['first_name', 'last_name', 'phone',
                  'date_joined', 'owner_shops']
