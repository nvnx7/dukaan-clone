from django.urls import path
from .views.root_view import api_root
from rest_framework.urlpatterns import format_suffix_patterns
from .views import shop_views

shop_detail = shop_views.ShopViewSet.as_view({
    'get': 'retrieve'
})

owner_detail = shop_views.ShopOwnerViewSet.as_view({
    'get': 'retrieve'
})

shop_list = shop_views.ShopViewSet.as_view({
    'get': 'list'
})

urlpatterns = [
    path('', api_root),
    path('shop/<int:pk>/', shop_detail, name='shop-detail'),
    path('shopowner/<int:pk>/', owner_detail, name='owner-detail'),
    path('shopowner/<int:pk>/shops/', shop_list, name='shop-list')
]

urlpatterns = format_suffix_patterns(urlpatterns)
