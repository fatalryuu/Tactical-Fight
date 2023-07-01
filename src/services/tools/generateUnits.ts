import Unit from "../units/Unit.ts";
import Skeleton from "../units/Skeleton.ts";
import Centaur from "../units/Centaur.ts";
import Bandit from "../units/Bandit.ts";
import ElfArcher from "../units/ElfArcher.ts";
import SkeletonMage from "../units/SkeletonMage.ts";
import Archimage from "../units/Archimage.ts";
import Monk from "../units/Monk.ts";
import Bishop from "../units/Bishop.ts";
import Sirena from "../units/Sirena.ts";

type UnitClass = new () => Unit;

const generateUnits = (): Array<Unit> => {
    const unitClasses: Array<UnitClass> = [
        Skeleton,
        // Centaur,
        // Bandit,
        // ElfArcher,
        // SkeletonMage,
        // Archimage,
        // Monk,
        // Bishop,
        // Sirena,
    ];

    const units: Array<Unit> = [];

    while (units.length < 12) {
        const randomIndex = Math.floor(Math.random() * unitClasses.length);
        const UnitClass = unitClasses[randomIndex];
        const unitInstance = new UnitClass();
        unitInstance.id = units.length;
        if (units.length > 5) {
            unitInstance.team = 1;
        }
        if (units.length > 5 && units.length < 9) {
            unitInstance.currHP = 0;
            unitInstance.status = "dead";
        }
        if (units.length > 2 && units.length < 5) {
            unitInstance.currHP = 0;
            unitInstance.status = "dead";
        }
        units.push(unitInstance);
    }

    return units;
};

export default generateUnits;