```sh
python3 -m venv ./venv

pyenv install 3.11.9

pyenv local 3.11.9

./venv/bin/pip install --upgrade pip

./venv/bin/pip install dotenv llama-index pydantic tavily-python gradio

./venv/bin/pip freeze > requirements.txt

./venv/bin/pip install -r requirements.txt

./venv/bin/pip install "urllib3<2"

./venv/bin/pip install "mcp[cli]"

./venv/bin/pip install fastmcp

./venv/bin/mcp run ./src/mcp.py

./venv/bin/python3 ./src/workflow.py

./venv/bin/python3 ./src/chart.py
```

echo "Top 10 GDP countries in the world" | ./venv/bin/python3 ./src/chart.py
