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


// Form submission (ONLY backend)
document.addEventListener("DOMContentLoaded", () => {

    const form = document.getElementById("carbonForm");

    form.addEventListener("submit", async function(e) {
        e.preventDefault();

        const data = {
            food: document.getElementById("food").value,
            foodCount: Number(document.getElementById("foodCount").value) || 0,

            transport: document.getElementById("transport").value,
            vehicleType: document.getElementById("vehicleType").value,
            kmTravelled: Number(document.getElementById("kmTravelled").value) || 0,
            travelDays: Number(document.getElementById("travelDays").value) || 0,

            shopping: document.getElementById("shopping").value,
            clothMaterial: document.getElementById("clothMaterial").value,
            clothCount: Number(document.getElementById("clothCount").value) || 0,

            appliances: document.getElementById("appliances").value,
            usageTime: Number(document.getElementById("usageTime").value) || 0
        };

        try {
            const res = await fetch("/api/calculate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const result = await res.json();

            // Store result for result page
            localStorage.setItem("carbonResult", JSON.stringify(result));

            // Redirect
            window.location.href = "/result";

        } catch (error) {
            console.error("Error:", error);
        }
    });

});