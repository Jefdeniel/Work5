import os
import textwrap
import google.generativeai as genai

from rest_framework import viewsets
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework import status
from IPython.display import Markdown
from ..models import Prompt
from ..serializers.prompt_serializer import PromptSerializer


class PromptInspirationViewSet(viewsets.ModelViewSet):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.GOOGLE_API_KEY = os.environ.get("GOOGLE_API_KEY")
        genai.configure(api_key=self.GOOGLE_API_KEY)
        self.model = genai.GenerativeModel("gemini-1.5-flash")

    @staticmethod
    def to_markdown(text):
        text = text.replace("•", "  *")
        return Markdown(textwrap.indent(text, "> ", predicate=lambda _: True))

    @action(detail=False, methods=["post"], url_path="inspiration")
    def generate_prompt(self, request):
        try:
            prompt_text = request.data.get("prompt")
            if not prompt_text:
                return Response(
                    {"error": "Prompt text is required."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            response = self.model.generate_content(prompt_text)
            return Response({"message": response.text}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )
