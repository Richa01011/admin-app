import { tableCheckboxes } from "./tableControl.js";

export const Orders = () => {
	const table = document.querySelector("#tab-removal-schedule");

	if (table) {
		const tbody = table.querySelector("tbody");
		if (tbody) {
			const toggleCheckAllButton = table.querySelector("#toggle-checked-all-btn");
			const deleteButton = table.querySelector("#delete-order-btn");
			const editButton = table.querySelector("#edit-order-btn");
			const printButton = table.querySelector("#print-order-btn");
			const excelButton = table.querySelector("#excel-order-btn");
			tableCheckboxes(tbody, [deleteButton, editButton, printButton, excelButton], toggleCheckAllButton);
		}
	}
};
