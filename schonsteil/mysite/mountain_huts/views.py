from .serializers import *
from rest_framework import viewsets
from django.shortcuts import get_object_or_404
from rest_framework import pagination


class CustomPagination(pagination.CursorPagination):
    page_size = 12
    cursor_query_param = 'c'
    ordering = '-created'

class ViewHut(viewsets.ModelViewSet):
    queryset = MountainHut.objects.all()
    serializer_class = HutSerializer
    pagination_class=CustomPagination

    def get_object(self, queryset=None, **kwargs):
        item = self.kwargs.get('pk')
        return get_object_or_404(MountainHut, slug=item)
    