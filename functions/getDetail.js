/* eslint-disable import/no-unresolved */
import { URL } from "@env";

export const getDetail = async (id, token) => {
  const response = await fetch(`${URL}/billing/get-billing/${id}`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    method: "GET",
  });
  const data = await response.json();
  return data;
};
