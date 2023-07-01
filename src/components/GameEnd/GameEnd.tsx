import React from "react";
import s from "./GameEnd.module.css";
import { EndType } from "../../App.tsx";

type PropsType = {
    isEnd: EndType,
    setIsEnd: (isEnd: EndType | ((prev: EndType) => EndType)) => void,
}

const GameEnd: React.FC<PropsType> = ({ isEnd, setIsEnd }) => {
    const handleClose = () => {
        setIsEnd("");
    };

    const restartGame = () => {
        location.reload();
    }

    return (
        <>
            {isEnd &&
                <div className={s.wrapper} onClick={handleClose}>
                    <div className={s.window} onClick={e => e.stopPropagation()}>
                        <h2 className={s.header}>{isEnd === "draw" ? "Too strong for each other" : "Congratulations!"}</h2>
                        <span onClick={handleClose} className={s.close}>X</span>
                        <div className={s.winner}>{isEnd !== "draw" ? `The ${isEnd} team won!` : "It's a draw!" }</div>
                        <button className={s.restart} onClick={restartGame}>New game</button>
                    </div>
                </div>
            }
        </>
    );
};

export default GameEnd;