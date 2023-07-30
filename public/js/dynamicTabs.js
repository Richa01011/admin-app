export const DynanicTabs = (htmlTabContent) => {
	// функция для добавления новой вкладки
	function addTab() {
		// получаем элементы для работы с ними
		let tabs = document.querySelector("#address-tabs");
		let tabContent = document.querySelector("#dynamic-tab-content");
		let tabCount = tabs.querySelectorAll('.nav-link[data-bs-toggle="tab"]').length;

		// создаем новую вкладку
		let newTab = document.createElement("div");
		newTab.classList.add("nav-link", "active");
		newTab.setAttribute("role", "tab");
		newTab.setAttribute("data-bs-toggle", "tab");
		newTab.setAttribute("data-bs-target", `#tab-0-${tabCount + 1}`);
		newTab.setAttribute("style", "cursor: pointer;");
		newTab.innerHTML = `<span>Адрес ${tabCount + 1}</span>`;

		// добавляем кнопку удаления к новой вкладке
		let removeBtn = document.createElement("button");
		removeBtn.classList.add("btn", "btn-close", "ms-2");
		removeBtn.setAttribute("type", "button");
		removeBtn.addEventListener("click", removeTab);
		newTab.appendChild(removeBtn);

		// добавляем новую вкладку к списку вкладок
		tabs.querySelector('[data-add-contract="add"]').insertAdjacentElement("beforebegin", newTab);

		// создаем новый контент для вкладки
		let newTabContent = document.createElement("div");
		newTabContent.classList.add("tab-pane", "fade", "active", "show");
		newTabContent.setAttribute("id", `tab-0-${tabCount + 1}`);
		newTabContent.setAttribute("role", "tabpanel");
		newTabContent.innerHTML = htmlTabContent;

		// добавляем новый контент к общему контенту
		tabContent.appendChild(newTabContent);

		// переключаем активную вкладку на новую вкладку
		tabs.querySelector(".nav-link.active").classList.remove("active");
		tabContent.querySelector(".tab-pane.active").classList.remove("active", "show");

		updateFirstTabRemoveBtn();
	}

	// функция для удаления вкладки
	function removeTab(event) {
		// получаем элементы для работы с ними
		let tabs = document.querySelector("#address-tabs");
		let tabContent = document.querySelector("#dynamic-tab-content");

		// получаем индекс удаляемой вкладки
		let tabIndex = event.target.parentNode.getAttribute("data-bs-target").split("-")[2];

		// проверяем, является ли удаляемая вкладка активной
		let isActive = event.target.parentNode.classList.contains("active");

		// удаляем вкладку и ее контент
		event.target.parentNode.remove();
		tabContent.querySelector(`#tab-0-${tabIndex}`).remove();

		// обновляем номера оставшихся вкладок
		tabs.querySelectorAll('.nav-link[data-bs-toggle="tab"').forEach((tab, index) => {
			tab.setAttribute("data-bs-target", `#tab-0-${index + 1}`);
			tab.querySelector("span").textContent = `Адрес ${index + 1}`;
			if (index === tabs.querySelectorAll(".nav-link").length - 1) {
				tab.click();
			}
		});

		// обновляем идентификаторы оставшихся элементов tab-pane
		tabContent.querySelectorAll(".tab-pane").forEach((pane, index) => {
			pane.setAttribute("id", `tab-0-${index + 1}`);
		});

		// если удаляемая вкладка была активной, то активируем соседнюю вкладку
		if (isActive) {
			let nextTab = tabs.querySelector(`[data-bs-target="#tab-0-${tabIndex}"]`);
			if (nextTab) {
				nextTab.click();
			} else {
				let prevTab = tabs.querySelector(`[data-bs-target="#tab-0-${tabIndex - 1}"]`);
				if (prevTab) {
					prevTab.click();
				}
			}
		}

		updateFirstTabRemoveBtn();
	}

	// функция для обновления кнопки удаления у первой вкладки
	function updateFirstTabRemoveBtn() {
		// получаем элементы для работы с ними
		let tabs = document.querySelector("#address-tabs");
		let firstTab = tabs.querySelector('.nav-link[data-bs-toggle="tab"]');
		let allTabs = tabs.querySelectorAll('.nav-link[data-bs-toggle="tab"]');
		let tabCount = allTabs.length;

		// проверяем количество вкладок
		if (tabCount > 1) {
			// если вкладок больше одной, то добавляем кнопку удаления к первой вкладке
			if (!firstTab.querySelector(".btn-close")) {
				let removeBtn = document.createElement("button");
				removeBtn.classList.add("btn", "btn-close", "ms-2");
				removeBtn.setAttribute("type", "button");
				removeBtn.addEventListener("click", removeTab);
				firstTab.appendChild(removeBtn);
			}

			allTabs.forEach((tab) => {
				const removeBtn = tab.querySelector(".btn-close");
				removeBtn.addEventListener("click", removeTab);
			});
		} else {
			// если вкладка только одна, то удаляем кнопку удаления у первой вкладки
			let removeBtn = firstTab.querySelector(".btn-close");
			if (removeBtn) {
				removeBtn.remove();
			}
		}
	}
	updateFirstTabRemoveBtn();

	// добавляем обработчик события для кнопки добавления вкладки
	document.querySelector('[data-add-contract="add"]').addEventListener("click", addTab);
};
