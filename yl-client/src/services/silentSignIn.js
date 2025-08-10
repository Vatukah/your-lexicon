import { fetchApi } from "../config/api";
import { API_ENDPOINTS } from "../config/api";

export default async function silentSignIn() {
    let user;
    await fetchApi(`${API_ENDPOINTS.REFRESH_TOKEN}`, {
        method: 'POST',
        credentials: 'include'
    }).then((res) => {
         
            if (res.user) {
                user = res.user;
            } else {
                console.error("No user found in silent sign-in response");
            }
        })
    return user;
}
