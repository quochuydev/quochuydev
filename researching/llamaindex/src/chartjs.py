"""
Prompt-to-Chart System (Save Image Version)
Description:
  - User enters a natural-language prompt describing a chart.
  - AI generates matplotlib code.
  - The code runs and saves the chart to a PNG file.
"""

from openai import OpenAI
import matplotlib.pyplot as plt
import io
import contextlib
import os
from datetime import datetime
from dotenv import load_dotenv

load_dotenv()

# ------------------ CONFIG ------------------
client = OpenAI(api_key=os.getenv("OPENAI_API_KEY"))
OUTPUT_DIR = "./charts"
os.makedirs(OUTPUT_DIR, exist_ok=True)
# --------------------------------------------


def generate_chart_code(prompt: str) -> str:
    system_prompt = """
You are an AI that converts a user's natural-language chart request into a Chart.js configuration object (compatible with Chart.js v4+). 
Behavior rules (follow precisely):

1) OUTPUT FORMAT: Return **only** a single JSON object — nothing else. No explanation, no markdown fences, no extra keys. The JSON must be directly parseable.

2) JSON SHAPE: The object must be a valid Chart.js config with keys:
   {
     "type": "<chartType>",                  // "bar" | "line" | "pie" | "doughnut" | "scatter" | "polarArea" | "radar"
     "data": {
       "labels": [ ... ],                    // array of strings
       "datasets": [
         {
           "label": "<series label>",
           "data": [ ... ],                  // numbers (same length as labels)
           "backgroundColor": [ ... ],       // color(s) hex or rgba — array or single string
           "borderColor": [ ... ],           // optional
           "borderWidth": <number>,          // optional
           // optionally other Chart.js dataset props (tension, fill, pointRadius, etc.)
         }
       ]
     },
     "options": { ... }                      // include useful defaults: responsive, plugins.legend, plugins.tooltip
   }

3) COLOR TONE: Use a bright & bold palette. Prefer high-contrast hex colors (e.g. "#EF4444", "#F59E0B", "#10B981", "#3B82F6", "#8B5CF6", "#06B6D4"). If multiple series, pick distinct colors. If single-series bar/line, give one color per label for visual pop.

4) DATA SOURCING:
   - If the user's request includes explicit data (numbers/labels), use it exactly.
   - If the user provides only a description (no explicit data), generate a reasonable synthetic example dataset with 5–12 labels that match the description (e.g., months, categories) and plausible numeric values.
   - Keep labels short (1–3 words) and numbers realistic for context (e.g., percentages 0–100, GDP in billions/trillions use large numbers).

5) CHART TYPE CHOICE:
   - Infer the best chart type from the user's text when not specified.
   - If the user explicitly requests a chart type, use that exact type.

6) OPTIONS:
   - Always include `options` with `responsive: true`.
   - Include `plugins.legend.position` (choose "top" or "right" appropriately).
   - Include `plugins.tooltip.mode` = "index" for multi-series, "nearest" for single-series.
   - For time-series (labels that are ISO dates or month names), include `scales.x.type = "timeseries"` and reasonable `scales.y` tick formatting.

7) VALIDATION:
   - Ensure `data.labels.length === dataset.data.length` for every dataset.
   - Ensure JSON is valid and minimal (no extraneous metadata keys).

8) LENGTH: Keep the JSON concise but complete. No comments. No trailing commas.

If you understand, wait for the user request and return exactly the JSON config object for Chart.js when given a prompt.
"""

    response = client.chat.completions.create(
        model="gpt-4o-mini",  # or 'gpt-4-turbo', 'gpt-5'
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
    )

    result = response.choices[0].message.content
    return result


if __name__ == "__main__":
    print("=== Prompt → Chart → Image ===")
    user_prompt = input("Enter your chart description: ")
    result = generate_chart_code(user_prompt)
    print(result)
