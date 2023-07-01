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

const getMore = (start: number, end: number, battlefield: Array<Unit | null>) => {
    let more = 0;
    for (let i = start; i < end; i++) {
        if (!battlefield[i]) {
            more++;
        }
    }
    return more;
}

const getCounter = (battlefield: Array<Unit | null>, attacker: Unit): number => {
    let counter = 0;
    battlefield.forEach((unit: Unit | null) => {
        if (unit && unit.team === attacker.team && unit !== attacker && unit.id < attacker.id) {
            counter++;
        }
    })

    return counter;
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
            const more = getMore(6, battlefield.length, battlefield);
            //counter < 3 means that the unit is in front line
            //corner situations are solved in ternary expressions
            if (counter < 3 && index > (counter === 0 ? 6 + more : 5) && index < (counter === 2 ? 8 + more : 9 + more) && unit) {
                return unit.id;
            }
            return -1;
        } else if (attackerI < 6) { //first team front line
            const more = getMore(6, 9, battlefield);

            if (attackerI === 3) { //left corner
                if (index > 5 + more && index < 8 + more) {
                    return unit ? unit.id : -1;
                }
            } else if (attackerI === 4) { //center
                if (index > 5 + more && index < 9 + more) {
                    return unit ? unit.id : -1;
                }
            } else { //right corner
                if (index > 6 + more && index < 9 + more) {
                    return unit ? unit.id : -1;
                }
            }
            return -1;
        } else if (attackerI < 9) { //second team front line
            const more = getMore(3, 6, battlefield);

            if (attackerI === 6) { //left corner
                if (index > 2 - more && index < 5 - more) {
                    return unit ? unit.id : -1;
                }
            } else if (attackerI === 7) { //center
                if (index > 2 - more && index < 6 - more) {
                    return unit ? unit.id : -1;
                }
            } else { //right corner
                if (index > 3 - more && index < 6 - more) {
                    return unit ? unit.id : -1;
                }
            }
            return -1;
        } else { //second team back line
            //amount of dead before attacker unit
            counter = getCounter(battlefield, attacker);
            const more = getMore(0, 6, battlefield);
            //counter < 3 means that the unit is in front line
            //corner situations are solved in ternary expressions
            if (counter < 3 && index > (counter === 2 ? 3 - more : 2 - more) && index < (counter === 0 ? 5 : 6) && unit) {
                return unit.id;
            }
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