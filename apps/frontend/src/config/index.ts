export const BASE_BACKEND_URL =
  process.env.NODE_ENV === "production"
    ? process.env.BASE_BACKEND_URL
    : "http://localhost:3000";

export const config = {
  GENERATE_IMAGE: `${BASE_BACKEND_URL}/api/v1/image/generate`,
};
