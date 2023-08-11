import closeModal from "./closeModal.js";
import { tableCheckboxes } from "./tableControl.js";

const Handbooks = () => {
	const handbooksButtons = document.querySelectorAll(".handbook-btn");
	handbooksButtons.forEach((handbooksButton) => {
		handbooksButton.addEventListener("click", async () => {
			switch (handbooksButton.getAttribute("id")) {
				case "driver-modal-btn": {
					const modal = await getModalTable(
						"./render-elements/modals/handbooks/driver-modal.html",
						"#driver-modal"
					);
					modal.editBtn.addEventListener("click", () => {
						getModal("./render-elements/modals/handbooks/edit-driver-modal.html", "#edit-driver-modal");
					});
					modal.newBtn.addEventListener("click", () => {
						getModal("./render-elements/modals/handbooks/new-driver-modal.html", "#new-driver-modal");
					});
					break;
				}
				case "unit-modal-btn": {
					const modal = await getModalTable(
						"./render-elements/modals/handbooks/unit-modal.html",
						"#unit-modal"
					);
					modal.newBtn.addEventListener("click", () => {
						modal.tbody.insertAdjacentHTML(
							"beforeend",
							`
						<tr>
							<td>
								<input class="form-check-input" type="checkbox"/>
							</td>
							<td>
								<input class="form-control" type="text"/>
							</td>
							<td>
								<input class="form-control" type="text"/>
							</td>
							<td>
								<button class="btn btn-outline-rose" type="button">
									<i class="fa-regular fa-floppy-disk"></i>
								</button>
							</td>
						</tr>
						`
						);
						tableCheckboxes(modal.tbody, [modal.deleteBtn], modal.toggleBtn);
					});
					break;
				}
				case "waste-modal-btn": {
					const modal = await getModalTable(
						"./render-elements/modals/handbooks/waste-modal.html",
						"#waste-modal"
					);
					modal.newBtn.addEventListener("click", () => {
						modal.tbody.insertAdjacentHTML(
							"beforeend",
							`
						<tr>
							<td>
								<input class="form-check-input" type="checkbox"/>
							</td>
							<td>
								<input class="form-control" type="text"/>
							</td>
							<td>
								<button class="btn btn-outline-rose" type="button">
									<i class="fa-regular fa-floppy-disk"></i>
								</button>
							</td>
						</tr>
						`
						);
						tableCheckboxes(modal.tbody, [modal.deleteBtn], modal.toggleBtn);
					});
					break;
				}
				case "counterparty-modal-btn": {
					const modal = await getModalTable(
						"./render-elements/modals/handbooks/counterparty-modal.html",
						"#counterparty-modal"
					);
					const getSubModals = async () => {
						const editCounterpartyModal = await getModal(
							"./render-elements/modals/counterparty/new-counterparty-modal.html",
							"#new-counterparty-modal"
						);
						const INNButton = editCounterpartyModal._element.querySelector("#counterparty-INN-btn");
						if (INNButton) {
							INNButton.addEventListener("click", () => {
								fetch("./render-elements/modals/counterparty/fill-in-INN-modal.html")
									.then((response) => response.text())
									.then((text) => {
										document.body.insertAdjacentHTML("beforeend", text);
										const fillInINNModal = new bootstrap.Modal(
											document.querySelector("#counterparty-INN")
										);
										modal.newModal.hide();
										editCounterpartyModal.hide();
										fillInINNModal.show();
										fillInINNModal._element.addEventListener("hidden.bs.modal", () => {
											fillInINNModal._element.remove();
											modal.newModal.show();
											editCounterpartyModal.show();
										});
									});
							});
						}
					};
					modal.editBtn.addEventListener("click", () => {
						getSubModals();
					});
					modal.newBtn.addEventListener("click", () => {
						getSubModals();
					});
					break;
				}
				case "organizations-modal-btn": {
					const modal = await getModalTable(
						"./render-elements/modals/handbooks/organizations-modal.html",
						"#organizations-modal"
					);
					modal.newBtn.addEventListener("click", () => {
						modal.tbody.insertAdjacentHTML(
							"beforeend",
							`
						<tr>
							<td>
								<input class="form-check-input" type="checkbox"/>
							</td>
							<td>
								<input class="form-control" type="text"/>
							</td>
							<td>
								<button class="btn btn-outline-rose" type="button">
									<i class="fa-regular fa-floppy-disk"></i>
								</button>
							</td>
						</tr>
						`
						);
						tableCheckboxes(modal.tbody, [modal.deleteBtn], modal.toggleBtn);
					});
					break;
				}
				case "contact-persons-btn": {
					const modal = await getModalTable(
						"./render-elements/modals/handbooks/contact-persons-modal.html",
						"#contact-persons-modal"
					);
					modal.editBtn.addEventListener("click", () => {
						getModal(
							"./render-elements/modals/handbooks/edit-contact-persons-modal.html",
							"#edit-contact-persons-modal"
						);
					});
					modal.newBtn.addEventListener("click", () => {
						getModal(
							"./render-elements/modals/handbooks/new-contact-persons-modal.html",
							"#new-contact-persons-modal"
						);
					});
					break;
				}
				case "car-modal-btn": {
					const modal = await getModalTable(
						"./render-elements/modals/handbooks/car-modal.html",
						"#car-modal"
					);
					modal.newBtn.addEventListener("click", () => {
						modal.tbody.insertAdjacentHTML(
							"beforeend",
							`
						<tr>
							<td>
								<input class="form-check-input" type="checkbox"/>
							</td>
							<td>
								<input class="form-control" type="text"/>
							</td>
							<td>
								<input class="form-control" type="text"/>
							</td>
							<td>
								<button class="btn btn-outline-rose" type="button">
									<i class="fa-regular fa-floppy-disk"></i>
								</button>
							</td>
						</tr>
						`
						);
						tableCheckboxes(modal.tbody, [modal.deleteBtn], modal.toggleBtn);
					});
					break;
				}
				case "subcontract-modal-btn": {
					const modal = await getModalTable(
						"./render-elements/modals/handbooks/subcontract-modal.html",
						"#subcontract-modal"
					);
					modal.newBtn.addEventListener("click", () => {
						modal.tbody.insertAdjacentHTML(
							"beforeend",
							`
						<tr>
							<td>
								<input class="form-check-input" type="checkbox"/>
							</td>
							<td>
								<input class="form-control" type="text"/>
							</td>
							<td>
								<button class="btn btn-outline-rose" type="button">
									<i class="fa-regular fa-floppy-disk"></i>
								</button>
							</td>
						</tr>
						`
						);
						tableCheckboxes(modal.tbody, [modal.deleteBtn], modal.toggleBtn);
					});
					break;
				}
				case "projects-modal-btn": {
					const modal = await getModalTable(
						"./render-elements/modals/handbooks/projects-modal.html",
						"#projects-modal"
					);
					modal.newBtn.addEventListener("click", () => {
						modal.tbody.insertAdjacentHTML(
							"beforeend",
							`
						<tr>
							<td>
								<input class="form-check-input" type="checkbox"/>
							</td>
							<td>
								<input class="form-control" type="text"/>
							</td>
							<td>
								<button class="btn btn-outline-rose" type="button">
									<i class="fa-regular fa-floppy-disk"></i>
								</button>
							</td>
						</tr>
						`
						);
						tableCheckboxes(modal.tbody, [modal.deleteBtn], modal.toggleBtn);
					});
					break;
				}
			}
		});
	});

	const getModalTable = async (path, modalID) => {
		const response = await fetch(path);
		const text = await response.text();
		document.body.insertAdjacentHTML("beforeend", text);
		const html = document.querySelector(modalID);
		const newModal = new bootstrap.Modal(html);
		newModal.show();
		closeModal(newModal);

		const modal = newModal._element;
		const tbody = modal.querySelector("tbody");
		const toggleCheckedAllBtn = modal.querySelector("#toggle-checked-all-btn");
		const deleteBtn = modal.querySelector("#delete-btn");
		const editBtn = modal.querySelector("#edit-btn");
		const newBtn = modal.querySelector("#new-btn");

		if (editBtn) {
			tableCheckboxes(tbody, [deleteBtn, editBtn], toggleCheckedAllBtn);
		} else {
			tableCheckboxes(tbody, [deleteBtn], toggleCheckedAllBtn);
		}
		const elements = {
			newModal: newModal,
			tbody: tbody,
			toggleBtn: toggleCheckedAllBtn,
			deleteBtn: deleteBtn,
			editBtn: editBtn,
			newBtn: newBtn,
		};
		return elements;
	};

	const getModal = async (path, modalID) => {
		const response = await fetch(path);
		const text = await response.text();
		document.body.insertAdjacentHTML("beforeend", text);
		const html = document.querySelector(modalID);
		const modal = new bootstrap.Modal(html);
		modal.show();
		closeModal(modal);

		return modal;
	};
};

export default Handbooks;
