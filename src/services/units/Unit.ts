import { Type } from "./typeEnum.ts";

export default interface Unit {
    name: string;
    src: string;
    unitType: Type;
    maxHP: number;
    currHP: number;
    damage: number;
    initiative: number;
}