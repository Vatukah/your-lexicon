import { useContext,createContext,useState,useEffect,} from "react";
import silentSignIn from "../services/silentSignIn";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [channel, setChannel] = useState('word_updates');
  const [messages, setMessages] = useState({});

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
    <AuthContext.Provider value={{ user, setUser ,channel, setChannel, messages, setMessages }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
