
import { Link } from "react-router-dom";
import icon4 from "../../../../img/icon4.jpg";
import NavbarRightMenu from "./NavbarRightMenu";
import GlobalSearch from "./GlobalSearch";
const DashboardNavbar = () => {
  return (
    <div>
      <header className="flex items-center justify-between w-full py-8 mt-auto bg-white border-b shadow-md h-14">
        <Link
          to="user-dashboard"
          className="logo text-2xl font-bold text-orange-600 sm:ml-4"
        >
          <img
            src={icon4}
            className="h-6 w-6 mr-2 ml-2 inline-block transform md:scale-150"
            alt="PetmeUp icon"
          />
            <span className="inline-block font-serif text-3xl">PET</span>
              <span className="inline-block font-mono text-xl ml-1">Me</span>
              <span className="inline-block font-serif text-3xl ml-1">UP</span>
        </Link>
        <div className="form-icon ">
          <GlobalSearch />
        </div>
        <NavbarRightMenu />
      </header>
    </div>
  );
};

export default DashboardNavbar;
