import HOST from "../config/config";
import { getItem, setItem } from "../services/localStorage";
import { refreshContext } from "../context/FavoriteList";

const user_register = (data) => {
  const { firstName, lastName, email, password } = data;

  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      firstName,
      lastName,
      email,
      password,
    }),
  };

  return fetch(HOST + "registration", requestOptions)
    .then((res) => {
      if (res.status === 201) {
        return true;
      } else {
        return res.json();
      }
    })
    .then((data) => {
      if (data === true) return true;
      else return data["message"];
    })
    .catch((err) => {
      console.error(err);
      return false;
    });
};

const user_login = ({ email, password }, setUserData, history) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password,
    }),
  };

  return fetch(HOST + "login", requestOptions)
    .then((res) => {
      if (res.ok) {
        return res.json();
      }
      return false;
    })
    .then( async (data) => {
      
      if (data) {
        let token = data["token"].split("Bearer ")[1];
        setItem("token", token);
        setItem("email", email);
        refreshContext();
        var role= "USER";
        const requestOptions = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        };
        await fetch(HOST + `user?email=${email}`, requestOptions)
          .then((res) => {
            if (res.ok) {
              return res.json();
            }
            return false;
          })
          .then((data) => {    
            if (data) {
              setItem("name", data["firstName"] + " " + data["lastName"]);
              setItem("role", data['role']);
              role = data['role'];
            }
          })
          .catch((err) => console.error(err));
        return {token, role};
      } else {
        return false;
      }
    })
    .catch((err) => console.error(err));
};

const get_user_basic_info = (token, email) => {
  const requestOptions = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  };

  return fetch(HOST + `user?email=${email}`, requestOptions)
    .then(async (res) => {
      let data = await res.json();
      if (data) {
        return data;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

const logout = (setUserData, history) => {
  setUserData((userData) => {
    return {
      userData: {
        ...userData.userData,
        name: "",
        token: "",
        isLoggedIn: false,
      },
      setUserData: userData.setUserData,
    };
  });
  let list = getItem("favList");
  localStorage.clear();
  setItem("favList", list);
  history.push("/login");
  window.location.reload();
};

const passwordRecovery = (email,password) => {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email,
      password
    }),
  };
  return fetch(HOST + "registration/reset", requestOptions)
    .then((res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

export {
  user_login,
  logout,
  passwordRecovery,
  user_register,
  get_user_basic_info,
};
