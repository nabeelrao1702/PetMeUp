import { Link } from "react-router-dom";
import icon from "./img/icon2.jpg";
import animal from "./img/animal1.jpg";

const Header = () => {
  return (
    <div>
      <header className="header">
        <div className="header-container min-h-screen flex flex-col md:flex-row-reverse items-center px-10 container m-auto">
          <div className="px-8 py-6 w-full md:w-3/6 mt-20 md:mt-1">
            <img src={animal} className="w-full" alt="work" />
          </div>

          <div className="h-full w-full md:w-3/6">
            <h1 className="text-2xl mt-2 md:mt-0 sm:text-4xl md:text-6xl font-bold leading-tight">
              Land the <span className="text-orange-600">Perfect</span> match
              <img
                src={icon}
                className="h-8 w-8 md:h-12 md:w-12 inline-block"
                alt=""
              />
            </h1>
            <p className="text-gray-600 mb-6 mt-2">
              Raising the bar for Pet Breeding Standards
            </p>
            <Link
              to="/register-type"
              className="px-6 py-2 text-sm font-semibold text-white bg-orange-600 mr-2 rounded-md"
            >
              Find a Match
            </Link>
          </div>
        </div>
      </header>
    </div>
  );
};
export default Header;
