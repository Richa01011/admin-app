import { DynanicTabs } from "./dynamicTabs.js";
import toggleButtonDisabled from "./toggleButtonDisabled.js";

export const Contract = () => {
	const tableContracts = document.querySelector("#table-contracts");
	const tableSelectRadios = document.querySelectorAll('input[type="radio"][name="tables"]');

	//Открытие модалки нового договора
	const newContractModalBtn = document.querySelector("#new-contract-modal-btn");
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
				newContactModal._element.addEventListener("hidden.bs.modal", () => {
					newContactModal._element.remove();
				});
			});
	});

	if (tableContracts) {
		const tablPanes = tableContracts.querySelectorAll(".tab-pane");
		tableSelectRadios.forEach(function (tableSelectRadio) {
			tableSelectRadio.addEventListener("change", function () {
				const target =
					this.id === "table-contract-is-proccess" ? "#tab-proccess-contracts" : "#tab-complete-contracts";
				tablPanes.forEach(function (tabPane) {
					tabPane.classList.remove("show", "active");
				});
				document.querySelector(target).classList.add("show", "active");
			});
		});

		tablPanes.forEach((tablPane) => {
			const tbody = tablPane.querySelector("tbody");

			const toggleCheckedAllBtn = tablPane.querySelector("#toggle-checked-all-btn");
			const excelContractBtn = tablPane.querySelector("#excel-contract-btn");
			const deleteContractBtn = tablPane.querySelector("#delete-contract-btn");
			const editContractBtn = tablPane.querySelector("#edit-contact-btn");
			const accessContractBtn = tablPane.querySelector("#access-contact-btn");

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

							const termContractBtn = document.querySelector("#term-contract-btn");
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
										});
									});
							});

							editContactModal.show();
							editContactModal._element.addEventListener("hidden.bs.modal", () => {
								editContactModal._element.remove();
							});
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
							accessContactModal._element.addEventListener("hidden.bs.modal", () => {
								accessContactModal._element.remove();
							});
						});
				});
			}

			//Управление состоянием кнопок чекбоксами
			const checkboxes = tbody.querySelectorAll('tr input[type="checkbox"');
			function updateCheckedState() {
				let anyChecked = Array.from(checkboxes).some((checkbox) => checkbox.checked);
				toggleButtonDisabled(anyChecked, excelContractBtn);
				toggleButtonDisabled(anyChecked, deleteContractBtn);

				let checkdCount = Array.from(checkboxes).filter((checkbox) => checkbox.checked).length;
				let oneOfChecked = checkdCount === 1;
				toggleButtonDisabled(oneOfChecked, editContractBtn);
				toggleButtonDisabled(oneOfChecked, accessContractBtn);
			}

			function updateIsCheckedAll() {
				isCheckedAll = Array.from(checkboxes).every((checkbox) => checkbox.checked);

				if (isCheckedAll) {
					toggleCheckedAllBtn.querySelector("span").innerText = " Снять выделение";
				} else {
					toggleCheckedAllBtn.querySelector("span").innerText = " Выделить всё";
				}
			}

			for (let i = 0; i < checkboxes.length; i++) {
				const checkbox = checkboxes[i];
				checkbox.addEventListener("change", () => {
					updateCheckedState();
					updateIsCheckedAll();
				});
			}

			//Выделение всех чекбоксов в таблице
			let isCheckedAll = false;
			toggleCheckedAllBtn.addEventListener("click", () => {
				isCheckedAll = !isCheckedAll;

				for (let i = 0; i < checkboxes.length; i++) {
					const checkbox = checkboxes[i];
					checkbox.checked = isCheckedAll;
				}
				toggleButtonDisabled(isCheckedAll, excelContractBtn);
				toggleButtonDisabled(isCheckedAll, deleteContractBtn);
				updateCheckedState();
				updateIsCheckedAll();
			});
		});
	}
};
