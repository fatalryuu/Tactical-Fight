import { Type } from "./typeEnum.ts";
import Behavior from "../behaviors/Behavior.ts";

export default interface Unit {
    name: string;
    src: string;
    unitType: Type;
    maxHP: number;
    currHP: number;
    damage: number;
    initiative: number;
    behavior: Behavior;
    setCurrHP(damage: number): void;
}