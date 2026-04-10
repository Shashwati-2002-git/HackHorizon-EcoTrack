function loadForm(type) {
    const titles = {
        current: "Current Consumption",
        day: "Last 24 Hours",
        week: "Weekly Data",
        month: "Monthly Data",
        year: "Yearly Data"
    };

    document.getElementById("formTitle").innerText = titles[type];
}

document.getElementById("carbonForm").addEventListener("submit", async (e) => {
    e.preventDefault();

    const button = document.querySelector("button");
    button.innerText = "Calculating...";
    button.disabled = true;

    const data = {
        food: document.getElementById("food").value.trim(),
        transport: document.getElementById("transport").value.trim(),
        shopping: document.getElementById("shopping").value.trim(),
        appliances: document.getElementById("appliances").value.trim()
    };

    try {
        const response = await fetch("http://localhost:5000/api/calculate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        });

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.error || "Something went wrong");
        }

        localStorage.setItem("carbonResult", JSON.stringify(result));

        window.location.href = "/result";

    } catch (error) {
        alert("❌ Error: " + error.message);
    } finally {
        button.innerText = "Calculate Carbon Footprint";
        button.disabled = false;
    }
});