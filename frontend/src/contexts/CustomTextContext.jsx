import { useState, createContext } from "react";

const CustomTextContext = createContext();
export const CustomTextProvider = ({ children }) => {
    const [customText, setCustomText] = useState("");

    return (
        <CustomTextContext.Provider value={{ customText, setCustomText }}>
            {children}
        </CustomTextContext.Provider>
    );
};

export default CustomTextContext;