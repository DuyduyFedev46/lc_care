"""Prompt Manager — Load, validate, render prompt templates"""
from pathlib import Path
from string import Template
from typing import Dict, Any, Set

PROMPT_DIR = Path(__file__).parent / "prompts"


class PromptManager:
    def __init__(self):
        self._cache: Dict[str, str] = {}

    def load(self, name: str, lang: str = "vi") -> str:
        cache_key = f"{lang}:{name}"
        if cache_key not in self._cache:
            if lang != "vi":
                ja_path = PROMPT_DIR / lang / f"{name}.txt"
                if ja_path.exists():
                    self._cache[cache_key] = ja_path.read_text(encoding="utf-8")
                    return self._cache[cache_key]
            path = PROMPT_DIR / f"{name}.txt"
            if not path.exists():
                raise FileNotFoundError(f"Prompt template not found: {name}")
            self._cache[cache_key] = path.read_text(encoding="utf-8")
        return self._cache[cache_key]

    def render(self, name: str, variables: Dict[str, Any], lang: str = "vi") -> str:
        template_str = self.load(name, lang=lang)
        tpl = Template(template_str)
        return tpl.safe_substitute(variables)

    def get_required_vars(self, name: str, lang: str = "vi") -> Set[str]:
        import re
        template_str = self.load(name, lang=lang)
        return {m.group(1) or m.group(2)
                for m in re.finditer(r'\$\{(\w+)\}|\$(\w+)', template_str)
                if m.group(1) or m.group(2)}


prompt_manager = PromptManager()
