import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fetch from "node-fetch";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/calculate", async (req, res) => {
    try {
        const { food, transport, shopping, appliances } = req.body;

        const prompt = `
You are a carbon footprint calculator.

User input:
Food: ${food}
Transport: ${transport}
Shopping: ${shopping}
Appliances: ${appliances}

1. Estimate carbon footprint in kg CO2
2. Explain briefly
3. Give 4 suggestions to reduce it
`;

        const response = await fetch("https://api.groq.com/openai/v1/chat/completions", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${process.env.GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: "llama3-70b-8192",  // best free model
                messages: [
                    { role: "user", content: prompt }
                ]
            })
        });

        const data = await response.json();

        res.json({
            result: data.choices?.[0]?.message?.content || "No response"
        });

    } catch (error) {
        console.error(error);
        res.status(500).json({ error: "Server error" });
    }
});

app.listen(process.env.PORT, () => {
    console.log(`Server running on http://localhost:${process.env.PORT}`);
});