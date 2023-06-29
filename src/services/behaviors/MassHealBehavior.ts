import Behavior from "./Behavior.ts";
import Unit from "../units/Unit.ts";

export default class MassHealBehavior implements Behavior {
    do(target: Unit, attacker: Unit, units: Array<Unit>): void {
        if (attacker.team === target.team) {
            units.filter((unit: Unit) => unit.team === attacker.team && unit.status !== "dead")
                .forEach((unit: Unit) => unit.setCurrHP(-unit.maxHP));
        } else {
            target.setCurrHP(attacker.damage)
        }
    }
}