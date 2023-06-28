import React, { useEffect, useState } from "react";
import s from "./Battlefield.module.css";
import Team from "./Team/Team.tsx";
import Unit from "./Team/Unit/Unit.tsx";
import UnitType from "../../services/units/Unit.ts";
import generateUnits from "../../services/tools/generateUnits.ts";

const Battlefield: React.FC = () => {
    const [round, setRound] = useState(1);
    const [units, setUnits] = useState<Array<UnitType>>([]);
    const redTeamUnits = units.slice(0, 6).map((unit: UnitType) => <Unit info={unit}/>);
    const greenTeamUnits = units.slice(6, 12).map((unit: UnitType) => <Unit info={unit}/>);

    useEffect(() => {
        setUnits(generateUnits());
    }, []);

    return (
        <div className={s.wrapper}>
            <Team color="red" units={redTeamUnits}/>
            <div className={s.middle}>
                <div className={s.round}>Round {round}</div>
                <div className={s.vs}>VS</div>
                <button className={s.defend} onClick={() => setRound(prev => prev + 1)}>Defend</button>
            </div>
            <Team color="green" units={greenTeamUnits}/>
        </div>
    );
};

export default Battlefield;