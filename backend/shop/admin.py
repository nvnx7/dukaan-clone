from django.contrib import admin
from django.contrib import auth

from .forms import UserCreationForm, UserChangeForm

from .models.shop import *
from .models.product import *
from .models.customer import *
from .models.auth import *


class UserAdmin(auth.admin.UserAdmin):
    add_form = UserCreationForm
    form = UserChangeForm
    model = User

    list_display = ('phone', 'is_staff', 'is_active',)
    list_filter = ('phone', 'is_staff', 'is_active',)

    fieldsets = (
        (None, {'fields': ('phone', 'password')}),
        ('Permissions', {'fields': ('is_staff', 'is_active')}),
    )

    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('phone', 'password1', 'password2', 'is_staff', 'is_active')}
         ),
    )

    search_fields = ('phone',)
    ordering = ('phone',)


# Register your models here.
admin.site.register(User, UserAdmin)

admin.site.register(Shop)
admin.site.register(Product)
admin.site.register(ProductCategory)
admin.site.register(Order)
admin.site.register(Customer)
