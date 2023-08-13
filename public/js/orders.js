import { switchTables } from "./switchTables.js";
import { tableCheckboxes } from "./tableControl.js";

const Orders = () => {
	const tableRadioButtons = document.querySelectorAll('#orders-tabs input[type="radio"][name="order-tables"]');
	switchTables(tableRadioButtons, ["#tab-removal-schedule", "#tab-completed-orders", "#tab-unfulfilled-orders"]);

	const tableOrders = document.querySelector("#table-orders");
	if (tableOrders) {
		const tablePanes = tableOrders.querySelectorAll(".tab-pane");
		tablePanes.forEach((tablePane, tableIndex) => {
			if (tablePane) {
				const table = tablePane.querySelector("table");
				const tbody = table.querySelector("tbody");
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

				const theadCols = tablePane.querySelectorAll("thead tr th");
				const dropdownRows = tablePane.querySelectorAll("[data-dropdown-cols]");
				dropdownRows.forEach((dropdownRow, rowIndex) => {
					theadCols.forEach((theadCol, colIndex) => {
						dropdownRow.insertAdjacentHTML(
							"beforeend",
							`
						<div class="d-block w-100 py-1 px-2 text-nowrap">
							<div class="form-check">
								<input class="form-check-input" type="checkbox" id="${rowIndex}-${colIndex}" checked data-column="${colIndex}"/>
								<label class="form-check-label" for="${rowIndex}-${colIndex}">${theadCol.textContent}</label>
							</div>
						</div>
						`
						);
					});
				});
				dropdownRows.forEach((dropdownRow) => {
					const checkboxes = dropdownRow.querySelectorAll('input[type="checkbox"]');

					function toggleColumns() {
						const columnIndex = parseInt(this.getAttribute("data-column"));
						const cells = table.querySelectorAll(`tr > *:nth-child(${columnIndex + 1})`);

						if (this.checked) {
							cells.forEach((theadCol) => {
								theadCol.classList.remove("d-none");
							});
						} else {
							cells.forEach((theadCol) => {
								theadCol.classList.add("d-none");
							});
						}

						sessionStorage.setItem(`row-${tableIndex}_column-${columnIndex}`, this.checked);
					}

					checkboxes.forEach((checkbox) => {
						checkbox.addEventListener("change", toggleColumns);

						const columnIndex = parseInt(checkbox.getAttribute("data-column"));
						const isChecked = sessionStorage.getItem(`row-${tableIndex}_column-${columnIndex}`);

						if (isChecked === "false") {
							checkbox.checked = false;
							toggleColumns.call(checkbox);
						}
					});
				});
			}
		});
	}
};

export default Orders;
