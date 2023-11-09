document.addEventListener("DOMContentLoaded", () => {
	const form = document.getElementById("holidaysForm");

	form.addEventListener("submit", async function (event) {
		event.preventDefault(); // Prevent form from submitting and refreshing the page

		const year = document.getElementById("txtYear").value;
		const countryCode = document.getElementById("txtCountryCode").value;
		const tbody = document.getElementById("holidaysTable");

		// Debugging line: Check if this gets printed every time you click submit
		console.log("Form submitted with: ", year, countryCode);

		try {
			// Clear previous results
			tbody.innerHTML = "";

			const holidays = await getHolidays(year, countryCode);
			if (holidays && holidays.length) {
				// Append new results to the table
				holidays.forEach((holiday) => {
					let row = `<tr>
                          <td>${holiday.date}</td>
                          <td>${holiday.name}</td>
                          <td>${holiday.localName}</td>
                          <td>${holiday.countryCode}</td>
                          <td>${holiday.global ? "Yes" : "No"}</td>
                        </tr>`;
					tbody.innerHTML += row; // Consider using `insertAdjacentHTML` for better performance
				});
			} else {
				// No holidays found or an error occurred
				tbody.innerHTML =
					'<tr><td colspan="5">No holidays found or an error occurred.</td></tr>';
			}
		} catch (error) {
			console.error("Error fetching holidays:", error);
			tbody.innerHTML =
				'<tr><td colspan="5">Error loading holidays. Please try again.</td></tr>';
		}
	});
});

async function getHolidays(year, countryCode) {
	// if (!countryCode || year <= 0) {
	// 	return []; // Return an empty array if the inputs are not valid.
	// }

	try {
		const response = await fetch(
			`https://date.nager.at/api/v2/PublicHolidays/${year}/${countryCode}`
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
