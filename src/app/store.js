import { configureStore, createAction } from "@reduxjs/toolkit";

const BrowserWidthChanged = "BROWSER_WIDTH_CHANGED";
const browserWidthChanged = createAction(BrowserWidthChanged, (isSmall) => {
    return {
        payload: {
            isSmall,
        },
    };
});

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
    },
});

const z = (evt) => store.dispatch(browserWidthChanged(evt.matches));
const maxWidthMediaQuery = window.matchMedia("(max-width: 1600px)");
z(maxWidthMediaQuery);
maxWidthMediaQuery.addListener(z);
