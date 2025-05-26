/* eslint-disable import/no-unresolved */
import { URL } from "@env";

export default async function login(userData) {
  const url = URL + "/user/login";
  try {
    const response = await window.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.error(error);
  }
}
