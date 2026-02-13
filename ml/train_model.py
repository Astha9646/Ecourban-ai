"""
Simple LSTM training script for forecasting energy consumption.

This script:
- Loads (or creates) an `energy_data.csv` file with columns: `timestamp`, `total_energy`
- Normalizes the `total_energy` column using MinMaxScaler
- Creates sequences of the last 24 time steps
- Trains a small LSTM model using TensorFlow/Keras
- Saves the trained model as `energy_model.h5`
- Saves the fitted scaler as `energy_scaler.pkl`

The implementation is intentionally straightforward and heavily commented
so that students can read and understand each step.
"""

import os
import pickle
from typing import Tuple

import numpy as np
import pandas as pd
from sklearn.preprocessing import MinMaxScaler
from tensorflow.keras import Sequential
from tensorflow.keras.layers import LSTM, Dense
from tensorflow.keras.callbacks import EarlyStopping


# How many past time steps we use to predict the next one
WINDOW_SIZE = 24


def get_project_root() -> str:
    """
    Return the absolute path to the project root directory.

    This file lives in `<project_root>/ml/train_model.py`, so we go two levels up.
    """
    current_file = os.path.abspath(__file__)
    ml_dir = os.path.dirname(current_file)
    project_root = os.path.dirname(ml_dir)
    return project_root


def get_paths() -> Tuple[str, str, str]:
    """
    Return paths for the data CSV, trained model, and scaler.
    """
    root = get_project_root()
    data_path = os.path.join(root, "energy_data.csv")
    model_path = os.path.join(root, "energy_model.h5")
    scaler_path = os.path.join(root, "energy_scaler.pkl")
    return data_path, model_path, scaler_path


def generate_synthetic_energy_data(csv_path: str, num_days: int = 60) -> None:
    """
    Generate a simple synthetic hourly energy consumption dataset
    and save it to `csv_path`.

    The pattern is:
    - Daily sinusoidal pattern (higher during the day, lower at night)
    - Weekly variation (slightly different load on weekends)
    - Random noise
    """
    # We generate hourly data for `num_days` days.
    periods = num_days * 24
    date_index = pd.date_range(start="2023-01-01", periods=periods, freq="H")

    # Base load in arbitrary units
    base_load = 100

    # Daily cycle: repeat every 24 hours
    hours = np.arange(periods)
    daily_cycle = 20 * np.sin(2 * np.pi * hours / 24.0)

    # Weekly cycle: repeat every 7 days
    weekly_cycle = 10 * np.sin(2 * np.pi * hours / (24.0 * 7.0))

    # Random noise
    rng = np.random.default_rng(seed=42)
    noise = rng.normal(loc=0.0, scale=5.0, size=periods)

    total_energy = base_load + daily_cycle + weekly_cycle + noise

    df = pd.DataFrame(
        {
            "timestamp": date_index,
            "total_energy": total_energy,
        }
    )

    df.to_csv(csv_path, index=False)
    print(f"Synthetic dataset created at {csv_path} with {len(df)} rows.")


def load_or_create_dataset(csv_path: str) -> pd.DataFrame:
    """
    Load the energy dataset from `csv_path`.
    If the file does not exist, create a synthetic dataset first.
    """
    if not os.path.exists(csv_path):
        print(f"Data file not found at {csv_path}. Creating synthetic dataset...")
        generate_synthetic_energy_data(csv_path)

    df = pd.read_csv(csv_path, parse_dates=["timestamp"])

    # Ensure the data is sorted by time (important for time-series)
    df = df.sort_values("timestamp").reset_index(drop=True)
    return df


def create_sequences(data: np.ndarray, window_size: int) -> Tuple[np.ndarray, np.ndarray]:
    """
    Convert a 1D time-series array into sequences for supervised learning.

    For example, with window_size=3 and series [x1, x2, x3, x4],
    we create:
    - inputs:  [x1, x2, x3]
      label:   x4
    """
    xs, ys = [], []

    for i in range(len(data) - window_size):
        x = data[i : i + window_size]
        y = data[i + window_size]
        xs.append(x)
        ys.append(y)

    # Convert lists to numpy arrays with shapes:
    # X: (num_samples, window_size, 1)
    # y: (num_samples, 1)
    X = np.array(xs)
    y = np.array(ys)
    return X, y


def build_model(window_size: int) -> Sequential:
    """
    Build a simple LSTM model for next-step prediction.

    The model architecture is intentionally small so it trains quickly.
    """
    model = Sequential()
    # Input shape: (time_steps, num_features) -> here (window_size, 1)
    model.add(LSTM(32, input_shape=(window_size, 1)))
    model.add(Dense(1))  # Predict a single value: the next energy consumption

    model.compile(optimizer="adam", loss="mse")
    return model


def train_and_save_model() -> None:
    """
    Main training workflow:
    1. Load or create the dataset
    2. Normalize the `total_energy` column
    3. Create sequences of length `WINDOW_SIZE`
    4. Train the LSTM model
    5. Save both the model and the scaler
    """
    data_path, model_path, scaler_path = get_paths()

    # 1. Load dataset
    df = load_or_create_dataset(data_path)
    print(f"Loaded dataset with {len(df)} rows.")

    # 2. Normalize the `total_energy` column
    values = df["total_energy"].values.reshape(-1, 1)
    scaler = MinMaxScaler(feature_range=(0.0, 1.0))
    scaled_values = scaler.fit_transform(values)
    print("Data normalized using MinMaxScaler.")

    # 3. Create sequences of length WINDOW_SIZE
    X, y = create_sequences(scaled_values, WINDOW_SIZE)
    print(f"Created {X.shape[0]} sequences of length {WINDOW_SIZE}.")

    # Split into training and validation sets (e.g., 80% train, 20% val)
    split_index = int(0.8 * len(X))
    X_train, X_val = X[:split_index], X[split_index:]
    y_train, y_val = y[:split_index], y[split_index:]

    # 4. Build and train the model
    model = build_model(WINDOW_SIZE)
    model.summary(print_fn=lambda x: print(x))

    early_stopping = EarlyStopping(
        monitor="val_loss",
        patience=3,
        restore_best_weights=True,
    )

    history = model.fit(
        X_train,
        y_train,
        validation_data=(X_val, y_val),
        epochs=15,
        batch_size=32,
        callbacks=[early_stopping],
        verbose=1,
    )

    print("Training finished.")
    print(f"Final training loss: {history.history['loss'][-1]:.4f}")
    if "val_loss" in history.history:
        print(f"Final validation loss: {history.history['val_loss'][-1]:.4f}")

    # 5. Save the model and the scaler
    model.save(model_path)
    print(f"Model saved to {model_path}")

    with open(scaler_path, "wb") as f:
        pickle.dump(scaler, f)
    print(f"Scaler saved to {scaler_path}")


if __name__ == "__main__":
    train_and_save_model()

