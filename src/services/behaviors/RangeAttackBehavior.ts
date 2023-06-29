import Behavior from "./Behavior.ts";
import Unit from "../units/Unit.ts";

export default class RangeAttackBehavior implements Behavior {
    do(attacker: Unit, target: Unit): void {
        target.setCurrHP(attacker.damage);
    }
}