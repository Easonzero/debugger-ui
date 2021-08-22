import { createSlice } from "@reduxjs/toolkit";

export const topologySlice = createSlice({
    name: "topology",
    initialState: {
        descp: {
            nodes: [],
            edges: [],
        },
        listen: false,
    },
    reducers: {
        update: (state, descp) => {
            state.descp = {
                nodes: descp.payload.nodes || [],
                edges: descp.payload.edges || [],
            };
        },
        setBlock: (state, ids) => {
            for (let node of state.descp.nodes) {
                if (node.id in ids.payload) {
                    node.color = '#ff0000';
                    node.font = { color: "#fff" };
                } else if (node.title) {
                    node.color = '#fff';
                    node.font = {};
                }
            }
        },
        listen: (state, listen) => {
            state.listen = listen.payload;
        }
    },
});

export const { update, setBlock, listen } = topologySlice.actions;

export const selectDescp = (state) => state.topology.descp;
export const selectListen = (state) => state.topology.listen;

export default topologySlice.reducer;
