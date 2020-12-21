from rest_framework import serializers
from rest_framework.relations import HyperlinkedIdentityField, HyperlinkedRelatedField
from ..models.shop import Shop, ShopOwner
from ..serializers.product_serializers import ProductSerializer


class ShopSerializer(serializers.HyperlinkedModelSerializer):
    owner = HyperlinkedIdentityField(view_name='owner-detail')
    shop_products = ProductSerializer(many=True, read_only=True)

    class Meta:
        model = Shop
        fields = ['title', 'address', 'created',
                  'revenue', 'owner', 'shop_products']


class ShopOwnerSerializer(serializers.HyperlinkedModelSerializer):
    owner_shops = HyperlinkedRelatedField(
        many=True, view_name='shop-detail', read_only=True)

    class Meta:
        model = ShopOwner
        fields = ['first_name', 'last_name', 'phone', 'joined', 'owner_shops']
