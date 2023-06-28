import Behavior from "./Behavior.ts";

export default class SingleHealBehavior implements Behavior {
    do(): void {
        console.log("I am healing one");
    }
}