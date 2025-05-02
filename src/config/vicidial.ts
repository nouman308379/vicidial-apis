// src/config.ts
import dotenv from "dotenv";
dotenv.config();

export const CONFIG = {
  API_USERNAME: process.env.VICIDIAL_API_USERNAME,
  API_PASSWORD: process.env.VICIDIAL_API_PASSWORD,
  BASE_URL: process.env.VICIDIAL_BASE_URL,
};

if (!CONFIG.API_USERNAME || !CONFIG.API_PASSWORD || !CONFIG.BASE_URL) {
  console.error("❌ Vicidial API credentials are missing in environment variables");
}
