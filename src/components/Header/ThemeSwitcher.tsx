import * as React from "react";

import { useTheme } from "../../context/ThemeContext";
import { toggleClass } from "../../helpers/helpToggleClass";
import { useLocalStorage } from "../../hooks/useLocalStorage";

const ThemeSwitcher = () => {
	const { currentTheme, setCurrentTheme } = useTheme();
	const [name, setName] = useLocalStorage<string>("theme", "dark");
    const isNotTheme = name === "dark" ? "light" : "dark";
    const [displayName, setDisplayName] = React.useState<string>(isNotTheme);

	React.useEffect(() => {
		const detectUserDarkMode = () => {
			window
				.matchMedia("(prefers-color-scheme: dark)")
				.addEventListener("change", event => {
					if (event.matches) {
						setCurrentTheme("dark");
                        setDisplayName("Light");
					} else {
						setCurrentTheme("light");
                        setDisplayName("Dark");
					}
				});
		};

		detectUserDarkMode();
	}, [setCurrentTheme]);

	React.useEffect(() => {
		toggleClass(currentTheme);
		setName(currentTheme);
	}, [currentTheme]);

	const switchCurrentTheme = () => {

        if (name === "dark") {
            setDisplayName("Dark");
            setCurrentTheme("light");
        } else {
            setDisplayName("Light");
            setCurrentTheme("dark");
        }

	};

	return (
        <div className="theme" data-cursor="true" onClick={() => switchCurrentTheme()}>
            <span>{displayName}</span>
        </div>
	);
};

export default ThemeSwitcher;