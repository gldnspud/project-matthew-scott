from django.contrib.auth.decorators import login_required
from django.shortcuts import render
from django.views.decorators.csrf import ensure_csrf_cookie
from rest_framework import viewsets

from .models import Item
from .serializers import ItemSerializer


class ItemViewSet(viewsets.ModelViewSet):

    model = Item
    serializer_class = ItemSerializer

    def get_queryset(self):
        qs = super(ItemViewSet, self).get_queryset()
        qs = qs.filter(user=self.request.user)
        return qs

    def pre_save(self, obj):
        # Inject request user into new Item instances.
        super(ItemViewSet, self).pre_save(obj)
        obj.user = self.request.user


@ensure_csrf_cookie
@login_required
def index(request):
    return render(request, 'todo/index.html')
