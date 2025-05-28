
import { Link } from "react-router-dom";

const DoctorFooter = () => {
  return (
    <div>
      <div className="text-center sm:text-left">
        <p className="text-lg font-medium text-white">Helpful Links</p>
        <nav className="mt-8">
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                className="text-white transition hover:text-black hover:underline"
                to="/doctor/users"
              >
                Find User's
              </Link>
            </li>

            <li>
              <Link
                className="text-white transition hover:text-black hover:underline"
                to="/doctor/blogs"
              >
                Stories
              </Link>
            </li>
            <li>
              <Link
                className="text-white transition hover:text-black hover:underline"
                to="/doctor/gigs"
              >
                Looking for Doctor Requests
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default DoctorFooter;
