const Reports = () => {
	const reportsContainer = document.querySelector("#reports-container");
	if (reportsContainer) {
		const dropdown = new bootstrap.Dropdown(document.querySelector(".dropdown"));
		dropdown.show();
		const wasteMoveLogBtn = document.querySelector("#waste-move-log-btn");
		const reportCounterpartyBtn = document.querySelector("#report-counterparty-btn");
		const reportLpuBtn = document.querySelector("#report-lpu-btn");
		const reportCarBtn = document.querySelector("#report-car-btn");
		const reportTypeWasteBtn = document.querySelector("#report-type-waste-btn");
		const changeLogBtn = document.querySelector("#change-log-btn");

		const insertReport = (link) => {
			dropdown.hide();
			fetch(link)
				.then((response) => response.text())
				.then((text) => {
					reportsContainer.innerHTML = "";
					reportsContainer.innerHTML = text;
					const datePickers = document.querySelectorAll("[data-date-picker]");
					datePickers.forEach((datePicker) => {
						if (datePicker) {
							switch (datePicker.getAttribute("data-date-picker")) {
								case "month": {
									new Datepicker(datePicker, {
										language: "ru",
										pickLevel: 1,
										format: "M.yyyy",
									});
									break;
								}
								case "year": {
									new Datepicker(datePicker, {
										language: "ru",
										pickLevel: 2,
										format: "yyyy",
									});
									break;
								}
								case "range-month": {
									new DateRangePicker(datePicker, {
										language: "ru",
										pickLevel: 1,
										format: "M.yyyy",
									});
									break;
								}
								case "range-year": {
									new DateRangePicker(datePicker, {
										language: "ru",
										pickLevel: 2,
										format: "yyyy",
									});
									break;
								}
							}
						}
					});
				});
		};

		wasteMoveLogBtn.addEventListener("click", () => {
			insertReport("./render-elements/reports/waste-move-log.html");
		});

		reportCounterpartyBtn.addEventListener("click", () => {
			insertReport("./render-elements/reports/report-counterparty.html");
		});

		reportLpuBtn.addEventListener("click", () => {
			insertReport("./render-elements/reports/report-lpu.html");
		});

		reportCarBtn.addEventListener("click", () => {
			insertReport("./render-elements/reports/report-car.html");
		});

		reportTypeWasteBtn.addEventListener("click", () => {
			insertReport("./render-elements/reports/report-type-waste.html");
		});

		changeLogBtn.addEventListener("click", () => {
			insertReport("./render-elements/reports/change-log.html");
		});
	}
};

export default Reports;
