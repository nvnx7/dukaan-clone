from django.shortcuts import get_object_or_404
from rest_framework import status, viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.exceptions import PermissionDenied
# from rest_framework.permissions import IsAuthenticatedOrReadOnly, IsAuthenticated
# from rest_framework.authentication import TokenAuthentication

from ..models.customer import Customer, Order
from ..models.product import Product
from ..models.shop import Shop
from ..serializers.customer_serializers import CustomerSerializer, OrderSerializer
from ..permissions import IsOrderReceiverOrCreateOnly
# from backend.shop.models import customer

# from backend.shop.models import product


# class CustomerViewSet(viewsets.ModelViewSet):
#     queryset = Customer.objects.all()
#     serializer_class = CustomerSerializer

#     permission_classes = [IsOwnerOrCreateOnly]


class OrderViewSet(viewsets.ModelViewSet):
    queryset = Order.objects.all()
    serializer_class = OrderSerializer

    permission_classes = [IsOrderReceiverOrCreateOnly]

    def list(self, request, *args, **kwargs):
        shop_id = kwargs['shop_id']
        shop = get_object_or_404(Shop, pk=shop_id)

        orders = self.queryset.filter(product__shop=shop)
        serializer = OrderSerializer(
            instance=orders, many=True, context={'request': request})
        return Response(serializer.data, status=status.HTTP_200_OK)

    def partial_update(self, request, *args, **kwargs):
        order_id = kwargs['order_id']
        order = get_object_or_404(self.queryset, pk=order_id)

        serializer = self.serializer_class(
            instance=order, context={'request': request})

        # copy data to a dict & update status
        updatedData = dict(serializer.data)
        updatedData['status'] = request.data.get('status')
        serializer = self.serializer_class(data=updatedData)

        if serializer.is_valid():
            # Make sure order status increments in valid order
            if order.status >= int(request.data.get('status')):
                raise PermissionDenied()
            serializer.update(order, serializer.validated_data)
            return Response(serializer.validated_data, status=status.HTTP_201_CREATED)
        else:
            return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    @action(detail=False, methods=['POST'])
    def create_multiple(self, request, *args, **kwargs):
        # If a unique customer row create new or return existing
        customer, flag = CustomerSerializer.get_or_create(
            self.request.data.get('customer'))

        if customer is None:
            return Response(flag, status=status.HTTP_400_BAD_REQUEST)

        response = {'customer': customer.id, 'orders': []}

        # Create each order for given product for the customer
        for order in request.data.get('orders'):
            product = Product.objects.get(pk=order['product'])
            serializer = self.serializer_class(data=order)

            if serializer.is_valid():
                serializer.save(customer=customer, product=product)
                response['orders'].append(serializer.validated_data)
            else:
                return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(response, status=status.HTTP_201_CREATED)
