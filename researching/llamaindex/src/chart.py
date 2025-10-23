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
    system_prompt = (
        "You are an AI data visualization assistant. "
        "Given a user's description, generate clean, professional Python code using matplotlib.pyplot to create an appropriate chart. "
        "Use the color tone: Pastel. "  # Pastel | Bright and Bold | Monochrome | Bright and Experimental
        "Make the chart visually striking yet clear and balanced. "
        "Do not print text or call plt.show(). "
        "Save the figure instead using plt.savefig('chart.png', bbox_inches='tight'). "
        "Return only the raw Python code, without markdown fences or extra commentary."
    )

    response = client.chat.completions.create(
        model="gpt-4o-mini",  # or 'gpt-4-turbo', 'gpt-5'
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": prompt},
        ],
        temperature=0.3,
    )

    code = response.choices[0].message.content
    code = code.replace("```python", "").replace("```", "").strip()
    return code


def execute_chart_code(code: str, output_path: str):
    local_env = {}
    buffer = io.StringIO()
    with contextlib.redirect_stdout(buffer):
        try:
            exec(code, {"plt": plt}, local_env)
            plt.savefig(output_path, bbox_inches="tight")
            plt.close()
        except Exception as e:
            print(f"[Error executing code]: {e}")
    output = buffer.getvalue()
    if output:
        print(output)


if __name__ == "__main__":
    print("=== Prompt → Chart → Image ===")
    user_prompt = input("Enter your chart description: ")

    print("\nGenerating Python code...\n")
    code = generate_chart_code(user_prompt)

    print("=== Generated Code ===")
    print(code)
    print("======================\n")

    filename = f"chart_{datetime.now().strftime('%Y%m%d_%H%M%S')}.png"
    output_path = os.path.join(OUTPUT_DIR, filename)

    print(f"Running code and saving chart to: {output_path}")
    execute_chart_code(code, output_path)
    print(f"\n✅ Chart saved successfully: {output_path}")
