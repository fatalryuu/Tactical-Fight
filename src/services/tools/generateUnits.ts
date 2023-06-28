import Unit from "../Units/Unit.ts";
import Skeleton from "../Units/Skeleton.ts";
import Centaur from "../Units/Centaur.ts";
import Bandit from "../Units/Bandit.ts";
import ElfArcher from "../Units/ElfArcher.ts";
import SkeletonMage from "../Units/SkeletonMage.ts";
import Archimage from "../Units/Archimage.ts";
import Monk from "../Units/Monk.ts";
import Bishop from "../Units/Bishop.ts";
import Sirena from "../Units/Sirena.ts";

const generateUnits = (): Array<Unit> => {
    const unitClasses: Array<any> = [
        Skeleton,
        Centaur,
        Bandit,
        ElfArcher,
        SkeletonMage,
        Archimage,
        Monk,
        Bishop,
        Sirena
    ];

    const units: Array<Unit> = [];

    while (units.length < 12) {
        const randomIndex = Math.floor(Math.random() * unitClasses.length);
        const UnitClass = unitClasses[randomIndex];
        const unitInstance = new UnitClass();
        units.push(unitInstance);
    }

    return units;
};

export default generateUnits;