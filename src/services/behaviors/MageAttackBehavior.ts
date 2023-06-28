import Behavior from "./Behavior.ts";

export default class MageAttackBehavior implements Behavior {
    do(): void {
        console.log("I am attacking mage!");
    }
}