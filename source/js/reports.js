const Reports = () => {
	const reportsContainer = document.querySelector("#reports-container");
	if (reportsContainer) {
		const wasteMoveLogBtn = document.querySelector("#waste-move-log-btn");
		const reportCounterpartyBtn = document.querySelector("#report-counterparty-btn");
		const reportLpuBtn = document.querySelector("#report-lpu-btn");
		const reportCarBtn = document.querySelector("#report-car-btn");
		const reportTypeWasteBtn = document.querySelector("#report-type-waste-btn");
		const changeLogBtn = document.querySelector("#change-log-btn");

		const insertReport = (link) => {
			fetch(link)
				.then((response) => response.text())
				.then((text) => {
					reportsContainer.innerHTML = "";
					reportsContainer.innerHTML = text;
					const monthpicker = document.querySelectorAll("#month-picker");
					if (monthpicker.length > 0) {
						monthpicker.forEach((item) => {
							const datepicker = new Datepicker(item, {
								language: "ru",
								pickLevel: 1,
								defaultViewDate: "01/01/2023",
							});
						});
					}
					const yearpicker = document.querySelectorAll("#year-picker");
					if (yearpicker.length > 0) {
						yearpicker.forEach((item) => {
							const datepicker = new Datepicker(item, {
								language: "ru",
								pickLevel: 2,
								defaultViewDate: "01/01/2023",
							});
						});
					}
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
