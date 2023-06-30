import Unit from "../units/Unit.ts";

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

const isUnitAlive = (unit: Unit): boolean => {
    return unit.status !== "dead";
};

const isUnitsAlive = (units: Array<Unit | null>): boolean => {
    return units.filter((unit: Unit | null) => unit === null).length === 0;
};

const getRow = (matrix: Array<Array<Unit | null>>, unit: Unit) => {
    for (let i = 0; i < matrix.length; i++) {
        if (matrix[i].includes(unit)) {
            return i;
        }
    }
    return -1;
}

export const checkIfMeleeCanAttack = (queue: Array<Unit>, instance: Unit, iterator: number): boolean => {
    const sortedQueue = [...queue].sort((a: Unit, b: Unit) => a.team - b.team);
    const firstTeam = sortPartOfAnArray(sortedQueue, 0, 6);
    const secondTeam = sortPartOfAnArray(sortedQueue, 6, 12);
    const battlefield = [...firstTeam, ...secondTeam];

    const matrix: Array<Array<Unit | null>> = [];
    for (let i = 0; i < battlefield.length; i += 3) {
        matrix.push([battlefield[i], battlefield[i + 1], battlefield[i + 2]]);
    }

    // const attackingUnit = queue[iterator];
    // const firstTeamBackLine = matrix[0];
    // const firstTeamFrontLine = matrix[1];
    // const secondTeamFrontLine = matrix[2];
    // const secondTeamBackLine = matrix[3];

    const attackerRow = getRow(matrix, queue[iterator]);
    const targetRow = getRow(matrix, instance);

    //temp
    if (attackerRow === 0 || attackerRow === 3) {
        if (isUnitsAlive(queue) && isUnitAlive(instance) && targetRow) {
            return true;
        }
        return true;
        // if (attackerRow === 0) {
        //     if (isUnitsAlive(firstTeamFrontLine) && targetRow >= 2) {
        //         return false;
        //     }
        // } else {
        //     if (isUnitsAlive(secondTeamFrontLine) && targetRow <= 1) {
        //         return false;
        //     }
        // }
    }

    return true;
}