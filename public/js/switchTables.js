export const switchTables = (radioButtons, tableIds) => {
	radioButtons.forEach(function (radioButton, index) {
		radioButton.addEventListener("change", function () {
			const targetTableId = tableIds[index];

			tableIds.forEach(function (tableId) {
				const tablePane = document.querySelector(tableId);
				if (tablePane) {
					tablePane.classList.remove("show", "active");
				}
			});

			const targetTablePane = document.querySelector(targetTableId);
			if (targetTablePane) {
				targetTablePane.classList.add("show", "active");
			}
		});
	});
};
