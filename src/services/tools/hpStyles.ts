import Unit from "../units/Unit.ts";

export const getColor = (instance: Unit) => {
    const diff: number = instance.currHP / instance.maxHP;
    if (diff <= 0.3) {
        return "red";
    } else if (diff <= 0.6) {
        return "yellow";
    } else {
        return "green";
    }
};

export const getOverlayStyle = (instance: Unit) => {
    if (instance.status === "dead") {
        return { backgroundColor: "rgba(0, 0, 0, 0.5)" };
    } else if (getColor(instance) === "red") {
        return { backgroundColor: "rgba(255, 0, 0, 0.5)" };
    } else if (getColor(instance) === "yellow") {
        return { backgroundColor: "rgba(255, 0, 0, 0.3)" };
    } else {
        return {};
    }
};