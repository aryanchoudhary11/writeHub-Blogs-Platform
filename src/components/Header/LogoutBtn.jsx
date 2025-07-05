import { useDispatch } from "react-redux";
import authService from "../../Appwrite/auth";
import { logout } from "../../store/authSlice";

function LogoutBtn() {
  const dispatch = useDispatch();

  const logoutHandler = async () => {
    await authService.logout();
    dispatch(logout());
    window.location.reload(); // Optional: refresh to clean state
  };

  return (
    <button
      onClick={logoutHandler}
      className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-medium rounded-md transition duration-200"
    >
      Logout
    </button>
  );
}

export default LogoutBtn;
