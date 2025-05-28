
import { Link } from "react-router-dom";

const AdminSideMenu = () => {
  return (
    <div>
      <nav
        className="text-sm font-medium text-gray-600 hover:text-gray-800 mt-1 ml-2 space-y-3"
        aria-label="Main Navigation"
      >
        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="/admin/admin-dashboard"
        >
          <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
              clipRule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
          </svg>
          <span>Users</span>
        </Link>

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="doctors-list"
        >
          <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M8.25 6.75a3.75 3.75 0 117.5 0 3.75 3.75 0 01-7.5 0zM15.75 9.75a3 3 0 116 0 3 3 0 01-6 0zM2.25 9.75a3 3 0 116 0 3 3 0 01-6 0zM6.31 15.117A6.745 6.745 0 0112 12a6.745 6.745 0 016.709 7.498.75.75 0 01-.372.568A12.696 12.696 0 0112 21.75c-2.305 0-4.47-.612-6.337-1.684a.75.75 0 01-.372-.568 6.787 6.787 0 011.019-4.38z"
              clipRule="evenodd"
            />
            <path d="M5.082 14.254a8.287 8.287 0 00-1.308 5.135 9.687 9.687 0 01-1.764-.44l-.115-.04a.563.563 0 01-.373-.487l-.01-.121a3.75 3.75 0 013.57-4.047zM20.226 19.389a8.287 8.287 0 00-1.308-5.135 3.75 3.75 0 013.57 4.047l-.01.121a.563.563 0 01-.373.486l-.115.04c-.567.2-1.156.349-1.764.441z" />
          </svg>
          <span>Doctors</span>
        </Link>

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="gigs-list"
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
          to="pet-profiles-list"
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
          <span>Pet Profiles</span>
        </Link>

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="jobs-list"
        >
          {/* <svg
            className="shrink-0 w-6 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M7.5 5.25a3 3 0 013-3h3a3 3 0 013 3v.205c.933.085 1.857.197 2.774.334 1.454.218 2.476 1.483 2.476 2.917v3.033c0 1.211-.734 2.352-1.936 2.752A24.726 24.726 0 0112 15.75c-2.73 0-5.357-.442-7.814-1.259-1.202-.4-1.936-1.541-1.936-2.752V8.706c0-1.434 1.022-2.7 2.476-2.917A48.814 48.814 0 017.5 5.455V5.25zm7.5 0v.09a49.488 49.488 0 00-6 0v-.09a1.5 1.5 0 011.5-1.5h3a1.5 1.5 0 011.5 1.5zm-3 8.25a.75.75 0 100-1.5.75.75 0 000 1.5z"
              clipRule="evenodd"
            />
            <path d="M3 18.4v-2.796a4.3 4.3 0 00.713.31A26.226 26.226 0 0012 17.25c2.892 0 5.68-.468 8.287-1.335.252-.084.49-.189.713-.311V18.4c0 1.452-1.047 2.728-2.523 2.923-2.12.282-4.282.427-6.477.427a49.19 49.19 0 01-6.477-.427C4.047 21.128 3 19.852 3 18.4z" />
          </svg> */}
           <svg xmlns="http://www.w3.org/2000/svg"  className="shrink-0 w-6 h-6 mr-2 text-orange-600 transition group-hover:text-gray-900" viewBox="0 0 48 48"><path fill="currentColor" fill-rule="evenodd" d="M14.433 33.442a3 3 0 1 0 1.96-.416a8.972 8.972 0 0 1-.103-.405a19.627 19.627 0 0 1-.32-1.87a17.026 17.026 0 0 1-.14-1.914a6.55 6.55 0 0 1 .015-.527c.384-.11.77-.21 1.155-.297c.441-.1.703.42.914.842l.086.169h11.749c.229-.434.748-1.126 1.251-1.011c.536.122 1.075.267 1.609.433l-.003.001c-.002-.002-.002-.002 0 .002c.004.014.026.08.048.22c.025.162.042.372.05.625c.014.504-.015 1.117-.074 1.735c-.06.617-.149 1.214-.249 1.685c-.022.105-.044.2-.066.286H31a1 1 0 0 0-.894.553l-1 2A.999.999 0 0 0 29 36v2a1 1 0 0 0 1 1h2v-2h-1v-.764L31.618 35h2.764L35 36.236V37h-1v2h2a1 1 0 0 0 1-1v-2a.999.999 0 0 0-.106-.447l-1-2A1 1 0 0 0 35 33h-.636c.107-.533.196-1.155.256-1.779c.066-.674.1-1.373.083-1.983l-.001-.028C38.69 30.895 42 33.666 42 36.57V42H6v-5.43c0-3.032 3.61-5.92 7.831-7.577c.011.622.07 1.325.155 2.006c.092.735.217 1.466.355 2.068c.03.129.06.254.092.375ZM16 37.015c.538 0 1-.44 1-1.015c0-.574-.462-1.015-1-1.015s-1 .44-1 1.015c0 .574.462 1.015 1 1.015ZM24 24a8 8 0 1 0 0-16a8 8 0 0 0 0 16Zm0 2c5.523 0 10-4.477 10-10S29.523 6 24 6s-10 4.477-10 10s4.477 10 10 10Z" clip-rule="evenodd"/></svg>

          <span>Available Doctors</span>
        </Link>

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="blogs-list"
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
          <span>Stories</span>
        </Link>
        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="job-proposals-list"
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
          <span>Doctor Proposals</span>
        </Link>
        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="pet-profiles-request-list"
        >
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

          <span>Pet Matting Request</span>
        </Link>
        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="orders-list"
        >
          <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M2.25 2.25a.75.75 0 000 1.5h1.386c.17 0 .318.114.362.278l2.558 9.592a3.752 3.752 0 00-2.806 3.63c0 .414.336.75.75.75h15.75a.75.75 0 000-1.5H5.378A2.25 2.25 0 017.5 15h11.218a.75.75 0 00.674-.421 60.358 60.358 0 002.96-7.228.75.75 0 00-.525-.965A60.864 60.864 0 005.68 4.509l-.232-.867A1.875 1.875 0 003.636 2.25H2.25zM3.75 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0zM16.5 20.25a1.5 1.5 0 113 0 1.5 1.5 0 01-3 0z" />
          </svg>

          <span>All Orders</span>
        </Link>

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="users-reviews-list"
        >
          <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M11.25 4.533A9.707 9.707 0 006 3a9.735 9.735 0 00-3.25.555.75.75 0 00-.5.707v14.25a.75.75 0 001 .707A8.237 8.237 0 016 18.75c1.995 0 3.823.707 5.25 1.886V4.533zM12.75 20.636A8.214 8.214 0 0118 18.75c.966 0 1.89.166 2.75.47a.75.75 0 001-.708V4.262a.75.75 0 00-.5-.707A9.735 9.735 0 0018 3a9.707 9.707 0 00-5.25 1.533v16.103z" />
          </svg>

          <span>All User Reviews</span>
        </Link>

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="blog-comments"
        >
          <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.848 2.771A49.144 49.144 0 0112 2.25c2.43 0 4.817.178 7.152.52 1.978.292 3.348 2.024 3.348 3.97v6.02c0 1.946-1.37 3.678-3.348 3.97a48.901 48.901 0 01-3.476.383.39.39 0 00-.297.17l-2.755 4.133a.75.75 0 01-1.248 0l-2.755-4.133a.39.39 0 00-.297-.17 48.9 48.9 0 01-3.476-.384c-1.978-.29-3.348-2.024-3.348-3.97V6.741c0-1.946 1.37-3.68 3.348-3.97z"
              clipRule="evenodd"
            />
          </svg>

          <span>All Story Comments</span>
        </Link>

        <Link
          className="flex items-center px-4 py-3 transition cursor-pointer group  hover:text-gray-900"
          to="blogs-reply-comments"
        >
          <svg
            className="shrink-0 w-5 h-5 mr-2 text-orange-600 transition group-hover:text-gray-900"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
          >
            <path d="M4.913 2.658c2.075-.27 4.19-.408 6.337-.408 2.147 0 4.262.139 6.337.408 1.922.25 3.291 1.861 3.405 3.727a4.403 4.403 0 00-1.032-.211 50.89 50.89 0 00-8.42 0c-2.358.196-4.04 2.19-4.04 4.434v4.286a4.47 4.47 0 002.433 3.984L7.28 21.53A.75.75 0 016 21v-4.03a48.527 48.527 0 01-1.087-.128C2.905 16.58 1.5 14.833 1.5 12.862V6.638c0-1.97 1.405-3.718 3.413-3.979z" />
            <path d="M15.75 7.5c-1.376 0-2.739.057-4.086.169C10.124 7.797 9 9.103 9 10.609v4.285c0 1.507 1.128 2.814 2.67 2.94 1.243.102 2.5.157 3.768.165l2.782 2.781a.75.75 0 001.28-.53v-2.39l.33-.026c1.542-.125 2.67-1.433 2.67-2.94v-4.286c0-1.505-1.125-2.811-2.664-2.94A49.392 49.392 0 0015.75 7.5z" />
          </svg>

          <span>All Reply Comments</span>
        </Link>
      </nav>
    </div>
  );
};

export default AdminSideMenu;
