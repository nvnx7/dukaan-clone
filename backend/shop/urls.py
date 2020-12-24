from django.urls import path
from .views.root_view import api_root
from .views import shop_views
from .views import auth_views

from rest_framework.urlpatterns import format_suffix_patterns
from rest_framework.authtoken.views import obtain_auth_token

shop_detail = shop_views.ShopViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

owner_detail = shop_views.ShopOwnerViewSet.as_view({
    'get': 'retrieve',
    'put': 'update',
    'patch': 'partial_update',
    'delete': 'destroy'
})

shop_list = shop_views.ShopViewSet.as_view({
    'get': 'list',
    'post': 'create'
})

urlpatterns = [
    path('', api_root),

    path('signup/', auth_views.SignUpView.as_view(), name='signup'),
    path('login/', auth_views.LoginView.as_view(), name='login'),
    # path('login/authtoken/', obtain_auth_token, name='owner-login'),
    path('logout/', auth_views.LogoutView.as_view(), name="logout"),
    path('locked/', auth_views.LockedView.as_view(), name='locked'),

    path('shop/<int:pk>/', shop_detail, name='shop-detail'),
    path('shopowner/<int:pk>/', owner_detail, name='owner-detail'),
    path('shopowner/<int:pk>/shops/', shop_list, name='shop-list')
]

urlpatterns = format_suffix_patterns(urlpatterns)
