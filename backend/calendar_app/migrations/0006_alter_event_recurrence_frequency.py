# Generated by Django 5.0.4 on 2024-05-24 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('calendar_app', '0005_category_eventoccurrence_delete_label_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='event',
            name='recurrence_frequency',
            field=models.CharField(blank=True, choices=[('NONE', 'None'), ('DAILY', 'Daily'), ('WEEKLY', 'Weekly'), ('BIWEEKLY', 'Biweekly'), ('MONTHLY', 'Monthly'), ('QUARTERLY', 'Quarterly'), ('YEARLY', 'Yearly')], max_length=10, null=True),
        ),
    ]