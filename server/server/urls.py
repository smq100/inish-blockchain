
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from blockchain import views
from blockchain.views import *

admin.autodiscover()

urlpatterns = [
    path('admin/', admin.site.urls),
    url('^$', views.server_root, name='server'),
    url('^get_chain$', views.get_chain, name='get_chain'),
    url('^get_pending$', views.get_pending_transactions, name='get_pending_transactions'),
    url('^mine_block$', views.mine_block, name='mine_block'),
    url('^add_transaction$', views.add_transaction, name='add_transaction'),
    url('^is_valid$', views.is_valid, name='is_valid'),
    url('^connect_node$', views.connect_node, name='connect_node'),
    url('^replace_chain$', views.replace_chain, name='replace_chain'),
]
