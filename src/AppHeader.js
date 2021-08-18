import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AppHeader.module.css";
import { Button } from "./component/button/Button";
import toml from "toml";
import { save, selectEditorChanged } from "./page/editor/EditorSlice";
import { update as update_err } from "./page/text/TextSlice";
import { parse } from "./parser";
import { update } from "./page/topology/TopologySlice";
import { changeMainPage, restoreDebuggerPage } from "./app/actor";
import { TOPOLOGY, ERROR } from "./types";

export const AppHeader = () => {
    const dispatch = useDispatch();
    const stage = useSelector((state) => state.stage);
    const content = useSelector(selectEditorChanged);
    switch (stage) {
        default:
            return (
                <div className={styles.AppHeader}>
                    <div className={styles.AppHeaderSet}>
                        <Button bold children="Launch" />
                        <Button bold children="Attach" />
                    </div>
                    <div className={styles.AppHeaderSet}>
                        <Button bold children="Check" onClick={ () => {
                            try {
                                dispatch(update(parse(toml.parse(content))));
                                dispatch(changeMainPage(TOPOLOGY));
                                dispatch(save());
                            } catch (e) {
                                console.log(e)
                                if (e.line) {
                                    dispatch(update_err(`ERROR: ${e.message} at lint ${e.line}, column ${e.column}`));
                                } else {
                                    dispatch(update_err(`ERROR: ${e.message}`));
                                }
                                dispatch(restoreDebuggerPage(ERROR));
                            }
                        } } />
                    </div>
                </div>
            );
    }
};
