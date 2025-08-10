import { API_ENDPOINTS, fetchApi } from "../../config/api";
import { useAuth } from "../../contexts/authContext";
import { useModal } from "../../contexts/modalContext";
import PrimaryBtn from "../btns/primaryBtn";
import { useState } from "react";

export default function SignIn() {

  const {user,setUser} = useAuth();
  const {closeModal} = useModal();

   const [email,setEmail] = useState("");
   const [password,setPassword] = useState("");
   const [loading, setLoading] = useState(false);

  const handleSignIn = async (e) => {
    setLoading(true);
    await fetchApi(API_ENDPOINTS.SIGNIN, {
      method: "POST",
      body: JSON.stringify({ email, password }),
    }).then((res)=>{
    
      if (res.user) {
        setUser(res.user);
      
      } else {
        console.error("No user found in sign-in response");
      }
    }).catch((error) => {
      console.error("Sign-in error:", error);
    }).finally(() => {
      setLoading(false);
       closeModal();
    });
  };
  return (
    <div className="w-80">
      <h2 className="text-xl font-bold mb-4">Sign In</h2>
      <input type="email" placeholder="Email" className="border p-2 mb-2 w-full" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" className="border p-2 mb-2 w-full" value={password} onChange={(e) => setPassword(e.target.value)} />
      <PrimaryBtn text={loading ? "Signing In..." : "Sign In"} action={handleSignIn} />
    </div>
  );
}