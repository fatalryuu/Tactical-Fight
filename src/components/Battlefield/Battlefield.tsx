import React, { useState } from "react";
import s from "./Battlefield.module.css";
import Team from "../Team/Team.tsx";
import Unit from "../Unit/Unit.tsx";
import images from "../../tools/images.ts";
import RoundInfo from "../RoundInfo/RoundInfo.tsx";

type PropsType = {}

const Battlefield: React.FC<PropsType> = () => {
    const [round, setRound] = useState(1);
    const arr = [
        <Unit name="Skeleton" src={images.skeleton}/>,
        <Unit name="Centaur" src={images.centaur}/>,
        <Unit name="Bandit" src={images.bandit}/>,
        <Unit name="Elf Archer" src={images.elfArcher}/>,
        <Unit name="Skeleton mage" src={images.skeletonMage}/>,
        <Unit name="Archimage" src={images.archimage}/>,
        <Unit name="Monk" src={images.monk}/>,
        <Unit name="Bishop" src={images.bishop}/>,
        <Unit name="Sirena" src={images.siren}/>
    ];

    return (
        <div className={s.wrapper}>
            <Team color="red" units={arr.slice(0, 6)}/>
            <div className={s.middle}>
                <div className={s.round}>Round {round}</div>
                <div className={s.vs}>VS</div>
                <button className={s.defend}>Defend</button>
            </div>
            <Team color="green" units={arr.slice(3, 9)}/>
        </div>
    );
};

export default Battlefield;