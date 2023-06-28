import React from "react";
import s from "./Unit.module.css";

type PropsType = {
    name: string,
    src: string,
}

const Unit: React.FC<PropsType> = ({ name, src }) => {
    return (
        <div className={s.wrapper}>
            <h2>{name}</h2>
            <img src={src} alt={name}/>
            <div>Health</div>
        </div>
    );
};

export default Unit;