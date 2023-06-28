import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import MageAttackBehavior from "../behaviors/MageAttackBehavior.ts";

export default class SkeletonMage implements Unit {
    name = "Skeleton Mage";
    src = images.skeletonMage;
    unitType: Type = Type.MAGE;
    maxHP = 50;
    currHP = 50;
    damage = 20;
    initiative = 40;
    behavior: Behavior;

    constructor() {
        this.behavior = new MageAttackBehavior();
    }
}