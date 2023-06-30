import Unit from "../units/Unit.ts";
import { Type } from "../units/typeEnum.ts";
import { checkIfMeleeCanAttack } from "./checkIfMeleeCanAttack.ts";

export const processAction = (queue: Array<Unit>, instance: Unit, iterator: number): boolean => {
    let isDone = false;
    switch (queue[iterator].unitType) {
        case Type.HEALER_SINGLE:
            if (queue[iterator].team === instance.team) {
                if (instance.currHP !== instance.maxHP) {
                    queue[iterator].behavior.do(instance, queue[iterator]);
                    isDone = true;
                }
            } else {
                queue[iterator].behavior.do(instance, queue[iterator]);
                isDone = true;
            }
            break;
        case Type.HEALER_MASS:
            if (queue[iterator].team === instance.team) {
                if (instance.currHP !== instance.maxHP) {
                    queue[iterator].behavior.do(instance, queue[iterator], queue);
                    isDone = true;
                }
            } else {
                queue[iterator].behavior.do(instance, queue[iterator]);
                isDone = true;
            }
            break;
        case Type.MAGE:
            if (queue[iterator].team !== instance.team) {
                queue[iterator].behavior.do(instance, queue[iterator], queue);
                isDone = true;
            }
            break;
        case Type.PARALYZER:
            if (queue[iterator].team !== instance.team) {
                queue[iterator].behavior.do(instance, queue[iterator]);
                isDone = true;
            }
            break;
        case Type.RANGE:
            if (queue[iterator].team !== instance.team) {
                queue[iterator].behavior.do(instance, queue[iterator]);
                isDone = true;
            }
            break;
        case Type.MELEE:
            if (queue[iterator].team !== instance.team) {
                if (checkIfMeleeCanAttack(queue, instance, iterator)) {
                    queue[iterator].behavior.do(instance, queue[iterator]);
                    isDone = true;
                }
            }
            break;
    }
    return isDone;
};