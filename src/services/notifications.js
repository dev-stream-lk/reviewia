import HOST from "../config/config";
import { getItem } from "../services/localStorage";

const TOKEN = getItem("token");

// get user notifications count
export const getNotificationCount = (email) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `user/notification/count?email=${email}`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        return await res.json();
      }else if(res.status === 423){
        return 423;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// get user notifications
export const getNotifications = (email) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `user/notification?email=${email}`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        return await res.json();
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// mark as read notifications
export const markAsRead = (notifiId) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `user/notification/edit?id=${notifiId}`, requestOptions)
    .then((res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};
