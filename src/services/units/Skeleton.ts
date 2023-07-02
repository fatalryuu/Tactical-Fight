import Unit, { StatusType } from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import MeleeAttackBehavior from "../behaviors/MeleeAttackBehavior.ts";
import { manageHP } from "../tools/manageHP.ts";

export default class Skeleton implements Unit {
    id = 0;
    name = "Skeleton";
    src = images.skeleton;
    unitType: Type = Type.MELEE;
    maxHP = 100;
    currHP = 100;
    damage = 250;
    initiative = 50;
    behavior: Behavior;
    team = 0;
    status: StatusType = null;

    constructor() {
        this.behavior = new MeleeAttackBehavior();
    }

    setCurrHP(damage: number): void {
        manageHP(this, damage);
    }

    setStatus(status: StatusType): void {
        this.status = status;
    }
}