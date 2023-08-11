const closeModal = (modal) => {
	modal._element.addEventListener("hidden.bs.modal", () => {
		modal._element.remove();
	});
};

export default closeModal;
