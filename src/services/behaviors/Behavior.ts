import Unit from "../units/Unit.ts";

export default interface Behavior {
    do(target: Unit, attacker: Unit, units: Array<Unit>): void;
}