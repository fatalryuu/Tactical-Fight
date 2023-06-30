import React, { useState } from "react";
import s from "./Rules.module.css";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import { rules } from "../../services/tools/rules.ts";

const Rules: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleClose = () => {
        setIsOpen(false);
    };

    return (
        <>
            <div onClick={() => setIsOpen(true)} className={s.icon}>
                <HelpOutlineIcon fontSize={"large"} style={{color: "white"}}/>
            </div>
            {isOpen &&
                <div className={s.wrapper} onClick={handleClose}>
                    <div className={s.rules} onClick={e => e.stopPropagation()}>
                        <h2 className={s.header}>Rules</h2>
                        <span onClick={handleClose} className={s.close}>X</span>
                        <ul className={s.list}>
                            {rules.map((rule: string) => <li>{rule}</li>)}
                        </ul>
                        <h1 className={s.enjoy} onClick={handleClose}>Enjoy!</h1>
                    </div>
                </div>
            }
        </>
    );
};

export default Rules;