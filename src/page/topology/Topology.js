import React, { useState } from "react";
import Graph from "react-graph-vis";

const options = {
    autoResize: true,
    layout: {
        hierarchical: false
    },
    edges: {
        color: "#ffffff"
    }
}

export const Topology = () => {
    const [state, setState] = useState({
        graph: {
            nodes: [
                { id: 1, label: "Node 1", color: "#ffffff" },
                { id: 2, label: "Node 2", color: "#ffffff" },
                { id: 3, label: "Node 3", color: "#ffffff" },
                { id: 4, label: "Node 4", color: "#ffffff" },
                { id: 5, label: "Node 5", color: "#ffffff" }
            ],
            edges: [
                { from: 1, to: 2 },
                { from: 1, to: 3 },
                { from: 2, to: 4 },
                { from: 2, to: 5 }
            ]
        }
    })

    return (
        <Graph graph={state.graph} options={options} />
    )
}
