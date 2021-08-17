import { createSlice } from "@reduxjs/toolkit";

export const editorSlice = createSlice({
    name: "editor",
    initialState: {
        init: "",
        changed: "",
    },
    reducers: {
        save: (state) => {
            state.init = state.changed;
        },
        update: (state, changed) => {
            state.changed = changed.payload;
        },
    },
});

export const { save, update } = editorSlice.actions;

export const selectEditorInit = (state) => state.editor.init;
export const selectEditorChanged = (state) => state.editor.changed;

export default editorSlice.reducer;
