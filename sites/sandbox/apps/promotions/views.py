from django.views.generic import TemplateView, RedirectView
from django.core.urlresolvers import reverse
from django.utils.translation import ugettext_lazy as _

from oscar.core.loading import get_class
import logging

get_product_search_handler_class = get_class(
    'catalogue.search_handlers', 'get_product_search_handler_class')

logger = logging.getLogger(__name__)

class HomeView(TemplateView):
    """
    This is the home page and will typically live at /
    """
    template_name = 'promotions/home.html'
    context_object_name = "products"

    def get(self, request, *args, **kwargs):
        try:
            self.search_handler = self.get_search_handler(
                self.request.GET, request.get_full_path(), [])
        except InvalidPage:
            # Redirect to page one.
            messages.error(request, _('The given page number was invalid.'))
            return redirect('catalogue:index')
        return super(HomeView, self).get(request, *args, **kwargs)

    def get_search_handler(self, *args, **kwargs):
        return get_product_search_handler_class()(*args, **kwargs)

    def get_context_data(self, **kwargs):
        ctx = {}
        ctx['summary'] = _("All products")
        search_context = self.search_handler.get_search_context_data(
            self.context_object_name)

        search_context['products'] = search_context['object_list'][0:2]
        search_context['object_list'] = search_context['object_list'][0:2]
        # logger.info(search_context['object_list'])
        # logger.info(search_context)
        ctx.update(search_context)
        return ctx