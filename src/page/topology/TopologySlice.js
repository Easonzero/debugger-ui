import { createSlice } from "@reduxjs/toolkit";

export const topologySlice = createSlice({
    name: "topology",
    initialState: {
        descp: {
            nodes: [],
            edges: [],
            key: 0,
        },
    },
    reducers: {
        update: (state, descp) => {
            state.descp = {
                ...descp.payload,
                key: state.descp.key + 1,
            }
        },
    },
});

export const { update } = topologySlice.actions;

export const selectDescp = (state) => state.topology.descp;

export default topologySlice.reducer;
