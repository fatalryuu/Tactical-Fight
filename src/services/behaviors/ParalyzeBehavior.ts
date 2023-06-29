import Behavior from "./Behavior.ts";
import Unit from "../units/Unit.ts";

export default class ParalyzeBehavior implements Behavior {
    do(target: Unit): void {
        if (target.status === "defending") {
            target.setStatus("defending paralyzed");
        } else {
            target.setStatus("paralyzed");
        }
    }
}