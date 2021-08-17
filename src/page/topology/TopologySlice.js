import { createSlice } from "@reduxjs/toolkit";

export const topologySlice = createSlice({
    name: "topology",
    initialState: {
        descp: {
            nodes: [],
            edges: [],
        },
    },
    reducers: {
        update: (state, descp) => {
            state.descp = descp.payload;
        },
    },
});

export const { update } = topologySlice.actions;

export const selectDescp = (state) => state.topology.descp;

export default topologySlice.reducer;
