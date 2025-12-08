import { useState, useEffect, useContext } from "react";
import LastKeyContext from "./LastKeyContext";
import TextContext from "./TextContext";
import { TimerContext } from "./TimerContext";
import { ScoreContext } from "./ScoreContext";

const LastKeyContextProvider = ({ children }) => {
    const [lastKey, setLastKey] = useState(null);

    const [isShiftPressed, setIsShiftPressed] = useState(false);
    const [isCapsLockOn, setIsCapsLockOn] = useState(false);
    const [isCorrectKey, setIsCorrectKey] = useState(null);
    const { text, setText } = useContext(TextContext);
    const { isRunning } = useContext(TimerContext);

    const { score, setScore } = useContext(ScoreContext);
    useEffect(() => {
        const handleKeyDown = (e) => {

            if (e.key === "Enter") {
                setLastKey("Enter");
            } else {
                setLastKey(e.key);
            }


            if (e.key === "Shift") {
                setIsShiftPressed(true);
            }
            if (e.getModifierState("CapsLock")) {
                setIsCapsLockOn(true);
            } else {
                setIsCapsLockOn(false);
            }
            if (e.key === "Backspace") {
                setText(text.slice(0, -1));
                return;
            }
            if ((e.key === "Enter" && text[0] === "\n") || e.key === text[0]) {
                
                setText(text.slice(1));
                setIsCorrectKey(true);
                setScore(score + 1);


            } else {
                setIsCorrectKey(false);

                
            }
        };

        const handleKeyUp = (e) => {
            if (e.key === "Shift") {
                setIsShiftPressed(false);
            }
        };

        if (isRunning) {
            window.addEventListener("keydown", handleKeyDown);
            window.addEventListener("keyup", handleKeyUp);
        }

        return () => {
            window.removeEventListener("keydown", handleKeyDown);
            window.removeEventListener("keyup", handleKeyUp);
        };
    }, [text, setText, isCorrectKey, isRunning]);

    return (
        <LastKeyContext.Provider
            value={{
                lastKey,
                setLastKey,
                isShiftPressed,
                setIsShiftPressed,
                isCapsLockOn,
                setIsCapsLockOn,
                isCorrectKey,
                setIsCorrectKey,
            }}
        >
            {children}
        </LastKeyContext.Provider>
    );
};

export default LastKeyContextProvider;
