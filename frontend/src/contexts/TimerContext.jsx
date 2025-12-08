import { createContext, useState, useRef } from "react";
import { timeButtons } from "../utils/config";
export const TimerContext = createContext();

const TimerContextProvider = ({ children }) => {
    const [timeLeft, setTimeLeft] = useState(timeButtons[0].time);
    const [isRunning, setIsRunning] = useState(false);
    const [timeId, setTimeId] = useState(0);

    return (
        <TimerContext.Provider
            value={{
                timeLeft,
                setTimeLeft,
                isRunning,
                setIsRunning,
                timeId,
                setTimeId,
            }}
        >
            {children}
        </TimerContext.Provider>
    );
};

export default TimerContextProvider;
