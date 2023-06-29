import Unit, { StatusType } from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import MageAttackBehavior from "../behaviors/MageAttackBehavior.ts";
import Behavior from "../behaviors/Behavior.ts";
import { manageHP } from "../tools/manageHP.ts";

export default class Archimage implements Unit {
    id = 0;
    name = "Archimage";
    src = images.archimage;
    unitType: Type = Type.MAGE;
    maxHP = 90;
    currHP = 90;
    damage = 30;
    initiative = 40;
    behavior: Behavior;
    team = 0;
    status: StatusType = null;

    constructor() {
        this.behavior = new MageAttackBehavior();
    }

    setCurrHP(damage: number): void {
        manageHP(this, damage);
    }

    setStatus(status: StatusType): void {
        this.status = status;
    }
}