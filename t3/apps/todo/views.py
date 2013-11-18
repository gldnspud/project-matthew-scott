from django.contrib.auth.decorators import login_required
from django.shortcuts import render
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


@login_required
def index(request):
    return render(request, 'todo/index.html')
