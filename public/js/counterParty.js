import closeModal from "./closeModal.js";

const CounterParty = () => {
	const newCounterPartyModalBtn = document.querySelector("#new-counterparty-modal-btn");
	if (newCounterPartyModalBtn) {
		newCounterPartyModalBtn.addEventListener("click", () => {
			fetch("./render-elements/modals/counterparty/new-counterparty-modal.html")
				.then((response) => response.text())
				.then((text) => {
					document.body.insertAdjacentHTML("beforeend", text);
					const newCounterPartyModal = new bootstrap.Modal(document.querySelector("#new-counterparty-modal"));
					newCounterPartyModal.show();
					closeModal(newCounterPartyModal);

					const INNButton = document.querySelector("#counterparty-INN-btn");
					if (INNButton) {
						INNButton.addEventListener("click", () => {
							fetch("./render-elements/modals/counterparty/fill-in-INN-modal.html")
								.then((response) => response.text())
								.then((text) => {
									document.body.insertAdjacentHTML("beforeend", text);
									const fillInINNModal = new bootstrap.Modal(
										document.querySelector("#counterparty-INN")
									);
									newCounterPartyModal.hide();
									fillInINNModal.show();
									fillInINNModal._element.addEventListener("hidden.bs.modal", () => {
										fillInINNModal._element.remove();
										newCounterPartyModal.show();
									});
								});
						});
					}
				});
		});
	}
};

export default CounterParty;
