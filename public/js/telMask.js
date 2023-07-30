import observeMutations from "./observerMutation.js";

export const TelMaks = () => {
	const maskOptions = {
		mask: "+7 (000) 000-00-00",
	};

	const applyMask = (input) => {
		var mask = IMask(input, maskOptions);
	};

	const targetNode = document.body;
	const config = { childList: true, subtree: true };
	const callback = function (mutationsList, observer) {
		for (const mutation of mutationsList) {
			if (mutation.type === "childList") {
				for (const node of mutation.addedNodes) {
					if (node.nodeType === Node.ELEMENT_NODE) {
						setAppyMask();
					}
				}
			}
		}
	};

	observeMutations(targetNode, config, callback);

	const setAppyMask = () => {
		const inputs = document.querySelectorAll('input[type="tel"]');
		inputs.forEach(applyMask);
	};
	setAppyMask();
};
