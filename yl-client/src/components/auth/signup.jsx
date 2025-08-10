import { useEffect, useState } from "react";
import { API_ENDPOINTS, fetchApi } from "../../config/api";

// components/Signup.js

export default function Signup() {
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const [showOverlay, setShowOverlay] = useState(false);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [full_name, setFull_name] = useState("");

  const [loading, setLoading] = useState(false);

  async function getMyCookie() {
    try {
      const emailSent = await cookieStore.get("emailSent");
      if (emailSent) {
        setShowOverlay(true);
      } else {
        setShowOverlay(false);
      }
    } catch (error) {
      console.error("Error getting cookie:", error);
      setShowOverlay;
    }
  }

  useEffect(() => {
    getMyCookie();
  }, []);

  const handleSignup = async () => {
    setLoading(true);
    setError(null);
    setMessage("");
    try {
      const response = await fetchApi(`${API_ENDPOINTS.SIGNUP}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          username,
          full_name,
        }),
      });

      // If fetchApi returns a Response object, use .json()
      const data =
        typeof response.json === "function" ? await response.json() : response;
        console.log("Signup response:", data);
        console.log("Signup data:", response.statusCode);

      if (!data.user) {
        console.error("running error handling");
        setError(true);
        setMessage(data?.error || "Signup failed.");
        throw new Error(data?.error || "Signup failed.");
      }

      if (data.user) {
        setError(false);
        setMessage("Signup successful!");
        // Set cookie for 10 minutes using document.cookie for compatibility
        const expires = new Date(Date.now() + 10 * 60 * 1000).toUTCString();
        document.cookie = `emailSent=true; path=/; expires=${expires}`;
        setShowOverlay(true);
        setEmail("");
        setPassword("");
        setUsername("");
        setFull_name("");
      }
    } catch (error) {
      setError(true);
      setMessage(error.message || "An unexpected error occurred.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-80">
      <h2 className="text-xl font-bold mb-4">Sign Up</h2>

      {error && (
        <div
          className=" w-full h-full bg-red-600 my-2 text-sm p-2"
          style={{ width: "100%" }}
        >
          {message}
        </div>
      )}
      {!showOverlay && (
        <SignFields
          setCredentials={{ setEmail, setPassword, setUsername, setFull_name }}
          setError={setError}
          handleSignup={handleSignup}
          loading={loading}
          error={error}
        />
      )}
      {showOverlay && <Overlay message={message} />}
    </div>
  );
}

const SignFields = ({
  setCredentials = {},
  setError,
  handleSignup,
  loading,
  error,
}) => {
  return (
    <>
      <input
        type="email"
        placeholder="Email"
        className="border p-2 mb-2 w-full"
        value={setCredentials.email}
        onChange={(e) => {
          setCredentials.setEmail(e.target.value);
          setError(false);
        }}
      />
      <input
        type="password"
        placeholder="Password"
        className="border p-2 mb-2 w-full"
        value={setCredentials.password}
        onChange={(e) => {
          setCredentials.setPassword(e.target.value);
          setError(false);
        }}
      />
      <input
        type="text"
        placeholder="Username"
        className="border p-2 mb-2 w-full"
        value={setCredentials.username}
        onChange={(e) => {
          setCredentials.setUsername(e.target.value);
          setError(false);
        }}
      />
      <input
        type="text"
        placeholder="Full Name"
        className="border p-2 mb-2 w-full"
        value={setCredentials.full_name}
        onChange={(e) => {
          setCredentials.setFull_name(e.target.value);
          setError(false);
        }}
      />
      <button
        className={`bg-blue-500 text-white py-2 px-4 w-full ${
          error || loading ? "opacity-50 cursor-not-allowed" : ""
        }`}
        disabled={error || loading}
        onClick={handleSignup}
      >
        {loading ? "Signing Up..." : "Sign Up"}
      </button>
    </>
  );
};

const Overlay = () => {
  // on sign up success
  return (
    <div className=" inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-4 rounded shadow">
        <p>Signup successful! Confirm your email to activate your account.</p>
      </div>
    </div>
  );
};
