import { useNavigate } from "react-router-dom";
import { useAppDispatch } from "../hooks/useAppDispatch";
import { logout } from "../features/authSlice";

const LogoutButton = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    localStorage.removeItem("token");
    navigate("/"); // login page
  };

  return (
    <button
      onClick={handleLogout}
      className="text-red-600 hover:underline text-sm"
    >
      Logout
    </button>
  );
};

export default LogoutButton;
