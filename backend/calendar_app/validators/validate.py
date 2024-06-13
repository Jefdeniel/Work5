from rest_framework import serializers


def validate_start_before_end(start_field, end_field, data):
    """
    Check that the start time/date is before the end time/date.
    """
    start_time = data.get(start_field)
    end_time = data.get(end_field)

    if start_time and end_time and start_time >= end_time:
        raise serializers.ValidationError(
            f"{end_field.replace('_', ' ').capitalize()} must be after {start_field.replace('_', ' ').capitalize()}"
        )
    return data
