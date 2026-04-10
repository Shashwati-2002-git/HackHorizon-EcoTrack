// Sidebar switching
function loadForm(type, btn) {
    const titles = {
        current: "Current Consumption",
        day: "Last 24 Hours",
        week: "Weekly Data",
        month: "Monthly Data",
        year: "Yearly Data"
    };

    document.getElementById("formTitle").innerText = titles[type];

    document.querySelectorAll(".sidebar button").forEach(b => {
        b.classList.remove("active");
    });

    btn.classList.add("active");
}


// Form submission
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("carbonForm");

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        // Collect form data
        const data = {
            food: document.getElementById("food").value,
            foodCount: document.getElementById("foodCount").value,

            transport: document.getElementById("transport").value,
            vehicleType: document.getElementById("vehicleType").value,
            kmTravelled: document.getElementById("kmTravelled").value,
            travelDays: document.getElementById("travelDays").value,

            shopping: document.getElementById("shopping").value,
            clothMaterial: document.getElementById("clothMaterial").value,
            clothCount: document.getElementById("clothCount").value,

            appliances: document.getElementById("appliances").value,
            usageTime: document.getElementById("usageTime").value
        };

        try {
            const response = await fetch("/result", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            // If backend redirects → follow it
            if (response.redirected) {
                window.location.href = response.url;
            } else {
                // fallback (in case backend sends normal response)
                window.location.href = "/result";
            }

        } catch (error) {
            console.error("Error submitting form:", error);
        }
    });
});