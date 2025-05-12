/* eslint-disable import/no-unresolved */
import { URL } from '@env';

export const getDetail = async (id) => {
    console.log(`${URL}/billing/get-billing/${id}`);
    const response = await fetch(`${URL}/billing/get-billing/${id}`);
    const data = await response.json();
    return data;
}


