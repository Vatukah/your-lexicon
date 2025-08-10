import { useEffect } from "react";
import { useAuth } from "../../contexts/authContext";


export default function EmailRedirect() {
   

     const token = new URLSearchParams(window.location.hash.replace('#', '')).get("access_token");
     const refreshToken = new URLSearchParams(window.location.hash.replace('#', '')).get("refresh_token");

    useEffect(() => {
        console.log("Email redirect component mounted");
        console.log("Access token:", token);
        console.log("Refresh token:", refreshToken);

        if (token) {
            document.cookie = `token=${token}; path=/; max-age=3600`; // Set cookie for 1 hour
            document.cookie = `refresh_token=${refreshToken}; path=/; max-age=604800`; // Set cookie for 1 week

            window.location.href = "/"; // Redirect to login page
        }

    }, []);

  return (
    <div>
      <h1>Email Redirect</h1>
      <p>If you are not redirected automatically, follow the link below:</p>
      <a href="/login">Login</a>
    </div>
  );
}