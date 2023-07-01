import Unit from "../units/Unit.ts";
import { Type } from "../units/typeEnum.ts";

const sortPartOfAnArray = (array: Array<Unit>, start: number, end: number) => {
    return  array.slice(start, end)
        .sort((a: Unit, b: Unit) => a.id - b.id)
        .map((unit: Unit) => {
            if (unit.status === "dead") {
                return null;
            }
            return unit;
        });
}

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

const getMeleeTargets = (attacker: Unit, queue: Array<Unit>): Array<number> => {
    const sortedQueue = [...queue].sort((a: Unit, b: Unit) => a.team - b.team);
    const firstTeam = sortPartOfAnArray(sortedQueue, 0, 6);
    const secondTeam = sortPartOfAnArray(sortedQueue, 6, 12);
    const battlefield = [...firstTeam, ...secondTeam];
    let counter = 0;
    let attackerI = 0;

    for (let i = 0; i < battlefield.length; i++) {
        if (battlefield[i] === attacker) {
            attackerI = i;
        }
    }

    return battlefield.map((unit: Unit | null, index: number) => {
        if (attackerI < 3) { //first team back line
            //amount of dead after attacker unit
            if (unit && unit.team === attacker.team && unit !== attacker && unit.id > attacker.id) {
                counter++;
            }
            //counter < 3 means that the unit is in front line
            //corner situations are solved in ternary expressions
            if (counter < 3 && index > (counter === 0 ? 6 : 5) && index < (counter === 2 ? 8 : 9)) {
                return unit ? unit.id : -1;
            }
            return -1;
        } else if (attackerI < 6) { //first team front line
            if (index > 5 && index < 9) {
                return unit ? unit.id : -1;
            }
            return -1;
        } else if (attackerI < 9) { //second team front line
            if (index > 2 && index < 6) {
                return unit ? unit.id : -1;
            }
            return -1;
        } else { //second team back line
            return -1;
        }
    }).filter((id: number) => id !== -1);
}

export const getPossibleAttacks = (attacker: Unit, queue: Array<Unit>): Array<number> => {
    const canAttack: Array<number> = [];

    switch (attacker?.unitType) {
        case Type.HEALER_SINGLE:
        case Type.HEALER_MASS:
            canAttack.push(...getHealersTargets(attacker, queue));
            break;
        case Type.MAGE:
        case Type.PARALYZER:
        case Type.RANGE:
            canAttack.push(...getAllEnemies(attacker, queue));
            break;
        case Type.MELEE:
            canAttack.push(...getMeleeTargets(attacker, queue));
            break;
    }

    return canAttack;
}