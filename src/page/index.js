import React from "react";
import { useSelector } from "react-redux";
import { Empty } from "./empty/Empty";
import { Topology } from "./topology/Topology";
import { Editor } from "./editor/Editor";

export const MainSwitcher = () => {
    const page = useSelector((state) => state.main);
    switch (page) {
        case "topology":
            return <Topology />;
        case "editor":
            return <Editor />;
        default:
            return <Editor />;
    }
};

export const DebuggerSwitcher = () => {
    const page = useSelector((state) => state.debugger);
    switch (page) {
        default:
            return <Empty />;
    }
};
