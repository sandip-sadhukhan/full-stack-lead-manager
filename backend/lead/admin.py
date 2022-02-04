from django.contrib import admin
from .models import Developer, Lead


class DeveloperAdmin(admin.ModelAdmin):
    list_display = ("name", "email", "phone", "user")
    list_display_links = ("name",)

    search_fields = ("name",)


admin.site.register(Developer, DeveloperAdmin)


class LeadAdmin(admin.ModelAdmin):
    list_display = (
        "title",
        "description",
        "user",
    )
    list_display_links = ("title",)

    search_fields = ("user", "title")


admin.site.register(Lead, LeadAdmin)
