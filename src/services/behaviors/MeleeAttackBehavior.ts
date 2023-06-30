import Behavior from "./Behavior.ts";
import Unit from "../units/Unit.ts";

export default class MeleeAttackBehavior implements Behavior {
    do(target: Unit, attacker: Unit): void {
        if (target.status?.includes("defending")) {
            target.setCurrHP(attacker.damage / 2.0);
        } else {
            target.setCurrHP(attacker.damage);
        }
    }
}