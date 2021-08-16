import { createAction } from "@reduxjs/toolkit";

export const BrowserWidthChanged = "BROWSER_WIDTH_CHANGED";
export const browserWidthChanged = createAction(BrowserWidthChanged, (isSmall) => {
    return {
        payload: {
            isSmall,
        },
    };
});

export const ChangeDebuggerPage = "CHANGE_DEBUGGER_PAGE";
export const changeDebuggerPage = createAction(ChangeDebuggerPage, (page) => {
    return {
        payload: {
            page,
        }
    }
})

export const ChangeMainPage = "CHANGE_MAIN_PAGE";
export const changeMainPage = createAction(ChangeMainPage, (page) => {
    return {
        payload: {
            page,
        }
    }
})
