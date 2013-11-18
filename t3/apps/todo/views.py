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
