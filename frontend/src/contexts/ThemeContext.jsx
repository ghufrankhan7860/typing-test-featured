import { useState, useEffect, createContext } from "react";

const ThemeContext = createContext();

// dark, light , colorful
export const ThemeContextProvider = ({ children }) => {
    const [theme, setTheme] = useState(() => {
        return localStorage.getItem("theme") || "light";
    });

    useEffect(() => {
        localStorage.setItem("theme", theme);
        if (theme === "dark") {
            document.documentElement.classList.remove("light");
            document.documentElement.classList.add("dark");
        } else if (theme === "light") {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.add("light");
        } else {
            document.documentElement.classList.remove("dark");
            document.documentElement.classList.remove("light");
        }
    }, [theme]);

    const toggleTheme = () => {
        setTheme((prev) =>
            prev === "light" ? "dark" : prev === "dark" ? "" : "light"
        );
    };

    return (
        <ThemeContext.Provider value={{ theme, toggleTheme }}>
            {children}
        </ThemeContext.Provider>
    );
};

export default ThemeContext;
