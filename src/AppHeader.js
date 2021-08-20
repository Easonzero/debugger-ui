import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import styles from "./AppHeader.module.css";
import { Button } from "./component/button/Button";
import toml from "toml";
import { save, selectEditorChanged } from "./page/editor/EditorSlice";
import { update as update_err } from "./page/text/TextSlice";
import { parse } from "./parser";
import { update } from "./page/topology/TopologySlice";
import { changeMainPage, restoreDebuggerPage, changeStage } from "./app/actor";
import { TOPOLOGY, ERROR } from "./types";
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

export const AppHeader = () => {
    const dispatch = useDispatch();
    const [form, openForm] = useState(false);
    const [perf, setPerf] = useState(false);
    const stage = useSelector((state) => state.stage);
    const content = useSelector(selectEditorChanged);
    switch (stage) {
        case 'dbg-main':
            return (
                <div className={styles.AppHeader}>
                    <div className={styles.AppHeaderSet}>
                        <Button onClick={()=>{ setPerf(!perf) }}>
                            { perf ? "Stop Perf" : "Start Perf" }
                        </Button>
                    </div>
                </div>
            );
        default:
            return (
                <div className={styles.AppHeader}>
                    <div className={styles.AppHeaderSet}>
                        <Button bold children="Launch" onClick={ () => {
                            openForm(true);
                        } } />
                        <Button bold children="Attach" onClick={ () => {
                            openForm(true);
                        } } />
                    </div>
                    <div className={styles.AppHeaderSet}>
                        <Button children="Check" onClick={ () => {
                            try {
                                dispatch(update(parse(toml.parse(content))));
                                dispatch(changeMainPage(TOPOLOGY));
                                dispatch(save());
                            } catch (e) {
                                if (e.line) {
                                    dispatch(update_err(`ERROR: ${e.message} at lint ${e.line}, column ${e.column}`));
                                } else {
                                    dispatch(update_err(`ERROR: ${e.message}`));
                                }
                                dispatch(restoreDebuggerPage(ERROR));
                            }
                        } } />
                    </div>
                    <Popup open={form} repositionOnResize closeOnDocumentClick={false}>
                        <div className={styles.PopupContent} >
                            <textarea />
                            <Button
                                onClick={() => {
                                    openForm(false);
                                    dispatch(changeStage('dbg-main'));
                                }}>
                                Start
                            </Button>
                        </div>
                    </Popup>
                </div>
            );
    }
};
