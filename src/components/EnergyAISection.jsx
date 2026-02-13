import React, { useEffect, useMemo, useState } from "react";
import EnergyPredictionCard from "./EnergyPredictionCard";
import EnergyGraph from "./EnergyGraph";
import AIInsightsPanel from "./AIInsightsPanel";

// Simple synthetic "last 24 hours" energy series for the dashboard UI.
// In a production system this would come from the backend or a database,
// but here we keep it in the frontend as a teaching example.
const SAMPLE_ENERGY_SERIES = [
  { time: "−23h", value: 420 },
  { time: "−22h", value: 410 },
  { time: "−21h", value: 395 },
  { time: "−20h", value: 380 },
  { time: "−19h", value: 360 },
  { time: "−18h", value: 350 },
  { time: "−17h", value: 340 },
  { time: "−16h", value: 365 },
  { time: "−15h", value: 390 },
  { time: "−14h", value: 430 },
  { time: "−13h", value: 470 },
  { time: "−12h", value: 520 },
  { time: "−11h", value: 560 },
  { time: "−10h", value: 600 },
  { time: "−9h", value: 640 },
  { time: "−8h", value: 690 },
  { time: "−7h", value: 730 },
  { time: "−6h", value: 760 },
  { time: "−5h", value: 720 },
  { time: "−4h", value: 680 },
  { time: "−3h", value: 640 },
  { time: "−2h", value: 600 },
  { time: "−1h", value: 560 },
  { time: "Now", value: 530 },
];

/**
 * Container component that:
 * - prepares the last 24 energy values (dummy data in this demo)
 * - calls the FastAPI backend to get the predicted next value
 * - computes averages, savings, anomaly flags
 * - renders the three child components:
 *   EnergyPredictionCard, EnergyGraph, AIInsightsPanel
 */
export default function EnergyAISection() {
  const [predictedEnergy, setPredictedEnergy] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const actualValues = useMemo(
    () => SAMPLE_ENERGY_SERIES.map((p) => p.value),
    []
  );
  const timeLabels = useMemo(
    () => SAMPLE_ENERGY_SERIES.map((p) => p.time),
    []
  );

  // Fetch prediction on first render.
  useEffect(() => {
    const fetchPrediction = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(
          "http://127.0.0.1:8000/predict-energy",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              last_24_values: actualValues,
            }),
          }
        );

        if (!response.ok) {
          const text = await response.text();
          throw new Error(
            `API error (${response.status}): ${text || "Unknown error"}`
          );
        }

        const data = await response.json();
        // The backend returns { predicted_energy: number }.
        setPredictedEnergy(data.predicted_energy);
      } catch (err) {
        console.error("Failed to fetch prediction", err);
        setError(err.message || "Failed to load prediction");
      } finally {
        setIsLoading(false);
      }
    };

    fetchPrediction();
  }, [actualValues]);

  // Compute simple statistics used by the insights panel.
  const average = useMemo(() => {
    if (!actualValues.length) return null;
    const sum = actualValues.reduce((acc, v) => acc + v, 0);
    return sum / actualValues.length;
  }, [actualValues]);

  const current =
    actualValues.length > 0
      ? actualValues[actualValues.length - 1]
      : null;

  const savingPercent = useMemo(() => {
    if (
      predictedEnergy == null ||
      current == null ||
      current === 0
    ) {
      return null;
    }
    // saving% = (current - predicted) / current * 100
    return ((current - predictedEnergy) / current) * 100;
  }, [predictedEnergy, current]);

  const isAnomaly =
    predictedEnergy != null &&
    average != null &&
    predictedEnergy > average * 1.3;

  // Prepare data for the Recharts line graph:
  // - 24 points for the last 24 hours (actual values)
  // - 1 extra point for the predicted next hour ("Next")
  const graphData = useMemo(() => {
    const base = timeLabels.map((time, index) => ({
      time,
      actual: actualValues[index],
      predicted: null,
    }));

    if (predictedEnergy != null) {
      base.push({
        time: "Next",
        actual: null,
        predicted: predictedEnergy,
      });
    }

    return base;
  }, [timeLabels, actualValues, predictedEnergy]);

  return (
    <section
      className="mt-8"
      aria-label="AI energy prediction and insights"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-xl font-semibold text-white tracking-tight">
          AI Energy Forecasting
        </h3>
        <p className="text-xs text-slate-400">
          Powered by the FastAPI LSTM backend
        </p>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        <EnergyPredictionCard
          isLoading={isLoading}
          error={error}
          predictedEnergy={predictedEnergy}
        />

        <EnergyGraph
          data={graphData}
          isLoading={isLoading}
          error={error}
        />

        <AIInsightsPanel
          isLoading={isLoading}
          error={error}
          predictedEnergy={predictedEnergy}
          average={average}
          current={current}
          savingPercent={savingPercent}
          isAnomaly={isAnomaly}
        />
      </div>
    </section>
  );
}

