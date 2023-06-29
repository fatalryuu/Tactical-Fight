import { Type } from "./typeEnum.ts";
import Behavior from "../behaviors/Behavior.ts";

export type StatusType = null | "paralyzed" | "defending" | "defending paralyzed" | "dead";

export default interface Unit {
    id: number;
    name: string;
    src: string;
    unitType: Type;
    maxHP: number;
    currHP: number;
    damage: number;
    initiative: number;
    behavior: Behavior;
    team: number;
    status: StatusType;

    setCurrHP(damage: number): void;
    setStatus(status: StatusType): void;
}