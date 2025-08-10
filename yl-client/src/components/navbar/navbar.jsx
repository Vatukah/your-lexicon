import SecondaryBtn from '../btns/secondaryBtn';
import PrimaryBtn from '../btns/primaryBtn';
import Signup from '../auth/signup';
import {useModal } from '../../contexts/modalContext';
import SignIn from '../auth/signIn';
import { API_ENDPOINTS, fetchApi } from '../../config/api';
import { useAuth } from '../../contexts/authContext';
import { logout } from '../../services/logout';
import { useNavigate } from 'react-router';
export default function Navbar() {
  const { showModal } = useModal();
  const { user,setUser } = useAuth();
  const navigate = useNavigate();
  const handleSearch = (event) => {
    event.preventDefault(); // Prevent default form submission
    
    const query = event.target.value; // Get the search query
    if (query.trim() === '') {

      return;
    }
    navigate(`/search/${query}`); // Navigate to the search page with the query
  };

  const handleLogout = async () => {
    await logout().then(() => {
      setUser(null);
    });
  };

  return (
    <nav className="navbar w-full  bg-bg-muted text-text p-4 flex justify-between items-center">
        <div className="logo flex items-center">
            <img src="/yl.svg" alt="yourLexicon logo" className="w-12 h-12 inline-block mr-2" />
            <span className="text-xl font-bold text-accent">Your Lexicon</span>
        </div>
        <div>
            <input type="search" name="search" id="search" placeholder="Search..." className="border p-2 px-4 rounded-full max-w-sm" onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch(event);
              }
            }}  />
        </div>
        <div className="nav-links flex space-x-4 items-center">
              {user ? (
                <>
                  <span className="text-sm">Welcome, {user?.user_metadata.username}!</span>
                  <PrimaryBtn text="Logout" action={handleLogout} />
                </>
              ) : (
                <>
                  <SecondaryBtn text="Login" action={() => {showModal(<SignIn />)}} />
                  <PrimaryBtn text="Sign Up" action={() => {showModal(<Signup />)}} />
                </>
              )}
        </div>
    </nav>
  );
}