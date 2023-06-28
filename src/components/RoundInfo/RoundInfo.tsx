import React from "react";
import s from "./RoundInfo.module.css";

type PropsType = {}

const RoundInfo: React.FC<PropsType> = () => {
    return (
        <div className={s.wrapper}>
            <h2 className={s.header}>Round Info</h2>
            <div className={s.info}>

            </div>
        </div>
    );
};

export default RoundInfo;