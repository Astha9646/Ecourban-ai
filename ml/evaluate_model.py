import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score
from tensorflow.keras.models import load_model
from sklearn.preprocessing import MinMaxScaler

# Load dataset
data = pd.read_csv("energy_data.csv")
energy = data['total_energy'].values.reshape(-1,1)

# Normalize data
scaler = MinMaxScaler()
energy_scaled = scaler.fit_transform(energy)

# Create sequences (last 24 values → predict next)
X, y = [], []
for i in range(24, len(energy_scaled)):
    X.append(energy_scaled[i-24:i])
    y.append(energy_scaled[i])

X, y = np.array(X), np.array(y)

# Load trained model
model = load_model("energy_model.h5", compile=False)


# Make predictions
predictions = model.predict(X)

# Convert back to original values
y_true = scaler.inverse_transform(y)
y_pred = scaler.inverse_transform(predictions)

# Calculate metrics
mae = mean_absolute_error(y_true, y_pred)
rmse = np.sqrt(mean_squared_error(y_true, y_pred))
r2 = r2_score(y_true, y_pred)

print("Mean Absolute Error:", mae)
print("Root Mean Squared Error:", rmse)
print("R2 Score:", r2)

# Plot graph
plt.plot(y_true[:100], label="Actual")
plt.plot(y_pred[:100], label="Predicted")
plt.legend()
plt.title("Predicted vs Actual Energy")
plt.show()
