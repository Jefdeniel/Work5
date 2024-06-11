from rest_framework import serializers
from ..models.prompt import Prompt


class PromptSerializer(serializers.ModelSerializer):
    class Meta:
        model = Prompt
        fields = ["id", "prompt"]
        read_only_fields = ("id",)
        ref_name = "PromptSerializer"
