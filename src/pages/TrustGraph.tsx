import React, { useEffect, useRef } from 'react';
import * as d3 from 'd3';

export function TrustGraph() {
  const svgRef = useRef<SVGSVGElement>(null);

  useEffect(() => {
    if (!svgRef.current) return;

    const width = 800;
    const height = 500;

    const svg = d3.select(svgRef.current)
      .attr("viewBox", `0 0 ${width} ${height}`)
      .attr("preserveAspectRatio", "xMidYMid meet");

    svg.selectAll("*").remove();

    // Mock data for nodes (entities) and links (trust connections)
    const nodes = [
      { id: "Source_A", group: 1, val: 20 },
      { id: "Reuters_Verify", group: 2, val: 15 },
      { id: "Shield_AI", group: 3, val: 25 },
      { id: "Social_Bot_X", group: 4, val: 10 },
      { id: "Deep_Hub", group: 1, val: 12 },
      { id: "Fact_Check_Central", group: 2, val: 18 },
      { id: "AI_Gen_Node_01", group: 4, val: 8 },
      { id: "Trusted_News_Org", group: 2, val: 22 },
    ];

    const links = [
      { source: "Source_A", target: "Shield_AI", value: 1 },
      { source: "Shield_AI", target: "Reuters_Verify", value: 5 },
      { source: "Shield_AI", target: "Fact_Check_Central", value: 3 },
      { source: "Social_Bot_X", target: "Deep_Hub", value: 1 },
      { source: "Deep_Hub", target: "Shield_AI", value: 1 },
      { source: "AI_Gen_Node_01", target: "Social_Bot_X", value: 1 },
      { source: "Reuters_Verify", target: "Trusted_News_Org", value: 10 },
      { source: "Fact_Check_Central", target: "Trusted_News_Org", value: 5 },
    ];

    const simulation = d3.forceSimulation(nodes as any)
      .force("link", d3.forceLink(links).id((d: any) => d.id).distance(100))
      .force("charge", d3.forceManyBody().strength(-300))
      .force("center", d3.forceCenter(width / 2, height / 2));

    const link = svg.append("g")
      .selectAll("line")
      .data(links)
      .join("line")
      .attr("stroke", "rgba(14, 165, 233, 0.2)")
      .attr("stroke-width", (d: any) => Math.sqrt(d.value) + 1);

    const node = svg.append("g")
      .selectAll("circle")
      .data(nodes)
      .join("circle")
      .attr("r", (d: any) => d.val)
      .attr("fill", (d: any) => {
        if (d.group === 3) return "#0ea5e9"; // Shield AI
        if (d.group === 4) return "#f43f5e"; // Malicious
        if (d.group === 2) return "#22c55e"; // Verified
        return "#64748b";
      })
      .attr("stroke", "#020617")
      .attr("stroke-width", 2)
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended) as any);

    const text = svg.append("g")
      .selectAll("text")
      .data(nodes)
      .join("text")
      .text((d: any) => d.id)
      .attr("font-size", "10px")
      .attr("font-family", "JetBrains Mono")
      .attr("fill", "rgba(255,255,255,0.4)")
      .attr("dx", 15)
      .attr("dy", 4);

    simulation.on("tick", () => {
      link
        .attr("x1", (d: any) => d.source.x)
        .attr("y1", (d: any) => d.source.y)
        .attr("x2", (d: any) => d.target.x)
        .attr("y2", (d: any) => d.target.y);

      node
        .attr("cx", (d: any) => d.x)
        .attr("cy", (d: any) => d.y);

      text
        .attr("x", (d: any) => d.x)
        .attr("y", (d: any) => d.y);
    });

    function dragstarted(event: any) {
      if (!event.active) simulation.alphaTarget(0.3).restart();
      event.subject.fx = event.subject.x;
      event.subject.fy = event.subject.y;
    }

    function dragged(event: any) {
      event.subject.fx = event.x;
      event.subject.fy = event.y;
    }

    function dragended(event: any) {
      if (!event.active) simulation.alphaTarget(0);
      event.subject.fx = null;
      event.subject.fy = null;
    }
  }, []);

  return (
    <div className="h-[calc(100vh-12rem)] flex flex-col gap-6 animate-in fade-in duration-700">
      <div className="flex justify-between items-end border-b border-white/5 pb-6">
        <div>
          <span className="font-mono text-xs text-cyber-lime tracking-widest block mb-1 uppercase">Proprietary Graph Analysis</span>
          <h1 className="text-4xl font-bold tracking-tighter text-white">TRUST TOPOLOGY</h1>
        </div>
      </div>
      
      <div className="flex-1 glass-panel rounded-2xl overflow-hidden relative bg-black/20">
        <div className="absolute inset-0 radar-grid opacity-10 pointer-events-none" />
        <svg ref={svgRef} className="w-full h-full" />
        
        <div className="absolute bottom-6 left-6 flex gap-6">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-cyber-lime" />
            <span className="text-[10px] font-mono text-white/40 uppercase">Verified Sources</span>
          </div>
          <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-red-500" />
             <span className="text-[10px] font-mono text-white/40 uppercase">Threat Vectors</span>
          </div>
        </div>
      </div>
    </div>
  );
}
