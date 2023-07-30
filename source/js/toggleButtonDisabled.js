function toggleButtonDisabled(isEnabled, button) {
	if (button) {
		if (isEnabled) {
			button.removeAttribute("disabled");
		} else {
			button.setAttribute("disabled", true);
		}
	} else {
		return;
	}
}

export default toggleButtonDisabled;
