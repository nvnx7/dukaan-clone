from rest_framework import serializers
from rest_framework.relations import HyperlinkedIdentityField
from ..models.shop import Shop, ShopOwner


class ShopSerializer(serializers.HyperlinkedModelSerializer):
    owner = HyperlinkedIdentityField(view_name='owner-detail')

    class Meta:
        model = Shop
        fields = ['title', 'address', 'created', 'revenue', 'owner']


class ShopOwnerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ShopOwner
        fields = ['first_name', 'last_name', 'phone', 'joined']
