import HOST from "../config/config";
import { getItem } from "../services/localStorage";

const TOKEN = getItem("token");


export const getReportedPosts = () => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `admin/report`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        return data;
      }
      return false;
    })
    .catch((err) => console.error(err));
};