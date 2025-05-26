/* eslint-disable import/no-unresolved */
import { URL } from "@env";

export async function getChat(token, geoPoint) {
  try {
    const url = URL + `/chat/get-chat?${geoPoint}`;
    const response = await window.fetch(url, {
      headers: {
        authorization: `Bearer ${token}`,
      },
      method: "GET",
    });
    const res = await response.json();
    return res;
  } catch (error) {
    return error;
  }
}
