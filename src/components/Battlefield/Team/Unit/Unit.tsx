import React from "react";
import s from "./Unit.module.css";
import UnitType from "../../../../services/units/Unit.ts";
import icons from "../../../../services/tools/icons.ts";

type PropsType = {
    instance: UnitType,
    currTeam: number,
    setCurrTeam: (curr: number) => void,
    queue: Array<UnitType>,
    iterator: number,
    setIterator: (iterator: number | ((prev: number) => number)) => void,
    team: number,
}

const Unit: React.FC<PropsType> = ({ instance, currTeam, setCurrTeam, queue, iterator, setIterator, team }) => {

    const getColor = () => {
        const diff: number = instance.currHP / instance.maxHP;
        if (diff <= 0.3) {
            return "red";
        } else if (diff <= 0.6) {
            return "yellow";
        } else {
            return "green";
        }
    };

    const getOverlayStyle = () => {
        if (instance.currHP === 0) {
            return { backgroundColor: "rgba(0, 0, 0, 0.5)" };
        } else if (getColor() === "red") {
            return { backgroundColor: "rgba(255, 0, 0, 0.5)" };
        } else if (getColor() === "yellow") {
            return { backgroundColor: "rgba(255, 0, 0, 0.3)" };
        } else {
            return {};
        }
    };

    const handleAction = () => {
        if (team !== currTeam) {
            const i = Math.floor(iterator);
            queue[i].behavior.do(queue[i], instance);
            setIterator(prev => prev + 0.5);
            currTeam ? setCurrTeam(0) : setCurrTeam(1);
        }
    };

    return (
        <div className={s.wrapper} onClick={handleAction}>
            <h2 className={s.header}>{instance.name}</h2>
            <div className={s.image__wrapper}>
                <img src={instance.src} alt={instance.name}
                     className={instance.currHP === 0 ? `${s.image} ${s.dead}` : s.image}/>
                <img src={icons[instance.unitType]} alt="" className={s.type}/>
                <div className={s.damage}>{instance.damage}</div>
                <div className={s.overlay} style={getOverlayStyle()}/>
            </div>
            <div className={`${s.health} ${s[getColor()]}`}>
                {instance.currHP}/{instance.maxHP}
            </div>
        </div>
    );
};

export default Unit;