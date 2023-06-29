import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import MageAttackBehavior from "../behaviors/MageAttackBehavior.ts";
import Behavior from "../behaviors/Behavior.ts";

export default class Archimage implements Unit {
    name = "Archimage";
    src = images.archimage;
    unitType: Type = Type.MAGE;
    maxHP = 90;
    currHP = 90;
    damage = 30;
    initiative = 40;
    behavior: Behavior;

    constructor() {
        this.behavior = new MageAttackBehavior();
    }

    setCurrHP(damage: number): void {
        this.currHP = (this.currHP - damage) <= 0 ? 0 : this.currHP - damage;
    }
}