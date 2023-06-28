import React from "react";
import "./App.css";
import Battlefield from "./components/Battlefield/Battlefield.tsx";
import RoundInfo from "./components/RoundInfo/RoundInfo.tsx";
import Rules from "./components/Rules/Rules.tsx";

const App: React.FC = () => {
    return (
        <div className="app">
            <Battlefield />
            <RoundInfo />
            <Rules />
        </div>
    );
};

export default App;
