import SecondaryBtn from "../btns/secondaryBtn";
import PrimaryBtn from "../btns/primaryBtn";
import Signup from "../auth/signup";
import { useModal } from "../../contexts/modalContext";
import SignIn from "../auth/signIn";
import { useAuth } from "../../contexts/authContext";
import { logout } from "../../services/logout";
import { NavLink, useNavigate } from "react-router";
import { navlinks } from "../../constants/navigation";
import Profile from "../profile";
export default function Navbar() {
  const { showModal } = useModal();
  const { user, setUser } = useAuth();
  const navigate = useNavigate();
 

 

  return (
    <nav className="navbar w-full h-[var(--navbar-height)] bg-white text-text p-4 flex justify-between items-center">
      <div className="logo flex items-center ">
        <img
          src="/yl.svg"
          alt="yourLexicon logo"
          className="w-8 h-8  lg:w-12 lg:h-12   inline-block mr-2"
        />
        <span className=" text-sm text-sm sm:text-md md:text-lg lg:text-xl font-bold text-text">
          Your Lexicon
        </span>
      </div>
      <div className="hidden md:block flex space-x-4">
        {/* <input type="search" name="search" id="search" placeholder="Search..." className="border p-2 px-4 rounded-full max-w-sm" onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSearch(event);
              }
            }}  /> */}
        {navlinks.map((link) => (
          <NavLink
            key={link.path}
            to={link.path}
            className="text-sm   text-text-muted hover:text-text"
          >
            {link.title}
          </NavLink>
        ))}
      </div>
      <div className="flex space-x-4 items-center">
        {user ? (
          <Profile />
        ) : (
          <>
            <SecondaryBtn
              text="Login"
              action={() => {
                showModal(<SignIn />);
              }}
            />
            <PrimaryBtn
              text="Sign Up"
              action={() => {
                showModal(<Signup />);
              }}
            />
          </>
        )}
      </div>
    </nav>
  );
}
