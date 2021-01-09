from django.urls import path
from .views.root_view import index
from .views import auth_views, shop_views, product_views, customer_views

from rest_framework.urlpatterns import format_suffix_patterns

owner_detail = shop_views.ShopOwnerViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

shop_list = shop_views.ShopViewSet.as_view({
    'get': 'list',
    'post': 'create',
})

shop_detail = shop_views.ShopViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

product_list = product_views.ProductViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

product_detail = product_views.ProductViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

order_list = customer_views.OrderViewSet.as_view({
    'get': 'list',
    'post': 'create_multiple'
})

order_detail = customer_views.OrderViewSet.as_view({
    'get': 'retrieve',
    'patch': 'partial_update'
})

urlpatterns = [
    path('', index, name='index'),

    path('signup/', auth_views.SignUpView.as_view(), name='signup'),
    path('login/', auth_views.LoginView.as_view(), name='login'),

    path('logout/', auth_views.LogoutView.as_view(), name="logout"),

    path('shopowner/<int:pk>/', owner_detail, name='owner-detail'),
    path('shopowner/<int:owner_id>/shops/', shop_list, name='shop-list'),

    path('shop/<int:pk>/', shop_detail, name='shop-detail'),
    path('shop/<int:pk>/products/', product_list, name='product-list'),
    path('shop/<int:shop_id>/orders/', order_list, name='order-list'),
    path('shop/<int:shop_id>/orders/<int:order_id>/',
         order_detail, name='order-detail'),
    path('products/<int:pk>/', product_detail, name='product-detail'),
]

urlpatterns = format_suffix_patterns(urlpatterns)
