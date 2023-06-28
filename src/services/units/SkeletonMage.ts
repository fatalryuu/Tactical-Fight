import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";

export default class SkeletonMage implements Unit {
    name = "Skeleton Mage";
    src = images.skeletonMage;
    unitType: Type = Type.MAGE;
    maxHP = 50;
    currHP = 50;
    damage = 20;
    initiative = 40;

    constructor() {}
}