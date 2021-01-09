from django.shortcuts import get_object_or_404
from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticatedOrReadOnly
from rest_framework.authentication import TokenAuthentication
from rest_framework.parsers import MultiPartParser, FormParser

from ..models.product import Product, ProductCategory
from ..serializers.product_serializers import ProductSerializer
from ..permissions import IsProductSellerOrReadOnly


class ProductViewSet(viewsets.ModelViewSet):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    parser_classes = [MultiPartParser, FormParser]

    permission_classes = [IsAuthenticatedOrReadOnly, IsProductSellerOrReadOnly]
    authentication_classes = [TokenAuthentication]

    def perform_create(self, serializer):
        # Query Shop & Category instances and save Product with those related fields
        shop = self.request.user.owner_shops.get(pk=self.kwargs.get('pk'))
        category = ProductCategory.objects.get(
            pk=self.request.data.get('category'))
        serializer.save(shop=shop, category=category)

    def perform_update(self, serializer):
        product = get_object_or_404(self.queryset, pk=self.kwargs.get('pk'))
        category = get_object_or_404(
            ProductCategory, pk=self.request.data.get('category'))
        serializer.save(shop=product.shop, category=category)
