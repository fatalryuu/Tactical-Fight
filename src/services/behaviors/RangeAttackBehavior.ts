import Behavior from "./Behavior.ts";

export default class RangeAttackBehavior implements Behavior {
    do(): void {
        console.log("I am attacking range");
    }
}