import React from "react";
import s from "./Unit.module.css";
import UnitType from "../../../../services/units/Unit.ts";
import icons from "../../../../services/tools/icons.ts";
import { getColor, getOverlayStyle } from "../../../../services/tools/hpStyles.ts";
import { processAction } from "../../../../services/tools/processAction.ts";
import Note, { BehaviorType } from "../../../RoundInfo/Note/Note.tsx";
import { Type } from "../../../../services/units/typeEnum.ts";

type PropsType = {
    instance: UnitType,
    currTeam: number,
    setCurrTeam: (curr: number) => void,
    queue: Array<UnitType>,
    iterator: number,
    setIterator: (iterator: number | ((prev: number) => number)) => void,
    team: number,
    canAttack: Array<number>,
    setNotes: (notes: Array<JSX.Element> | ((prev: Array<JSX.Element>) => Array<JSX.Element>)) => void,
}

const Unit: React.FC<PropsType> = (props) => {
    const {
        instance,
        currTeam,
        setCurrTeam,
        queue,
        iterator,
        setIterator,
        team,
        canAttack,
        setNotes,
    } = props;

    const createNote = () => {
        let behavior: BehaviorType = "attacking";
        if (queue[iterator].team === instance.team) {
            if (queue[iterator].unitType === Type.HEALER_SINGLE) {
                behavior = "healing_single";
            } else {
                behavior = "healing_mass";
            }
        } else if (queue[iterator].damage === 0) {
            behavior = "paralyzing";
        } else if (queue[iterator].unitType === Type.MAGE) {
            behavior = "mage_attacking";
        }
        setNotes(prev => [...prev,
            <Note attacker={queue[iterator]} target={instance} behavior={behavior} key={Math.random() * 1000}/>]);
    };
    const handleAction = () => {
        if (instance.status !== "dead" && processAction(team, currTeam, queue, instance, iterator)) {
            createNote();
            setIterator(prev => prev + 1);
            currTeam ? setCurrTeam(0) : setCurrTeam(1);
        }
    };

    const canBeAttacked = canAttack.includes(instance.id) ? `${s.canAttack}` : "";

    const outlineStyle = queue[iterator]?.id === instance.id ? `${s.attacker}` : "";

    return (
        <div className={s.wrapper} onClick={handleAction}>
            <h2 className={s.header}>{instance.name}</h2>
            <div className={`${s.image__wrapper} ${canBeAttacked} ${outlineStyle}`}>
                <img src={instance.src} alt={instance.name}
                     className={instance.currHP === 0 ? `${s.image} ${s.dead}` : s.image}/>
                <img src={icons[instance.unitType]} alt="" className={s.type}/>
                <img src={icons.DEFENDING} alt=""
                     className={instance.status?.includes("defending") ? s.defend : s.hidden}/>
                <img src={icons.PARALYZED} alt=""
                     className={instance.status?.includes("paralyzed") ? s.paralyzed : s.hidden}/>
                <div className={s.damage}>{instance.damage}</div>
                <div className={s.overlay} style={getOverlayStyle(instance)}/>
            </div>
            <div className={`${s.health} ${s[getColor(instance)]}`}>
                {instance.currHP}/{instance.maxHP}
            </div>
        </div>
    );
};

export default Unit;