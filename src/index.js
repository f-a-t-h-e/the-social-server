import "dotenv/config";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";
import { fileURLToPath } from "url";
import connectDB from "./database/connect.js";
import router from "./routes/index.js";

/* CONFIGURATIONS */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));
app.use(bodyParser.json({ limit: "30mb" }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));
app.use(cors());
app.use("/assets", express.static(path.join(__dirname, "../public/assets")));

/* ROUTES */
app.use("/api/v1", router);

const PORT = process.env.PORT || 8080;

const start = async () => {
  try {
    /* MONGOOSE */
    await connectDB(process.env.MONGO_URI);
    app.listen(PORT, () => {
      console.log(`server is running at http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("🚀 ~ file: index.ts:44 ~ start ~ error", error);
  }
};

start();
