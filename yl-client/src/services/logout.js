import { fetchApi } from "../config/api";
import { API_ENDPOINTS } from "../config/api";


export const logout = async () => {

    console.log("Logging out user...");
     await fetchApi(API_ENDPOINTS.LOGOUT, {
      method: "POST",
    }).then((res) => {
      return res
    }).catch((error) => {
      console.error("Logout error:", error);
      throw error;
  });
};
