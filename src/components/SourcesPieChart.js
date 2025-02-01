import React from 'react';
import { Pie } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  Colors
} from 'chart.js';

// Register the required Chart.js components
ChartJS.register(ArcElement, Tooltip, Legend, Colors);

const SourcesPieChart = ({ sourceCounts }) => {
  if (!sourceCounts || Object.keys(sourceCounts).length === 0) {
    return null;
  }

  // Define news outlet categories and their colors
  const newsCategories = {
    conservative: {
      sources: ['Fox News', 'The Wall Street Journal', 'The Washington Times'],
      color: 'rgba(220, 53, 69, 0.8)', // red shade
      borderColor: 'rgba(220, 53, 69, 1)'
    },
    democratic: {
      sources: ['CNN', 'MSNBC', 'The Huffington Post'],
      color: 'rgba(0, 123, 255, 0.8)', // blue shade
      borderColor: 'rgba(0, 123, 255, 1)'
    },
    centrist: {
      sources: ['Reuters', 'Associated Press', 'BBC News'],
      color: 'rgba(40, 167, 69, 0.8)', // green shade
      borderColor: 'rgba(40, 167, 69, 1)'
    }
  };

  // Function to get color for a news source
  const getSourceColor = (source) => {
    for (const category of Object.values(newsCategories)) {
      if (category.sources.some(s => source.toLowerCase().includes(s.toLowerCase()))) {
        return {
          backgroundColor: category.color,
          borderColor: category.borderColor
        };
      }
    }
    return {
      backgroundColor: 'rgba(108, 117, 125, 0.8)', // default gray
      borderColor: 'rgba(108, 117, 125, 1)'
    };
  };

  const labels = Object.keys(sourceCounts);
  const backgroundColors = labels.map(source => getSourceColor(source).backgroundColor);
  const borderColors = labels.map(source => getSourceColor(source).borderColor);

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
        position: 'bottom',
        labels: {
          color: 'black',
          font: {
            size: 12
          }
        }
      },
      title: {
        display: true,
        text: 'News Sources Distribution',
        color: 'black',
        font: {
          size: 16
        }
      }
    }
  };

  return (
    <div className="pie-chart-container">
      <Pie data={data} options={options} />
    </div>
  );
};

export default SourcesPieChart; 