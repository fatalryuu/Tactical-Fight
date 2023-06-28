import React from "react";
import s from "./Queue.module.css";
import UnitType from "../../../services/units/Unit.ts";

type PropsType = {
    queue: Array<UnitType>,
    colors: Array<string>,
    first: number,
}

const Queue: React.FC<PropsType> = ({ queue, colors, first }) => {
    let indexForFirstTeam: number;
    let indexForSecondTeam: number;
    if (first) {
        indexForFirstTeam = 1;
        indexForSecondTeam = 0;
    } else {
        indexForFirstTeam = 0;
        indexForSecondTeam = 1;
    }
    return (
        <div className={s.wrapper}>
            <h2 className={s.header}>Order</h2>
            <ul className={s.list}>
                {queue.map((q: UnitType, index: number) =>
                    <li style={{ color: index % 2 === 0 ?
                            colors[indexForFirstTeam] :
                            colors[indexForSecondTeam] }}
                        className={s.element}
                        key={index}
                    >
                        {q.name}
                    </li>)
                }
            </ul>
        </div>
    );
};

export default Queue;