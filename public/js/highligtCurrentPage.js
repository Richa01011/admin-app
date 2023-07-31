function highlightActivePage() {
	const currentUrl = window.location.href;
	const navMenus = document.querySelectorAll("#nav-menu-links");
	navMenus.forEach((navMenu) => {
		const links = navMenu.querySelectorAll("a");
		links.forEach((link) => {
			link.classList.remove("active");
		});

		for (var i = 0; i < links.length; i++) {
			if (links[i].href == currentUrl) {
				links[i].classList.add("active");
				break;
			}
		}
	});
}

export default highlightActivePage;
