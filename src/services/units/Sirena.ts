import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import ParalyzeBehavior from "../behaviors/ParalyzeBehavior.ts";

export default class Sirena implements Unit {
    name = "Sirena";
    src = images.sirena;
    unitType: Type = Type.PARALYZER;
    maxHP = 80;
    currHP = 80;
    damage = 0;
    initiative = 20;
    behavior: Behavior;

    constructor() {
        this.behavior = new ParalyzeBehavior();
    }
}