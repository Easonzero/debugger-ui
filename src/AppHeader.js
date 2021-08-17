import React from "react";
import { useSelector } from "react-redux";
import styles from "./AppHeader.module.css";
import { Button } from "./component/button/Button";

export const AppHeader = () => {
    const stage = useSelector((state) => state.stage);
    switch (stage) {
        default:
            return (
                <div className={styles.AppHeader}>
                    <div className={styles.AppHeaderSet}>
                        <Button bold children="Launch" />
                        <Button bold children="Attach" />
                    </div>
                    <div className={styles.AppHeaderSet}>
                        <Button bold children="Check" />
                    </div>
                </div>
            );
    }
};
