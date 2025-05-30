import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { logoutUser } from "../../../redux/actions/UserActions";

const ProfileMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(logoutUser(navigate, toast));
  };

  return (
    <div>
      <ul
        className="absolute right-0 w-80  mt-12 space-y-2 text-gray-600 bg-white border border-gray-100 rounded-md shadow-md z-20 "
        aria-label="submenu"
      >
        <li className="flex">
          <Link
            className="inline-flex items-center border-b -mb-2 w-full px-2 py-2 font-semibold text-sm transition-colors duration-150 hover:bg-gray-100 hover:text-gray-800 "
            to="/user"
          >
            <svg
              className="w-4 h-4 mr-3 text-orange-600"
              aria-hidden="true"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
            </svg>
            <span>Profile</span>
          </Link>
        </li>
        <li className="flex">
          <Link
            className="inline-flex items-center border-b -mb-2 w-full px-2 py-2 font-semibold text-sm transition-colors duration-150 hover:bg-gray-100 hover:text-gray-800 "
            to="/user/settings"
          >
            <svg
              className="w-4 h-4 mr-3  text-orange-600"
              aria-hidden="true"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path>
              <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path>
            </svg>
            <span>Settings</span>
          </Link>
        </li>
        <li className="flex cursor-pointer">
          <div
            className="inline-flex items-center  w-full px-2 py-2 font-semibold text-sm transition-colors duration-150 hover:bg-gray-100 hover:text-gray-800 "
            onClick={onLogout}
          >
            <svg
              className="w-4 h-4 mr-3 text-orange-600"
              aria-hidden="true"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            <span className="cursor:pointer">Log out</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default ProfileMenu;
