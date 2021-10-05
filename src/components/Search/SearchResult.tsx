import { useState, useEffect } from "react";
import "./SearchResult.css";

type SearchResultProps = {
    data: any;
};

export const SearchResult = ({ data }:SearchResultProps) => {
    const [user, setUser] = useState(data);
    
    let date: any = new Date(user.created_at);
        date = date.toDateString();
        date = date.slice(3, 20);

    useEffect(() => {
        setUser(data);
    }, [data])

    return (
        <div id="user" data-id={user.id} className="user bg">
            <div className="user__top">
                <figure className="user__avatar"><img src={user.avatar_url} width="120" height="120" alt={user.login} /></figure>
                <div>
                    <h2 className="user__name">{user.name ? user.name : user.login}</h2>
                    <span className="user__login">@{user.login}</span>
                    <p className="user__date">Joined {date}</p>
                </div>
            </div>
            <div className="user__content">
                <p className="user__text text">{user.bio ? user.bio : "This profile has no bio"}</p>
                <ul className="user__stats">
                    <li><span className="text">Repos</span> <strong>{user.public_repos}</strong></li>
                    <li><span className="text">Followers</span> <strong>{user.followers}</strong></li>
                    <li><span className="text">Following</span> <strong>{user.following}</strong></li>
                </ul>
                <ul className="user__info">
                    <li className="user__item text">
                    <div className="image-container"><img src="src/images/icon-location.svg" height="20" aria-hidden="true" /></div> {
                        user.location
                        ? user.location
                        : <span className='text-disabled'>Not Available</span>
                    }</li>
                    <li className="user__item text"><div className="image-container"><img src="src/images/icon-twitter.svg" height="20" aria-hidden="true" /></div> {
                        user.twitter_username
                        ? user.twitter_username
                        : <span className='text-disabled'>Not Available</span>
                    }</li>
                    <li className="user__item text"><div className="image-container"><img src="src/images/icon-website.svg" height="20" aria-hidden="true" /></div> {
                        user.blog
                        ? <a target='_blank' rel='noopener' href='" +
                        user.blog +
                        "'>Website link</a>
                        : <span className='text-disabled'>Not Available</span>
                    }</li>
                    <li className="user__item text"><div className="image-container"><img src="src/images/icon-company.svg" height="20" aria-hidden="true" /></div> {
                        user.company
                        ? user.company
                        : <span className='text-disabled'>Not Available</span>
                    }</li>
                </ul>
            </div>
        </div>
    )
}