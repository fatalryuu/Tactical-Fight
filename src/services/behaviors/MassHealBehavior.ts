import Behavior from "./Behavior.ts";

export default class MassHealBehavior implements Behavior {
    do(): void {
        console.log("I am healing all");
    }
}