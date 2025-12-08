import TextContext from "./TextContext";
import { useEffect, useState } from "react";

import { getText } from "../utils/helper";

const TextContextProvider = ({ children }) => {
    const [text, setText] = useState("");
    const [wordsLen, setWordsLen] = useState(0);
    const [completeText, setCompleteText] = useState("");
    const [isPunctuation, setIsPunctuation] = useState(false);
    const [isNumbers, setIsNumbers] = useState(false);
    const [isCustomText, setIsCustomText] = useState(false);

    useEffect(() => {
        const tempText = getText(isPunctuation, isNumbers);
        setText(tempText);
        setCompleteText(tempText);
        setWordsLen(tempText.length);
    }, [isPunctuation, isNumbers]);

    return (
        <TextContext.Provider
            value={{
                text,
                setText,
                completeText,
                setCompleteText,
                wordsLen,
                setWordsLen,
                isPunctuation,
                setIsPunctuation,
                isNumbers,
                setIsNumbers,
                isCustomText,
                setIsCustomText,
            }}
        >
            {children}
        </TextContext.Provider>
    );
};

export default TextContextProvider;
