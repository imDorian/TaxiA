/* eslint-disable import/no-unresolved */
import { URL } from "@env";

export default async function register(userData) {
  const url = URL + "/user/register";
  try {
    const response = await window.fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const json = await response.json();
    if (response.error) return;
    return json;
  } catch (error) {
    console.error(error);
  }
}
