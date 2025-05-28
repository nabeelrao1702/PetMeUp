
import { Link } from "react-router-dom";
import icon4 from "../../../../img/icon4.jpg";
import AdminSideMenu from "./AdminSideMenu";

const SideMenuHelper = () => {
  return (
    <div>
      <Link
        to={"/admin/admin-dashboard"}
        className="flex items-center px-5 py-5 logo text-2xl  font-bold text-orange-600"
      >
        <img
          src={icon4}
          className="h-6 w-6 mr-2 inline-block transform md:scale-150"
          alt="titfortat icon"
        />
             <span className="inline-block font-serif text-3xl">PET</span>
              <span className="inline-block font-mono text-xl ml-1">Me</span>
              <span className="inline-block font-serif text-3xl ml-1">UP</span>
      </Link>

      <AdminSideMenu />
    </div>
  );
};

export default SideMenuHelper;
