const multiCheckbox = () => {
	const items = document.querySelectorAll('[data-multi-checkbox="dropdown"]');
	items.forEach((item) => {
		const dropdown = new bootstrap.Dropdown(item);
		const input = item.querySelector('input[type="text"]');
		const closeBtn = item.querySelector(".btn-close");
		const checkboxes = item.querySelectorAll('input[type="checkbox"');

		input.addEventListener("focus", () => {
			dropdown.show();
		});
		closeBtn.addEventListener("click", () => {
			dropdown.hide();
		});

		checkboxes.forEach((checkbox) => {
			checkbox.addEventListener("change", updateMultiselect);
		});

		function updateMultiselect() {
			const selectedItems = Array.from(checkboxes)
				.filter((checkbox) => checkbox.checked)
				.map((checkbox) => checkbox.nextSibling.textContent.trim());
			input.value = selectedItems.join(", ");
		}
		updateMultiselect();
	});
};

export default multiCheckbox;
