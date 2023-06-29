import Behavior from "./Behavior.ts";
import Unit from "../units/Unit.ts";

export default class MeleeAttackBehavior implements Behavior {
    do(attacker: Unit, target: Unit, units: Array<Unit>): void {
        target.setCurrHP(attacker.damage);
    }
}