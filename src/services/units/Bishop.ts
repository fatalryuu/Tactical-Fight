import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import MassHealBehavior from "../behaviors/MassHealBehavior.ts";

export default class Bishop implements Unit {
    name = "Bishop";
    src = images.bishop;
    unitType: Type = Type.HEALER_MASS;
    maxHP = 130;
    currHP = 130;
    damage = 25;
    initiative = 20;
    behavior: Behavior;

    constructor() {
        this.behavior = new MassHealBehavior();
    }
}