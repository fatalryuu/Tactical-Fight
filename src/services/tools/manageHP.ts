import Unit from "../units/Unit.ts";

export const manageHP = (instance: Unit, damage: number) => {
    //default damage
    instance.currHP = (instance.currHP - damage) <= 0 ? 0 : instance.currHP - damage;
    //heal
    if (instance.currHP > instance.maxHP) {
        instance.currHP = instance.maxHP;
    }
    //dead
    if (instance.currHP === 0) {
        instance.setStatus("dead");
    }
}