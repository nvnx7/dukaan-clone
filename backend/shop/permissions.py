from django.shortcuts import get_object_or_404
from rest_framework import permissions
from .models.product import Product
from .models.shop import Shop
from .models.customer import Order


class IsOwnerOrReadOnly(permissions.BasePermission):
    """
    Permission class for accessing the Shop model resources
    """

    def has_object_permission(self, request, view, obj):
        """
        Write permissions only restricted to owner of the Shop
        """

        if request.method in permissions.SAFE_METHODS:
            return True

        return obj.owner == request.user


class IsOrderReceiverOrCreateOnly(permissions.BasePermission):
    """
    Permissions for interacting with order views. Only POSTing an order is 
    allowed for any user (customer). Only owner of the shop to which order is made
    can GET & PATCH (update status only) the Order
    """

    def has_permission(self, request, view):
        if request.method == 'POST':
            return True
        elif request.method in permissions.SAFE_METHODS + ('PATCH',):
            # If not authenticated deny permission
            if not request.user.is_authenticated:
                return False

            if 'shop_id' in view.kwargs and view.kwargs['shop_id']:
                shop_id = view.kwargs['shop_id']
                shop = get_object_or_404(Shop, pk=shop_id)

                # If not owner of this shop deny permission
                if not shop.owner == request.user:
                    return False

                # If ordered product is not of this owner's shop deny permission
                if 'order_id' in view.kwargs and view.kwargs['order_id']:
                    order_id = view.kwargs['order_id']
                    order = get_object_or_404(Order, pk=order_id)
                    return order.product.shop == shop

            return True
        else:
            return False


class IsProductSellerOrReadOnly(permissions.BasePermission):
    """
    Permission class for accessing the Shop model resources
    """

    def has_permission(self, request, view):
        if request.method in permissions.SAFE_METHODS:
            return True
        elif request.method in ('PATCH', 'DELETE'):
            if 'pk' in view.kwargs and view.kwargs['pk']:
                product = get_object_or_404(Product, pk=view.kwargs['pk'])
                return product.shop.owner == request.user
        elif request.method == 'POST':
            if 'pk' in view.kwargs and view.kwargs['pk']:
                shop = get_object_or_404(Shop, pk=view.kwargs['pk'])
                return shop.owner == request.user
