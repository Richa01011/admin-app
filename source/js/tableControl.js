import toggleButtonDisabled from "./toggleButtonDisabled.js";

export function tableCheckboxes(tbody, buttons, toggleCheckAllButton) {
	const checkboxes = tbody.querySelectorAll('tr input[type="checkbox"');
	function updateCheckedState() {
		let anyChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
		let checkdCount = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
		let oneOfChecked = checkdCount === 1;

		buttons.forEach((button) => {
			switch (button.getAttribute("data-disabled-toggle")) {
				case "any": {
					toggleButtonDisabled(anyChecked, button);
					break;
				}
				case "one": {
					toggleButtonDisabled(oneOfChecked, button);
				}
			}
		});
	}

	function updateIsCheckedAll() {
		isCheckedAll = Array.from(checkboxes).every((checkbox) => checkbox.checked);

		if (isCheckedAll) {
			toggleCheckAllButton.querySelector("span").innerText = " Снять выделение";
		} else {
			toggleCheckAllButton.querySelector("span").innerText = " Выделить всё";
		}
	}

	for (let i = 0; i < checkboxes.length; i++) {
		const checkbox = checkboxes[i];
		if (checkbox) {
			checkbox.addEventListener("change", () => {
				updateCheckedState();
				updateIsCheckedAll();
			});
		}
	}

	let isCheckedAll = false;
	if (toggleCheckAllButton) {
		toggleCheckAllButton.addEventListener("click", () => {
			isCheckedAll = !isCheckedAll;

			checkboxes.forEach((checkbox) => {
				if (checkbox) {
					checkbox.checked = isCheckedAll;
				}
			});
			buttons.forEach((button) => {
				toggleButtonDisabled(isCheckedAll, button);
			});
			updateCheckedState();
			updateIsCheckedAll();
		});
	}
}
