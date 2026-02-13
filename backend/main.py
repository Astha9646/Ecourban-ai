"""
Minimal FastAPI backend exposing an energy prediction endpoint.

This file defines:
- a FastAPI app instance
- a `/predict-energy` POST endpoint that:
    * accepts the last 24 energy values
    * uses the ML module in `ml/predict.py` to forecast the next value
    * returns a JSON response: {"predicted_energy": value}

To run this backend locally from the project root (`ecourban ai/`), you can use:

    uvicorn backend.main:app --reload

Make sure you have installed the dependencies from `requirements.txt`
and have trained the model at least once by running:

    python -m ml.train_model
"""

from typing import List

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from ml.predict import predict_next_energy


app = FastAPI(title="Energy Forecasting API")

# Allow the React dev server (running on Vite) to call this API from the browser.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",
        "http://127.0.0.1:5173",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class EnergyRequest(BaseModel):
    """
    Request body schema for /predict-energy.

    The client should send a JSON object like:

    {
      "last_24_values": [100.0, 101.2, ..., 98.7]
    }
    """

    last_24_values: List[float]


@app.get("/")
async def root() -> dict:
    """
    Simple health-check endpoint.
    """
    return {"message": "Energy Forecasting API is running."}


@app.post("/predict-energy")
async def predict_energy(request: EnergyRequest) -> dict:
    """
    Predict the next energy consumption value.

    Steps:
    1. Validate that exactly 24 values were provided.
    2. Call the ML prediction function.
    3. Return the result as JSON.
    """
    values = request.last_24_values

    if len(values) != 24:
        raise HTTPException(
            status_code=400,
            detail="You must provide exactly 24 values in 'last_24_values'.",
        )

    try:
        predicted_value = predict_next_energy(values)
    except ValueError as ve:
        # This should be rare, since we already validate length,
        # but we keep it for extra safety.
        raise HTTPException(status_code=400, detail=str(ve))
    except FileNotFoundError as fnf:
        # Model or scaler not trained yet
        raise HTTPException(status_code=500, detail=str(fnf))
    except Exception as exc:  # catch-all for unexpected errors
        raise HTTPException(status_code=500, detail=f"Prediction failed: {exc}")

    return {"predicted_energy": float(predicted_value)}


# This allows running with `python backend/main.py` for quick testing,
# but in production you should run it with a proper ASGI server like Uvicorn.
if __name__ == "__main__":
    import uvicorn

    uvicorn.run("backend.main:app", host="0.0.0.0", port=8000, reload=True)

