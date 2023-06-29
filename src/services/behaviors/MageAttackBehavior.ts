import Behavior from "./Behavior.ts";
import Unit from "../units/Unit.ts";

export default class MageAttackBehavior implements Behavior {
    do(target: Unit, attacker: Unit, units: Array<Unit>): void {
        units.filter((unit: Unit) => unit.team === target.team)
            .forEach((unit: Unit) => {
                if (unit.status?.includes("defending")) {
                    unit.setCurrHP(attacker.damage / 2.0);
                } else {
                    unit.setCurrHP(attacker.damage);
                }
            });
    }
}