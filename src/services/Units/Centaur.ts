import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";

export default class Centaur implements Unit {
    name = "Centaur";
    src = images.centaur;
    unitType: Type = Type.MELEE;
    hp = 150;
    damage = 50;
    initiative = 50;

    constructor() {}
}