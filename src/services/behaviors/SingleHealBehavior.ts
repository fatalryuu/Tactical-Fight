import Behavior from "./Behavior.ts";
import Unit from "../units/Unit.ts";

export default class SingleHealBehavior implements Behavior {
    do(attacker: Unit, target: Unit): void {
        if (attacker.team === target.team) {
            target.setCurrHP(-target.maxHP);
        } else {
            target.setCurrHP(attacker.damage)
        }
    }
}