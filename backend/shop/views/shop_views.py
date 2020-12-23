from rest_framework.response import Response
from rest_framework import viewsets
from ..models.shop import Shop
from ..models.auth import User
from ..serializers.shop_serializers import ShopSerializer, ShopOwnerSerializer


class ShopOwnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = User.objects.all()
    serializer_class = ShopOwnerSerializer


class ShopViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
