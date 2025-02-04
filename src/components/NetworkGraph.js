import React, { useRef, useEffect, useState } from "react";
import ForceGraph2D from "react-force-graph-2d";
import "./NetworkGraph.css";

const NetworkGraph = ({ networkData, currentTopic }) => {
  const containerRef = useRef(null);
  const fgRef = useRef(null);
  const [dimensions, setDimensions] = useState({ width: 600, height: 400 });

  useEffect(() => {
    if (containerRef.current) {
      const resizeObserver = new ResizeObserver((entries) => {
        for (let entry of entries) {
          const { width, height } = entry.contentRect;
          setDimensions({
            width: width - 30,
            height: Math.min(600, Math.max(400, height - 60)),
          });
        }
      });

      resizeObserver.observe(containerRef.current);
      return () => resizeObserver.disconnect();
    }
  }, []);

  // Stop the simulation and center the graph after initial layout
  useEffect(() => {
    if (fgRef.current) {
      // Let it cool down for a bit to get a good initial layout
      setTimeout(() => {
        // Stronger centering force for better positioning
        fgRef.current.d3Force("charge").strength(-200);
        fgRef.current.d3Force("link").distance(100);
        fgRef.current.d3Force("center").strength(1);
        fgRef.current._cooldownTicks = 0;

        // Center the graph
        fgRef.current.zoomToFit(400, 50);
      }, 2000);
    }
  }, []);

  if (!networkData || !networkData.nodes || networkData.nodes.length === 0) {
    return null;
  }

  const getLinkColor = () => {
    return "rgba(0, 0, 0, 0.15)"; // Constant transparency for all edges
  };

  const getLinkWidth = (link) => {
    return Math.sqrt(link.value) * 2;
  };

  // Process the data to ensure proper format
  const graphData = {
    nodes: networkData.nodes.map((node) => ({
      ...node,
      id: node.id || node.label,
      label: node.label || node.id,
    })),
    links: networkData.edges.map((edge) => ({
      source: edge.source,
      target: edge.target,
      value: edge.value || edge.weight || 1,
    })),
  };

  return (
    <div className="network-graph-container" ref={containerRef}>
      <div className="graph-header">
        <h3 className="graph-title">
          Entity Network Graph for "{currentTopic?.toUpperCase()}"
          <div className="info-tooltip">
            <span className="info-icon">i</span>
            <div className="tooltip-content">
              <p>
                • Entities shown are people, organizations, locations, products,
                or events
              </p>
              <p>• Text size indicates frequency of mentions</p>
              <p>• Edge thickness indicates strength of relationship</p>
              <p>• Use mouse wheel to zoom in/out of the graph</p>
            </div>
          </div>
        </h3>
      </div>
      <div className="graph-wrapper">
        <ForceGraph2D
          ref={fgRef}
          graphData={graphData}
          nodeLabel={null} // Disable hover tooltip
          nodeRelSize={6}
          linkWidth={getLinkWidth}
          linkColor={getLinkColor}
          width={dimensions.width}
          height={dimensions.height}
          d3VelocityDecay={0.9}
          cooldownTime={2000}
          cooldownTicks={100}
          backgroundColor="#ffffff"
          enableNodeDrag={false} // Disable node dragging
          enableZoomPanInteraction={true}
          minZoom={0.5} // Limit minimum zoom out
          maxZoom={4} // Limit maximum zoom in
          zoomToFit={400} // Initial zoom to fit with padding
          // Add back the particle effects
          linkDirectionalParticles={2} // Number of particles per edge
          linkDirectionalParticleWidth={2} // Size of particles
          linkDirectionalParticleSpeed={0.005} // Speed of particles
          linkDirectionalParticleColor={() => "rgba(0, 0, 0, 0.2)"} // Particle color
          nodeCanvasObject={(node, ctx, globalScale) => {
            const label = node.label;
            const baseFontSize = 12;
            const maxFreq = Math.max(
              ...networkData.nodes.map((n) => n.frequency)
            );
            const fontScale = 1 + (node.frequency / maxFreq) * 0.5;
            const fontSize = (baseFontSize * fontScale) / globalScale;

            ctx.font = `${fontSize}px Inter, sans-serif`;
            const textWidth = ctx.measureText(label).width;
            const padding = fontSize * 0.2;
            const bckgDimensions = [
              textWidth + padding * 2,
              fontSize + padding * 2,
            ];
            const cornerRadius = 2; // Reduced from 4 to 2 for less rounded corners

            // Draw rounded rectangle background
            ctx.fillStyle = "#ff9040";
            ctx.beginPath();
            ctx.roundRect(
              node.x - bckgDimensions[0] / 2,
              node.y - bckgDimensions[1] / 2,
              bckgDimensions[0],
              bckgDimensions[1],
              cornerRadius
            );
            ctx.fill();

            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillStyle = "white";
            ctx.fillText(label, node.x, node.y);
          }}
        />
      </div>
    </div>
  );
};

export default NetworkGraph;
