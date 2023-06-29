import Unit, { StatusType } from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import MageAttackBehavior from "../behaviors/MageAttackBehavior.ts";
import { manageHP } from "../tools/manageHP.ts";

export default class SkeletonMage implements Unit {
    id = 0;
    name = "Skeleton Mage";
    src = images.skeletonMage;
    unitType: Type = Type.MAGE;
    maxHP = 50;
    currHP = 50;
    damage = 20;
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