import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${BASE_URL}/auth/refresh`, null, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("refreshToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
