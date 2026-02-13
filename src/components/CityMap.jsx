import { GoogleMap, useJsApiLoader, Marker, Polyline } from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
};

const center = {
  lat: 28.6139, // Delhi
  lng: 77.2090,
};

const routePath = [
  { lat: 28.6139, lng: 77.2090 },
  { lat: 28.6200, lng: 77.2200 },
  { lat: 28.6300, lng: 77.2300 },
];

const hotspots = [
  { lat: 28.6200, lng: 77.2150 },
  { lat: 28.6250, lng: 77.2250 },
];

export default function CityMap({ optimizationEnabled }) {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) {
    return <div className="text-white">Loading Map...</div>;
  }

  return (
    <section
      className={`rounded-xl overflow-hidden border transition-all duration-300 ease-out ${
        optimizationEnabled ? "border-2 border-cyan-500/50 ring-2 ring-cyan-500/20 shadow-[0_0_20px_rgba(34,211,238,0.1)]" : "border-slate-700/80 hover:shadow-lg hover:border-slate-600/80"
      }`}
    >
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={center}
      zoom={12}
    >
      {/* Optimized Route */}
      <Polyline
        path={routePath}
        options={{
          strokeColor: "#22c55e",
          strokeOpacity: 0.9,
          strokeWeight: 4,
        }}
      />

      {/* Energy Hotspots */}
      {hotspots.map((pos, index) => (
        <Marker
          key={index}
          position={pos}
          icon={{
            url: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
          }}
        />
      ))}
    </GoogleMap>
    </section>
  );
}
