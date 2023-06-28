import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";

export default class Monk implements Unit {
    name = "Monk";
    src = images.monk;
    unitType: Type = Type.HEALER_SINGLE;
    hp = 90;
    damage = 40;
    initiative = 20;

    constructor() {}
}