// Base URLs for different environments
const PROD_URL = "https://seven-bit-news-api.com";
const DEV_URL = "http://127.0.0.1:8000";

// Set the base URL based on environment
export const BASE_URL =
  process.env.NODE_ENV === "production" ? PROD_URL : DEV_URL;

// API endpoints
export const API_ENDPOINTS = {
  chat: `${BASE_URL}/api/chat`,
  topic: `${BASE_URL}/api/topic`,
  trending: `${BASE_URL}/api/trending`,
  reset: `${BASE_URL}/api/reset`,
};
