// eslint-disable-next-line import/no-unresolved
import { URL } from "@env";

export async function get(param1, param2, param3, token) {
  const response = await fetch(`${URL}/${param1}/${param2}?${param3}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  });
  const data = await response.json();
  return data;
}
