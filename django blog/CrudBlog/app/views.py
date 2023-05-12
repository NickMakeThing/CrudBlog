from django.shortcuts import render
from app.models import BlogPost
from rest_framework.generics import ListAPIView, RetrieveAPIView , CreateAPIView, UpdateAPIView, DestroyAPIView 
from .serializers import CreatePostsSerializer, GetListSerializer, GetDetailSerializer, DeleteSerializer

class GetAllBlogPosts(ListAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = GetListSerializer
    # need to add pagination for when too many posts accumulate

class GetBlogPost(RetrieveAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = GetDetailSerializer
    lookup_field = 'title'

class SearchBlogPosts(ListAPIView):
    serializer_class = GetListSerializer
    def get_queryset(self):
        search_term = self.request.GET.get('search')
        if search_term:
            return BlogPost.objects.filter(title__contains = search_term)

class CreatePosts(CreateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = CreatePostsSerializer
    articleId = None
    def perform_create(self, serializer):
        self.articleId = serializer.save().id

    def post(self, request, *args, **kwargs):
        response = self.create(request, *args, **kwargs)
        response.data = self.articleId 
        self.articleId = None
        return response

class EditBlogPosts(UpdateAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = CreatePostsSerializer
    lookup_field = 'id'

class DeleteBlogPost(DestroyAPIView):
    queryset = BlogPost.objects.all()
    serializer_class = DeleteSerializer
    lookup_field = 'id'

# class Home(TemplateView):
#     pass
# do this in urls https://docs.djangoproject.com/en/4.1/topics/class-based-views/
