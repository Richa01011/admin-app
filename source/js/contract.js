import closeModal from "./closeModal.js";
import { DynanicTabs } from "./dynamicTabs.js";
import { switchTables } from "./switchTables.js";
import { tableCheckboxes } from "./tableControl.js";

const Contract = () => {
	const tableContracts = document.querySelector("#table-contracts");
	const tableRadioButtons = document.querySelectorAll('#contracts-tabs input[type="radio"][name="tables"]');

	if (tableContracts) {
		const tablePanes = tableContracts.querySelectorAll(".tab-pane");
		switchTables(tableRadioButtons, ["#tab-proccess-contracts", "#tab-complete-contracts"]);

		tablePanes.forEach((tablePane) => {
			const tbody = tablePane.querySelector("tbody");

			const toggleCheckedAllBtn = tablePane.querySelector("#toggle-checked-all-btn");
			const excelContractBtn = tablePane.querySelector("#excel-contract-btn");
			const deleteContractBtn = tablePane.querySelector("#delete-contract-btn");
			const editContractBtn = tablePane.querySelector("#edit-contact-btn");
			const accessContractBtn = tablePane.querySelector("#access-contact-btn");

			tableCheckboxes(
				tbody,
				[excelContractBtn, deleteContractBtn, editContractBtn, accessContractBtn],
				toggleCheckedAllBtn
			);

			if (editContractBtn) {
				editContractBtn.addEventListener("click", () => {
					fetch("./render-elements/modals/contracts/edit-contract-modal.html")
						.then((response) => response.text())
						.then((text) => {
							document.body.insertAdjacentHTML("beforeend", text);
							const editContactModal = new bootstrap.Modal(
								document.querySelector("#edit-contract-modal")
							);

							fetch("./render-elements/modals/contracts/tab-pane.html")
								.then((response) => response.text())
								.then((text) => {
									DynanicTabs(text);
								});

							editContactModal.show();
							closeModal(editContactModal);

							const termContractBtn = document.querySelector("#term-contract-btn");
							if (termContractBtn) {
								termContractBtn.addEventListener("click", () => {
									fetch("./render-elements/modals/contracts/term-contract-modal.html")
										.then((response) => response.text())
										.then((text) => {
											document.body.insertAdjacentHTML("beforeend", text);
											const termContractModal = new bootstrap.Modal(
												document.querySelector("#termination-contract-modal")
											);

											editContactModal.hide();
											termContractModal.show();
											termContractModal._element.addEventListener("hidden.bs.modal", () => {
												termContractModal._element.remove();
												editContactModal.show();
											});
										});
								});
							}
						});
				});
			}

			if (accessContractBtn) {
				accessContractBtn.addEventListener("click", () => {
					fetch("./render-elements/modals/contracts/access-contract-modal.html")
						.then((response) => response.text())
						.then((text) => {
							document.body.insertAdjacentHTML("beforeend", text);
							const accessContactModal = new bootstrap.Modal(
								document.querySelector("#access-contract-modal")
							);

							accessContactModal.show();
							closeModal(accessContactModal);
						});
				});
			}
		});
	}

	const newContractModalBtn = document.querySelector("#new-contract-modal-btn");
	if (newContractModalBtn) {
		newContractModalBtn.addEventListener("click", () => {
			fetch("./render-elements/modals/contracts/new-contract-modal.html")
				.then((response) => response.text())
				.then((text) => {
					document.body.insertAdjacentHTML("beforeend", text);
					const newContactModal = new bootstrap.Modal(document.querySelector("#new-contract-modal"));

					fetch("./render-elements/modals/contracts/tab-pane.html")
						.then((response) => response.text())
						.then((text) => {
							DynanicTabs(text);
						});

					newContactModal.show();
					closeModal(newContactModal);
				});
		});
	}
};

export default Contract;
