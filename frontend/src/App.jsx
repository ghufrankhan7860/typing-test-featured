import React from "react";

import DisplayText from "./components/DisplayText";
import KeyBoard from "./components/Keyboard";
import Score from "./components/Score";
import Timer from "./components/Timer";
import Navbar from "./components/Navbar";

import TextContextProvider from "./contexts/TextContextProvider";
import LastKeyContextProvider from "./contexts/LastKeyContextProvider";
import TimerContextProvider from "./contexts/TimerContext";
import ScoreContextProvider from "./contexts/ScoreContext";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import { CustomTextProvider } from "./contexts/CustomTextContext";

// [#323437]

const App = () => {
    return (
        <div className="flex flex-col flex-wrap items-center h-screen bg-custom-red-100 px-4 sm:px-8 md:px-12 lg:px-20 dark:bg-neutral-800 light:bg-white">
            <ThemeContextProvider>
                <TimerContextProvider>
                    <CustomTextProvider>
                        <TextContextProvider>
                            <ScoreContextProvider>
                                <LastKeyContextProvider>
                                    <Navbar />
                                    <Timer />
                                    <Score />
                                    <DisplayText />
                                    <KeyBoard />
                                </LastKeyContextProvider>
                            </ScoreContextProvider>
                        </TextContextProvider>
                    </CustomTextProvider>
                </TimerContextProvider>
            </ThemeContextProvider>
        </div>
    );
};

export default App;
