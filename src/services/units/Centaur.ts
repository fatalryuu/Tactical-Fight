import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import MeleeAttackBehavior from "../behaviors/MeleeAttackBehavior.ts";

export default class Centaur implements Unit {
    name = "Centaur";
    src = images.centaur;
    unitType: Type = Type.MELEE;
    maxHP = 150;
    currHP = 150;
    damage = 50;
    initiative = 50;
    behavior: Behavior;

    constructor() {
        this.behavior = new MeleeAttackBehavior();
    }

    setCurrHP(damage: number): void {
        this.currHP = (this.currHP - damage) <= 0 ? 0 : this.currHP - damage;
    }
}