import pandas as pd
import requests

# 1. Load the CSV
df = pd.read_csv("energy_data.csv")

# 2. Take the last 24 total_energy values
values = df["total_energy"].tail(24).tolist()

# 3. Call the FastAPI endpoint
url = "http://127.0.0.1:8000/predict-energy"
payload = {"last_24_values": values}

response = requests.post(url, json=payload)
print("Status:", response.status_code)
print("Response:", response.json())