import React, { useEffect, useRef } from "react";
import * as d3 from "d3";
import cloud from "d3-cloud";

const WordCloud = ({ wordFrequencies, currentTopic }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    if (!wordFrequencies || Object.keys(wordFrequencies).length === 0) {
      return;
    }

    // Clear previous content
    d3.select(svgRef.current).selectAll("*").remove();

    // Convert data to the format needed by d3-cloud
    const words = Object.entries(wordFrequencies)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 60) // Increased from 40 to 60 words
      .map(([text, value]) => ({
        text,
        size: Math.log(value) * 10 + 10, // Reduced base size for better fit
      }));

    // Set up the word cloud layout
    const layout = cloud()
      .size([600, 300])
      .words(words)
      .padding(1) // Reduced padding further to fit more words
      .rotate(() => 0)
      .font("Impact")
      .fontSize((d) => d.size)
      .spiral("archimedean")
      .on("end", draw);

    // Draw the word cloud
    function draw(words) {
      const svg = d3
        .select(svgRef.current)
        .attr("width", "100%")
        .attr("height", "100%")
        .attr("viewBox", "0 0 600 300")
        .append("g")
        .attr("transform", "translate(300,150)");

      // Color scale - using a more readable color scheme
      const color = d3.scaleOrdinal().range([
        "#1f77b4", // blue
        "#ff7f0e", // orange
        "#2ca02c", // green
        "#d62728", // red
        "#9467bd", // purple
        "#8c564b", // brown
        "#e377c2", // pink
        "#7f7f7f", // gray
        "#bcbd22", // yellow-green
        "#17becf", // cyan
      ]);

      svg
        .selectAll("text")
        .data(words)
        .enter()
        .append("text")
        .style("font-size", (d) => `${d.size}px`)
        .style("font-family", "Impact")
        .style("fill", (d, i) => color(i % 10))
        .attr("text-anchor", "middle")
        .attr("transform", (d) => `translate(${d.x},${d.y})rotate(${d.rotate})`)
        .text((d) => d.text)
        .append("title")
        .text((d) => `Frequency: ${wordFrequencies[d.text]}`);
    }

    layout.start();
  }, [wordFrequencies]);

  if (!wordFrequencies || Object.keys(wordFrequencies).length === 0) {
    return null;
  }

  return (
    <div className="word-cloud-container">
      <h3
        style={{
          marginBottom: "10px",
          marginTop: "0px",
          textAlign: "center",
          color: "#000",
          fontSize: "16px",
        }}
      >
        Trending Words for "{currentTopic.toUpperCase()}"
      </h3>
      <div
        style={{
          height: "250px", // Increased from 200px to 250px
          width: "100%",
        }}
      >
        <svg ref={svgRef} style={{ width: "100%", height: "100%" }}></svg>
      </div>
    </div>
  );
};

export default WordCloud;
