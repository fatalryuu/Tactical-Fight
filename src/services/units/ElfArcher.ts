import Unit from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";

export default class ElfArcher implements Unit {
    name = "Elf Archer";
    src = images.elfArcher;
    unitType: Type = Type.RANGE;
    maxHP = 90;
    currHP = 90;
    damage = 45;
    initiative = 60;

    constructor() {}
}