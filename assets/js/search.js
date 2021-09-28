var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
export const Search = () => {
    const ENDPOINT = "https://api.github.com/users";
    const userContainer = document.getElementById("user");
    const searchForm = document.getElementById("search");
    const searchInput = document.getElementById("search-input");
    const searchButton = document.getElementById("search-button");
    const error = document.getElementById("error");
    const renderTemplate = (user) => {
        let date = new Date(user.created_at);
        date = date.toDateString();
        date = date.slice(3, 20);
        return `
    <div class="user__top">
      <figure class="user__avatar"><img src=${user.avatar_url} width="120" height="120" alt=${user.login}></figure>
      <div>
        <strong class="user__name">${user.name ? user.name : user.login}</strong>
        <span class="user__login">@${user.login}</span>
        <p class="user__date">Joined ${date}</p>
      </div>
    </div>
    <div class="user__content">
      <p class="user__text text">${user.bio ? user.bio : "This profile has no bio"}</p>
      <div class="user__stats">
        <div><span class="text">Repos</span> <strong>${user.public_repos}</strong></div>
        <div><span class="text">Followers</span> <strong>${user.followers}</strong></div>
        <div><span class="text">Following</span> <strong>${user.following}</strong></div>
      </div>
      <ul class="user__info">
        <li class="user__item text">
        <div class="image-container"><img src="/assets/images/icon-location.svg" height="20" alt="location" /></div> ${user.location
            ? user.location
            : "<span class='text-disabled'>Not Available</span>"}</li>
        <li class="user__item text"><div class="image-container"><img src="/assets/images/icon-twitter.svg" height="20" alt="twitter" /></div> ${user.twitter_username
            ? user.twitter_username
            : "<span class='text-disabled'>Not Available</span>"}</li>
        <li class="user__item text"><div class="image-container"><img src="/assets/images/icon-website.svg" height="20" alt="website" /></div> ${user.blog
            ? "<a target='_blank' rel='noopener' href='" +
                user.blog +
                "'>Website link</a>"
            : "<span class='text-disabled'>Not Available</span>"}</li>
        <li class="user__item text"><div class="image-container"><img src="/assets/images/icon-company.svg" height="20" alt="company" /></div> ${user.company
            ? user.company
            : "<span class='text-disabled'>Not Available</span>"}</li>
      </ul>
  </div>`;
    };
    const getGithubUser = (username) => __awaiter(void 0, void 0, void 0, function* () {
        let url = `${ENDPOINT}/${username}`;
        error.style.display = "none";
        if (username !== "") {
            try {
                const response = yield fetch(url);
                let user = yield response.json();
                if (response.ok !== false) {
                    error.style.display = "none";
                    userContainer.innerHTML = renderTemplate(user);
                }
                else {
                    error.textContent = "No results";
                    error.style.display = "block";
                }
            }
            catch (error) {
                console.log("error", error);
            }
        }
        searchInput.value = "";
    });
    getGithubUser("ccreusat");
    searchForm.onsubmit = (event) => event.preventDefault();
    searchButton.addEventListener("click", () => {
        if (searchInput.value !== "") {
            error.style.display = "none";
            getGithubUser(searchInput.value);
        }
        else {
            error.textContent = "You have to enter a username.";
            error.style.display = "block";
        }
    });
};
