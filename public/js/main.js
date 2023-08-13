import TelMaks from "./telMask.js";
import Contract from "./contract.js";
import CounterParty from "./counterParty.js";
import { createDynamicElements, createWasteTypeElement } from "./dynamicElements.js";
import Orders from "./orders.js";
import highlightActivePage from "./highligtCurrentPage.js";
import Reports from "./reports.js";
import Handbooks from "./handbooks.js";
import multiCheckbox from "./multiCheckbox.js";

highlightActivePage();
TelMaks();
Contract();
CounterParty();
Orders();
Reports();
Handbooks();
multiCheckbox();

const observer = new MutationObserver((mutations) => {
	let hasNewDynamicElements = false;
	let hasNewMultiChecbox = false;
	mutations.forEach((mutation) => {
		if (mutation.type === "childList") {
			mutation.addedNodes.forEach((node) => {
				if (node.nodeType === Node.ELEMENT_NODE && node.hasChildNodes("data-dynamic-element")) {
					hasNewDynamicElements = true;
				}
				if (node.nodeType === Node.ELEMENT_NODE && node.hasChildNodes('[data-multi-checkbox="dropdown"]')) {
					hasNewMultiChecbox = true;
				}
			});
		}
	});

	if (hasNewDynamicElements) {
		createDynamicElements();
		createWasteTypeElement();
	}
	if (hasNewMultiChecbox) {
		multiCheckbox();
	}
});

observer.observe(document.body, { childList: true, subtree: true });
createDynamicElements();
createWasteTypeElement();
