import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";

export default class Sirena implements Unit {
    name = "Sirena";
    src = images.sirena;
    unitType: Type = Type.PARALYZER;
    hp = 80;
    damage = 0;
    initiative = 20;

    constructor() {}
}