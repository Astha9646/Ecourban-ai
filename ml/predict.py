"""
Prediction utilities for the trained energy consumption model.

This module:
- Loads the trained LSTM model (`energy_model.h5`)
- Loads the fitted MinMaxScaler (`energy_scaler.pkl`)
- Provides a simple `predict_next_energy` function that:
    * takes the last 24 energy values (raw, unscaled)
    * returns the predicted next energy value (also in the original scale)

The goal is to keep this interface very simple so it can easily be
used from a FastAPI endpoint or other scripts.
"""

import os
import pickle
from typing import List, Tuple

import numpy as np
from tensorflow.keras.models import load_model

from .train_model import WINDOW_SIZE, get_paths


def _load_model_and_scaler() -> Tuple[object, object]:
    """
    Load the trained Keras model and the fitted MinMaxScaler.

    Raises:
        FileNotFoundError: if the model or scaler file is missing.
    """
    _, model_path, scaler_path = get_paths()

    if not os.path.exists(model_path) or not os.path.exists(scaler_path):
        raise FileNotFoundError(
            "Trained model or scaler not found. "
            "Please run `python -m ml.train_model` first to train the model."
        )

    # We set compile=False because we only need the model for inference.
    # This avoids Keras trying to deserialize training-only objects
    # (optimizers, metrics, etc.) that may not be available in newer
    # Keras / TensorFlow versions.
    model = load_model(model_path, compile=False)
    with open(scaler_path, "rb") as f:
        scaler = pickle.load(f)

    return model, scaler


def predict_next_energy(last_24_values: List[float]) -> float:
    """
    Predict the next energy consumption value.

    Args:
        last_24_values: A list of exactly 24 recent energy values.
                        These should be in the same units as the
                        `total_energy` column used during training.

    Returns:
        The predicted next energy value (float), in the original scale.

    Raises:
        ValueError: if the input list does not contain exactly 24 values.
        FileNotFoundError: if the model or scaler has not been trained/saved yet.
    """
    if len(last_24_values) != WINDOW_SIZE:
        raise ValueError(f"Expected {WINDOW_SIZE} values, got {len(last_24_values)}.")

    model, scaler = _load_model_and_scaler()

    # Convert the list to a 2D array of shape (24, 1)
    values_array = np.array(last_24_values, dtype=np.float32).reshape(-1, 1)

    # Scale using the same scaler that was fitted during training
    scaled_values = scaler.transform(values_array)

    # The model expects input shape (batch_size, time_steps, num_features)
    model_input = scaled_values.reshape(1, WINDOW_SIZE, 1)

    # Predict the next value (still in scaled space)
    scaled_prediction = model.predict(model_input, verbose=0)

    # Inverse-transform to get back to the original scale
    prediction = scaler.inverse_transform(scaled_prediction.reshape(-1, 1))[0, 0]

    # Convert to plain Python float for easy JSON serialization
    return float(prediction)


if __name__ == "__main__":
    # Small manual test example.
    # In a real setting you would pass actual recent energy values here.
    dummy_values = [100.0] * WINDOW_SIZE
    try:
        next_value = predict_next_energy(dummy_values)
        print(f"Predicted next energy value: {next_value:.2f}")
    except FileNotFoundError as e:
        print(e)

