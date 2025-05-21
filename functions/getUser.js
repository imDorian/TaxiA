/* eslint-disable import/no-unresolved */
import { URL } from "@env";

export async function getUser(token) {
  const url = URL + "/user/get-user";
  try {
    const response = await window.fetch(url, {
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    const res = response.json();

    return res;
  } catch (error) {
    console.error(error);
  }
}
