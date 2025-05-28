import { Link } from "react-router-dom";
import clap from "./img/iccon.jpg";

const Navbar = () => {
  return (
    <div>
      <header className="bg-white  shadow-lg w-full px-0 md:px-10 py-0 fixed top-0 left-0 right-0 z-10">
        <div className="flex items-center justify-between h-16 max-w-screen-xl px-4 mx-auto">
          <div className="flex flex-1 w-0 lg:hidden">
            <Link
              className="px-4 py-2 text-sm font-medium text-orange-600 bg-gray-100 rounded-md hover:text-white hover:bg-orange-500"
              to="/login-type"
            >
              Log In
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            <Link
              to="/"
              className="logo text-2xl md:text-2xl font-bold text-orange-600"
            >
              <img
                src={clap}
                className="h-6 w-6 mr-2 mb-2 inline-block transform md:scale-150"
                alt="PetmeUp icon"
              />
              <span className="inline-block font-serif text-3xl">PET</span>
              <span className="inline-block font-mono text-xl ml-1">Me</span>
              <span className="inline-block font-serif text-3xl ml-1">UP</span>
            </Link>
          </div>

          <div className="flex justify-end flex-1 w-0 lg:hidden">
            <Link
              className="px-4 py-2 text-sm font-medium text-orange-600 bg-gray-100 rounded-md hover:text-white hover:bg-orange-500"
              to="/register-type"
            >
              Sign Up
            </Link>
          </div>

          <nav className="items-center justify-center hidden space-x-8 text-md font-semibold text-gray-800 hover:text-black lg:flex lg:flex-1 lg:w-0">
            <Link to="/register-type">Find Pets</Link>
            <Link to="/register-type">Find Doctors</Link>
          </nav>

          <div className="items-center hidden space-x-4 lg:flex">
            <Link
              className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-md hover:text-white hover:bg-orange-500"
              to="/login-type"
            >
              Log In 
            </Link>
            <Link
              className="px-4 py-2 text-sm font-medium text-orange-600 bg-gray-100 rounded-md hover:text-white hover:bg-orange-500"
              to="/register-type"
            >
              Sign Up 
            </Link>
          </div>
        </div>

        <div className="border-t border-gray-100 lg:hidden">
          <nav className="flex items-center justify-center p-4 overflow-x-auto text-sm font-semibold  text-gray-800 hover:text-black">
            <Link className="flex-shrink-0 pl-4 " to="/register-type">
              Find Pets
            </Link>
            <Link className="flex-shrink-0 pl-4 " to="/register-type">
              Find Doctors
            </Link>
          </nav>
        </div>
      </header>
    </div>
  );
};

export default Navbar;
