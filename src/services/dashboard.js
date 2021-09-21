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

// delete category
export const deleteCategoryDB = (categoryId) => {
  
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    }
  };

  return fetch(HOST + `admin/category/${categoryId}`, requestOptions)
    .then( (res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// delete subcategory
export const deleteSubCategoryDB = (subCategoryId) => {
  
  const requestOptions = {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    }
  };

  return fetch(HOST + `admin/subcategory/${subCategoryId}`, requestOptions)
    .then( (res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// edit Category
export const editCategoryDB = (categoryId, newName) => {
  
  const requestOptions = {
    "method": "PATCH",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      "categoryName":newName
    })
  };

  return fetch(HOST + `admin/category/${categoryId}`, requestOptions)
    .then( (res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};

// edit subcategory
export const editSubCategoryDB = (subCategoryId, newName) => {
  
  const requestOptions = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${TOKEN}`,
    },
    body: JSON.stringify({
      subCategoryName:newName
    })
  };

  return fetch(HOST + `admin/subcategory/${subCategoryId}`, requestOptions)
    .then( (res) => {
      if (res.ok) {
        return true;
      }
      return false;
    })
    .catch((err) => console.error(err));
};