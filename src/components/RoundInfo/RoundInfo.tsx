import React from "react";
import s from "./RoundInfo.module.css";

type PropsType = {
    notes: Array<JSX.Element>,
}

const RoundInfo: React.FC<PropsType> = ({ notes }) => {
    return (
        <div className={s.wrapper}>
            <h2 className={s.header}>Round Info</h2>
            <div className={s.info}>
                {notes}
            </div>
        </div>
    );
};

export default RoundInfo;