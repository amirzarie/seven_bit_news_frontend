import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const SentimentBarChart = ({ articles, currentTopic }) => {
  if (!articles || articles.length === 0) {
    return null;
  }

  // Define colors for political leanings
  const colors = {
    Left: "rgba(13, 110, 253, 0.8)", // Blue
    Center: "rgba(25, 135, 84, 0.8)", // Green
    Right: "rgba(220, 53, 69, 0.8)", // Red
  };

  // Calculate stats for each political leaning
  const leaningStats = articles.reduce((acc, article) => {
    const sourceLower = article.source.toLowerCase();
    let leaning;

    if (
      ["cnn", "msnbc", "huffington post"].some((s) => sourceLower.includes(s))
    ) {
      leaning = "Left";
    } else if (
      ["reuters", "associated press", "bbc"].some((s) =>
        sourceLower.includes(s)
      )
    ) {
      leaning = "Center";
    } else if (
      ["fox news", "wall street journal", "washington times"].some((s) =>
        sourceLower.includes(s)
      )
    ) {
      leaning = "Right";
    } else {
      return acc;
    }

    if (!acc[leaning]) {
      acc[leaning] = {
        polarities: [],
        subjectivities: [],
      };
    }
    acc[leaning].polarities.push(article.sentiment.polarity);
    acc[leaning].subjectivities.push(article.sentiment.subjectivity);
    return acc;
  }, {});

  // Calculate means and standard deviations including overall average
  const stats = ["Left", "Center", "Right"].map((leaning) => {
    // If no articles for this leaning, return zero values
    if (!leaningStats[leaning]) {
      return {
        leaning,
        polarity: { mean: 0, std: 0 },
        subjectivity: { mean: 0, std: 0 },
      };
    }

    const calcStats = (values) => {
      const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
      const variance =
        values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
        values.length;
      return {
        mean: mean,
        std: Math.sqrt(variance),
      };
    };

    return {
      leaning,
      polarity: calcStats(leaningStats[leaning].polarities),
      subjectivity: calcStats(leaningStats[leaning].subjectivities),
    };
  });

  // Calculate overall averages
  const allPolarities = Object.values(leaningStats).flatMap(
    (stat) => stat.polarities
  );
  const allSubjectivities = Object.values(leaningStats).flatMap(
    (stat) => stat.subjectivities
  );

  const overallStats = {
    polarity: {
      mean:
        allPolarities.reduce((sum, val) => sum + val, 0) / allPolarities.length,
      std: Math.sqrt(
        allPolarities.reduce(
          (sum, val) =>
            sum +
            Math.pow(
              val -
                allPolarities.reduce((s, v) => s + v, 0) / allPolarities.length,
              2
            ),
          0
        ) / allPolarities.length
      ),
    },
    subjectivity: {
      mean:
        allSubjectivities.reduce((sum, val) => sum + val, 0) /
        allSubjectivities.length,
      std: Math.sqrt(
        allSubjectivities.reduce(
          (sum, val) =>
            sum +
            Math.pow(
              val -
                allSubjectivities.reduce((s, v) => s + v, 0) /
                  allSubjectivities.length,
              2
            ),
          0
        ) / allSubjectivities.length
      ),
    },
  };

  const baseOptions = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context) => {
            const value = context.raw.toFixed(3);
            const std =
              context.dataset.errorBars.plus[context.dataIndex].toFixed(3);
            return `${value} ± ${std}`;
          },
        },
      },
    },
    scales: {
      x: {
        grid: {
          display: false,
        },
        ticks: {
          font: {
            size: 12,
          },
        },
        barPercentage: 0.98,
        categoryPercentage: 0.95,
      },
    },
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        right: 20,
        left: 20,
        bottom: 10,
      },
    },
  };

  // Update the data objects to include the average bars
  const polarityData = {
    labels: ["Left", "Center", "Right", "Average"],
    datasets: [
      {
        data: [
          ...stats.map((s) => s.polarity.mean),
          overallStats.polarity.mean,
        ],
        backgroundColor: [
          colors.Left,
          colors.Center,
          colors.Right,
          "#ff8c00", // Orange color for average
        ],
        errorBars: {
          plus: [
            ...stats.map((s) => s.polarity.std),
            overallStats.polarity.std,
          ],
          minus: [
            ...stats.map((s) => s.polarity.std),
            overallStats.polarity.std,
          ],
        },
      },
    ],
  };

  const subjectivityData = {
    labels: ["Left", "Center", "Right", "Average"],
    datasets: [
      {
        data: [
          ...stats.map((s) => s.subjectivity.mean),
          overallStats.subjectivity.mean,
        ],
        backgroundColor: [
          colors.Left,
          colors.Center,
          colors.Right,
          "#ff8c00", // Orange color for average
        ],
        errorBars: {
          plus: [
            ...stats.map((s) => s.subjectivity.std),
            overallStats.subjectivity.std,
          ],
          minus: [
            ...stats.map((s) => s.subjectivity.std),
            overallStats.subjectivity.std,
          ],
        },
      },
    ],
  };

  const polarityOptions = {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      title: {
        display: true,
        text: "Polarity (-1 negative to 1 positive)",
        font: { size: 14 },
        color: "#000",
        padding: { bottom: 10 },
      },
    },
    scales: {
      ...baseOptions.scales,
      y: {
        beginAtZero: false,
        min: -1,
        max: 1,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  const subjectivityOptions = {
    ...baseOptions,
    plugins: {
      ...baseOptions.plugins,
      title: {
        display: true,
        text: "Subjectivity (0 objective to 1 subjective)",
        font: { size: 14 },
        color: "#000",
        padding: { bottom: 10 },
      },
    },
    scales: {
      ...baseOptions.scales,
      y: {
        beginAtZero: true,
        max: 1,
        grid: {
          color: "rgba(0, 0, 0, 0.1)",
        },
      },
    },
  };

  return (
    <div>
      <h3
        style={{
          textAlign: "center",
          marginBottom: "10px",
          fontSize: "16px",
          color: "#000",
        }}
      >
        Sentiment Analysis for "{currentTopic?.toUpperCase()}"
      </h3>
      <div style={{ height: "200px", marginBottom: "20px" }}>
        <Bar options={polarityOptions} data={polarityData} />
      </div>
      <div style={{ height: "200px" }}>
        <Bar options={subjectivityOptions} data={subjectivityData} />
      </div>
    </div>
  );
};

export default SentimentBarChart;
