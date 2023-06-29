import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import SingleHealBehavior from "../behaviors/SingleHealBehavior.ts";

export default class Monk implements Unit {
    name = "Monk";
    src = images.monk;
    unitType: Type = Type.HEALER_SINGLE;
    maxHP = 90;
    currHP = 90;
    damage = 40;
    initiative = 20;
    behavior: Behavior;

    constructor() {
        this.behavior = new SingleHealBehavior();
    }

    setCurrHP(damage: number): void {
        this.currHP = (this.currHP - damage) <= 0 ? 0 : this.currHP - damage;
    }
}