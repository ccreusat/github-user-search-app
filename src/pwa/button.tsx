import { useEffect } from "react";
import style from "./button.module.css";

// import {InstallPWA} from "./install";

type ButtonProps = {
    text?: string;
    class?: string;
    type?: string;
};

export const ButtonPWA = ({ text }: ButtonProps) => {
    
    useEffect(() => {
        //InstallPWA();
    }, [])

    return <button className={style.addButton} type="button">{text}</button>
}