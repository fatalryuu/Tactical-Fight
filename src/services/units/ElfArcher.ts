import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import RangeAttackBehavior from "../behaviors/RangeAttackBehavior.ts";

export default class ElfArcher implements Unit {
    name = "Elf Archer";
    src = images.elfArcher;
    unitType: Type = Type.RANGE;
    maxHP = 90;
    currHP = 90;
    damage = 45;
    initiative = 60;
    behavior: Behavior;

    constructor() {
        this.behavior = new RangeAttackBehavior();
    }

    setCurrHP(damage: number): void {
        this.currHP = (this.currHP - damage) <= 0 ? 0 : this.currHP - damage;
    }
}