import { useState, useEffect, useRef, useContext } from "react";
import { TimerContext } from "../contexts/TimerContext";
import TextContext from "../contexts/TextContext";
import { timeButtons } from "../utils/config";
import { CiTimer } from "react-icons/ci";

import { resetTimer } from "../utils/helper";
import { ScoreContext } from "../contexts/ScoreContext";
import LastKeyContext from "../contexts/LastKeyContext";
import CustomInput from "./CustomInput";

const Timer = () => {
    const [isCustomVisible, setIsCustomVisible] = useState(false);

    // global variables
    const {
        timeLeft,
        setTimeLeft,
        isRunning,
        setIsRunning,
        timeId,
        setTimeId,
    } = useContext(TimerContext);

    const { setScore } = useContext(ScoreContext);

    // global variables
    const {
        text,
        setText,
        completeText,
        isPunctuation,
        isNumbers,
        setIsPunctuation,
        setIsNumbers,
        isCustomText,
        setIsCustomText,
    } = useContext(TextContext);

    // Add LastKeyContext
    const { setLastKey, setIsCorrectKey } = useContext(LastKeyContext);

    const buttonRef = useRef(null); // Create a ref for the button
    const interval = useRef(null);

    useEffect(() => {
        if (isRunning && timeLeft > 0) {
            interval.current = setInterval(() => {
                setTimeLeft((timeLeft) => timeLeft - 1);
            }, 1000);
        }
        return () => clearInterval(interval.current);
    }, [timeLeft, isRunning]);

    useEffect(() => {
        if (timeLeft === 0) {
            setIsRunning(false);
        }
    }, [timeLeft]);

    const handleClick = () => {
        if (isRunning) {
            setIsRunning(false);
            clearInterval(interval.current);
        } else {
            if (timeLeft > 0) setIsRunning(true);
        }

        // Remove focus from the button after clicking
        if (buttonRef.current) {
            buttonRef.current.blur();
        }
    };

    const formatTime = (seconds) => {
        const minutes = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${minutes.toString().padStart(1, "0")}:${secs
            .toString()
            .padStart(2, "0")}`;
    };

    const onBtnPress = (time, id) => {
        setTimeLeft(time);
        setIsRunning(false);
        clearInterval(interval.current);
        setText(completeText);
        setTimeId(id);
        setScore(0);
        setLastKey(null);
        setIsCorrectKey(null);
    };

    // get active button class for timer buttons
    const getActiveBtn = (id) => {
        return timeId === id
            ? "text-custom-red-300 light:text-neutral-600 dark:text-white"
            : "";
    };

    const getActivBtnClass = (btn) => {
        return btn
            ? "text-custom-red-300 light:text-neutral-600 dark:text-white"
            : "";
    };

    const handleCustomInputClick = () => {
        setIsCustomVisible(true);
    };

    return (
        <>
            {isCustomVisible && (
                <CustomInput setIsCustomVisible={setIsCustomVisible} />
            )}
            {/* {console.log(isCustomText)} */}
            <div className="flex flex-col items-center justify-center">
                {/* Punctuation  */}
                <div className="flex flex-row flex-wrap justify-center items-center gap-2 bg-custom-red-150 rounded-lg px-8 py-1 sm:text-s[@media(max-width:768px)]:flex-col [@media(max-width:768px)]:gap-1 [@media(max-width:768px)]:px-4 [@media(max-width:768px)]:py-2 dark:bg-neutral-700 light:bg-neutral-200">
                    <button
                        className={
                            "flex flex-row items-center text-lg font-bold text-custom-red-200 font-[montserrat] font-medium hover:text-custom-red-400 dark:text-neutral-500 light:text-neutral-400 hover:light:text-neutral-600 hover:dark:text-neutral-50  " +
                            getActivBtnClass(isPunctuation)
                        }
                        onClick={() => {
                            setIsPunctuation(!isPunctuation);
                            setIsCustomText(false);

                            resetTimer(
                                setTimeLeft,
                                setIsRunning,
                                setText,
                                completeText,
                                timeId,
                                interval,
                                setScore,
                                setLastKey,
                                setIsCorrectKey
                            );
                        }}
                    >
                        @ punctuation
                    </button>

                    <div className="text-lg font-bold text-custom-red-300 font-[montserrat] font-medium hover:text-custom-red-800 light:text-neutral-400 dark:text-neutral-500 ">
                        |
                    </div>

                    {/* Numbers  */}
                    <button
                        className={
                            "flex flex-row items-center text-lg font-bold text-custom-red-200 font-[montserrat] font-medium hover:text-custom-red-400 dark:text-neutral-500 light:text-neutral-400 hover:light:text-neutral-600 hover:dark:text-neutral-50 " +
                            getActivBtnClass(isNumbers)
                        }
                        onClick={() => {
                            setIsNumbers(!isNumbers);
                            setIsCustomText(false);
                            resetTimer(
                                setTimeLeft,
                                setIsRunning,
                                setText,
                                completeText,
                                timeId,
                                interval,
                                setScore,
                                setLastKey,
                                setIsCorrectKey
                            );
                        }}
                    >
                        # numbers
                    </button>

                    <div className="text-lg font-bold text-custom-red-300 font-[montserrat] font-medium hover:text-custom-red-800 light:text-neutral-400 dark:text-neutral-500 ">
                        |
                    </div>

                    {/* Custom-input */}
                    <button
                        className={
                            "flex flex-row items-center text-lg font-bold text-custom-red-200 font-[montserrat] font-medium hover:text-custom-red-400 dark:text-neutral-500 light:text-neutral-400 hover:light:text-neutral-600 hover:dark:text-neutral-50 " +
                            getActivBtnClass(isCustomText)
                        }
                        onClick={handleCustomInputClick}
                    >
                        custom-input
                    </button>
                    <div className="text-lg font-bold text-custom-red-300 font-[montserrat] font-medium hover:text-custom-red-800 light:text-neutral-400 dark:text-neutral-500 ">
                        |
                    </div>

                    {/* timer bar */}
                    <div className="flex flex-row items-center text-lg font-bold text-custom-red-300 font-[montserrat] font-medium hover:light:text-neutral-700 light:text-neutral-600 dark:text-neutral-50 ">
                        <CiTimer />
                        time
                    </div>
                    <div className="flex flex-row flex-wrap gap-3">
                        {timeButtons.map((button) => (
                            <button
                                key={button.time}
                                onClick={() =>
                                    onBtnPress(button.time, button.id)
                                }
                                className={
                                    "text-lg font-bold text-custom-red-200 font-[montserrat] font-medium px-2 rounded-lg hover:bg-custom-red-200 hover:text-custom-red-400 light:text-neutral-400 dark:text-neutral-500  hover:light:bg-neutral-400 hover:light:text-neutral-800 hover:dark:bg-neutral-50 hover:dark:text-neutral-700 " +
                                    getActiveBtn(button.id)
                                }
                            >
                                {button.text}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="text-4xl p-2 font-[montserrat] font-medium text-custom-red-300 dark:text-neutral-50 light:text-neutral-600">
                    {formatTime(timeLeft)}
                </div>
                <div className="flex flex-row flex-wrap gap-3">
                    <button
                        ref={buttonRef}
                        onClick={handleClick}
                        className="text-lg font-bold text-custom-red-300 font-[montserrat] font-medium px-2 rounded-lg hover:bg-custom-red-200 hover:text-custom-red-600 w-[70px] dark:text-neutral-500 light:text-neutral-400 hover:light:bg-neutral-400 hover:light:text-neutral-800 hover:dark:bg-neutral-50 hover:dark:text-neutral-700"
                    >
                        {isRunning ? "Stop " : "Start"}
                    </button>
                    <button
                        onClick={() =>
                            resetTimer(
                                setTimeLeft,
                                setIsRunning,
                                setText,
                                completeText,
                                timeId,
                                interval,
                                setScore,
                                setLastKey,
                                setIsCorrectKey
                            )
                        }
                        className="text-lg font-bold text-custom-red-300 font-[montserrat] font-medium px-2 rounded-lg hover:bg-custom-red-200 hover:text-custom-red-600 w-[70px] dark:text-neutral-500 light:text-neutral-400 hover:light:bg-neutral-400 hover:light:text-neutral-800 hover:dark:bg-neutral-50 hover:dark:text-neutral-700"
                    >
                        Reset
                    </button>
                </div>
            </div>
        </>
    );
};

export default Timer;
