function list2map(list) {
    if (list) {
        return Object.fromEntries(list.map(e => [e.name, e]))
    } else {
        return {}
    }
}

function isGraph(config, name) {
    return config.graphs.hasOwnProperty(name)
}

function isInput(graph, name) {
    return graph.inputs.hasOwnProperty(name)
}

function isOutput(graph, name) {
    return graph.outputs.hasOwnProperty(name)
}



function parseGraph(config, graph) {
    let nodes = {};
    let edges = [];
    let inputs = {};
    let outputs = {};
    
    let subgraphs = {};
    let dots = [];

    for (const name in graph.nodes) {
        let node = graph.nodes[name];
        if (isGraph(config, node.ty)) {
            subgraphs[name] = parseGraph(config, config.graphs[node.ty]);
        } else {
            nodes[name] = { id: config.counter, label: name, color: '#fff', title: graph.name };
            config.counter += 1;
        }
    }

    for (const conn of graph.connections) {
        let related = { rx: [], tx: [], unknown: [] };
        for (const port of conn.ports) {
            let port_split = port.split(':');
            let node_name = port_split[0];
            let node_port = port_split[1];
            if (nodes.hasOwnProperty(node_name)) {
                related.unknown.push(nodes[node_name].id);
            } else if (subgraphs.hasOwnProperty(node_name)) {
                const subgraph = subgraphs[node_name];
                if (isInput(subgraph, node_port)) {
                    for (const id of subgraph.inputs[node_port]) {
                        related.rx.push(id)
                    }
                } else if (isOutput(subgraph, node_port)) {
                    for (const id of subgraph.outputs[node_port]) {
                        related.tx.push(id)
                    }
                } else {
                    throw new Error( `port[${node_port}] is not found in graph[${graph.nodes[node_name].ty}]` )
                }
            } else if (config.g_nodes.hasOwnProperty(node_name)) {
                related.unknown.push(config.g_nodes[node_name].id);
            } else if (config.g_graphs.hasOwnProperty(node_name)) {
                const subgraph = config.g_graphs[node_name];
                if (isInput(subgraph, node_port)) {
                    for (const id of subgraph.inputs[node_port]) {
                        related.rx.push(id)
                    }
                } else if (isOutput(subgraph, node_port)) {
                    for (const id of subgraph.outputs[node_port]) {
                        related.tx.push(id)
                    }
                } else {
                    throw new Error( `port[${node_port}] is not found in graph[${graph.nodes[node_name].ty}]` )
                }
            } else {
                throw new Error( `node[${node_name}] is not found in config` )
            }
        }
        if(related.rx.length + related.tx.length + related.unknown.length > 2) {
            let dot = config.counter;
            dots.push(dot);
            config.counter += 1;
            for (const rx of related.rx) {
                edges.push({from:dot, to:rx, arrows: 'to'})
            }
            for (const tx of related.tx) {
                edges.push({from:tx, to:dot, arrows: 'to'})
            }
            for (const unknown of related.unknown) {
                edges.push({from:unknown, to:dot, arrows: ''})
            }
        } else {
            let from = -1, to = -1, offset = 0;
            if (related.tx.length === 1) {
                from = related.tx[0];
            }
            if (related.rx.length === 1) {
                to = related.rx[0];
            }
            if (from === -1) {
                from = related.unknown[offset];
                offset += 1;
            }
            if (to === -1) {
                to = related.unknown[offset];
                offset += 1;
            }
            edges.push({ from, to, arrows: offset===2?'':'to' })
        }
    }

    for (const name in graph.inputs) {
        const input = graph.inputs[name];
        let ids = [];
        for (const port of input.ports) {
            let port_split = port.split(':');
            let node_name = port_split[0];
            if (nodes.hasOwnProperty(node_name)) {
                ids.push(nodes[node_name].id)
            } else if (subgraphs.hasOwnProperty(node_name)) {
                for (const id of subgraphs[node_name].inputs) {
                    ids.push(id)
                }
            } else if (config.g_nodes.hasOwnProperty(node_name)) {
                ids.push(config.g_nodes[node_name].id)
            } else if (config.g_graphs.hasOwnProperty(node_name)) {
                const subgraph = config.g_graphs[node_name];
                for (const id of subgraph[node_name].inputs) {
                    ids.push(id)
                }
            } else {
                throw new Error( `node[${node_name}] is not found in config` )
            }
        }
        inputs[name] = ids; 
    }

    for (const name in graph.outputs) {
        const output = graph.outputs[name];
        let ids = [];
        for (const port of output.ports) {
            let port_split = port.split(':');
            let node_name = port_split[0];
            if (nodes.hasOwnProperty(node_name)) {
                ids.push(nodes[node_name].id)
            } else if (subgraphs.hasOwnProperty(node_name)) {
                for (const id of subgraphs[node_name].outputs) {
                    ids.push(id)
                }
            } else if (config.g_nodes.hasOwnProperty(node_name)) {
                ids.push(config.g_nodes[node_name].id)
            } else if (config.g_graphs.hasOwnProperty(node_name)) {
                const subgraph = config.g_graphs[node_name];
                for (const id of subgraph[node_name].outptus) {
                    ids.push(id)
                }
            } else {
                throw new Error( `node[${node_name}] is not found in config` )
            }
        }
        outputs[name] = ids; 
    }

    return {
        nodes: Object.values(nodes).concat(dots.map(id=>{
            return { id, label: null, color:'#000', shape:'dot', size:1 }
        })).concat(Object.values(subgraphs).reduce((cal, g) => cal.concat(g.nodes), [])), 
        edges: edges.concat(Object.values(subgraphs).reduce((cal, g) => cal.concat(g.edges), [])), 
        inputs, 
        outputs
    }
}

function translateGraph(graph) {
    return {
        name: graph.name,
        nodes: list2map(graph.nodes) || {},
        inputs: list2map(graph.inputs) || {},
        outputs: list2map(graph.outputs) || {},
        connections: graph.connections || [],
    }
}

function translateConfig(config) {
    return { 
        main: config.main,
        nodes: list2map(config.nodes) || {},
        graphs: list2map(config.graphs.map(graph=>translateGraph(graph))) || {},
        counter: 1,
    }
}

export const parse = (config) => {
    let config_translated = translateConfig(config);
    let main = config.main;
    config_translated.g_nodes = {};
    config_translated.g_graphs = {};

    for (const name in config_translated.nodes) {
        let node = config_translated.nodes[name];
        if (isGraph(config_translated, node.ty)) {
            config_translated.g_graphs[name] = parseGraph(config_translated, config_translated.graphs[node.ty]);
        } else {
            config_translated.g_nodes[name] = { id: config_translated.counter, label: name, color: '#fff', title: '__GLOBAL__' };
            config_translated.counter += 1;
        }
    }

    let parsed = parseGraph(config_translated, config_translated.graphs[main]);

    for (const name in parsed.inputs) {
        let id = config_translated.counter;
        parsed.nodes.push( { id, label: name, color: '#000', font: { color: '#fff' } } );
        config_translated.counter += 1;
        for (const to of parsed.inputs[name]) {
            parsed.edges.push({ from: id, to, arrows: 'to' });
        }
    }

    for (const name in parsed.outputs) {
        let id = config_translated.counter;
        parsed.nodes.push( { id, label: name, color: '#000', font: { color: '#fff' } } );
        config_translated.counter += 1;
        for (const from of parsed.outputs[name]) {
            parsed.edges.push({ from, to: id, arrows: 'to' });
        }
    }
    return {
        nodes: parsed.nodes.concat(Object.values(config_translated.g_nodes)),
        edges: parsed.edges,
    }
}
