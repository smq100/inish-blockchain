
from django.contrib import admin
from django.urls import path
from django.conf.urls import url
from blockchain import views
from blockchain.views import *

urlpatterns = [
    path('admin/', admin.site.urls),
    url('^get_chain$', views.get_chain, name="get_chain"),
    url('^mine_block$', views.mine_block, name="mine_block"),
    url('^add_transaction$', views.add_transaction, name="add_transaction"),
    url('^is_valid$', views.is_valid, name="is_valid"),
    url('^connect_node$', views.connect_node, name="connect_node"),
    url('^replace_chain$', views.replace_chain, name="replace_chain"),
]
