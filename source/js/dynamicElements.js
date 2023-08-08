function generateUniqueId() {
	return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function createDynamicElements() {
	const elements = document.querySelectorAll("[data-dynamic-element]");
	elements.forEach((element) => {
		const addButton = element.querySelector("[data-dynamic-button]");
		const container = element.querySelector("[data-dynamic-container]");
		const buttonType = addButton.getAttribute("data-dynamic-button");
		const containerType = container.getAttribute("data-dynamic-container");

		if (buttonType === containerType) {
			if (!addButton.hasAttribute("data-handler-added")) {
				addButton.addEventListener("click", (event) => {
					event.stopPropagation();

					let markup;
					const div = document.createElement("div");

					switch (containerType) {
						case "waste-type": {
							markup = `
								<div class="d-flex mb-2">
									<div class="col-3">
										<div class="input-group-text">Тип отхода</div>
									</div>
									<div class="col">
										<div class="input-group">
											<select class="form-control" name="wasteType[]">
												<option selected="selected" value="none">Выберите тип</option>
												<option value="1">Тип А</option>
												<option value="2">Тип Б</option>
												<option value="3">Тип В</option>
												<option value="4">Тип Г</option>
											</select>
											<div class="input-group-text">Количество</div>
											<input class="form-control" type="number" name="quantity[]">
											<div class="input-group-text">Единица измерения</div>
											<select class="form-control" name="unit[]">
												<option selected="selected" value="1">Контейнер 3 л</option>
												<option value="2">Контейнер 5 л</option>
												<option value="3">Контейнер 6 л</option>
												<option value="4">Контейнер 10 л</option>
												<option value="5">Контейнер 30 л</option>
												<option value="6">Контейнер 35 л</option>
												<option value="7">Контейнер 50 л</option>
												<option value="8">Контейнер 60 л</option>
												<option value="9">Контейнер 65 л</option>
												<option value="10">Контейнер 120 л</option>
												<option value="11">Контейнер 240 л</option>
												<option value="12">Контейнер 360 л</option>
												<option value="13">Контейнер 1100 л</option>
												<option value="14">КГ</option>
												<option value="15">ШТ</option>
												<option value="16">М Куб</option>
											</select>
											<button class="btn btn-outline-rose" type="button" data-dynamic-delete="">&times;</button>
										</div>
									</div>
								</div>
							`;
							div.classList.add("mb-3");
							div.setAttribute("data-waste-type-wrapper", "");
							break;
						}
					}

					div.innerHTML = markup;
					container.appendChild(div);

					const deleteButton = div.querySelector("[data-dynamic-delete]");
					deleteButton.addEventListener("click", () => {
						container.removeChild(div);
					});
				});
				addButton.setAttribute("data-handler-added", "true");
			}
		}
	});
}

function handleExactdates(element) {
	const addButton = element.querySelector('[data-exactdates="add-button"]');
	const container = element.querySelector('[data-exactdates="container"]');

	if (addButton && container) {
		addButton.addEventListener("click", (event) => {
			event.stopPropagation();

			const div = document.createElement("div");
			div.innerHTML = `
				<div class="input-group">
					<input class="form-control" type="date" name="exactdate[]" />
					<button class="btn btn-outline-rose" type="button" data-exactdates="delete-button">&times;</button>
				</div>
			`;
			div.classList.add("col-3", "px-0");
			container.appendChild(div);

			const deleteButton = div.querySelector('[data-exactdates="delete-button"]');
			deleteButton.addEventListener("click", () => {
				container.removeChild(div);
				container.dispatchEvent(new Event("exactdatesChanged"));
			});

			container.dispatchEvent(new Event("exactdatesChanged"));
		});
	}
}

export function createWasteTypeElement() {
	updateWasteTypeOptions();

	const typeIntervalsWrappers = document.querySelectorAll('[data-type-intervals="wrapper"]');
	typeIntervalsWrappers.forEach((typeIntervalsWrapper) => {
		const wasteType = typeIntervalsWrapper.querySelectorAll("[data-waste-type-wrapper]");
		wasteType.forEach((element) => {
			const select = element.querySelector('select[name="wasteType[]"]');
			if (!select.hasAttribute("data-handler-added")) {
				select.addEventListener("change", (event) => {
					const typeIntervals = element.querySelector("[data-type-intervals]");
					if (element.getAttribute("data-waste-type-element") === "type-intervals" && typeIntervals) {
						element.removeAttribute("data-waste-type-element", "type-intervals");
						typeIntervals.remove();
					}

					if (event.target.value === "none") {
						typeIntervals.remove();
					} else {
						let uniqueId = generateUniqueId();
						const div = document.createElement("div");
						div.classList.add("mb-3");
						div.setAttribute("data-type-intervals", "body");
						element.insertAdjacentElement("beforeend", div);

						div.insertAdjacentHTML(
							"beforeend",
							`
							<div class="d-flex mb-3">
								<div class="col-3">
									<div class="input-group-text">Дни недели</div>
								</div>
								<div class="col">
									<div class="btn-group" data-type-interval="weekdays">
										<input class="btn-check" type="checkbox" autocomplete="off" id="mo-${uniqueId}" name="mo[]"/>
										<label for="mo-${uniqueId}" class="btn btn-outline-rose">ПН</label>
										<input class="btn-check" type="checkbox" autocomplete="off" id="tu-${uniqueId}" name="tu[]"/>
										<label for="tu-${uniqueId}" class="btn btn-outline-rose">ВТ</label>
										<input class="btn-check" type="checkbox" autocomplete="off" id="we-${uniqueId}" name="we[]"/>
										<label for="we-${uniqueId}" class="btn btn-outline-rose">СР</label>
										<input class="btn-check" type="checkbox" autocomplete="off" id="th-${uniqueId}" name="th[]"/>
										<label for="th-${uniqueId}" class="btn btn-outline-rose">ЧТ</label>
										<input class="btn-check" type="checkbox" autocomplete="off" id="fr-${uniqueId}" name="fr[]"/>
										<label for="fr-${uniqueId}" class="btn btn-outline-rose">ПТ</label>
										<input class="btn-check" type="checkbox" autocomplete="off" id="sa-${uniqueId}" name="sa[]"/>
										<label for="sa-${uniqueId}" class="btn btn-outline-rose">СБ</label>
										<input class="btn-check" type="checkbox" autocomplete="off" id="su-${uniqueId}" name="su[]"/>
										<label for="su-${uniqueId}" class="btn btn-outline-rose">ВС</label>
									</div>
								</div>
							</div>
						`
						);

						uniqueId = generateUniqueId();
						const days = [];
						for (let i = 1; i < 32; i++) {
							days.push(`
								<input class="btn-check" type="checkbox" autocomplete="off" id="monthday-${i}-${uniqueId}" name="monthday-${i}[]"/>
								<label for="monthday-${i}-${uniqueId}" class="btn btn-outline-rose">${i}</label>
							`);
						}
						div.insertAdjacentHTML(
							"beforeend",
							`
							<div class="d-flex mb-3">
								<div class="col-3">
									<div class="input-group-text">Дни месяца</div>
								</div>
								<div class="col-6">
									<div class="d-flex flex-wrap gap-2" data-type-interval="monthdays">
										${days.join("")}
									</div>
								</div>
							</div>
						`
						);
						div.insertAdjacentHTML(
							"beforeend",
							`
							<div class="d-flex mb-3" data-waste-type-element="exactdates">
								<div class="col-3">
									<div class="input-group-text">Точные даты</div>
								</div>
								<div class="col">
									<div class="d-flex flex-wrap" data-exactdates="container" data-type-interval="exactdates">
										<button class="btn btn-outline-rose" style="max-width: 150px;" type="button" data-exactdates="add-button">Добавить дату</button>
									</div>
								</div>
							</div>
						`
						);
						element.setAttribute("data-waste-type-element", "type-intervals");
						handleExactdates(element);
					}
					updateWasteTypeOptions();
					changeTypeIntervalHandler();
				});
				select.setAttribute("data-handler-added", "true");
			}
		});
	});
}

function updateWasteTypeOptions() {
	const typeIntervalsWrappers = document.querySelectorAll('[data-type-intervals="wrapper"]');
	typeIntervalsWrappers.forEach((typeIntervalsWrapper) => {
		const wasteTypeWrappers = typeIntervalsWrapper.querySelectorAll("[data-waste-type-wrapper]");
		const selectedWasteTypes = [];
		wasteTypeWrappers.forEach((wrapper) => {
			const wasteTypeSelect = wrapper.querySelector("select[name='wasteType[]']");
			const selectedWasteType = wasteTypeSelect.value;
			if (selectedWasteType !== "none") {
				selectedWasteTypes.push(selectedWasteType);
			}
		});

		wasteTypeWrappers.forEach((wrapper) => {
			const wasteTypeSelect = wrapper.querySelector("select[name='wasteType[]']");
			wasteTypeSelect.querySelectorAll("option").forEach((option) => {
				if (selectedWasteTypes.includes(option.value) && option.value !== wasteTypeSelect.value) {
					option.disabled = true;
				} else {
					option.disabled = false;
				}
			});
		});
	});
}

function isAnyCheckboxChecked(checkboxes) {
	return Array.prototype.some.call(checkboxes, function (checkbox) {
		return checkbox.checked;
	});
}

function changeTypeIntervalHandler() {
	const typeIntervals = document.querySelectorAll("[data-type-intervals]");
	typeIntervals.forEach((element) => {
		const intervalTypes = element.querySelectorAll("[data-type-interval]");
		intervalTypes.forEach((interval) => {
			switch (interval.getAttribute("data-type-interval")) {
				case "weekdays": {
					const checkboxes = interval.querySelectorAll('input[type="checkbox"]');
					checkboxes.forEach((checkbox) => {
						checkbox.addEventListener("change", () => {
							if (isAnyCheckboxChecked(checkboxes)) {
								interval.setAttribute("data-type-interval-active", "");
							} else {
								interval.removeAttribute("data-type-interval-active");
							}
							updateTypeIntervals(intervalTypes);
						});
					});
					break;
				}
				case "monthdays": {
					const checkboxes = interval.querySelectorAll('input[type="checkbox"]');
					checkboxes.forEach((checkbox) => {
						checkbox.addEventListener("change", () => {
							if (isAnyCheckboxChecked(checkboxes)) {
								interval.setAttribute("data-type-interval-active", "");
							} else {
								interval.removeAttribute("data-type-interval-active");
							}
							updateTypeIntervals(intervalTypes);
						});
					});
					break;
				}
				case "exactdates": {
					interval.addEventListener("exactdatesChanged", () => {
						const container = element.querySelector('[data-exactdates="container"]');
						if (container.querySelectorAll('input[type="date"]').length > 0) {
							interval.setAttribute("data-type-interval-active", "");
						} else {
							interval.removeAttribute("data-type-interval-active");
						}
						updateTypeIntervals(intervalTypes);
					});
					break;
				}
			}
		});
	});
}

function updateTypeIntervals(intervals) {
	let anyActive = false;
	intervals.forEach((interval) => {
		if (interval.hasAttribute("data-type-interval-active")) {
			anyActive = true;
		}
	});

	intervals.forEach((interval) => {
		switch (interval.getAttribute("data-type-interval")) {
			case "weekdays": {
				const checkboxes = interval.querySelectorAll('input[type="checkbox"]');
				if (anyActive && !interval.hasAttribute("data-type-interval-active")) {
					checkboxes.forEach((checkbox) => {
						checkbox.setAttribute("disabled", true);
					});
				} else {
					checkboxes.forEach((checkbox) => {
						checkbox.removeAttribute("disabled");
					});
				}
				break;
			}
			case "monthdays": {
				const checkboxes = interval.querySelectorAll('input[type="checkbox"]');
				if (anyActive && !interval.hasAttribute("data-type-interval-active")) {
					checkboxes.forEach((checkbox) => {
						checkbox.setAttribute("disabled", true);
					});
				} else {
					checkboxes.forEach((checkbox) => {
						checkbox.removeAttribute("disabled");
					});
				}
				break;
			}
			case "exactdates": {
				const buttons = interval.querySelectorAll("button");
				const dates = interval.querySelectorAll('input[type="date"]');
				if (anyActive && !interval.hasAttribute("data-type-interval-active")) {
					buttons.forEach((button) => {
						button.setAttribute("disabled", true);
					});
					dates.forEach((date) => {
						date.setAttribute("disabled", true);
					});
				} else {
					buttons.forEach((button) => {
						button.removeAttribute("disabled");
					});
					dates.forEach((date) => {
						date.removeAttribute("disabled");
					});
				}
				break;
			}
		}
	});
}
