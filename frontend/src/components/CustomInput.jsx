import { useRef, useContext, useEffect } from "react";
import TextContext from "../contexts/TextContext";
import CustomTextContext from "../contexts/CustomTextContext";

const CustomInput = ({ setIsCustomVisible }) => {
    const { customText, setCustomText } = useContext(CustomTextContext);
    const textareaRef = useRef(null);

    const {
        setText,
        setCompleteText,
        setIsPunctuation,
        setIsNumbers,
        isCustomText,
        setIsCustomText,
    } = useContext(TextContext);

    const handleXbtn = () => {
        setIsCustomVisible(false);
    };

    const handleOnChange = (e) => {
        setCustomText(e.target.value);
    };

    const handleApply = () => {
        setText(customText);
        setCompleteText(customText);
        setIsCustomVisible(false);
        setIsPunctuation(false);
        setIsNumbers(false);
        setIsCustomText(true);
    };

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.focus();
        }
    }, []);

    return (
        <>
            <div className="fixed inset-0 bg-black/30 backdrop-blur-sm z-10 " />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-4xl bg-custom-red-150 h-3/4 z-50 rounded-lg shadow-lg [@media(max-width:400px)]:w-90 [@media(max-width:400px)]:h-3/5 dark:bg-neutral-800 light:bg-neutral-200">
                <div className="flex flex-col h-full p-4 gap-1 ">
                    <button
                        className="ml-auto text-gray-700 hover:text-custom-red-800 px-3 py-1 text-lg bg-custom-red-300 text-white rounded-md m-1 text-center cursor-pointer dark:bg-neutral-600 dark:text-neutral-50 light:bg-neutral-400"
                        onClick={handleXbtn}
                    >
                        x
                    </button>
                    <textarea
                        ref={textareaRef}
                        className="resize-none w-full border-1 border-custom-red-300  mx-auto h-full p-3 rounded-md bg-custom-red-100 focus:outline-0 wrap-break-word [@media(max-width:400px)]:w-full dark:bg-neutral-700 dark:border-black dark:text-white light:bg-neutral-100 light:text-black light:border-neutral-800"
                        type="text-box"
                        value={customText}
                        onChange={handleOnChange}
                    />
                    <button
                        className="ml-auto mt-auto bg-custom-red-300 hover:text-custom-red-800 text-white px-4 py-2 rounded-md light:bg-neutral-400 dark:bg-neutral-600 dark:text-neutral-50"
                        onClick={handleApply}
                    >
                        Apply
                    </button>
                </div>
            </div>
        </>
    );
};
export default CustomInput;
