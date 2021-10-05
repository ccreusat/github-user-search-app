import React, { useEffect, useState } from 'react';
import "./SearchInput.css";

type SearchInputProps = {
    fetchUser: (username: string) => void;
    errors: string;
}

export const SearchInput = ({ fetchUser, errors }:SearchInputProps) => {
    const [username, setUsername] = useState<string>("");
    const [error, setError] = useState<string>("");

    const eventPreventDefault = (event: React.FormEvent): void => event.preventDefault();

    const handleOnChange = ({ target }: any) => {
        let { value } = target;

        if (value === "") {
            setError("Enter a username");
        };

        if (value !== "") {
            setUsername(value);
            setError("");
        };
    }

    const onClick = () => {
        if (username) fetchUser(username);
        if (!username) setError("Enter a username");
    }

    useEffect(() => {
        if (errors !== "") setError("No results");
    }, [errors]);

    return (
        <form id="search" className="search bg" autoComplete="off" onSubmit={eventPreventDefault}>
            {error && <span id="error" className="error" style={{display:"block"}}>{error}</span>}
            <input type="text" name="search" id="search-input" placeholder="Search GitHub username..." onChange={handleOnChange} />
            <button id="search-button" className="button" type="submit" onClick={onClick} data-cursor="true">Search</button>
        </form>
    )
}