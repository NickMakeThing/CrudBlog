from rest_framework.serializers import ModelSerializer
from app import models

class CreatePostsSerializer(ModelSerializer):
    class Meta:
        model = models.BlogPost
        fields = [
            'title','thumbnail','main_image','description','content'
        ]

class GetListSerializer(ModelSerializer):
    class Meta:
        model = models.BlogPost
        fields = ('__all__')

    
class GetDetailSerializer(ModelSerializer):
    class Meta:
        model = models.BlogPost
        fields = ('__all__')

class DeleteSerializer(ModelSerializer):
    class Meta:
        model = models.BlogPost
        fields = ['id']