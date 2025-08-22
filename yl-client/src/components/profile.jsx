import { useAuth } from "../contexts/authContext";
import { useModal } from "../contexts/modalContext";
import UserProfileModal from "./modals/userProfileModal";

export default function Profile() {
  const { user } = useAuth();
  const { showModal } = useModal();

  return (
    <div
      className="w-8 h-8 bg-accent ring-1 ring-accent ring-offset-2 p-1 rounded-full overflow-hidden"
      title={user?.user_metadata.username}
      onClick={() => showModal(<UserProfileModal user={user} />)}
    >
      <img src="/yl.svg" alt="profile image" className="w-full h-full object-cover " />
    </div>
  );
}
