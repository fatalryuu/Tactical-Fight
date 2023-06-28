import Behavior from "./Behavior.ts";

export default class MeleeAttackBehavior implements Behavior {
    do(): void {
        console.log("I am attacking melee");
    }
}