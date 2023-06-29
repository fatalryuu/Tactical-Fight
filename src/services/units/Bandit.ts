import Unit, { StatusType } from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import RangeAttackBehavior from "../behaviors/RangeAttackBehavior.ts";
import { manageHP } from "../tools/manageHP.ts";

export default class Bandit implements Unit {
    id = 0;
    name = "Bandit";
    src = images.bandit;
    unitType: Type = Type.RANGE;
    maxHP = 75;
    currHP = 75;
    damage = 30;
    initiative = 60;
    behavior: Behavior;
    team = 0;
    status: StatusType = null;

    constructor() {
        this.behavior = new RangeAttackBehavior();
    }

    setCurrHP(damage: number): void {
        manageHP(this, damage);
    }

    setStatus(status: StatusType): void {
        this.status = status;
    }
}