export const CounterParty = () => {
	const newCounterPartyModalBtn = document.querySelector("#new-counterparty-modal-btn");
	newCounterPartyModalBtn.addEventListener("click", () => {
		fetch("./render-elements/modals/new-counterparty-modal.html")
			.then((response) => response.text())
			.then((text) => {
				document.body.insertAdjacentHTML("beforeend", text);
				const newCounterPartyModal = new bootstrap.Modal(document.querySelector("#new-counterparty-modal"));
				newCounterPartyModal.show();
				newCounterPartyModal._element.addEventListener("hidden.bs.modal", () => {
					newCounterPartyModal._element.remove();
				});
			});
	});
};
