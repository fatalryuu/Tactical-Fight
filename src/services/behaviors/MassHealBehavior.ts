import Behavior from "./Behavior.ts";
import Unit from "../units/Unit.ts";

export default class MassHealBehavior implements Behavior {
    do(attacker: Unit, target: Unit, units: Array<Unit>): void {
        if (attacker.team === target.team) {
            units.filter((unit: Unit) => unit.team === attacker.team).forEach((unit: Unit) => unit.setCurrHP(-unit.maxHP));
        } else {
            target.setCurrHP(attacker.damage)
        }
    }
}