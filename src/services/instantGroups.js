import HOST from "../config/config";
import { getItem } from "../services/localStorage";

const TOKEN = getItem("token");

// create instant group
export const createInstantGroup = (data) => {
  const { email, post, emails } = data;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      emails,
    }),
  };

  return fetch(HOST + `user/group?email=${email}&post=${post}`, requestOptions)
    .then((res) => {
      if (res.ok) {
        return 200;
      }else if(res.status === 412){
        return 412;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// get user instant groups
export const getAllInstantGroup = (email) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `user/group/all?email=${email}`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        return await res.json();
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// get group data
export const getGroupData = (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `user/group/${id}`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        return await res.json();
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// send message
export const sendMessage = (data) => {
  const { group, email, content } = data;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      content,
    }),
  };

  return fetch(HOST + `user/chat?email=${email}&group=${group}`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        return await res.json();
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// add members to instant group
export const addInstantGroupMemebers = (data) => {
  const { id, emails } = data;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      emails,
    }),
  };

  return fetch(HOST + `user/group/add?id=${id}`, requestOptions)
    .then((res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// remove members to instant group
export const removeInstantGroupMemebers = (data) => {
  const { id, emails } = data;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      emails,
    }),
  };

  return fetch(HOST + `user/group/remove?id=${id}`, requestOptions)
    .then((res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// delete  instant group
export const deleteInstantGroup = (data) => {
  const { id, email } = data;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(
    HOST + `user/group/deactivate?email=${email}&id=${id}`,
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

// leave from  instant group
export const leaveFromGroup = (data) => {
  const { id, email } = data;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      emails:[email]
    }),
  };

  return fetch(
    HOST + `user/group/remove?&id=${id}`,
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
