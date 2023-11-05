import axios from "axios";

const BASE_URL = "http://localhost:3001";

export const getUserInfo = async () => {
  try {
    const response = await axios.get(`${BASE_URL}/user/me`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
