import { EndType } from "../../App.tsx";
import Unit from "../units/Unit.ts";

export const findWinner = (queue: Array<Unit>, round: number): EndType => {
    if (round === 20) {
        return "draw";
    }

    const queueCopy = [...queue].sort((a: Unit, b: Unit) => a.team - b.team);
    const firstTeam = queueCopy.slice(0, 6);
    const secondTeam = queueCopy.slice(6, 12);

    if (firstTeam.filter((unit: Unit) => unit.status !== "dead").length === 0) {
        return "orange";
    }

    if (secondTeam.filter((unit: Unit) => unit.status !== "dead").length === 0) {
        return "cyan";
    }

    return "";
}
