import { API } from "../../backend";

// Categoey Calls

export const createCategory = async (userId, token, category) => {
  try {
    const response = await fetch(`${API}/category/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "appilication/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return response.json();
  } catch (err) {
    return console.log(err);
  }
};

export const getAllCategory = async () => {
  try {
    const res = await fetch(`${API}/categories`, { method: "GET" });
    return await res.json();
  } catch (err) {
    return console.log(err, "Something Went Wrong");
  }
};
export const getCategory = async (categoryId) => {
  try {
    const res = await fetch(`${API}/category/${categoryId}`, { method: "GET" });
    return await res.json();
  } catch (err) {
    return console.log(err, "Something Went Wrong");
  }
};

// Product Calls

// Create
export const createProduct = async (userId, token, product) => {
  try {
    const res = await fetch(`${API}/product/create/${userId}`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return await res.json();
  } catch (err) {
    return console.log(err, "coudnt Process Request");
  }
};

export const getAllProduct = async () => {
  try {
    const res = await fetch(`${API}/products`, { method: "GET" });
    return await res.json();
  } catch (err) {
    return console.log(err, "Something Went Wrong");
  }
};
export const getProduct = async (productId) => {
  try {
    const res = await fetch(`${API}/product/${productId}`, { method: "GET" });
    return await res.json();
  } catch (err) {
    return console.log(err, "Something Went Wrong");
  }
};

//Update

export const updateProduct = async (productId, userId, token, product) => {
  try {
    const res = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "PUT",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: product,
    });
    return await res.json();
  } catch (error) {
    console.log(error, "Coudnt Update the Product");
  }
};

// Delete
export const deleteProduct = async (productId, userId, token) => {
  try {
    const res = await fetch(`${API}/product/${productId}/${userId}`, {
      method: "DELETE",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return res.json();
  } catch (error) {
    console.log(error, "Coudn't Delete");
  }
};
