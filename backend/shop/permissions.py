from .models.product import Product
from .models.shop import Shop
from rest_framework import permissions


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permission class for accessing the Shop model resources
    """

    def has_object_permission(self, request, view, obj):
        """
        Write permissions only restricted to owner of the Shop
        """

        print("CHECCCCCCCCCKKKKIII")

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user


class IsOrderReceiverOrCreateOnly(permissions.BasePermission):
    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        elif request.method in permissions.SAFE_METHODS:
            if 'shop_id' in view.kwargs and view.kwargs['shop_id']:
                shop_id = view.kwargs['shop_id']
                shop = Shop.objects.get(pk=shop_id)
                return shop.owner == request.user
        else:
            return False


class IsProductSellerOrReadOnly(permissions.BasePermission):
    """
    Permission class for accessing the Shop model resources
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        else:
            if 'pk' in view.kwargs and view.kwargs['pk']:
                pk = view.kwargs['pk']
                shop = Shop.objects.get(pk=pk)
                return shop.owner == request.user
