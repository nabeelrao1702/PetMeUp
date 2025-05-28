
import UserFilterDesktop from "./UserFilterDesktop";
import { Outlet } from "react-router-dom";

const UserList = () => {
  return (
    <div>
      <UserFilterDesktop />
      <Outlet />
    </div>
  );
};

export default UserList;
