import React from "react";
import s from "./Note.module.css";
import UnitType from "../../../services/units/Unit.ts";

export type BehaviorType = "attacking" | "defending" | "healing_single" | "healing_mass" | "mage_attacking" | "paralyzing";

type PropsType = {
    attacker: UnitType,
    target: UnitType,
    behavior: BehaviorType,
}

const Note: React.FC<PropsType> = ({ attacker, target, behavior }) => {
    let action = "";
    switch (behavior) {
        case "attacking":
            action = "attacked";
            break;
        case "defending":
            action = "defended"
            break;
        case "healing_single":
            action = "healed"
            break;
        case "healing_mass":
            action = "healed all teammates"
            break;
        case "mage_attacking":
            action = "attacked all enemies"
            break;
        case "paralyzing":
            action = "paralyzed"
            break;
    }
    return (
        <div className={s.wrapper}>
            <span className={`${s.attacker} ${attacker.team ? s.cyan : s.orange}`}>
                {attacker.name}
            </span>
            &nbsp;{action}&nbsp;
            {(behavior === "attacking" || behavior === "paralyzing" || behavior === "healing_single") &&
                <span className={`${s.target} ${target.team ? s.cyan : s.orange}`}>
                    {target.name}
                </span>
            }
            {behavior === "attacking" &&
            <>
            &nbsp;for&nbsp;
            <span className={s.damage}>
                {target.status !== "defending" ? attacker.damage : attacker.damage / 2.0}
            </span>
            &nbsp;damage
            </>
            }
        </div>
    );
};

export default Note;