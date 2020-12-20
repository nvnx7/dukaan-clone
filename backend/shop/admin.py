from django.contrib import admin
from .models.shop import *
from .models.product import *
from .models.customer import *

# Register your models here.
admin.site.register(Shop)
admin.site.register(ShopOwner)
admin.site.register(Product)
admin.site.register(ProductCategory)
admin.site.register(Order)
admin.site.register(Customer)
