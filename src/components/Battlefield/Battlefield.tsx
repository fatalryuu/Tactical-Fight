import React, { useEffect, useState } from "react";
import s from "./Battlefield.module.css";
import Team from "./Team/Team.tsx";
import Unit from "./Team/Unit/Unit.tsx";
import UnitType from "../../services/units/Unit.ts";
import generateUnits from "../../services/tools/generateUnits.ts";

const Battlefield: React.FC = () => {
    const [round, setRound] = useState(1);
    const [units, setUnits] = useState<Array<UnitType>>([]);
    const [currTeam, setCurrTeam] = useState(Math.round(Math.random()));

    const firstTeamUnits =
        units.slice(0, 6)
            .map((unit: UnitType, index: number) =>
                <Unit instance={unit} currTeam={currTeam} setCurrTeam={setCurrTeam} team={0} key={index}/>);
    const secondTeamUnits =
        units.slice(6, 12)
            .map((unit: UnitType, index: number) =>
                <Unit instance={unit} currTeam={currTeam} setCurrTeam={setCurrTeam} team={1} key={index}/>);

    useEffect(() => {
        setUnits(generateUnits());
    }, []);

    return (
        <div className={s.wrapper}>
            <Team color="cyan" units={firstTeamUnits} isActive={!currTeam}/>
            <div className={s.middle}>
                <div className={s.round}>Round {round}</div>
                <div className={s.vs}>VS</div>
                <button className={s.defend} onClick={() => setRound(prev => prev + 1)}>Defend</button>
            </div>
            <Team color="orange" units={secondTeamUnits} isActive={!!currTeam}/>
        </div>
    );
};

export default Battlefield;