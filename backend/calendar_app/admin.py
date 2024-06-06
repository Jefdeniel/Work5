from django.contrib import admin
from .models import (
    CustomUser,
    Calendar,
    CalendarUser,
    Event,
    EventOccurrence,
    Notification,
    UserSettings,
    Reminder,
    Category,
)
from django.apps import AppConfig


class CalendarAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "description",
        "img",
        "owner",
        "display_users",
        "display_categories",
        "date_start",
        "date_stop",
    )
    search_fields = ("title", "description")
    list_filter = ("owner", "date_start", "date_stop")
    readonly_fields = ("display_events",)

    def display_events(self, obj):
        return ", ".join([event.title for event in obj.events.all()])

    def display_users(self, obj):
        return ", ".join([user.email for user in obj.users.all()])

    def display_categories(self, obj):
        return ", ".join([category.title for category in obj.categories.all()])

    display_events.short_description = "Events"
    display_users.short_description = "Users"
    display_categories.short_description = "Categories"


class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "description",
        "start_time",
        "end_time",
        "owner",
        "calendar",
        "status",
        "category",
        "priority",
        "location",
        "is_recurring",
        "recurrence_frequency",
        "recurrence_interval",
        "recurrence_end_date",
        "created_at",
        "updated_at",
    )
    search_fields = ("title", "description", "location", "category__title")
    list_filter = (
        "owner",
        "calendar",
        "status",
        "category",
        "priority",
        "is_recurring",
    )
    readonly_fields = ("created_at", "updated_at")


class EventOccurrenceAdmin(admin.ModelAdmin):
    list_display = ("event", "occurrence_time")
    search_fields = ("event__title",)
    list_filter = ("event", "occurrence_time")


class ReminderAdmin(admin.ModelAdmin):
    list_display = ("event", "message", "time", "user", "created_at", "updated_at")
    search_fields = ("event__title", "user__email")
    list_filter = ("event", "user")


class UserAdmin(admin.ModelAdmin):
    list_display = (
        "email",
        "first_name",
        "last_name",
        "birthday",
        "avatar",
        "role",
        "is_active",
        "is_staff",
        "date_joined",
    )
    search_fields = ("email", "first_name", "last_name")
    list_filter = ("is_active", "is_staff", "role")
    readonly_fields = ("last_login", "date_joined")


class CalendarUserAdmin(admin.ModelAdmin):
    list_display = ("user", "calendar", "created_at")
    search_fields = ("user__email", "calendar__title")
    list_filter = ("user", "calendar")


class CategoryAdmin(admin.ModelAdmin):
    list_display = ("title", "color_code", "calendar")
    search_fields = ("title", "color_code")
    list_filter = ("calendar",)


class NotificationAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "user",
        "is_new",
        "date_start",
        "date_stop",
        "created_at",
        "updated_at",
    )
    search_fields = ("title", "user__email")
    list_filter = ("user", "is_new", "date_start", "date_stop")
    readonly_fields = ("created_at", "updated_at")


class UserSettingsAdmin(admin.ModelAdmin):
    list_display = (
        "user",
        "language",
        "time_zone",
        "time_format",
        "theme",
        "event_reminder",
        "activity_notifications",
        "week_start_day",
        "weekend_visibility",
    )
    search_fields = ("user__email", "language", "time_zone")
    list_filter = (
        "language",
        "time_zone",
        "event_reminder",
        "activity_notifications",
        "week_start_day",
        "weekend_visibility",
    )


admin.site.register(CustomUser, UserAdmin)
admin.site.register(Calendar, CalendarAdmin)
admin.site.register(CalendarUser, CalendarUserAdmin)
admin.site.register(Event, EventAdmin)
admin.site.register(EventOccurrence, EventOccurrenceAdmin)
admin.site.register(Reminder, ReminderAdmin)
admin.site.register(UserSettings, UserSettingsAdmin)
admin.site.register(Notification, NotificationAdmin)
admin.site.register(Category, CategoryAdmin)


class CalendarAppConfig(AppConfig):
    name = "calendar_app"
