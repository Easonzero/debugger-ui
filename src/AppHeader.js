import React from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AppHeader.module.css";
import { Button } from "./component/button/Button";
import toml from "toml";
import { selectEditorChanged } from "./page/editor/EditorSlice";
import { parse } from "./parser";
import { update } from "./page/topology/TopologySlice";

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
                            } catch (e) {
                                // TODO: const { line, column, message } = e
                                console.log(e.line, e.column, e.message)
                            }
                        } } />
                    </div>
                </div>
            );
    }
};
