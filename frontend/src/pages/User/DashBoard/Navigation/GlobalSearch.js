import { useState, useEffect } from "react";
import { GetAllJobs } from "../../../../redux/actions/UserActions";
import { GetAllBlogs } from "../../../../redux/actions/UserActions";
import { GetAllPetProfiles } from "../../../../redux/actions/UserActions";
import { GetAllReviews } from "../../../../redux/actions/UserActions";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const GlobalSearch = () => {
  const [selectedOption, setSelectedOption] = useState("petProfiles");
  const [searchQuery, setSearchQuery] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const jobs = useSelector((state) => state.userData.jobs);
  const blogs = useSelector((state) => state?.userData?.blogs?.snapshot);
  const petProfiles = useSelector(
    (state) => state?.userData?.petProfiles
  );
  const reviews = useSelector((state) => state?.userData?.allReviews);
  const { loading } = useSelector((state) => state?.userData);

  useEffect(() => {
    if (selectedOption === "jobs") {
      dispatch(GetAllJobs(toast));
      dispatch(GetAllReviews(toast));
    } else if (selectedOption === "petProfiles") {
      dispatch(GetAllPetProfiles(toast));
      dispatch(GetAllReviews(toast));
    } else if (selectedOption === "blogs") {
      dispatch(GetAllBlogs(toast));
      dispatch(GetAllReviews(toast));
    }
  }, [dispatch, selectedOption]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleSearchQueryChange = (event) => {
    setSearchQuery(event.target.value.toLowerCase());
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    if (selectedOption === "jobs") {
      navigate("/user/jobs", {
        state: {
          jobs: jobs,
          searchQuery: searchQuery,
        },
      });
    } else if (selectedOption === "petProfiles") {
      navigate("/user/pet-profiles", {
        state: {
          petProfiles: petProfiles,
          searchQuery: searchQuery,
          reviews: reviews,
        },
      });
    } else if (selectedOption === "blogs") {
      navigate("/user/blogs", {
        state: {
          blogs: blogs,
          searchQuery: searchQuery,
          reviews: reviews,
        },
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex justify-between mx-4">
        <div className="item lg:w-full sw-1/2 ">
          <div className=" form-icon ">
            <svg
              className="w-6 h-6"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="orange"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
            <input
              className=" px-10 bg-white border rounded-l-md border-r-1 shadow-md border-slate-300 placeholder-slate-400 focus:outline-none focus:border-orange-500 focus:ring-orange-500 block w-full text-sm focus:ring-1 "
              type="text"
              name="search"
              value={searchQuery}
              onChange={handleSearchQueryChange}
              placeholder="Search..."
              aria-label="Search"
            />
          </div>
        </div>
        <div className="item ">
          <select
            value={selectedOption}
            onChange={handleOptionChange}
            name="category"
            className="inline-flex pr-7 items-center rounded-r-md border border-l-1  shadow-md focus:ring-orange-500 focus:border-orange-500 border-gray-300 bg-gray-50 text-gray-500 text-sm"
          >
            <option value="jobs">Find Doctors</option>
            <option value="petProfiles">Pet Profiles</option>
            <option value="blogs">Stories</option>
          </select>
        </div>
      </div>
    </form>
  );
};

export default GlobalSearch;
