import React from "react";
import s from "./Queue.module.css";
import UnitType from "../../../services/units/Unit.ts";

type PropsType = {
    queue: Array<UnitType>,
    colors: Array<string>,
}

const Queue: React.FC<PropsType> = ({ queue, colors }) => {
    return (
        <div className={s.wrapper}>
            <h2 className={s.header}>Queue</h2>
            <ul className={s.list}>
                {queue.map((unit: UnitType, index: number) =>
                    <li style={{ color: unit.team === 0 ? colors[0] : colors[1] }}
                        className={s.element}
                        key={index}
                    >
                        {unit.name}
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Queue;