import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { processRightsRequest } from "./services/aiServices.js"; 

dotenv.config();

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.post("/api/rights", async (req, res) => {
    try {
        const { situation } = req.body;

        if (!situation) {
            return res.status(400).json({ error: "Situation description is required." });
        }

        const response = await processRightsRequest(situation);
        res.json(response);
    } catch (error) {
        console.error(" Error processing rights request:", error);
        res.status(500).json({
            error: "Error occurred while processing your request.",
            message: error.message,
        });
    }
});

app.get("/health", (req, res) => {
    res.status(200).json({ status: "ok" });
});

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
