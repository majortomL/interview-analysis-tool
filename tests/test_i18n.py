from __future__ import annotations

import ast
import re
from pathlib import Path

STATIC_DIR = Path(__file__).parents[1] / "src" / "interview_analysis" / "static"


def dictionary_keys(block: str) -> set[str]:
    return set(re.findall(r'\b([a-z][a-z0-9_]*):\s*"', block))


def test_german_and_english_dictionaries_are_complete():
    source = (STATIC_DIR / "app.js").read_text(encoding="utf-8")
    german, remainder = source.split("  de: {", 1)[1].split("\n  },\n  en: {", 1)
    english = remainder.split("\n  },\n};", 1)[0]
    german_keys = dictionary_keys(german)
    english_keys = dictionary_keys(english)

    assert german_keys == english_keys

    html = (STATIC_DIR / "index.html").read_text(encoding="utf-8")
    static_keys = set(re.findall(r'data-i18n(?:-placeholder|-aria)?="([a-z0-9_]+)"', html))
    direct_keys = set(re.findall(r'\bt\("([a-z0-9_]+)"', source))
    assert static_keys | direct_keys <= german_keys


def test_literal_server_errors_have_german_translations():
    frontend = (STATIC_DIR / "app.js").read_text(encoding="utf-8")
    error_block = frontend.split("const germanServerErrors = {", 1)[1].split("\n};", 1)[0]
    translated = set(re.findall(r'^\s+"([^"]+)":', error_block, flags=re.MULTILINE))

    package_dir = STATIC_DIR.parent
    literal_errors = set()
    error_types = {"InvalidData", "Conflict", "NotFound", "RuntimeError"}
    for path in package_dir.glob("*.py"):
        for node in ast.walk(ast.parse(path.read_text(encoding="utf-8"))):
            if not isinstance(node, ast.Raise) or not isinstance(node.exc, ast.Call):
                continue
            if not isinstance(node.exc.func, ast.Name) or node.exc.func.id not in error_types:
                continue
            if (
                node.exc.args
                and isinstance(node.exc.args[0], ast.Constant)
                and isinstance(node.exc.args[0].value, str)
            ):
                literal_errors.add(node.exc.args[0].value)

    assert literal_errors <= translated
