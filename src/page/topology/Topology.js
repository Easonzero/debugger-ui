import React from "react";
import { useSelector } from "react-redux";
import { selectDescp } from "./TopologySlice";
import Graph from "./VisGraph";

const options = {
    autoResize: true,
    width: '100%',
    height: '100%',
    layout: {
        randomSeed: 0,
        hierarchical: false,
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
    let edges = descp.edges.map(edge=>{return {...edge}}); // workaround for graph-viz
    return <Graph graph={ {nodes: descp.nodes, edges}} style={{height:'100%'}} options={options} />;
};
