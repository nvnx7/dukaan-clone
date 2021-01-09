from datetime import date
from django.shortcuts import get_object_or_404
from rest_framework import mixins
from rest_framework import status, viewsets, serializers
from rest_framework.decorators import action
from rest_framework.response import Response

from ..models.customer import Customer, Order
from ..models.product import Product
from ..models.shop import Shop
from ..serializers.customer_serializers import CustomerSerializer, OrderSerializer
from ..serializers.shop_serializers import ShopSerializer
from ..serializers.product_serializers import ProductSerializer
from ..permissions import IsOrderReceiverOrCreateOnly


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

        order_serializer = self.serializer_class(
            instance=order, context={'request': request})

        # copy data to a dict & update status
        updated_order_data = dict(order_serializer.data)
        updated_order_data['status'] = request.data.get('status')
        order_serializer = self.serializer_class(data=updated_order_data)

        if order_serializer.is_valid():
            # Make sure order status increments in valid order
            if order.status >= int(request.data.get('status')):
                raise serializers.ValidationError("Invalid status posted!")

            if updated_order_data['status'] == 4:
                # Update revenue if order delivered
                updated_revenue = order.shop.revenue + \
                    (order.quantity * order.product.price)
                shop_serializer = ShopSerializer(
                    instance=order.shop, data={'revenue': updated_revenue},  partial=True, context={'request': request})

                if shop_serializer.is_valid():
                    shop_serializer.update(
                        instance=order.shop, validated_data=shop_serializer.validated_data)
                else:
                    return Response(shop_serializer.errors,  status=status.HTTP_400_BAD_REQUEST)

                # Update product stock available when order delivered
                updated_stock = order.product.stock - order.quantity
                product_serializer = ProductSerializer(instance=order.product, data={
                                                       'stock': updated_stock},  partial=True, context={'request': request})

                if product_serializer.is_valid():
                    product_serializer.save()
                else:
                    return Response(product_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

            order_serializer.update(order, order_serializer.validated_data)
            return Response(updated_order_data, status=status.HTTP_201_CREATED)
        else:
            return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

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
            order_serializer = OrderSerializer(data=order)
            if order_serializer.is_valid():
                product = get_object_or_404(Product, pk=order['product'])
                shop = get_object_or_404(Shop, pk=kwargs['shop_id'])

                order_serializer.save(
                    customer=customer, product=product, shop=shop)
                response['orders'].append(order_serializer.validated_data)
            else:
                return Response(order_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

        return Response(response, status=status.HTTP_201_CREATED)
