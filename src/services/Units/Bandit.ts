import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";

export default class Bandit implements Unit {
    name = "Bandit";
    src = images.bandit;
    unitType: Type = Type.RANGE;
    hp = 75;
    damage = 30;
    initiative = 60;

    constructor() {}
}