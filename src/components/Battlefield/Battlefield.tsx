import React, { useEffect, useState } from "react";
import s from "./Battlefield.module.css";
import Team from "./Team/Team.tsx";
import UnitType from "../../services/units/Unit.ts";
import generateUnits from "../../services/tools/generateUnits.ts";
import Queue from "./Queue/Queue.tsx";
import ShieldIcon from "@mui/icons-material/Shield";
import { getPossibleAttacks } from "../../services/tools/getPossibleAttacks.ts";
import Note from "../RoundInfo/Note/Note.tsx";
import { EndType } from "../../App.tsx";
import { findWinner } from "../../services/tools/endOfGame.ts";

type PropsType = {
    setNotes: (notes: Array<JSX.Element> | ((prev: Array<JSX.Element>) => Array<JSX.Element>)) => void,
    hoveredUnit: number,
    setHoveredUnit: (hoveredUnit: number | ((prev: number) => number)) => void,
    setIsEnd: (isEnd: EndType | ((prev: EndType) => EndType)) => void,
}

const Battlefield: React.FC<PropsType> = ({ setNotes, hoveredUnit, setHoveredUnit, setIsEnd }) => {
    const [round, setRound] = useState(1);
    const [units, setUnits] = useState<Array<UnitType>>([]);
    const [currTeam, setCurrTeam] = useState(0);
    const [queue, setQueue] = useState<Array<UnitType>>([]);
    const [iterator, setIterator] = useState(0);
    const [canAttack, setCanAttack] = useState<Array<number>>([]);

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
            firstQueue.forEach((unit: UnitType, index: number) => queue.push(unit, secondQueue[index]));
        } else {
            secondQueue.forEach((unit: UnitType, index: number) => queue.push(unit, firstQueue[index]));
        }
        setQueue(queue);

        setNotes([]);
        setCanAttack(getPossibleAttacks(queue[0], queue));
    }, []);

    useEffect(() => {

        if (queue.length !== 0) {
            //end of the game
            const result = findWinner(units, round);
            if (result) {
                setIsEnd(result);
            }

            //highlight
            setCanAttack(getPossibleAttacks(queue[iterator], units));

            //for paralyzed
            if (queue[iterator]) {
                if (queue[iterator].status?.includes("paralyzed")) {
                    setIterator(prev => prev + 1);
                    if (queue[iterator + 1]?.team !== queue[iterator].team) {
                        setCurrTeam(currTeam ? 0 : 1);
                    }
                }
            } else {
                setIterator(queue.length);
            }

            //for dead
            if (queue[iterator]) {
                if (queue[iterator].status === "dead") {
                    setIterator(prev => prev + 1);
                    if (queue[iterator + 1]?.team !== queue[iterator].team) {
                        setCurrTeam(currTeam ? 0 : 1);
                    }
                }
            } else {
                setIterator(queue.length);
            }
        }

        //reset round info for the next round
        if (iterator === 1 && round !== 1) {
            setNotes(prev => [prev[prev.length - 1]]);
        }

        //next round
        if (iterator && iterator === queue.length) {
            const newUnits = units
                .filter((unit: UnitType) => unit.status !== "dead")
                .map((unit: UnitType) => {
                    if (unit.status?.includes("defending")) {
                        if (unit.status === "defending") {
                            unit.setStatus(null);
                        } else {
                            unit.setStatus("paralyzed");
                        }
                    }
                    return unit;
                })
                .sort((a: UnitType, b: UnitType) => b.initiative - a.initiative);
            const firstQueue = newUnits.filter((unit: UnitType) => unit.team === 0);
            const secondQueue = newUnits.filter((unit: UnitType) => unit.team === 1);

            const queue: Array<UnitType> = [];
            if (!currTeam) {
                firstQueue.forEach((unit: UnitType, index: number) => {
                    queue.push(unit);
                    if (secondQueue[index]) {
                        queue.push(secondQueue[index]);
                    }
                });
                if (secondQueue.length > firstQueue.length) {
                    for (let i = firstQueue.length; i < secondQueue.length; i++) {
                        queue.push(secondQueue[i]);
                    }
                }
            } else {
                secondQueue.forEach((unit: UnitType, index: number) => {
                    queue.push(unit);
                    if (firstQueue[index]) {
                        queue.push(firstQueue[index]);
                    }
                });

                if (firstQueue.length > secondQueue.length) {
                    for (let i = secondQueue.length; i < firstQueue.length; i++) {
                        queue.push(firstQueue[i]);
                    }
                }
            }
            setQueue(queue);

            setRound(prev => prev + 1);
            setIterator(0);
        }
    }, [iterator]);

    //defense
    const handleDefense = () => {
        queue[iterator].setStatus("defending");
        setNotes(prev => [...prev,
            <Note attacker={queue[iterator]} target={queue[iterator]} behavior={"defending"}
                  setHoveredUnit={setHoveredUnit} key={Math.random() * 1000}/>]);
        currTeam ? setCurrTeam(0) : setCurrTeam(1);
        setIterator(prev => prev + 1);
    };

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
                  canAttack={canAttack}
                  setNotes={setNotes}
                  hoveredUnit={hoveredUnit}
                  setHoveredUnit={setHoveredUnit}
            />
            <div className={s.middle}>
                <div className={s.round}>Round {round}</div>
                <div className={s.vs}>VS</div>
                <button className={s.defend} onClick={handleDefense}>
                    <ShieldIcon fontSize={"small"}/>
                    Defense
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
                  canAttack={canAttack}
                  setNotes={setNotes}
                  hoveredUnit={hoveredUnit}
                  setHoveredUnit={setHoveredUnit}
            />
        </div>
    );
};

export default Battlefield;