import React, { useState } from "react";
import Graph from "react-graph-vis";

const options = {
    autoResize: true,
    layout: {
        hierarchical: true,
    },
    edges: {
        color: "#ffffff",
    },
    physics: {
        enabled: false,
    },
};

export const Topology = () => {
    const [state, setState] = useState({
        nodes: [],
        edges: [],
    });

    return <Graph graph={state} options={options} />;
};
