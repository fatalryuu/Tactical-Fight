import Unit, { StatusType } from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import MassHealBehavior from "../behaviors/MassHealBehavior.ts";
import { manageHP } from "../tools/manageHP.ts";

export default class Bishop implements Unit {
    id = 0;
    name = "Bishop";
    src = images.bishop;
    unitType: Type = Type.HEALER_MASS;
    maxHP = 130;
    currHP = 130;
    damage = 25;
    initiative = 20;
    behavior: Behavior;
    team = 0;
    status: StatusType = null;

    constructor() {
        this.behavior = new MassHealBehavior();
    }

    setCurrHP(damage: number): void {
        manageHP(this, damage);
    }

    setStatus(status: StatusType): void {
        this.status = status;
    }
}