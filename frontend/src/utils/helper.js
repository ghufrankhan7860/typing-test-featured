import { timeButtons } from "./config";
import {
    simpleText,
    punctuationText,
    numbersText,
    paragraphText,
} from "./config";

export const wordChecker = (
    btn,
    lastKey,
    setLastKey,
    text,
    setText,
    isRunning,
    score,
    setScore
) => {
    setLastKey(btn);
    if (isRunning) {
        if (btn === text[0]) {
            setLastKey(text[0]);
            setText(text.slice(1));
            setScore(score + 1);
            return true;
        } else {
            return false;
        }
    }
};

export const resetTimer = (
    setTimeLeft,
    setIsRunning,
    setText,
    completeText,
    timeId,
    interval,
    setScore,
    setLastKey,
    setIsCorrectKey
) => {
    setTimeLeft(timeButtons[timeId].time);
    setIsRunning(false);
    clearInterval(interval);
    setText(completeText);
    setScore(0);
    setLastKey(null);
    setIsCorrectKey(null);
};

const getDisplayText = (text) => {
    const textArray = text.split(" ");
    let randomIdx = Math.floor(Math.random() * (textArray.length - 1));
    if (randomIdx < 0) {
        randomIdx = 0;
    }
    const displayText = textArray.slice(randomIdx, randomIdx + 300).join(" ");
    return displayText;
};

export const getText = (isPunctuation, isNumbers) => {
    if (isPunctuation && isNumbers) {
        return getDisplayText(paragraphText);
    } else if (isPunctuation) {
        return getDisplayText(punctuationText);
    } else if (isNumbers) {
        return getDisplayText(numbersText);
    } else {
        return getDisplayText(simpleText);
    }
};
