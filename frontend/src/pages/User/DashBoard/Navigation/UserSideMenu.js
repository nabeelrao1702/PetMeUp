
import { Link } from "react-router-dom";

const UserSideMenu = () => {
  return (
    <div>
      <nav
        className="text-sm font-medium text-gray-600 hover:text-gray-800 mt-1 ml-2 space-y-3"
        aria-label="Main Navigation"
      >
        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="/user/user-dashboard"
        >
          <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
          </svg>
          <span>Home</span>
        </Link>
        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="my-pet-profiles"
        >
          {/* <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900" viewBox="0 0 14 14"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" d="M10 5v2a1 1 0 0 0 1 1h.5a2 2 0 0 0 2-2V3a1 1 0 0 0-1-1H11a2 2 0 0 1-.91-.22A6.88 6.88 0 0 0 7 1a6.88 6.88 0 0 0-3.11.78A2.07 2.07 0 0 1 3 2H1.5a1 1 0 0 0-1 1v3a2 2 0 0 0 2 2H3a1 1 0 0 0 1-1V5m7.5 3l-.31 1.57a4.27 4.27 0 0 1-8.38 0L2.5 8m4 2h1"/></svg>
          <span>Your Pet Profiles</span>
        </Link>


        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="find-work"
        >
          {/* <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2h-1.528A6 6 0 004 9.528V4z" />
            <path
              fillRule="evenodd"
              d="M8 10a4 4 0 00-3.446 6.032l-1.261 1.26a1 1 0 101.414 1.415l1.261-1.261A4 4 0 108 10zm-2 4a2 2 0 114 0 2 2 0 01-4 0z"
              clipRule="evenodd"
            />
          </svg> */}

          <svg xmlns="http://www.w3.org/2000/svg"  className="shrink-0 w-6 h-6 mr-2 text-orange-600 transition group-hover:text-gray-900" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M14.433 33.442a3 3 0 1 0 1.96-.416a8.972 8.972 0 0 1-.103-.405a19.627 19.627 0 0 1-.32-1.87a17.026 17.026 0 0 1-.14-1.914a6.55 6.55 0 0 1 .015-.527c.384-.11.77-.21 1.155-.297c.441-.1.703.42.914.842l.086.169h11.749c.229-.434.748-1.126 1.251-1.011c.536.122 1.075.267 1.609.433l-.003.001c-.002-.002-.002-.002 0 .002c.004.014.026.08.048.22c.025.162.042.372.05.625c.014.504-.015 1.117-.074 1.735c-.06.617-.149 1.214-.249 1.685c-.022.105-.044.2-.066.286H31a1 1 0 0 0-.894.553l-1 2A.999.999 0 0 0 29 36v2a1 1 0 0 0 1 1h2v-2h-1v-.764L31.618 35h2.764L35 36.236V37h-1v2h2a1 1 0 0 0 1-1v-2a.999.999 0 0 0-.106-.447l-1-2A1 1 0 0 0 35 33h-.636c.107-.533.196-1.155.256-1.779c.066-.674.1-1.373.083-1.983l-.001-.028C38.69 30.895 42 33.666 42 36.57V42H6v-5.43c0-3.032 3.61-5.92 7.831-7.577c.011.622.07 1.325.155 2.006c.092.735.217 1.466.355 2.068c.03.129.06.254.092.375ZM16 37.015c.538 0 1-.44 1-1.015c0-.574-.462-1.015-1-1.015s-1 .44-1 1.015c0 .574.462 1.015 1 1.015ZM24 24a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0 2c5.523 0 10-4.477 10-10S29.523 6 24 6s-10 4.477-10 10s4.477 10 10 10Z" clip-rule="evenodd"/></svg>
          
          <span>Available Doctors</span>
        </Link>

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="my-gigs"
        >
          {/* <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
            <path
              fillRule="evenodd"
              d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm9.707 5.707a1 1 0 00-1.414-1.414L9 12.586l-1.293-1.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
              clipRule="evenodd"
            />
          </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900" viewBox="0 0 16 16"><path fill="currentColor" d="m16 12l-1.4-6.7c-.2-.7-.9-1.3-1.7-1.3H11V2.8c0-1-.8-1.8-1.8-1.8H6.8C5.8 1 5 1.8 5 2.8V4H3.1c-.8 0-1.5.6-1.7 1.3L0 12c-.2 1 .6 2 1.7 2h12.5c1.2 0 2-1 1.8-2zM6 2.8c0-.4.4-.8.8-.8h2.4c.4 0 .8.4.8.8V4H6V2.8zm5 7.2H9v2H7v-2H5V8h2V6h2v2h2v2z"/></svg>
          <span>Veterinary Consultant</span>
        </Link>

    

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="my-pet-profiles-requests"
        >
          {/* <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg> */}
          <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          
          <span>Pet Matting Requests</span>
        </Link>

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="my-submitted-pet-profiles-requests"
        >
          <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg>
          <span>Submitted Pet Matting Requests</span>
        </Link>

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="my-blogs"
        >
          {/* <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M5 3a1 1 0 000 2c5.523 0 10 4.477 10 10a1 1 0 102 0C17 8.373 11.627 3 5 3z" />
            <path d="M4 9a1 1 0 011-1 7 7 0 017 7 1 1 0 11-2 0 5 5 0 00-5-5 1 1 0 01-1-1zM3 15a2 2 0 114 0 2 2 0 01-4 0z" />
          </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900" viewBox="0 0 24 24"><path fill="currentColor" d="m19 23.3l-.6-.5c-2-1.9-3.4-3.1-3.4-4.6c0-1.2 1-2.2 2.2-2.2c.7 0 1.4.3 1.8.8c.4-.5 1.1-.8 1.8-.8c1.2 0 2.2.9 2.2 2.2c0 1.5-1.4 2.7-3.4 4.6l-.6.5M18 2c1.1 0 2 .9 2 2v9.08L19 13l-1 .08V4h-5v8l-2.5-2.25L8 12V4H6v16h7.08c.12.72.37 1.39.72 2H6c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h12Z"/></svg>
          <span>Share your Story</span>
        </Link>
        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="my-proposals"
        >
          {/* <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
            <path
              fillRule="evenodd"
              d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
              clipRule="evenodd"
            />
          </svg> */}
          <svg xmlns="http://www.w3.org/2000/svg" className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900" viewBox="0 0 48 48"><g fill="none"><g clip-path="url(#healthiconsDoctorFemaleNegative0)"><path fill="currentColor" fill-rule="evenodd" d="M48 0H0v48h48V0ZM13 36c0-1.082.573-2.03 1.433-2.558a11.58 11.58 0 0 1-.092-.375a21.61 21.61 0 0 1-.355-2.068a19.63 19.63 0 0 1-.155-2.006C9.61 30.65 6 33.538 6 36.57V42h36v-5.43c0-2.904-3.31-5.675-7.298-7.36v.028c.018.61-.016 1.31-.082 1.983c-.06.624-.149 1.246-.256 1.779H35a1 1 0 0 1 .894.553l1 2c.07.139.106.292.106.447v2a1 1 0 0 1-1 1h-2v-2h1v-.764L34.382 35h-2.764L31 36.236V37h1v2h-2a1 1 0 0 1-1-1v-2c0-.155.036-.308.106-.447l1-2A1 1 0 0 1 31 33h1.315c.022-.086.044-.181.066-.286c.1-.471.189-1.068.249-1.685c.06-.618.088-1.231.073-1.735a5.18 5.18 0 0 0-.049-.624c-.022-.142-.044-.207-.048-.221c-.002-.004-.002-.004 0-.002l.003-.001A21.732 21.732 0 0 0 31 28.013c-.503-.115-1.023.577-1.25 1.01H18a9.88 9.88 0 0 1-.086-.168c-.212-.422-.473-.943-.914-.842c-.385.087-.77.187-1.155.297a6.55 6.55 0 0 0-.016.527c.004.553.057 1.23.142 1.914c.085.682.2 1.346.32 1.87c.034.151.068.287.1.404A3 3 0 1 1 13 36Zm4 0c0 .574-.462 1.015-1 1.015s-1-.44-1-1.015c0-.574.462-1.015 1-1.015s1 .44 1 1.015Zm2.904-13.043c1.16 1.105 2.778 1.8 4.596 1.8c1.745 0 3.305-.64 4.453-1.668c1.39-2.376 2.878-6.737-.453-11.773c-.547-1.07-7.264 1.611-10 3.158c-1 .565-.937 2.121-.454 3.87l.031.004l-.005.088c.44 1.552 1.198 3.244 1.832 4.52Zm10.71 1.314c2.053-.752 4.386-2.236 4.386-5.1c0-5.114-3.503-11.013-3.503-11.013S28.98 5 24.055 5c-4.926 0-6.677 3.158-6.677 3.158S13 14.533 13 19.172c0 2.921 3.169 4.474 5.515 5.224c1.538 1.463 3.664 2.36 5.985 2.36c2.387 0 4.567-.948 6.113-2.485Z" clip-rule="evenodd"/></g><defs><clipPath id="healthiconsDoctorFemaleNegative0"><path d="M0 0h48v48H0z"/></clipPath></defs></g></svg>
          <span>Doctor Proposals</span>
        </Link>
        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="my-reports"
        >
          <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm2 10a1 1 0 10-2 0v3a1 1 0 102 0v-3zm2-3a1 1 0 011 1v5a1 1 0 11-2 0v-5a1 1 0 011-1zm4-1a1 1 0 10-2 0v7a1 1 0 102 0V8z"
              clipRule="evenodd"
            />
          </svg>
          <span>My Reports</span>
        </Link>
      </nav>
    </div>
  );
};

export default UserSideMenu;
