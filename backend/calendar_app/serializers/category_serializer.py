from rest_framework import serializers
from ..models import Category, Calendar


class CategorySerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        max_length=50, required=True, help_text="Title of the category"
    )
    color_code = serializers.CharField(
        max_length=7, required=True, help_text="Hex color code of the category"
    )
    calendar = serializers.PrimaryKeyRelatedField(queryset=Calendar.objects.all())

    class Meta:
        model = Category
        fields = "__all__"
        read_only_fields = ("id",)
