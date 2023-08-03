import { switchTables } from "./switchTables.js";
import { tableCheckboxes } from "./tableControl.js";

export const Orders = () => {
	const tableRadioButtons = document.querySelectorAll('#orders-tabs input[type="radio"][name="order-tables"]');
	switchTables(tableRadioButtons, ["#tab-removal-schedule", "#tab-completed-orders", "#tab-unfulfilled-orders"]);

	const tableOrders = document.querySelector("#table-orders");
	const tablePanes = tableOrders.querySelectorAll(".tab-pane");
	tablePanes.forEach((tablePane) => {
		if (tablePane) {
			const tbody = tablePane.querySelector("tbody");
			const toggleCheckAllButton = tablePane.querySelector("#toggle-checked-all-btn");
			const deleteButton = tablePane.querySelector("#delete-order-btn");
			const editButton = tablePane.querySelector("#edit-order-btn");
			const printButton = tablePane.querySelector("#print-order-btn");
			const excelButton = tablePane.querySelector("#excel-order-btn");
			tableCheckboxes(tbody, [deleteButton, editButton, printButton, excelButton], toggleCheckAllButton);

			if (editButton) {
				editButton.addEventListener("click", () => {
					fetch("./render-elements/modals/orders/edit-order-modal.html")
						.then((response) => response.text())
						.then((text) => {
							document.body.insertAdjacentHTML("beforeend", text);
							const editOrderModal = new bootstrap.Modal(document.querySelector("#edit-order-modal"));

							editOrderModal.show();
							editOrderModal._element.addEventListener("hidden.bs.modal", () => {
								editOrderModal._element.remove();
							});
						});
				});
			}
		}
	});
};
