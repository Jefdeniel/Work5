from rest_framework import viewsets
from rest_framework.response import Response
from ..models import Prompt
from ..serializers.prompt_serializer import (
    PromptSerializer,
)

import pathlib
import textwrap

import sys

sys.setrecursionlimit(1500)

import google.generativeai as genai
from IPython.display import display
from IPython.display import Markdown
from rest_framework.decorators import action


class PromptInspirationViewSet(viewsets.ModelViewSet):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer

    def __init__(self, *args, **kwargs):
        # Or use `os.getenv('GOOGLE_API_KEY')` to fetch an environment variable.
        self.GOOGLE_API_KEY = "AIzaSyD4YoS4VbDutvUbnrtugiVzGSJc2KLxUxg"
        genai.configure(api_key=self.GOOGLE_API_KEY)

        self.model = genai.GenerativeModel("gemini-1.5-flash")

        #   "error": "PromptInspirationViewSet.to_markdown() takes 1 positional argument but 2 were given"

    def to_markdown(text):
        text = text.replace("•", "  *")
        return Markdown(textwrap.indent(text, "> ", predicate=lambda _: True))

    @action(detail=False, methods=["get"], url_path="prompt")
    def generate_prompt(self, request):
        print("Prompt viewset called")
        try:
            response = self.model.generate_content(
                "I want to work out more but i work a 9-5 job and i am always tired. Can you help me with some tips?"
            )

            print(f"Prompt response: {response.text}")

            return Response({"message": response.text}, status=200)

        except Exception as e:
            return Response({"error": str(e)}, status=500)
