import React from "react";
import { useSelector } from "react-redux";
import styles from "./AppHeader.module.css";
import { Button } from "./component/button/Button";
import toml from "toml";
import { selectEditorChanged } from "./page/editor/EditorSlice";
import { parse } from "./parser";

export const AppHeader = () => {
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
                                parse(toml.parse(content));
                            } catch (e) {
                                // TODO: const { line, column, message } = e
                            }
                        } } />
                    </div>
                </div>
            );
    }
};
