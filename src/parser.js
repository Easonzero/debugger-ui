export const parse = (content) => {
    let uniq_n = new Set();
    let nodes = [];
    for (const graph of content.graphs) {
        for (const node of graph.nodes) {
            let n = { n: node.name, g: graph.name, r: false };
            if (uniq_n.has(node.name)) {
                n.r = true;
            } else {
                uniq_n.add(node.name);
            }
            nodes.push(n);
        }
    }
    return {
        nodes: nodes.map((n, id)=>{
            return { id, label: n.r ? `${n.n}(${n.g})` : n.n, color: '#fff' };
        }),
        edges: [],
    }
}
