import React, { useState } from "react";
import "./App.css";
import Battlefield from "./components/Battlefield/Battlefield.tsx";
import RoundInfo from "./components/RoundInfo/RoundInfo.tsx";
import Rules from "./components/Rules/Rules.tsx";

const App: React.FC = () => {
    const [notes, setNotes] = useState<Array<JSX.Element>>([]);
    return (
        <div className="app">
            <Battlefield setNotes={setNotes} notes={notes}/>
            <RoundInfo notes={notes}/>
            <Rules />
        </div>
    );
};

export default App;
