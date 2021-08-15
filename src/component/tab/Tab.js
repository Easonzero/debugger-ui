import styles from './Tab.module.css';
import React from 'react';

const Tab = ({ focus, label, onClick }) => {
    return (
        <button
            className={focus ? styles.tabSelected : styles.tab}
            onClick={onClick}
        >
            {label}
        </button>
    );
};

export const TabList = ({ tabs, children=null }) => {
    let tabsLabel = tabs.map((tab) => <Tab {...tab} />);
    return <div className={styles.tabs}>{tabsLabel}{children}</div>;
};
