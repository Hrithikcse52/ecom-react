import { API } from "../../backend";

export const createCategory = async (userId, token, category) => {
  try {
    const response = await fetch(`${API}/category/create/:${userId}`, {
      method: "POST",
      headers: {
        Accept: "appilication/json",
        "Content-Tyoe": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(category),
    });
    return await response.json();
  } catch (e) {
    return console.log(e);
  }
};
