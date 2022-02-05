from django.contrib import admin
from .models import UserAccount
from django.contrib.auth.admin import UserAdmin
from .forms import CustomUserCreationForm, CustomUserChangeForm


class UserAccountAdmin(UserAdmin):
    add_form = CustomUserCreationForm
    form = CustomUserChangeForm
    model = UserAccount
    list_display = (
        "name",
        "email",
        "is_staff",
        "is_active",
    )
    list_filter = (
        "name",
        "email",
        "is_staff",
        "is_active",
    )
    fieldsets = (
        (None, {"fields": ("name", "email", "password")}),
        ("Permissions", {"fields": ("is_staff", "is_active")}),
    )
    add_fieldsets = (
        (
            None,
            {
                "classes": ("wide",),
                "fields": (
                    "name",
                    "email",
                    "password1",
                    "password2",
                    "is_staff",
                    "is_active",
                ),
            },
        ),
    )
    search_fields = (
        "name",
        "email",
    )
    ordering = ("name",)


admin.site.register(UserAccount, UserAccountAdmin)
