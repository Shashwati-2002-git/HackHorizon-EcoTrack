let chart;

// 📊 Load data based on button click
function loadData(type) {

    let labels = [];
    let values = [];

    if (type === "day") {
        labels = ["6 AM", "9 AM", "12 PM", "3 PM", "6 PM", "9 PM"];
        values = [1.2, 2.5, 3.0, 2.2, 4.1, 3.3];
    }

    else if (type === "week") {
        labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
        values = [10, 12, 8, 15, 9, 11, 13];
    }

    else if (type === "month") {
        labels = ["Week 1", "Week 2", "Week 3", "Week 4"];
        values = [50, 65, 40, 70];
    }

    else if (type === "year") {
        labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
        values = [200, 180, 220, 250, 270, 260, 300, 290, 310, 330, 350, 370];
    }

    renderChart(labels, values, type);
}


// 📈 Render chart
function renderChart(labels, data, type) {

    const ctx = document.getElementById("chart").getContext("2d");

    // Destroy previous chart (important)
    if (chart) {
        chart.destroy();
    }

    chart = new Chart(ctx, {
        type: "bar",
        data: {
            labels: labels,
            datasets: [{
                label: "Carbon Footprint (kg CO₂)",
                data: data
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: true
                }
            },
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
}


// 🌍 Make functions global (VERY IMPORTANT)
window.loadData = loadData;