from django.contrib import admin
from django.urls import path, include, re_path
from django.views.generic import TemplateView
from app.views import CreatePosts, GetAllBlogPosts, GetBlogPost, SearchBlogPosts, EditBlogPosts, DeleteBlogPost
# from rest_framework import routers

# router = routers.SimpleRouter()
# router.register(r'create',CreatePosts.as_view())

urlpatterns = [
    path('', TemplateView.as_view(template_name="index.html")),
    path('manage', TemplateView.as_view(template_name="index.html")),
    path('getall', GetAllBlogPosts.as_view()),
    path('search', SearchBlogPosts.as_view()),
    path('POST', CreatePosts.as_view()),
    path('PATCH/<int:id>/', EditBlogPosts.as_view()),
    path('DELETE/<int:id>/', DeleteBlogPost.as_view()),
    path('get/<str:title>/', GetBlogPost.as_view()),
    path('blog_post/<str:title>', TemplateView.as_view(template_name="index.html")),
]


