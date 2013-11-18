from django.contrib import admin

from .models import Item

class ItemAdmin(admin.ModelAdmin):

    list_display = ('user', 'text', 'priority', 'due_date')


admin.site.register(Item, ItemAdmin)
