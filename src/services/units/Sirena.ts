import Unit, { StatusType } from "./Unit.ts";
import { Type } from "./typeEnum.ts";
import images from "../tools/images.ts";
import Behavior from "../behaviors/Behavior.ts";
import ParalyzeBehavior from "../behaviors/ParalyzeBehavior.ts";
import { manageHP } from "../tools/manageHP.ts";

export default class Sirena implements Unit {id = 0;

    name = "Sirena";
    src = images.sirena;
    unitType: Type = Type.PARALYZER;
    maxHP = 80;
    currHP = 80;
    damage = 0;
    initiative = 20;
    behavior: Behavior;
    team = 0;
    status: StatusType = null;

    constructor() {
        this.behavior = new ParalyzeBehavior();
    }

    setCurrHP(damage: number): void {
        manageHP(this, damage);
    }

    setStatus(status: StatusType): void {
        this.status = status;
    }
}