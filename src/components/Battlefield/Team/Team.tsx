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
    iterator: number,
    setIterator: (iterator: number | ((prev: number) => number)) => void,
    index: number,
    isActive: boolean,
}

const Team: React.FC<PropsType> = (props) => {
    const thisTeamUnits =
        props.units.slice(props.index * 6, props.index * 6 + 6)
            .map((unit: UnitType, i: number) =>
                <Unit instance={unit}
                      currTeam={props.currTeam}
                      setCurrTeam={props.setCurrTeam}
                      queue={props.queue}
                      iterator={props.iterator}
                      setIterator={props.setIterator}
                      team={props.index}
                      key={i}
                />);
    return (
        <div style={{ border: `2px solid ${props.color}` }} className={`${s.wrapper} ${props.isActive ? s.active : ""}`}>
            {thisTeamUnits}
        </div>
    );
};

export default Team;