import { useContext,createContext,useState,useEffect, use } from "react";
import silentSignIn from "../services/silentSignIn";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    silentSignIn().then((user) => {
      if (user) {
        setUser(user);
      }
    }).catch((error) => {
      console.error('Silent sign-in error:', error?.error);
    });
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
