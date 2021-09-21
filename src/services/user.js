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
        let data = await res.json();
        return data;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// update user firstName lastName
export const updateProfile = (email,firstName, lastName) => {
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `user/registration/update?email=${email}&first=${firstName}&last=${lastName}`, requestOptions)
    .then(async (res) => {
      console.log(res)
      if (res.ok) {
        // let data = await res.json();
        setItem("name", `${firstName} ${lastName}`);
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};