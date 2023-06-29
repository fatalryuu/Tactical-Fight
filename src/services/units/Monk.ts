import Unit, { StatusType } from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import SingleHealBehavior from "../behaviors/SingleHealBehavior.ts";
import { manageHP } from "../tools/manageHP.ts";

export default class Monk implements Unit {
    id = 0;
    name = "Monk";
    src = images.monk;
    unitType: Type = Type.HEALER_SINGLE;
    maxHP = 90;
    currHP = 90;
    damage = 40;
    initiative = 20;
    behavior: Behavior;
    team = 0;
    status: StatusType = null;

    constructor() {
        this.behavior = new SingleHealBehavior();
    }

    setCurrHP(damage: number): void {
        manageHP(this, damage);
    }

    setStatus(status: StatusType): void {
        this.status = status;
    }
}