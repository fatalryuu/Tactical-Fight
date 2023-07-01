import React, { useState } from "react";
import "./App.css";
import Battlefield from "./components/Battlefield/Battlefield.tsx";
import RoundInfo from "./components/RoundInfo/RoundInfo.tsx";
import Rules from "./components/Rules/Rules.tsx";
import GameEnd from "./components/GameEnd/GameEnd.tsx";

export type EndType = "cyan" | "orange" | "draw" | "";

const App: React.FC = () => {
    const [notes, setNotes] = useState<Array<JSX.Element>>([]);
    const [hoveredUnit, setHoveredUnit] = useState<number>(-1);
    const [isEnd, setIsEnd] = useState<EndType>("");

    return (
        <div className="app">
            <Battlefield setNotes={setNotes} hoveredUnit={hoveredUnit} setHoveredUnit={setHoveredUnit} setIsEnd={setIsEnd}/>
            <RoundInfo notes={notes} />
            <Rules />
            <GameEnd isEnd={isEnd} setIsEnd={setIsEnd} />
        </div>
    );
};

export default App;
