import { TelMaks } from "./telMask.js";
import { Contract } from "./contract.js";
import { CounterParty } from "./counterParty.js";
import { createDynamicElements, createWasteTypeElement } from "./dynamicElements.js";

TelMaks();
Contract();
CounterParty();

const observer = new MutationObserver((mutations) => {
	let hasNewDynamicElements = false;
	mutations.forEach((mutation) => {
		if (mutation.type === "childList") {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE && node.hasChildNodes("data-dynamic-element")) {
					hasNewDynamicElements = true;
				}
			});
		}
	});

	if (hasNewDynamicElements) {
		createDynamicElements();
		createWasteTypeElement();
	}
});

observer.observe(document.body, { childList: true, subtree: true });
createDynamicElements();
createWasteTypeElement();
