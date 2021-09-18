import HOST from "../config/config";
import { getItem } from "../services/localStorage";

const TOKEN = getItem("token");

// get all posts
export const getReviewsByPostId = (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `public/review/all?id=${id}`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        return data;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// add review
export const addReview = (email, name, postId, description, userRate) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      reviewedBy: name,
      postId,
      description,
      userRate,
    }),
  };
  return fetch(HOST + `user/review?email=${email}`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        let data = await res.json();
        return data;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// add revirew like dislike
export const addOrRemoveReviewReact = (data) => {
  const { id, email, like, remove } = data;

  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(
    HOST +
      `public/review/react?email=${email}&id=${id}&like=${like}&remove=${remove}`,
    requestOptions
  )
    .then(async (res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// get review by id
export const getReviewById = (id) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
  };

  return fetch(HOST + `user/review/${id}`, requestOptions)
    .then(async (res) => {
      if (res.ok) {
        return await res.json();
      }
      return false;
    })
    .catch((err) => console.error(err));
};
