import { useContext, useState, useEffect, useRef } from "react";
import { ScoreContext } from "../contexts/ScoreContext";
import { TimerContext } from "../contexts/TimerContext";
import { timeButtons } from "../utils/config";

const Score = () => {
    const [isOver, setIsOver] = useState(false);
    const { score, setScore } = useContext(ScoreContext);
    const { timeLeft, isRunning, timeId, setTimeId } = useContext(TimerContext);

    useEffect(() => {
        if (timeLeft === 0 && isRunning === false) {
            setIsOver(true);
        }
    }, [isRunning, timeLeft]);
    const calculateScore = () => {
        return (
            ((60 / (timeButtons[timeId].time - timeLeft)) * score) /
            6
        ).toFixed(2);
    };
    return (
        <div className="flex flex-row gap-2 mt-2 p-2 items-baseline [@media(max-width:700px)]:mt-0">
            <span className="text-7xl text-custom-red-300 font-indie-flower font-bold [@media(max-width:700px)]:text-6xl dark:text-neutral-50 light:text-neutral-600 ">
                {score === 0 || score === Infinity ? "0" : calculateScore()}
            </span>
            <span className="text-xl font-[arial] font-bold text-bittersweet dark:text-neutral-500 light:text-neutral-400">
                WPM
            </span>
        </div>
    );
};

export default Score;
