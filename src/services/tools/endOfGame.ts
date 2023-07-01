import { EndType } from "../../App.tsx";
import Unit from "../units/Unit.ts";

export const findWinner = (queue: Array<Unit>, round: number): EndType => {
    if (round === 20) {
        return "draw";
    }
    const firstTeam = queue.slice(0, 6);
    const secondTeam = queue.slice(6, 12);

    if (firstTeam.filter((unit: Unit) => unit.status !== "dead").length === 0) {
        return "orange";
    }

    if (secondTeam.filter((unit: Unit) => unit.status !== "dead").length === 0) {
        return "cyan";
    }

    return "";
}
