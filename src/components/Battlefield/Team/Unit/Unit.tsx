import React from "react";
import s from "./Unit.module.css";
import UnitType from "../../../../services/units/Unit.ts";

type PropsType = {
    info: UnitType
}

const Unit: React.FC<PropsType> = ({ info }) => {

    const getColor = () => {
        const diff: number = info.currHP / info.maxHP;
        if (diff <= 0.3) {
            return "red";
        } else if (diff <= 0.7) {
            return "yellow";
        } else {
            return "green";
        }
    };

    const getOverlayStyle = () => {
        if (info.currHP <= 0) {
            return { backgroundColor: "rgba(0, 0, 0, 0.5)" };
        } else if (getColor() === "red") {
            return { backgroundColor: "rgba(255, 0, 0, 0.5)" };
        } else if (getColor() === "yellow") {
            return { backgroundColor: "rgba(255, 0, 0, 0.3)" };
        } else {
            return {};
        }
    };

    return (
        <div className={s.wrapper}>
            <h2 className={s.header}>{info.name}</h2>
            <div className={s.image__wrapper}>
                <img src={info.src} alt={info.name} className={info.currHP === 0 ? `${s.image} ${s.dead}` : s.image}/>
                <div className={s.overlay} style={getOverlayStyle()} />
            </div>
            <div className={`${s.health} ${s[getColor()]}`}>
                {info.currHP}/{info.maxHP}
            </div>
        </div>
    );
};

export default Unit;