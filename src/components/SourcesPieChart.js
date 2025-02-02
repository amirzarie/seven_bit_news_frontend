import React from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors,
} from "chart.js";

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const SourcesPieChart = ({ sourceCounts, currentTopic }) => {
  // Don't render anything if there's no data
  if (!sourceCounts || Object.keys(sourceCounts).length === 0) {
    return null;
  }

  // Define news outlet categories with more distinct color shades
  const newsCategories = {
    conservative: {
      sources: ["Fox News", "The Wall Street Journal", "The Washington Times"],
      colors: [
        { bg: "rgba(220, 53, 69, 0.8)", border: "rgba(220, 53, 69, 1)" }, // bright red
        { bg: "rgba(220, 53, 69, 0.6)", border: "rgba(220, 53, 69, 1)" }, // dark red
        { bg: "rgba(220, 53, 69, 0.4)", border: "rgba(220, 53, 69, 1)" }, // light pink-red
      ],
    },
    democratic: {
      sources: ["CNN", "MSNBC", "The Huffington Post"],
      colors: [
        { bg: "rgba(0, 123, 255, 0.8)", border: "rgba(0, 123, 255, 1)" }, // bright blue
        { bg: "rgba(0, 123, 255, 0.6)", border: "rgba(0, 123, 255, 1)" }, // dark blue
        { bg: "rgba(0, 123, 255, 0.4)", border: "rgba(0, 123, 255, 1)" }, // light sky blue
      ],
    },
    centrist: {
      sources: ["Reuters", "Associated Press", "BBC News"],
      colors: [
        { bg: "rgba(40, 167, 69, 0.8)", border: "rgba(40, 167, 69, 1)" }, // bright green
        { bg: "rgba(40, 167, 69, 0.6)", border: "rgba(40, 167, 69, 1)" }, // dark green
        { bg: "rgba(40, 167, 69, 0.4)", border: "rgba(40, 167, 69, 1)" }, // light green
      ],
    },
  };

  // Function to get color for a news source
  const getSourceColor = (source) => {
    for (const [, data] of Object.entries(newsCategories)) {
      const sourceIndex = data.sources.findIndex((s) =>
        source.toLowerCase().includes(s.toLowerCase())
      );
      if (sourceIndex !== -1) {
        return {
          backgroundColor: data.colors[sourceIndex].bg,
          borderColor: data.colors[sourceIndex].border,
        };
      }
    }
    return {
      backgroundColor: "rgba(108, 117, 125, 0.8)", // default gray
      borderColor: "rgba(108, 117, 125, 1)",
    };
  };

  const labels = Object.keys(sourceCounts);
  const backgroundColors = labels.map(
    (source) => getSourceColor(source).backgroundColor
  );
  const borderColors = labels.map(
    (source) => getSourceColor(source).borderColor
  );

  const data = {
    labels: labels,
    datasets: [
      {
        data: Object.values(sourceCounts),
        backgroundColor: backgroundColors,
        borderColor: borderColors,
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "bottom",
        labels: {
          color: "black",
          font: {
            size: 12,
          },
        },
      },
      title: {
        display: false,
      },
    },
  };

  return (
    <div>
      <h3
        style={{
          marginBottom: "10px",
          marginTop: "0px",
          textAlign: "center",
          color: "#000",
          fontSize: "16px",
        }}
      >
        News Sources for "{currentTopic.toUpperCase()}"
      </h3>
      <div className="pie-chart-container">
        <div className="pie-chart-wrapper">
          <Pie
            data={data}
            options={{
              ...options,
              maintainAspectRatio: true,
              responsive: true,
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default SourcesPieChart;
