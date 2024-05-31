from rest_framework import serializers
from ..models import CustomUser


class CustomUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = CustomUser
        fields = "__all__"
        read_only_fields = [
            "date_joined",
            "last_login",
        ]
        extra_kwargs = {
            "password": {"write_only": True},
        }

    def create(self, validated_data):
        user = CustomUser(
            email=validated_data["email"],
        )
        user.set_password(validated_data["password"])
        user.save()
        return user

    def validate_email(self, value):
        if self.instance and self.instance.email == value:
            return value  # Allow the same email if it's the same instance
        if CustomUser.objects.filter(email=value).exists():
            raise serializers.ValidationError("A user with that email already exists.")
        return value

    def update(self, instance, validated_data):
        # Update email if provided
        if "email" in validated_data:
            instance.email = validated_data["email"]

        # Update password if provided
        if "password" in validated_data:
            instance.set_password(validated_data["password"])

        instance.save()
        return instance

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep["full_name"] = instance.get_full_name()
        return rep
