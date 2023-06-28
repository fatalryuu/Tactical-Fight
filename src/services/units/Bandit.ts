import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import RangeAttackBehavior from "../behaviors/RangeAttackBehavior.ts";

export default class Bandit implements Unit {
    name = "Bandit";
    src = images.bandit;
    unitType: Type = Type.RANGE;
    maxHP = 75;
    currHP = 75;
    damage = 30;
    initiative = 60;
    behavior: Behavior;

    constructor() {
        this.behavior = new RangeAttackBehavior();
    }
}