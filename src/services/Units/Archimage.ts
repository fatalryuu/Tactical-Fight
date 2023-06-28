import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";

export default class Archimage implements Unit {
    name = "Archimage";
    src = images.archimage;
    unitType: Type = Type.MAGE;
    hp = 90;
    damage = 30;
    initiative = 40;

    constructor() {}
}