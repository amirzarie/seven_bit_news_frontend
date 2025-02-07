import React from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
} from "recharts";
import "./LocationChart.css";

const LocationChart = ({ locations, currentTopic }) => {
  if (
    !locations ||
    (!locations.cities?.length && !locations.countries?.length)
  ) {
    return null;
  }

  // Combine cities and countries and sort by frequency
  const allLocations = [
    ...(locations.cities || []).map((loc) => ({ ...loc, type: "City" })),
    ...(locations.countries || []).map((loc) => ({ ...loc, type: "Country" })),
  ]
    .sort((a, b) => b.frequency - a.frequency)
    .slice(0, 10); // Show top 10 locations

  const data = allLocations.map((loc) => ({
    name: `${loc.name} (${loc.type})`,
    mentions: loc.frequency,
  }));

  return (
    <div className="location-chart-container">
      <h3 className="chart-title">
        Location Mentions for "{currentTopic?.toUpperCase()}"
      </h3>
      <div className="chart-wrapper">
        <ResponsiveContainer width="100%" height={400}>
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 5, right: 50, left: 70, bottom: 5 }}
          >
            <XAxis type="number" domain={[0, 'dataMax + 1']} />
            <YAxis
              type="category"
              dataKey="name"
              width={70}
              tick={{ fontSize: 12 }}
              tickFormatter={(value) =>
                value.replace(" (Country)", "").replace(" (City)", "")
              }
            />
            <Tooltip
              formatter={(value, name) => [`${value} mentions`, "Frequency"]}
              labelFormatter={(label) => label}
            />
            <Bar
              dataKey="mentions"
              fill="#000000"
              radius={[0, 4, 4, 0]}
              barSize={20}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default LocationChart;
