from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework import status

from ..models.shop import Shop
from ..models.auth import User
from ..models.customer import Order
from ..serializers.shop_serializers import ShopSerializer, ShopOwnerSerializer, CustomerShopSerializer
from ..serializers.customer_serializers import OrderSerializer
from ..permissions import IsOwnerOrReadOnly


class ShopOwnerViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = ShopOwnerSerializer

    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    authentication_classes = [TokenAuthentication]


class ShopViewSet(viewsets.ModelViewSet):
    queryset = Shop.objects.all()
    serializer_class = ShopSerializer

    permission_classes = [IsAuthenticatedOrReadOnly, IsOwnerOrReadOnly]
    # authentication_classes = [TokenAuthentication]

    def retrieve(self, request, *args, **kwargs):
        shop_id = kwargs['pk']
        shop = get_object_or_404(self.queryset, pk=shop_id)
        shopSerializer = ShopSerializer(
            instance=shop, context={'request': request})

        # If user is not authenticated or owner of  thisshop send only shop & products details
        if not request.user.is_authenticated or not (shop.owner == request.user):
            customer_shop_serializer = CustomerShopSerializer(
                instance=shop, context={'request': request})
            response = dict(customer_shop_serializer.data)
            response['contact'] = shop.owner.phone
            return Response(response, status=status.HTTP_200_OK)

        # Else include all order details to this shop
        orders = Order.objects.filter(shop=shop_id)
        ordersSerializer = OrderSerializer(
            instance=orders, many=True, context={'request': request})

        response = dict(shopSerializer.data)
        response['orders'] = list(ordersSerializer.data)
        return Response(response, status=status.HTTP_200_OK)

    def list(self, request, *args, **kwargs):
        """
        Filter using the owner id & return shop details
        """
        owner_id = kwargs['owner_id']
        shops = self.queryset.filter(owner_id=owner_id)
        serializer = ShopSerializer(
            instance=shops, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
