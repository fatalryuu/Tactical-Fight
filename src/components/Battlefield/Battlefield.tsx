import React, { useEffect, useState } from "react";
import s from "./Battlefield.module.css";
import Team from "./Team/Team.tsx";
import UnitType from "../../services/units/Unit.ts";
import generateUnits from "../../services/tools/generateUnits.ts";
import Queue from "./Queue/Queue.tsx";
import ShieldIcon from '@mui/icons-material/Shield';

const Battlefield: React.FC = () => {
    const [round, setRound] = useState(1);
    const [units, setUnits] = useState<Array<UnitType>>([]);
    const [currTeam, setCurrTeam] = useState(0);
    const [queue, setQueue] = useState<Array<UnitType>>([]);
    const [iterator, setIterator] = useState(0);

    useEffect(() => {
        const units = generateUnits();
        setUnits(units);
        const randomIndex = Math.round(Math.random());
        setCurrTeam(randomIndex);

        const firstQueue = units.slice(0, 6)
            .sort((a: UnitType, b: UnitType) => b.initiative - a.initiative);
        const secondQueue = units.slice(6, 12)
            .sort((a: UnitType, b: UnitType) => b.initiative - a.initiative);

        const queue: Array<UnitType> = [];
        if (!randomIndex) {
            firstQueue.map((unit: UnitType, index: number) => queue.push(unit, secondQueue[index]));
        } else {
            secondQueue.map((unit: UnitType, index: number) => queue.push(unit, firstQueue[index]));
        }
        setQueue(queue);

    }, []);

    //next round
    useEffect(() => {
        if (iterator && iterator === queue.length - 1) {
            const firstQueue = units.slice(0, 6)
                .filter((unit: UnitType) => unit.currHP > 0)
                .sort((a: UnitType, b: UnitType) => b.initiative - a.initiative);
            const secondQueue = units.slice(6, 12)
                .filter((unit: UnitType) => unit.currHP > 0)
                .sort((a: UnitType, b: UnitType) => b.initiative - a.initiative);

            const queue: Array<UnitType> = [];
            let index = 0;
            if (!currTeam) {
                firstQueue.map((unit: UnitType) => queue.push(unit, secondQueue[index++]));
                for (let i = index; i < secondQueue.length; i++) {
                    queue.push(secondQueue[i]);
                }
            } else {
                secondQueue.map((unit: UnitType) => queue.push(unit, firstQueue[index++]));
                for (let i = index; i < firstQueue.length; i++) {
                    queue.push(firstQueue[i]);
                }
            }
            setQueue(queue);
            setRound(prev => prev + 1);
            setIterator(0);
        }
    }, [iterator]);

    const handleDefend = () => {
        queue[iterator].setStatus("defending");
        currTeam ? setCurrTeam(0) : setCurrTeam(1);
        setIterator(prev => prev + 1);
    }

    return (
        <div className={s.wrapper}>
            <Team color="cyan"
                  units={units}
                  currTeam={currTeam}
                  setCurrTeam={setCurrTeam}
                  queue={queue}
                  iterator={iterator}
                  setIterator={setIterator}
                  index={0}
                  isActive={!currTeam}
            />
            <div className={s.middle}>
                <div className={s.round}>Round {round}</div>
                <div className={s.vs}>VS</div>
                <button className={s.defend} onClick={handleDefend}>
                    <ShieldIcon fontSize={"small"}/>
                    Defend
                </button>
                <Queue queue={queue} colors={["cyan", "orange"]}/>
            </div>
            <Team color="orange"
                  units={units}
                  currTeam={currTeam}
                  setCurrTeam={setCurrTeam}
                  queue={queue}
                  iterator={iterator}
                  setIterator={setIterator}
                  index={1}
                  isActive={!!currTeam}
            />
        </div>
    );
};

export default Battlefield;