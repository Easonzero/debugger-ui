import { configureStore } from "@reduxjs/toolkit";
import { BrowserWidthChanged, ChangeDebuggerPage, ChangeMainPage } from './actor';

export const store = configureStore({
    reducer: {
        isSmall: (state = false, action) => {
            switch (action.type) {
                case BrowserWidthChanged:
                    return action.payload.isSmall;
                default:
                    return state;
            }
        },
        main: (state = '', action) => {
            switch (action.type) {
                case ChangeMainPage:
                    return action.payload.page
                default:
                    return state;
            }
        },
        debugger: (state = '', action) => {
            switch (action.type) {
                case ChangeDebuggerPage:
                    return action.payload.page
                default:
                    return state;
            }
        },
    },
});


