import React, { useEffect, useState } from "react";
import s from "./Battlefield.module.css";
import Team from "./Team/Team.tsx";
import UnitType from "../../services/units/Unit.ts";
import generateUnits from "../../services/tools/generateUnits.ts";
import Queue from "./Queue/Queue.tsx";

const Battlefield: React.FC = () => {
    const [round, setRound] = useState(1);
    const [units, setUnits] = useState<Array<UnitType>>([]);
    const [index, setIndex] = useState<number>(0);
    const [currTeam, setCurrTeam] = useState(0);
    const [firstQueue, setFirstQueue] = useState<Array<UnitType>>([]);
    const [secondQueue, setSecondQueue] = useState<Array<UnitType>>([]);
    const [queue, setQueue] = useState<Array<UnitType>>([]);
    const [iterator, setIterator] = useState(0);

    useEffect(() => {
        const units = generateUnits();
        setUnits(units);
        const randomIndex = Math.round(Math.random());
        setIndex(randomIndex);
        setCurrTeam(randomIndex);

        const firstQueue = units.slice(0, 6).sort((a: UnitType, b: UnitType) => b.initiative - a.initiative);
        const secondQueue = units.slice(6, 12).sort((a: UnitType, b: UnitType) => b.initiative - a.initiative);
        setFirstQueue(firstQueue);
        setSecondQueue(secondQueue);

        const queue: Array<UnitType> = [];
        if (!randomIndex) {
            firstQueue.map((unit: UnitType, index: number) => queue.push(unit, secondQueue[index]));
        } else {
            secondQueue.map((unit: UnitType, index: number) => queue.push(unit, firstQueue[index]));
        }
        setQueue(queue);

    }, []);

    return (
        <div className={s.wrapper}>
            <Team color="cyan"
                  units={units}
                  currTeam={currTeam}
                  setCurrTeam={setCurrTeam}
                  queue={secondQueue}
                  iterator={iterator}
                  setIterator={setIterator}
                  index={0}
                  isActive={!currTeam}
            />
            <div className={s.middle}>
                <div className={s.round}>Round {round}</div>
                <div className={s.vs}>VS</div>
                <button className={s.defend} onClick={() => setRound(prev => prev + 1)}>Defend</button>
                <Queue queue={queue} colors={["cyan", "orange"]} first={index}/>
            </div>
            <Team color="orange"
                  units={units}
                  currTeam={currTeam}
                  setCurrTeam={setCurrTeam}
                  queue={firstQueue}
                  iterator={iterator}
                  setIterator={setIterator}
                  index={1}
                  isActive={!!currTeam}
            />
        </div>
    );
};

export default Battlefield;