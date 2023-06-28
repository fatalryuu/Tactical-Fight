import React from "react";
import "./App.css";
import Battlefield from "./components/Battlefield/Battlefield.tsx";

const App: React.FC = () => {
    return (
        <div className="app">
            <Battlefield />
        </div>
    );
};

export default App;
