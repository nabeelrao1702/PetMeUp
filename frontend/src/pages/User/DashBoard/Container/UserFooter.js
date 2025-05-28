
import { Link } from "react-router-dom";

const UserFooter = () => {
  return (
    <div>
      <div className="text-center sm:text-left">
        <p className="text-lg font-medium text-white">Helpful Links</p>
        <nav className="mt-8">
          <ul className="space-y-4 text-sm">
            <li>
              <Link
                className="text-white transition hover:text-black hover:underline"
                to="/user/pet-profiles"
              >
                Find Pet Profile's
              </Link>
            </li>

            <li>
              <Link
                className="text-white transition hover:text-black hover:underline"
                to="/user/jobs"
              >
                Find Doctor's
              </Link>
            </li>

            <li>
              <Link
                className="text-white transition hover:text-black hover:underline"
                to="/user/blogs"
              >
                Storie's
              </Link>
            </li>

            {/* <li>
              <Link
                className="text-white transition hover:text-black hover:underline"
                to="/user/gigs"
              >
                Gigs
              </Link>
            </li> */}
          </ul>
        </nav>
      </div>
    </div>
  );
};
export default UserFooter;
