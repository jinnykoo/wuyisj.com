from django.conf.urls import url

from oscar.core.application import Application
from oscar.core.loading import get_class
from oscar.apps.promotions.models import PagePromotion, KeywordPromotion


class PromotionsApplication(Application):
    name = 'promotions'

    home_view = get_class('promotions.views', 'HomeView')

    def get_urls(self):
        urls = [
            url(r'^$', self.home_view.as_view(), name='home'),
        ]
        return self.post_process_urls(urls)


application = PromotionsApplication()
