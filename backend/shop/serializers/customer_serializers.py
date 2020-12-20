from django.db.models import fields
from rest_framework import serializers
from ..models.customer import Customer


class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model = Customer
        fields = '__all__'
