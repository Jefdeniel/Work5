from rest_framework import viewsets
from rest_framework.response import Response
from pathlib import Path
from ..models import Prompt
from ..serializers.prompt_serializer import (
    PromptSerializer,
)

# from llama_cpp import Llama
# import llama_cpp
from rest_framework.decorators import action

BASE_DIR = Path(__file__).resolve().parent.parent
print(BASE_DIR)

# Preprompt
prePrompt = "blablabla"


class PromptInspirationViewSet(viewsets.ModelViewSet):
    queryset = Prompt.objects.all()
    serializer_class = PromptSerializer

    # Initialize the Llama model path relative to BASE_DIR
    model_relative_path = "LLM/llama-2-7b-chat.ggmlv3.q8_0.bin"
    # model_path = BASE_DIR / model_relative_path

    def __init__(self, *args, **kwargs):
        super().__init__(*args, **kwargs)
        self.model_path = "D:\SCHOOL\Jaar 2\Work5\backend\calendar_app\LLM\llama-2-7b-chat.ggmlv3.q8_0.bin"
        self.prePrompt = prePrompt
        try:
            # Initialize Llama with the model path
            self.llama_model = Llama(
                model_path=str(self.model_path), chat_format="llama-2"
            )
        except Exception as e:
            # Handle initialization errors if necessary
            self.llama_model = None
            print(f"❌ ERROR /// Failed to load Llama model: {str(e)}")

    @action(detail=False, methods=["post"], url_path="prompt")
    def generate_prompt(self, request):
        try:
            # Extract prompt from request data (assuming sent as JSON)
            prompt = request.data.get(prePrompt + "prompt")
            print(f"Received prompt: {prompt}")

            # Validate prompt
            if not prompt or not isinstance(prompt, str):
                return Response({"error": "Invalid prompt provided"}, status=400)

            # Generate response from Llama
            output = self.llama_model(prompt)

            print(f"Llama output: {output}")

            # Extract the generated response from Llama's output
            response_text = output["choices"][0]["text"]

            print(f"Generated response: {response_text}")

            return Response({"message": response_text})

        except Exception as e:
            return Response({"error": str(e)}, status=500)
