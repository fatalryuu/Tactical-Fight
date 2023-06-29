import Unit from "../units/Unit.ts";

export default interface Behavior {
    do(attacker: Unit, target: Unit): void;
}