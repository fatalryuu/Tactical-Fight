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
    canAttack: Array<number>,
    setNotes: (notes: Array<JSX.Element> | ((prev: Array<JSX.Element>) => Array<JSX.Element>)) => void,
}

const Team: React.FC<PropsType> = (props) => {
    const {
        color,
        units,
        currTeam,
        setCurrTeam,
        queue,
        iterator,
        setIterator,
        index,
        isActive,
        canAttack,
        setNotes,
    } = props

    const thisTeamUnits =
        units.slice(index * 6, index * 6 + 6)
            .map((unit: UnitType, i: number) =>
                <Unit instance={unit}
                      currTeam={currTeam}
                      setCurrTeam={setCurrTeam}
                      queue={queue}
                      iterator={iterator}
                      setIterator={setIterator}
                      canAttack={canAttack}
                      setNotes={setNotes}
                      key={i}
                />);
    return (
        <div style={{ border: `2px solid ${color}` }} className={`${s.wrapper} ${isActive ? s.active : ""}`}>
            {thisTeamUnits}
        </div>
    );
};

export default Team;