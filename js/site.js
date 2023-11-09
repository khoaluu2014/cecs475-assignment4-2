loadHolidays();

async function loadHolidays() {
	document
		.getElementById("holidaysForm")
		.addEventListener("submit", async function (event) {
			// Prevent the default form submission
			event.preventDefault();

			const year = document.getElementById("txtYear").value;
			const countryCode = document.getElementById("txtCountryCode").value;
			const tbody = document.getElementById("holidaysTable");

			try {
				const holidays = await getHolidays(year, countryCode);

				// Clear previous results
				tbody.innerHTML = "";

				// Add new results to the table body
				holidays.forEach((holiday) => {
					let row = `<tr>
								<td>${holiday.date}</td>
								<td>${holiday.name}</td>
								<td>${holiday.localName}</td>
								<td>${holiday.countryCode}</td>
								<td>${holiday.global ? "Yes" : "No"}</td>
						   </tr>`;
					tbody.innerHTML += row;
				});
			} catch (error) {
				console.error("Error fetching holidays:", error);
			}
		});
}
async function getHolidays(year, countryCode) {
	// if (!countryCode || year <= 0) {
	// 	return []; // Return an empty array if the inputs are not valid.
	// }

	try {
		const response = await fetch(
			`https://date.nager.at/api/v2/PublicHolidays/1999/US`
		);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const holidays = await response.json();
		return holidays;
	} catch (error) {
		console.error("Error fetching holidays:", error);
	}
}
