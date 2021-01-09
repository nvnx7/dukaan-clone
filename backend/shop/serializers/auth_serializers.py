from django.conf import settings
from django.dispatch import receiver
from django.db.models.signals import post_save
from django.contrib.auth import authenticate
from rest_framework import serializers
from rest_framework.authtoken.models import Token
from ..models.auth import User


@receiver(post_save, sender=settings.AUTH_USER_MODEL)
def create_auth_token(sender, instance=None, created=False, **kwargs):
    if created:
        Token.objects.create(user=instance)


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'first_name', 'last_name',
                  'phone', 'password', 'date_joined']

        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):
        password = validated_data.pop('password', None)
        instance = self.Meta.model(**validated_data)

        if password is not None:
            instance.set_password(password)
        else:
            raise serializers.ValidationError('Password invalid')

        instance.save()
        return instance

    def update(self, instance, validated_data):
        for attr, value in validated_data.items():
            if attr == 'password':
                instance.set_password(value)
            else:
                setattr(instance, attr, value)

        instance.save()
        return instance

    def get_auth_token(self):
        user = User.objects.get(phone=self.validated_data.get('phone'))
        token, _ = Token.objects.get_or_create(user=user)
        return token.key


class LoginSerializer(serializers.Serializer):
    phone = serializers.CharField(required=True)
    password = serializers.CharField(
        max_length=128, required=True, write_only=True)

    def validate(self, data):
        phone = data.get('phone', None)
        password = data.get('password', None)

        if phone is None:
            raise serializers.ValidationError("Phone is required!")
        if password is None:
            raise serializers.ValidationError("Password is required!")

        user = authenticate(username=phone, password=password)

        if user is None:
            raise serializers.ValidationError(
                "Phone or password is incorrect!")

        if not user.is_active:
            raise serializers.ValidationError("User has been deactivated!")

        return data

    def get_auth_token(self):
        user = User.objects.get(phone=self.validated_data.get('phone'))
        token, _ = Token.objects.get_or_create(user=user)
        return token.key
