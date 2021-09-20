import HOST from "../config/config";
import { getItem } from "../services/localStorage";
const TOKEN = getItem("token");

// get counts
export const getStatCounts = () => {
  
    const requestOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      }
    };
  
    return fetch(HOST + `admin/stats`, requestOptions)
      .then( async (res) => {
        if (res.ok) {
          return await res.json();
        }
        return false;
      })
      .catch((err) => console.error(err));
};