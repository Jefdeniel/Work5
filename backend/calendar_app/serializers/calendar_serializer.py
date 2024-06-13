from rest_framework import serializers
from ..models import Calendar, CalendarUser, TimeBlock, CalendarPermissions, CustomUser
from .category_serializer import CategorySerializer
from .timeblock_serializer import TimeBlockSerializer
from .custom_user_serializer import CustomUserSerializer
from ..validators import validate_start_before_end


class CalendarSerializer(serializers.ModelSerializer):
    title = serializers.CharField(
        max_length=255, required=True, help_text="Title of the calendar"
    )
    description = serializers.CharField(
        max_length=255,
        required=False,
        allow_blank=True,
        help_text="Description of the calendar",
    )
    img = serializers.ImageField(
        required=False,
        help_text="Image associated with the calendar (binary)",
    )
    owner_id = serializers.IntegerField(
        required=True, help_text="ID of the user who owns the calendar"
    )
    date_start = serializers.DateTimeField(
        allow_null=True,
        required=False,
        help_text="Start date of the calendar (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )
    date_stop = serializers.DateTimeField(
        allow_null=True,
        required=False,
        help_text="End date of the calendar (format: YYYY-MM-DDTHH:MM:SS.sssZ)",
    )

    categories = CategorySerializer(many=True, read_only=True)
    timeblocks = TimeBlockSerializer(many=True, read_only=True)
    users = serializers.SerializerMethodField()

    created_at = serializers.DateTimeField(
        read_only=True, help_text="Timestamp when the calendar was created"
    )
    updated_at = serializers.DateTimeField(
        read_only=True, help_text="Timestamp when the calendar was last updated"
    )

    class Meta:
        model = Calendar
        fields = (
            "id",
            "title",
            "description",
            "img",
            "owner_id",
            "users",
            "date_start",
            "date_stop",
            "categories",
            "timeblocks",
            "created_at",
            "updated_at",
        )
        read_only_fields = (
            "id",
            "created_at",
            "updated_at",
        )

    def get_users(self, obj):
        users = obj.users.exclude(id=obj.owner_id)
        return CustomUserSerializer(
            users, many=True, context={"calendar_id": obj.id}
        ).data

    def validate(self, data):
        return validate_start_before_end("start_time", "end_time", data)


class CalendarPermissionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = CalendarPermissions
        fields = [
            "can_view_event_details",
            "can_create_events",
            "can_edit_events",
            "can_delete_events",
            "can_invite_others",
        ]


class CustomUserSerializer(serializers.ModelSerializer):
    permissions = serializers.SerializerMethodField()

    class Meta:
        model = CustomUser
        fields = ["id", "first_name", "last_name", "email", "permissions"]

    def get_permissions(self, obj):
        calendar_id = self.context.get("calendar_id")
        permissions = CalendarPermissions.objects.filter(
            user=obj, calendar_id=calendar_id
        ).first()
        return CalendarPermissionsSerializer(permissions).data if permissions else None


class CalendarUserSerializer(serializers.ModelSerializer):
    calendar = CalendarSerializer(read_only=True)

    class Meta:
        model = CalendarUser
        fields = ["id", "user", "calendar", "role", "created_at"]
        read_only_fields = ["id", "created_at"]


class TimeBlockSerializer(serializers.ModelSerializer):
    calendar = serializers.PrimaryKeyRelatedField(queryset=Calendar.objects.all())

    class Meta:
        model = TimeBlock
        fields = ["id", "calendar", "start_time", "end_time"]
        read_only_fields = ["id"]
