import HOST from "../config/config";
import { getItem } from "../services/localStorage";

const TOKEN = getItem("token");
const EMAIL = getItem("email");

// get all reports
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


// get all reports for post
export const getPostReports = (postId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `admin/report/subject?id=${postId}&email=${EMAIL}`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        return data;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// admin ban for post
export const adminBanPostDB = (postId) => {
  const requestOptions = {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `admin/report/process?id=${postId}`, requestOptions)
    .then((res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};


