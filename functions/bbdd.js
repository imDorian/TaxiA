// eslint-disable-next-line import/no-unresolved
import { URL } from '@env';

export async function get(param1, param2) {
    const response = await fetch(`${URL}/${param1}/${param2}`,
        {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        }
    );
    const data = await response.json();

    return data;
}

