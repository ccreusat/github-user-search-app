import "./Header.css";
import ThemeSwitcher from "./ThemeSwitcher";

type HeaderProps = {
    name: string;
};

export const Header = ({ name }:HeaderProps) => {
    return (
        <header className="app__header">
            <h1 className="logo">{name}</h1>
            <ThemeSwitcher />
            {/* <div className="theme" data-cursor="true">
                <span>Light</span>
            </div> */}
        </header>
    )
}