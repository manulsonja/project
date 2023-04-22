from .views import *
from rest_framework.routers import DefaultRouter

app_name = 'api'

router = DefaultRouter()
router.register('touren', ViewTouren, basename='tour')
router.register('hochtour', ViewHochtouren, basename='hochtour')
router.register('wandern', ViewWandern, basename='wandern')
router.register('schitour', ViewSkitour, basename='skitour')
router.register('hike and fly', ViewHaF, basename='hikeandflz')
router.register('klettern', ViewKlettertour, basename='hikeandflz')
router.register('test', PictureField , basename='pic')
router.register('huette', ViewHut, basename='huette')
router.register('parking', ViewParking, basename='parking')
router.register('articles', ViewArticles, basename='articles')


####landingpage#####
router.register('newest-tours', LPViewNewestTours, basename='newest_tours')
router.register('current-tours', LPViewCurrentTours, basename='current_tours')
router.register('manual-content', ViewLandingPage, basename='manual-content')


urlpatterns = router.urls

