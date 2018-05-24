from rest_framework import routers
from .api import TranslationsViewSet

router = routers.SimpleRouter()
router.register(r'translations', TranslationsViewSet, base_name='translations')
urlpatterns = router.urls
