export const Search = () => {
  const ENDPOINT = "https://api.github.com/users";
  const userContainer = document.getElementById("user");
  const searchForm = document.getElementById("search");
  const searchInput = < HTMLInputElement > document.getElementById("search-input");
  const searchButton = document.getElementById("search-button");
  const error = document.getElementById("error");

  const renderTemplate = (user: any) => {
    let date: any = new Date(user.created_at);
    date = date.toDateString();
    date = date.slice(3, 20);

    return `
    <div class="user__top">
      <figure class="user__avatar"><img src=${
        user.avatar_url
      } width="120" height="120" alt=${user.login}></figure>
      <div>
        <h2 class="user__name">${
          user.name ? user.name : user.login
        }</h2>
        <span class="user__login">@${user.login}</span>
        <p class="user__date">Joined ${date}</p>
      </div>
    </div>
    <div class="user__content">
      <p class="user__text text">${
        user.bio ? user.bio : "This profile has no bio"
      }</p>
      <ul class="user__stats">
        <li><span class="text">Repos</span> <strong>${
          user.public_repos
        }</strong></li>
        <li><span class="text">Followers</span> <strong>${
          user.followers
        }</strong></li>
        <li><span class="text">Following</span> <strong>${
          user.following
        }</strong></li>
      </ul>
      <ul class="user__info">
        <li class="user__item text">
        <div class="image-container"><img src="/assets/images/icon-location.svg" height="20" alt="" aria-hidden="true" /></div> ${
          user.location
            ? user.location
            : "<span class='text-disabled'>Not Available</span>"
        }</li>
        <li class="user__item text"><div class="image-container"><img src="/assets/images/icon-twitter.svg" height="20" alt="" aria-hidden="true" /></div> ${
          user.twitter_username
            ? user.twitter_username
            : "<span class='text-disabled'>Not Available</span>"
        }</li>
        <li class="user__item text"><div class="image-container"><img src="/assets/images/icon-website.svg" height="20" alt="" aria-hidden="true" /></div> ${
          user.blog
            ? "<a target='_blank' rel='noopener' href='" +
              user.blog +
              "'>Website link</a>"
            : "<span class='text-disabled'>Not Available</span>"
        }</li>
        <li class="user__item text"><div class="image-container"><img src="/assets/images/icon-company.svg" height="20" alt="" aria-hidden="true" /></div> ${
          user.company
            ? user.company
            : "<span class='text-disabled'>Not Available</span>"
        }</li>
      </ul>
  </div>`;
  };

  const getGithubUser = async (username: string) => {
    let url = `${ENDPOINT}/${username}`;

    error.style.display = "none";

    if (username !== "") {
      try {
        const response = await fetch(url);
        let user = await response.json();

        if (response.ok !== false) {
          error.style.display = "none";
          userContainer.innerHTML = renderTemplate(user);
        } else {
          error.textContent = "No results";
          error.style.display = "block";
        }
      } catch (error) {
        console.log("error", error);
      }
    }

    searchInput.value = "";
  };

  getGithubUser("ccreusat");

  searchForm.onsubmit = (event) => event.preventDefault();

  searchButton.addEventListener("click", () => {
    if (searchInput.value !== "") {
      error.style.display = "none";
      getGithubUser(searchInput.value);
    } else {
      error.textContent = "You have to enter a username.";
      error.style.display = "block";
    }
  });

}