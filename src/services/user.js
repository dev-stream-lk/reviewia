import HOST from "../config/config";
import { getItem, setItem } from "../services/localStorage";
const TOKEN = getItem("token");

export const getUserDetails = (email) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `user/?email=${email}`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        data = await res.json();
        return data;
      }
      return false;
    })
    .catch((err) => console.error(err));
};
