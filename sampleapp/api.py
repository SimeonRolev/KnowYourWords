from rest_framework.response import Response

from .models import Translation
from .serializers import TranslationSerializer
from rest_framework import viewsets, status


class TranslationsViewSet(viewsets.ModelViewSet):
    serializer_class = TranslationSerializer

    def get_queryset(self):
        user = self.request.user
        return Translation.objects.filter(user=user)

    def create(self, request, **kwargs):
        request.data.update({'user': self.request.user.pk})
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        return Response(serializer.data, status=status.HTTP_201_CREATED, headers=headers)
