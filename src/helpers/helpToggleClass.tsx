export const toggleClass = (theme: any) => {
	const $body = document.body;

	$body.removeAttribute("class");
	$body.classList.add(theme);
};