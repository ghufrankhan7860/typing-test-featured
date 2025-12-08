import { useContext, useEffect, useState } from "react";
import LastKeyContext from "../contexts/LastKeyContext";
import TextContext from "../contexts/TextContext";
import { ScoreContext } from "../contexts/ScoreContext";
import { TimerContext } from "../contexts/TimerContext";
import { wordChecker } from "../utils/helper";
import { keyChars } from "../utils/config";

const KeyBoard = () => {
    const { lastKey, setLastKey, isCorrectKey, setIsCorrectKey } =
        useContext(LastKeyContext);

    const { text, setText } = useContext(TextContext);
    const { isRunning } = useContext(TimerContext);
    const { score, setScore } = useContext(ScoreContext);

    const getButtonClass = (btn) => {
        // Base styling for ALL keys
        let btnClass = "";
        let otherBtns =
            "p-3 m-1 rounded-sm [@media(max-width:700px)]:sm [@media(max-width:700px)]:px-[11px] [@media(max-width:700px)]:py-2.5 [@media(max-width:700px)]:mx-0.5 [@media(max-width:700px)]:my-2 ";
        let spaceBtn =
            "p-2 px-15 m-1 rounded-sm [@media(max-width:700px)]:sm [@media(max-width:700px)]:px-[11px] [@media(max-width:700px)]:py-2.5 [@media(max-width:700px)]:mx-0.5 [@media(max-width:700px)]:my-2 [@media(max-width:700px)]:w-1/2 ";

        if (btn === lastKey || (lastKey === " " && btn === "space")) {
            // Only change background and text colors, not sizing
            btnClass += isCorrectKey
                ? (btn === "space" ? spaceBtn : otherBtns) +
                  "bg-green-300 dark:bg-green-500 dark:text-green-800 light:bg-green-200 text-green-800"
                : (btn === "space" ? spaceBtn : otherBtns) +
                  "bg-red-300 dark:bg-red-200 dark:text-red-800 light:bg-red-200 text-red-800";
        } else {
            btn === "space"
                ? (btnClass +=
                      spaceBtn +
                      "bg-custom-red-200 text-custom-red-100 hover:text-custom-red-800 light:bg-neutral-500 dark:bg-neutral-50 dark:text-neutral-600 light:text-neutral-50")
                : (btnClass +=
                      otherBtns +
                      "bg-custom-red-200 text-custom-red-100 hover:text-custom-red-800 light:bg-neutral-500 dark:bg-neutral-50 dark:text-neutral-600 light:text-neutral-50");
        }

        return btnClass;
    };

    const handleClick = (btn) => {
        const check = wordChecker(
            btn,
            lastKey,
            setLastKey,
            text,
            setText,
            isRunning,
            score,
            setScore
        );
        setIsCorrectKey(check);
    };

    return (
        <div className="flex flex-col justify-center items-center border-1 border-custom-red-200 rounded-sm [@media(max-height:680px)]:hidden  [@media(max-width:700px)]:h-64 [@media(max-width:700px)]:w-full [@media(min-width:700px)]:p-3 dark:border-neutral-50 light:border-neutral-600">
            {keyChars.map((row, index) => {
                if (row == "space") {
                    return (
                        <button
                            className={
                                " px-15 [@media(max-width:1100px)]:px " +
                                getButtonClass(row)
                            }
                            key={"space-row" + index}
                            onClick={() => {
                                handleClick(" ");
                            }}
                        >
                            Space
                        </button>
                    );
                }

                return (
                    <div
                        className="flex flex-row flex-wrap justify-center"
                        key={"row" + index}
                    >
                        {row.map((char, idx) => {
                            return (
                                <button
                                    className={getButtonClass(char)}
                                    key={char + idx}
                                    onClick={() => handleClick(char)}
                                >
                                    {char}
                                </button>
                            );
                        })}
                    </div>
                );
            })}
        </div>
    );
};

export default KeyBoard;
