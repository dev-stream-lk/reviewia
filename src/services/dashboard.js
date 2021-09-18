import HOST from "../config/config";
import { getItem } from "../services/localStorage";
const TOKEN = getItem("token");


// create new category
export const createNewCategory = (categoryName,type) => {
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        categoryName,
        type
      }),
    };
  
    return fetch(HOST + `admin/category`, requestOptions)
      .then( async (res) => {
        if (res.ok) {
          return await res.json();
        }
        return false;
      })
      .catch((err) => console.error(err));
  };


// create new sub category
export const createNewSubCategory = (subCategoryName,categoryId) => {
  
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${TOKEN}`,
      },
      body: JSON.stringify({
        subCategoryName,
      }),
    };
  
    return fetch(HOST + `admin/subcategory?id=${categoryId}`, requestOptions)
      .then( async (res) => {
        if (res.ok) {
          return await res.json();
        }
        return false;
      })
      .catch((err) => console.error(err));
  };