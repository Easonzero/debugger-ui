import React from "react";
import styles from "./Button.module.css";

export const Button = ({ bold, icon, rightIcon, children }) => {
    const c = [styles.container];

    if (bold) {
        c.push(styles.bold);
    }
    if (icon) {
        c.push(styles.hasLeftIcon);
    }
    if (rightIcon) {
        c.push(styles.hasRightIcon);
    }

    return (
        <button className={styles.button}>
            <div className={c.join(" ")}>
                {icon && <div className={styles.leftIcon}>{icon}</div>}
                {children}
                {rightIcon && (
                    <div className={styles.rightIcon}>{rightIcon}</div>
                )}
            </div>
        </button>
    );
};
