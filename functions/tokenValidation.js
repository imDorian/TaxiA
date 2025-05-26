/* eslint-disable import/no-unresolved */
import { URL } from "@env";

export async function tokenValidation() {
  const url = URL + "/user/istoken";
  const response = await window.fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    // body: token,
  });
  console.log(response.status);
  if (response.status === 200) {
    console.log("token is valid");
  } else {
    console.log("error token");
  }
}
