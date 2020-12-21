from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework import status
from ..models.shop import Shop, ShopOwner
from ..serializers.shop_serializers import ShopSerializer, ShopOwnerSerializer


class ShopOwnerViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = ShopOwner.objects.all()
    serializer_class = ShopOwnerSerializer


class ShopViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer
