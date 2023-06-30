import Unit from "../units/Unit.ts";
import { Type } from "../units/typeEnum.ts";

const getHealersTargets = (attacker: Unit, arr: Array<Unit>): Array<number> => {
    return arr.map((unit: Unit) => {
        if (unit.team === attacker.team) {
            if (unit.status !== "dead" && unit.currHP !== unit.maxHP) {
                return unit.id;
            }
        } else {
            if (unit.status !== "dead") {
                return unit.id;
            }
        }
        return -1;
    }).filter((id: number) => id !== -1);
}

const getAllEnemies = (attacker: Unit, arr: Array<Unit>): Array<number> => {
    return arr.map((unit: Unit) => {
        if (unit.team !== attacker.team) {
            if (unit.status !== "dead") {
                return unit.id;
            }
        }
        return -1;
    }).filter((id: number) => id !== -1);
}

export const getPossibleAttacks = (attacker: Unit, queue: Array<Unit>): Array<number> => {
    const canAttack: Array<number> = [];

    switch (attacker?.unitType) {
        case Type.HEALER_SINGLE:
            canAttack.push(...getHealersTargets(attacker, queue));
            break;
        case Type.HEALER_MASS:
            canAttack.push(...getHealersTargets(attacker, queue));
            break;
        case Type.MAGE:
            canAttack.push(...getAllEnemies(attacker, queue));
            break;
        case Type.PARALYZER:
            canAttack.push(...getAllEnemies(attacker, queue));
            break;
        case Type.RANGE:
            canAttack.push(...getAllEnemies(attacker, queue));
            break;
        case Type.MELEE:
            //temp
            canAttack.push(...getAllEnemies(attacker, queue));
            break;
    }

    return canAttack;
}