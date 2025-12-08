import { useContext } from "react";
import TextContext from "../contexts/TextContext";
import { getText } from "../utils/helper";
import { CiLight, CiDark } from "react-icons/ci";
import { IoIosColorPalette } from "react-icons/io";
import ThemeContext from "../contexts/ThemeContext";

const Navbar = () => {
    const {
        setText,
        isPunctuation,
        isNumbers,
        setCompleteText,
        setWordsLen,
        setIsCustomText,
    } = useContext(TextContext);

    const { theme, toggleTheme } = useContext(ThemeContext);
    return (
        <div className="flex justify-between w-full text-2xl md:text-4xl py-3 sm:py-4 md:py-5 font-[montserrat] font-medium lowercase rounded-xl [@media(max-width:700px)]:text-xl text-custom-red-600 light:text-neutral-700 dark:text-neutral-100 bg-custom-red-100 light:bg-white dark:bg-neutral-800">
            <button
                className="cursor-pointer text-custom-red-600 light:text-neutral-700 dark:text-neutral-50"
                onClick={() => {
                    const tempText = getText(isPunctuation, isNumbers);
                    setText(tempText);
                    setCompleteText(tempText);
                    setWordsLen(tempText.length);
                    setIsCustomText(false);
                }}
            >
                Typing Tester
            </button>

            <button
                onClick={(e) => {
                    toggleTheme();
                    e.currentTarget.blur();
                }}
                className="relative group"
            >
                {theme === "dark" ? (
                    <CiDark className="text-neutral-100 dark:text-neutral-100 light:text-neutral-700" />
                ) : theme === "" ? (
                    <IoIosColorPalette className="text-custom-red-300 dark:text-custom-red-200 light:text-custom-red-300" />
                ) : (
                    <CiLight className="text-neutral-700 dark:text-neutral-100 light:text-neutral-700" />
                )}
                <span className="absolute right-1/2 top-3 -translate-x-1/2 bottom-full mb-2 px-2 py-1 rounded text-white text-xs opacity-0 group-hover:opacity-100 transition pointer-events-none whitespace-nowrap z-10">
                    {theme === "dark" ? (
                        <span className="text-neutral-100">Dark Mode</span>
                    ) : theme === "" ? (
                        <span className="text-custom-red-300">
                            Colorful Mode
                        </span>
                    ) : (
                        <span className="text-neutral-600">Light Mode</span>
                    )}
                </span>
            </button>
        </div>
    );
};

export default Navbar;
