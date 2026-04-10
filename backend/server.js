import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";
import path from "path";
import { fileURLToPath } from "url";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

/* ✅ Fix __dirname */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

/* ✅ Middleware */
app.use(cors());
app.use(express.json());

/* 🔥 DEBUG: Check ENV */
console.log("🔑 GROQ API KEY:", process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌");

/* ✅ Serve Frontend */
app.use(express.static(path.join(__dirname, "../frontend")));

/* ✅ Routes */
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/index.html"));
});

app.get("/input", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/input.html"));
});

app.get("/result", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/result.html"));
});

app.get("/login", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/login.html"));
});

app.get("/create-account", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/createAccount.html"));
});

app.get("/dashboard", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/dashboard.html"));
});

app.get("/history", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/history.html"));
});

app.get("/community", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/community.html"));
});

app.get("/forgot-password", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/forgotPassword.html"));
});

app.get("/create-community", (req, res) => {
    res.sendFile(path.join(__dirname, "../frontend/pages/createCommunity.html"));
});

/* ✅ Fix Chrome warning */
app.get("/.well-known/appspecific/com.chrome.devtools.json", (req, res) => {
    res.json({});
});

/* ✅ MAIN API */
app.post("/api/calculate", async (req, res) => {
    try {
        console.log("\n📥 Incoming Request:", req.body);

        const {
            food,
            foodCount,

            transport,
            vehicleType,
            kmTravelled,
            travelDays,

            shopping,
            clothMaterial,
            clothCount,

            appliances,
            usageTime
        } = req.body;

        /* ✅ Input validation */
        if (
            !food && !foodCount &&
            !transport && !kmTravelled &&
            !shopping && !clothCount &&
            !appliances && !usageTime
        ) {
            console.log("❌ Empty input");
            return res.status(400).json({ error: "Please enter some data" });
        }

        /* 🔥 Prompt */
        const prompt = `
                        You are a carbon footprint expert and sustainability advisor.

                        Analyze the user's lifestyle and provide detailed insights.

                        -----------------------------
                        📊 USER INPUT
                        -----------------------------

                        🍽 Food:
                        Type: ${food}
                        Times Consumed: ${foodCount}

                        🚗 Transport:
                        Mode: ${transport}
                        Vehicle Type: ${vehicleType}
                        Distance Travelled: ${kmTravelled} km
                        Days Travelled: ${travelDays}

                        🛍 Shopping:
                        Items: ${shopping}
                        Material: ${clothMaterial}
                        Quantity: ${clothCount}

                        ⚡ Appliances:
                        Devices: ${appliances}
                        Usage Time: ${usageTime} hours

                        -----------------------------
                        📊 OUTPUT FORMAT
                        -----------------------------

                        1️⃣ CURRENT CARBON FOOTPRINT

                        Total Carbon Footprint: ___ kg CO2

                        Breakdown:
                        - Food: ___ kg CO2
                        - Transport: ___ kg CO2
                        - Shopping: ___ kg CO2
                        - Appliances: ___ kg CO2

                        -----------------------------
                        2️⃣ ECO-FRIENDLY RECOMMENDATIONS

                        Provide 4-6 actionable steps relevant to user's input to reduce carbon footprint.

                        -----------------------------
                        3️⃣ SUSTAINABLE BRAND SUGGESTIONS

                        Suggest real-world eco-friendly brands/products relevant to the user's input:

                        - Food Brands: ___
                        - Transport Alternatives (EV brands / public transport options): ___
                        - Clothing/Shopping Brands: ___
                        - Appliance Brands (energy efficient): ___

                        (Ensure brands are realistic, popular, and known for sustainability.)

                        -----------------------------
                        4️⃣ IMPROVED CARBON FOOTPRINT (AFTER FOLLOWING RECOMMENDATIONS)

                        Recalculate assuming the user follows ALL recommendations and uses suggested brands:

                        New Carbon Footprint: ___ kg CO2

                        Breakdown:
                        - Food: ___
                        - Transport: ___
                        - Shopping: ___
                        - Appliances: ___

                        -----------------------------
                        5️⃣ CARBON REDUCTION IMPACT

                        Total Reduction: ___ kg CO2

                        Percentage Reduction: ___ %

                        Explain briefly how the reduction was achieved.

                        -----------------------------
                        IMPORTANT RULES:
                        - Be realistic with numbers.
                        - Ensure improved footprint is LOWER than original.
                        - Keep explanation clear and structured.
                        - Avoid vague statements.
                        `;

        console.log("📤 Sending request to Groq...");

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama-3.3-70b-versatile", // 🔥 safer model
                messages: [
                    { role: "user", content: prompt }
                ],
                temperature: 0.7
            })
        });

        console.log("📡 Groq Status:", response.status);

        const data = await response.json();

        console.log("📩 Groq Response:", JSON.stringify(data, null, 2));

        /* ❌ Handle API error */
        if (!response.ok) {
            console.error("❌ Groq API FAILED");
            return res.status(500).json({
                error: "Groq API failed",
                details: data
            });
        }

        /* ✅ Success */
        const result = data?.choices?.[0]?.message?.content;

        if (!result) {
            console.log("⚠️ No result from Groq");
            return res.status(500).json({ error: "No response from AI" });
        }

        console.log("✅ Success!");

        res.json({ result });

    } catch (error) {
        console.error("🔥 SERVER ERROR:", error);
        res.status(500).json({
            error: "Internal server error",
            message: error.message
        });
    }
});

/* ✅ START SERVER */
app.listen(PORT, () => {
    console.log("\n====================================");
    console.log("🚀 EcoTrack Server Running");
    console.log(`🌐 http://localhost:${PORT}`);
    console.log("====================================\n");
});