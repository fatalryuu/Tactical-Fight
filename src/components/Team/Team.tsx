import React from "react";
import s from "./Team.module.css";

type PropsType = {
    color: string,
    units: Array<JSX.Element>
}

const Team: React.FC<PropsType> = ({ color, units }) => {
    return (
        <div style={{border: `2px solid ${color}`}} className={s.wrapper}>
            {units}
        </div>
    );
};

export default Team;