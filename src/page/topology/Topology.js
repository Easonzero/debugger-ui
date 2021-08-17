import React from "react";
import { useSelector } from "react-redux";
import Graph from "react-graph-vis";
import { selectDescp } from "./TopologySlice";

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
    let descp = useSelector(selectDescp);
    return <Graph graph={descp} options={options} />;
};
