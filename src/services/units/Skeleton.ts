import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";

export default class Skeleton implements Unit {
    name = "Skeleton";
    src = images.skeleton;
    unitType: Type = Type.MELEE;
    maxHP = 100;
    currHP = 100;
    damage = 25;
    initiative = 50;

    constructor() {}
}