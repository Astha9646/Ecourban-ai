
🌱 EcoUrban AI — Smart Energy Optimization for Sustainable Cities

An AI-driven smart city platform that analyzes, predicts, and optimizes urban energy consumption across city infrastructures such as street lighting, traffic systems, and HVAC units.

EcoUrban AI transforms traditional static energy systems into intelligent, data-driven infrastructure using machine learning–based forecasting and decision support.

🚀 Problem Statement

Modern cities consume massive amounts of energy daily, yet most urban systems operate on fixed schedules without considering real-time demand. This leads to:

Unnecessary energy wastage

Higher operational costs

Inefficient renewable energy utilization

Increased carbon emissions

Lack of intelligent decision-making

There is a need for an AI-based system that can analyze energy patterns, predict demand, and recommend optimization strategies.

💡 Solution Overview

EcoUrban AI provides an intelligent energy management platform that:

Collects and analyzes city-level energy consumption data

Predicts energy demand using machine learning

Identifies inefficiencies and energy wastage

Recommends optimization strategies

Supports renewable energy integration

Visualizes insights through an interactive dashboard

The system moves from energy monitoring → predictive intelligence → optimization.

🧠 Machine Learning Approach

EcoUrban AI uses a Long Short-Term Memory (LSTM) time-series forecasting model to predict future energy consumption.

Why LSTM?

Urban energy usage depends on temporal patterns such as:

Time of day

Seasonal trends

Traffic patterns

Human activity cycles

LSTM captures long-term dependencies in time-series data, making it suitable for demand forecasting.

ML Pipeline

Data preprocessing and normalization

Time-series sequence generation

LSTM-based prediction

Model serving via FastAPI

Dashboard visualization

🏗️ System Architecture

EcoUrban AI follows a modular pipeline architecture.

Architecture Diagram
Diagram
flowchart TD

A[Urban Energy Data Sources<br>Street Lighting / Traffic / HVAC] --> B[Data Collection & Preprocessing]

B --> C[LSTM Time Series Forecasting Model]

C --> D[FastAPI Prediction Service]

D --> E[Energy Optimization Engine]

E --> F[AI Insights & Recommendations]

F --> G[React Dashboard Visualization]

G --> H[Predicted vs Actual Graph]
G --> I[Energy Saving Estimation]
G --> J[Anomaly Detection Alerts]

✨ Key Features

AI-based energy demand prediction

Real-time energy forecasting

Predicted vs actual energy visualization

Energy optimization recommendations

Renewable energy load shifting support

Energy saving estimation

Anomaly detection alerts

Interactive dashboard interface

🛠️ Tech Stack
Frontend

React.js

Tailwind CSS

Chart.js / Recharts

Backend

FastAPI

Python

Machine Learning

TensorFlow / Keras

Scikit-learn

Pandas

NumPy

Data

Simulated / CSV energy datasets

Tools

GitHub

VS Code / Cursor

📂 Project Structure
Ecourban-ai/
│
├── backend/              # FastAPI backend
├── ml/                   # ML training and prediction scripts
│   ├── train_model.py
│   ├── predict.py
│
├── src/                  # React frontend
├── public/
├── energy_data.csv       # Sample dataset
├── energy_model.h5       # Trained model
├── energy_scaler.pkl
├── requirements.txt
├── package.json
└── README.md

▶️ Installation & Setup
1️⃣ Clone Repository
git clone https://github.com/Astha9646/Ecourban-ai.git
cd Ecourban-ai

2️⃣ Install Backend Dependencies
pip install -r requirements.txt

3️⃣ Install Frontend Dependencies
npm install

4️⃣ Train ML Model (Optional)
python ml/train_model.py

5️⃣ Run Backend Server
uvicorn backend.main:app --reload


Backend runs at:

http://localhost:8000

6️⃣ Run Frontend
npm run dev

📊 Usage

Provide last 24-hour energy values

System predicts next energy demand

Dashboard displays insights and recommendations

API Endpoint:

POST /predict-energy


Response:

{
  "predicted_energy": 650
}

📈 Expected Impact

Reduction in unnecessary urban energy consumption

Lower infrastructure energy costs

Improved renewable energy utilization

Reduced environmental impact

Smarter data-driven city planning

🚀 Future Improvements

Real-time IoT sensor integration

Reinforcement learning-based optimization

Smart grid integration

Cloud deployment

Live municipal data support

Automated infrastructure control

📜 License

This project is developed for academic and research purposes.
