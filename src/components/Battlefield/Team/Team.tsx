import React from "react";
import s from "./Team.module.css";


type PropsType = {
    color: string,
    units: Array<JSX.Element>,
    isActive: boolean,
}

const Team: React.FC<PropsType> = ({ color, units, isActive }) => {
    return (
        <div style={{border: `2px solid ${color}`}} className={`${s.wrapper} ${isActive ? s.active : ""}`}>
            {units}
        </div>
    );
};

export default Team;