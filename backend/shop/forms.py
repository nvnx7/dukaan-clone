from django.contrib.auth import forms
from .models.auth import User


class UserCreationForm(forms.UserCreationForm):
    class Meta(forms.UserCreationForm):
        model = User
        fields = ['phone']


class UserChangeForm(forms.UserChangeForm):
    class Meta:
        model = User
        fields = ['phone']
