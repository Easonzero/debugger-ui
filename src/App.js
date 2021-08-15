import React, { useState } from "react";
import "./App.css";
import { ResizableArea } from "./component/resizable_area/ResizableArea";
import { Button } from "./component/button/Button";
import { TabList } from "./component/tab/Tab";

function App() {
    const [area1Focus, setArea1Focus] = useState(0);
    const [area2Focus, setArea2Focus] = useState(-1);
    const [showDebugger, setShowDebugger] = useState(false);
    return (
        <div className="App">
            <div className="AppHeader">
                <Button bold children="Launch" />
                <Button bold children="Attach" />
            </div>
            <ResizableArea focus={showDebugger}>
                <div className="BorderArea"> 
                    <TabList tabs={[
                        { focus: area1Focus==0, label: 'editor', onClick: () => setArea1Focus(0) },
                        { focus: area1Focus==1, label: 'topology', onClick: () => setArea1Focus(1) },
                    ]} />
                </div>
                <div className={showDebugger ? "BorderArea":"Area"}> 
                    <TabList 
                        tabs={[
                            {focus: area2Focus==0, label: 'debugger', onClick: () => {
                                setShowDebugger(true);
                                setArea2Focus(0);
                            }}
                        ]}
                        children={
                            showDebugger && <button className='tabClose' onClick={
                                ()=>{
                                    setShowDebugger(false);
                                    setArea2Focus(-1);
                                }   
                            }>Close</button>
                        }
                    />
                    { showDebugger && <section className="body" /> }
                </div>
            </ResizableArea>
        </div>
    );
}

export default App;
