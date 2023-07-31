function toggleButtonDisabled(isEnabled, buttons) {
	if (buttons) {
		if (!Array.isArray(buttons)) {
			buttons = [buttons];
		}
		buttons.forEach((button) => {
			if (isEnabled) {
				button.removeAttribute("disabled");
			} else {
				button.setAttribute("disabled", true);
			}
		});
	} else {
		return;
	}
}

export default toggleButtonDisabled;
