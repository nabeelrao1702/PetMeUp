import { Link } from "react-router-dom";

const SideMenuHelper = () => {
  return (
    <div>
      <div className=" bg-white w-60 lg:border rounded-md border-3 border-gray-300 ">
        <nav
          className="text-sm font-medium text-gray-600 hover:text-gray-800 mt-1 ml-2 space-y-3"
          aria-label="Main Navigation"
        >
          <Link
            className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
            to={"/user/settings"}
          >
            <svg
              className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                clipRule="evenodd"
              />
            </svg>

            <span>Account</span>
          </Link>
          <Link
            className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
            to="security"
          >
            <svg
              className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 1.5a5.25 5.25 0 00-5.25 5.25v3a3 3 0 00-3 3v6.75a3 3 0 003 3h10.5a3 3 0 003-3v-6.75a3 3 0 00-3-3v-3c0-2.9-2.35-5.25-5.25-5.25zm3.75 8.25v-3a3.75 3.75 0 10-7.5 0v3h7.5z"
                clipRule="evenodd"
              />
            </svg>

            <span>Security</span>
          </Link>

          <Link
            className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
            to="edit/profile"
          >
            <svg
              className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M12 6.75a5.25 5.25 0 016.775-5.025.75.75 0 01.313 1.248l-3.32 3.319c.063.475.276.934.641 1.299.365.365.824.578 1.3.64l3.318-3.319a.75.75 0 011.248.313 5.25 5.25 0 01-5.472 6.756c-1.018-.086-1.87.1-2.309.634L7.344 21.3A3.298 3.298 0 112.7 16.657l8.684-7.151c.533-.44.72-1.291.634-2.309A5.342 5.342 0 0112 6.75zM4.117 19.125a.75.75 0 01.75-.75h.008a.75.75 0 01.75.75v.008a.75.75 0 01-.75.75h-.008a.75.75 0 01-.75-.75v-.008z"
                clipRule="evenodd"
              />
              <path d="M10.076 8.64l-2.201-2.2V4.874a.75.75 0 00-.364-.643l-3.75-2.25a.75.75 0 00-.916.113l-.75.75a.75.75 0 00-.113.916l2.25 3.75a.75.75 0 00.643.364h1.564l2.062 2.062 1.575-1.297z" />
              <path
                fillRule="evenodd"
                d="M12.556 17.329l4.183 4.182a3.375 3.375 0 004.773-4.773l-3.306-3.305a6.803 6.803 0 01-1.53.043c-.394-.034-.682-.006-.867.042a.589.589 0 00-.167.063l-3.086 3.748zm3.414-1.36a.75.75 0 011.06 0l1.875 1.876a.75.75 0 11-1.06 1.06L15.97 17.03a.75.75 0 010-1.06z"
                clipRule="evenodd"
              />
            </svg>
            <span>Profile Settings</span>
          </Link>

          <Link
            className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
            to="verification"
          >
            <svg
              strokeWidth="1.5"
              stroke="currentColor"
              className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              />
            </svg>
            <span>Verification</span>
          </Link>

          <Link
            className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
            to="add-payment"
          >
            <svg
              className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path d="M4.5 3.75a3 3 0 00-3 3v.75h21v-.75a3 3 0 00-3-3h-15z" />
              <path
                fillRule="evenodd"
                d="M22.5 9.75h-21v7.5a3 3 0 003 3h15a3 3 0 003-3v-7.5zm-18 3.75a.75.75 0 01.75-.75h6a.75.75 0 010 1.5h-6a.75.75 0 01-.75-.75zm.75 2.25a.75.75 0 000 1.5h3a.75.75 0 000-1.5h-3z"
                clipRule="evenodd"
              />
            </svg>

            <span>Payment Methods</span>
          </Link>
        </nav>
      </div>
    </div>
  );
};

export default SideMenuHelper;
