import React from "react";
import s from "./Team.module.css";
import UnitType from "../../../services/units/Unit.ts";
import Unit from "./Unit/Unit.tsx";

type PropsType = {
    color: string,
    units: Array<UnitType>,
    currTeam: number,
    setCurrTeam: (curr: number) => void,
    queue: Array<UnitType>,
    index: number,
    isActive: boolean,
}

const Team: React.FC<PropsType> = ({ color, units, currTeam, setCurrTeam, queue, index, isActive }) => {
    const thisTeamUnits =
        units.slice(index * 6, index * 6 + 6)
            .map((unit: UnitType, i: number) =>
                <Unit instance={unit} currTeam={currTeam} setCurrTeam={setCurrTeam} queue={queue} team={index}
                      key={i}/>);
    return (
        <div style={{ border: `2px solid ${color}` }} className={`${s.wrapper} ${isActive ? s.active : ""}`}>
            {thisTeamUnits}
        </div>
    );
};

export default Team;