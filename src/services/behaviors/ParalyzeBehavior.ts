import Behavior from "./Behavior.ts";

export default class ParalyzeBehavior implements Behavior {
    do(): void {
        console.log("I am attacking");
    }
}