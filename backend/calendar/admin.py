from django.contrib import admin

# This is the admin interface that Django provides by default
# Register your models here.

# TODO: switch to postgresql

from .models import Event, Reminder, Calendar


class EventAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "description",
        "start_time",
        "end_time",
        "location",
        "creator",
        "created_at",
        "updated_at",
    )


class ReminderAdmin(admin.ModelAdmin):
    list_display = (
        "event",
        "time",
        "user",
        "created_at",
        "updated_at",
    )


class CalendarAdmin(admin.ModelAdmin):
    list_display = ("name", "owner", "created_at", "updated_at", "display_events")

    def display_events(self, obj):
        return ", ".join([event.title for event in obj.events.all()])

    display_events.short_description = "Events"


admin.site.register(Event, EventAdmin)
admin.site.register(Reminder, ReminderAdmin)
admin.site.register(Calendar, CalendarAdmin)
