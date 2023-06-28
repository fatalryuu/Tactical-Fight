import React, { useState } from "react";
import s from "./Rules.module.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const Rules: React.FC = () => {
    const [isOpen, setIsOpen] = useState(true);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)} className={s.icon}>
                <HelpOutlineIcon fontSize={"large"}/>
            </div>
            {isOpen &&
                <div className={s.wrapper} onClick={handleClose}>
                    <div className={s.rules} onClick={e => e.stopPropagation()}>
                        <h2 className={s.header}>Rules</h2>
                        <span onClick={handleClose} className={s.close}>X</span>
                        <ul className={s.list}>
                            <li>123</li>
                        </ul>
                    </div>
                </div>
            }
        </>
    );
};

export default Rules;