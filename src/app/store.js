import { configureStore } from "@reduxjs/toolkit";
import * as actor from "./actor";
import editor from "../page/editor/EditorSlice";

export const store = configureStore({
    reducer: {
        editor,
        isSmall: (state = false, action) => {
            switch (action.type) {
                case actor.BrowserWidthChanged:
                    return action.payload.isSmall;
                default:
                    return state;
            }
        },
        main: (state = "", action) => {
            switch (action.type) {
                case actor.ChangeMainPage:
                    return action.payload.page;
                default:
                    return state;
            }
        },
        debugger: (state = "", action) => {
            switch (action.type) {
                case actor.ChangeDebuggerPage:
                    return action.payload.page;
                default:
                    return state;
            }
        },
        stage: (state = "", action) => {
            switch (action.type) {
                case actor.ChangeStage:
                    return action.payload.stage;
                default:
                    return state;
            }
        },
    },
});
