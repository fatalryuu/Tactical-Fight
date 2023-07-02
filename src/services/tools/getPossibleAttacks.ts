import Unit from "../units/Unit.ts";
import { Type } from "../units/typeEnum.ts";

const sortPartOfAnArray = (array: Array<Unit>, start: number, end: number) => {
    return array.slice(start, end)
        .sort((a: Unit, b: Unit) => a.id - b.id)
        .map((unit: Unit) => {
            if (unit.status === "dead") {
                return null;
            }
            return unit;
        });
}

const getAmountOfDead = (start: number, end: number, battlefield: Array<Unit | null>) => {
    let counter = 0;
    for (let i = start; i < end; i++) {
        if (!battlefield[i]) {
            counter++;
        }
    }
    return counter;
}

const getAttackerI = (battlefield: Array<Unit | null>, attacker: Unit): number => {
    let attackerI = 0;
    for (let i = 0; i < battlefield.length; i++) {
        if (battlefield[i] === attacker) {
            attackerI = i;
        }
    }
    return attackerI;
}

const handleFirstTeamBackLine = (battlefield: Array<Unit | null>, attackerI: number, index: number, unit: Unit): number => {
    //amount of dead after attacker unit
    const diff = getAmountOfDead(attackerI + 1, 6, battlefield);
    //get index with the offset
    attackerI += diff;
    //still back line
    if (attackerI < 3) {
        return -1;
    }
    //front line
    return handleFirstTeamFrontLine(battlefield, attackerI, index, unit);
}

const handleFirstTeamFrontLine = (battlefield: Array<Unit | null>, attackerI: number, index: number, unit: Unit): number => {
    const more = getAmountOfDead(6, 10, battlefield);

    if (attackerI === 3) { //left corner
        if (index > 5 && index < 8 + more) {
            return unit.id;
        }
    } else if (attackerI === 4) { //center
        if (index > 5 && index < 9 + more) {
            return unit.id;
        }
    } else { //right corner
        if (index > 6 && index < 9 + more) {
            return unit.id;
        }
    }
    return -1;
}

const handleSecondTeamFrontLine = (battlefield: Array<Unit | null>, attackerI: number, index: number, unit: Unit): number => {
    const more = getAmountOfDead(2, 6, battlefield);

    if (attackerI === 6) { //left corner
        if (index > 2 - more && index < 5) {
            return unit.id;
        }
    } else if (attackerI === 7) { //center
        if (index > 2 - more && index < 6) {
            return unit.id;
        }
    } else { //right corner
        if (index > 3 - more && index < 6) {
            return unit.id;
        }
    }
    return -1;
}

const handleSecondTeamBackLine = (battlefield: Array<Unit | null>, attackerI: number, index: number, unit: Unit): number => {
    //amount of dead before attacker unit
    const diff = getAmountOfDead(6, attackerI, battlefield);
    //get index with the offset
    attackerI -= diff;
    //still back line
    if (attackerI > 8) {
        return -1;
    }
    //front line
    return handleSecondTeamFrontLine(battlefield, attackerI, index, unit);
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

const getMeleeTargets = (attacker: Unit, units: Array<Unit>): Array<number> => {
    const sortedQueue = [...units].sort((a: Unit, b: Unit) => a.team - b.team);
    const firstTeam = sortPartOfAnArray(sortedQueue, 0, 6);
    const secondTeam = sortPartOfAnArray(sortedQueue, 6, 12);
    const battlefield = [...firstTeam, ...secondTeam];
    let attackerI = getAttackerI(battlefield, attacker);

    return battlefield.map((unit: Unit | null, index: number) => {
        if (unit !== null) {
            if (attackerI < 3) { //first team back line
                return handleFirstTeamBackLine(battlefield, attackerI, index, unit);
            } else if (attackerI < 6) { //first team front line
                const diff = getAmountOfDead(attackerI + 1, 6, battlefield);
                attackerI += diff;
                return handleFirstTeamFrontLine(battlefield, attackerI, index, unit);
            } else if (attackerI < 9) { //second team front line
                const diff = getAmountOfDead(6, attackerI, battlefield);
                attackerI -= diff;
                return handleSecondTeamFrontLine(battlefield, attackerI, index, unit);
            } else { //second team back line
                return handleSecondTeamBackLine(battlefield, attackerI, index, unit);
            }
        }
        return -1;
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