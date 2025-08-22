import DangerBtn from "../btns/dangerBtn.jsx";
import SecondaryBtn from "../btns/secondaryBtn.jsx";
import BasicBtn from "../btns/basicBtn.jsx";
import { useAuth } from "../../contexts/authContext.jsx";
import { logout } from "../../services/logout.js";
import { useModal } from "../../contexts/modalContext.jsx";

export default function UserProfileModal({ user }) {
  const { setUser } = useAuth();
  const { showModal, closeModal } = useModal();

   const handleLogout = async () => {
    await logout().then(() => {
      setUser(null);
      closeModal();
    });
  };

  return (
    <div className="w-full ">
      <div className="w-full h-24 bg-accent rounded-tl-lg rounded-tr-lg">
        <div className="w-24 h-24 bg-accent rounded-full overflow-hidden -translate-y-[-50%] ml-4 border-4 border-white">
          <img src="./yl.svg" alt="profile pic" />
         
        </div>
      </div>

      <div className="w-full h-12 ">
        {/* Equalizer */}
        <div className="flex justify-end items-center h-full space-x-2 px-2">
          {/* <SecondaryBtn text={'Edit Profile'}  />*/}
          <DangerBtn text={'Sign out'} action={handleLogout} /> 
          <BasicBtn text={'Edit'} />
          <BasicBtn text={'Close'} action={closeModal} />
        </div>
       
      </div>
      <div className="px-4 text-text text-left">
        <div>
          <h2 className="text-2xl font-bold ">
            {user?.user_metadata.full_name}
          </h2>
          <p>{user?.user_metadata.email}</p>
        </div>
       

        {/* Add more profile details here */}
      </div>
    </div>
  );
}
