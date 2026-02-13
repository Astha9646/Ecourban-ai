import HourlyEnergyChart from "./HourlyEnergyChart";
import SectorEnergyChart from "./SectorEnergyChart";
import ComparisonPanel from "./ComparisonPanel";
import AllInsightsCard from "./AllInsightsCard.jsx";
import CityAlertsPanel from "./CityAlertsPanel";
import SustainabilityScoreCard from "./SustainabilityScoreCard";
import CityMap from "./CityMap";
import SectorsContent from "./SectorsContent";
import InsightsContent from "./InsightsContent";
import EnergyAISection from "./EnergyAISection";

export default function MainContent({
  activeItem,
  aiOptimizationEnabled,
  onAiOptimizationChange,
}) {
  if (activeItem === "sectors") {
    return <SectorsContent />;
  }

  if (activeItem === "insights") {
    return <InsightsContent />;
  }

  if (activeItem !== "dashboard") {
    return (
      <main className="flex-1 p-8 bg-slate-900 text-slate-300">
        <h2 className="text-2xl font-bold text-white tracking-tight capitalize">
          {activeItem}
        </h2>
        <p className="mt-2 text-slate-400">
          Content for this section will be added later.
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1 p-8 bg-slate-900 overflow-y-auto">
      {/* Header + AI Toggle */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white tracking-tight">
            Dashboard Overview
          </h2>
          <p className="text-slate-400 text-sm mt-1">Real-time energy metrics and AI-driven insights</p>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-sm font-medium text-slate-300">
            AI Optimization
          </span>

          <button
            onClick={() =>
              onAiOptimizationChange(!aiOptimizationEnabled)
            }
            className={`w-12 h-6 rounded-full transition-all duration-300 ease-out ${
              aiOptimizationEnabled
                ? "bg-cyan-500 shadow-[0_0_12px_rgba(34,211,238,0.4)]"
                : "bg-slate-600 hover:bg-slate-500"
            }`}
          >
            <span
              className={`block w-5 h-5 bg-white rounded-full shadow-sm transition-transform duration-300 ease-out ${
                aiOptimizationEnabled
                  ? "translate-x-6"
                  : "translate-x-1"
              }`}
            />
          </button>
        </div>
      </div>

      {/* Charts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6" aria-label="Energy charts">
        <HourlyEnergyChart optimizationEnabled={aiOptimizationEnabled} />
        <SectorEnergyChart optimizationEnabled={aiOptimizationEnabled} />
      </section>

      {/* Comparison + Sustainability */}
      <section
        className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8"
        aria-label="Optimization comparison"
      >
        <ComparisonPanel />
        <SustainabilityScoreCard />
      </section>

      {/* AI Prediction + Insights */}
      <EnergyAISection />

      {/* Map */}
      <section className="mt-8" aria-label="City map">
        <CityMap optimizationEnabled={aiOptimizationEnabled} />
      </section>

      {/* Insights + Alerts */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8" aria-label="Insights and alerts">
        <AllInsightsCard optimizationEnabled={aiOptimizationEnabled} />
        <CityAlertsPanel />
      </section>
    </main>
  );
}
