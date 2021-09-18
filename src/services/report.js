import HOST from "../config/config";
import { getItem } from "../services/localStorage";
const TOKEN = getItem("token");

// report post or review
export const reportPostOrReview = (email, subjectId, type, reason) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      reason: reason,
    }),
  };

  return fetch(
    HOST + `user/report?email=${email}&subjectId=${subjectId}&type=${type}`,
    requestOptions
  )
    .then((res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};
