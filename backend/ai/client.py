"""AI Client — DeepSeek API (Primary) + Gemini API (Fallback)"""
import os
import google.generativeai as genai
from openai import OpenAI
from ai.prompt_manager import prompt_manager


class AIClient:
    def __init__(self):
        # DeepSeek setup
        api_key = os.environ.get("DEEPSEEK_API_KEY", "")
        base_url = os.environ.get("DEEPSEEK_BASE_URL", "https://api.deepseek.com/v1")
        self.client = OpenAI(
            api_key=api_key,
            base_url=base_url,
            timeout=3.0,
        )
        
        # Gemini setup
        gemini_api_key = os.environ.get("GEMINI_API_KEY", "")
        if gemini_api_key:
            genai.configure(api_key=gemini_api_key)
        self.gemini_model = genai.GenerativeModel('gemini-1.5-flash') if gemini_api_key else None

    def chat(self, user_prompt: str, temperature: float = 0.3, lang: str = "vi") -> str:
        system_prompt = prompt_manager.load("system_prompt", lang=lang)
        
        # 1. Try DeepSeek (Primary)
        try:
            response = self.client.chat.completions.create(
                model="deepseek-chat",
                messages=[
                    {"role": "system", "content": system_prompt},
                    {"role": "user", "content": user_prompt},
                ],
                temperature=temperature,
                max_tokens=800,
            )
            return response.choices[0].message.content
        except Exception as e:
            print(f"DeepSeek failed: {e}. Attempting Gemini fallback...")
            
            # 2. Try Gemini (Fallback)
            if self.gemini_model:
                try:
                    combined_prompt = f"{system_prompt}\n\nUser: {user_prompt}"
                    response = self.gemini_model.generate_content(
                        combined_prompt,
                        generation_config=genai.types.GenerationConfig(
                            temperature=temperature,
                            max_output_tokens=800,
                        )
                    )
                    return response.text
                except Exception as gemini_e:
                    print(f"Gemini fallback failed: {gemini_e}")
                    raise Exception("All AI providers failed") from gemini_e
            else:
                raise Exception("DeepSeek failed and Gemini is not configured") from e


ai_client = AIClient()
