import React, { useState } from "react";
import { useDispatch } from "react-redux";
import "./App.css";
import { ResizableArea } from "./component/resizable_area/ResizableArea";
import { Button } from "./component/button/Button";
import { TabList } from "./component/tab/Tab";
import { MainSwitcher, DebuggerSwitcher } from "./page";
import { MainTabs } from "./types"
import { changeMainPage } from "./app"

function App() {
    const [mainFocus, setMainFocus] = useState(0);
    const [debuggerFocus, setDebuggerFocus] = useState(-1);
    const [showDebugger, setShowDebugger] = useState(false);
    const dispatch = useDispatch();

    return (
        <div className="App">
            <div className="AppHeader">
                <Button bold children="Launch" />
                <Button bold children="Attach" />
            </div>
            <ResizableArea focus={showDebugger}>
                <div className="BorderArea">
                    <TabList
                        focus={mainFocus}
                        tabs={[
                            {
                                label: MainTabs[0],
                                onClick: () => setMainFocus(0) & dispatch(changeMainPage(MainTabs[0])),
                            },
                            {
                                label: MainTabs[1],
                                onClick: () => setMainFocus(1) & dispatch(changeMainPage(MainTabs[1])),
                            },
                        ]}
                    />
                    <div className="body">
                        <MainSwitcher />
                    </div>
                </div>
                <div className={showDebugger ? "BorderArea" : "Area"}>
                    <TabList
                        focus={debuggerFocus}
                        tabs={[
                            {
                                label: "debugger",
                                onClick: () => 
                                    setShowDebugger(true) & setDebuggerFocus(0)
                                ,
                            },
                        ]}
                        children={
                            showDebugger && (
                                <button
                                    className="tabClose"
                                    onClick={() => 
                                        setShowDebugger(false) & setDebuggerFocus(-1)
                                    }
                                >
                                    Close
                                </button>
                            )
                        }
                    />
                    {showDebugger && (
                        <div className="body">
                            <DebuggerSwitcher />
                        </div>
                    )}
                </div>
            </ResizableArea>
        </div>
    );
}

export default App;
