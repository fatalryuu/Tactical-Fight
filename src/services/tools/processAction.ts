import Unit from "../units/Unit.ts";
import { Type } from "../units/typeEnum.ts";
import { checkIfMeleeCanAttack } from "./checkIfMeleeCanAttack.ts";

export const processAction = (team: number, currTeam: number, queue: Array<Unit>, instance: Unit, iterator: number): boolean => {
    let isDone = false;
    switch (queue[iterator].unitType) {
        case Type.HEALER_SINGLE:
            queue[iterator].behavior.do(instance, queue[iterator]);
            isDone = true;
            break;
        case Type.HEALER_MASS:
            queue[iterator].behavior.do(instance, queue[iterator], queue);
            isDone = true;
            break;
        case Type.MAGE:
            if (team !== currTeam) {
                queue[iterator].behavior.do(instance, queue[iterator], queue);
                isDone = true;
            }
            break;
        case Type.PARALYZER:
            if (team !== currTeam) {
                queue[iterator].behavior.do(instance, queue[iterator]);
                isDone = true;
            }
            break;
        case Type.RANGE:
            if (team !== currTeam) {
                queue[iterator].behavior.do(instance, queue[iterator]);
                isDone = true;
            }
            break;
        case Type.MELEE:
            if (team !== currTeam) {
                if (checkIfMeleeCanAttack(queue, instance, iterator)) {
                    queue[iterator].behavior.do(instance, queue[iterator]);
                    isDone = true;
                }
            }
            break;
    }
    return isDone;
}