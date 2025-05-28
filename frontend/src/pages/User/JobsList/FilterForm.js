import { useState, useEffect } from "react";

const FilterForm = ({ onFilterDataChange, jobs, searchQuery }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [priceInputValue, setPriceInputValue] = useState("");
  const [durationInputValue, setDurationInputValue] = useState("");
  const [search, setSearch] = useState(searchQuery);

  const handleCheckBoxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  const handlePriceInputChange = (event) => {
    setPriceInputValue(event.target.value);
  };

  const handleDurationInputChange = (event) => {
    setDurationInputValue(event.target.value);
  };

  useEffect(() => {
    const filteredData = jobs?.filter(
      (job) =>
        job?.budget === parseInt(priceInputValue) ||
        job?.duration === parseInt(durationInputValue) ||
        selectedFilters.includes(job?.experienceLevel) ||
        selectedFilters.includes(job?.category) ||
        selectedFilters.includes(job?.doctor?.verified.toString()) ||
        job?.title.toString().toLowerCase().includes(search)
    );

    if (filteredData?.length < 1) {
      onFilterDataChange([]);
    } else {
      onFilterDataChange(filteredData);
    }
    setSearch(searchQuery);
  }, [
    selectedFilters,
    priceInputValue,
    durationInputValue,
    onFilterDataChange,
    jobs,
    search,
    searchQuery,
  ]);

  const [isExperienceMenuOpen, setIsExperienceMenuOpen] = useState(false);
  const [isDoctorMenuOpen, setIsDoctorMenuOpen] = useState(false);
  const [isCategoryMenuOpen, setIsCategoryMenuOpen] = useState(false);
  const [isBudgetMenuOpen, setIsBudgetMenuOpen] = useState(false);
  const [isProjectLengthMenuOpen, setIsProjectLengthMenuOpen] = useState(false);

  const handleExperienceLevelClick = () => {
    setIsExperienceMenuOpen(!isExperienceMenuOpen);
  };

  const handleDoctorClick = () => {
    setIsDoctorMenuOpen(!isDoctorMenuOpen);
  };

  const handleCategoryClick = () => {
    setIsCategoryMenuOpen(!isCategoryMenuOpen);
  };

  const handleBudgetClick = () => {
    setIsBudgetMenuOpen(!isBudgetMenuOpen);
  };

  const handleProjectClick = () => {
    setIsProjectLengthMenuOpen(!isProjectLengthMenuOpen);
  };
  return (
    <div>
      <form>
        <h2 className="hidden lg:block text-2xl font-medium tracking-tight text-gray-900 mb-2  ">
          Filter By
        </h2>
        <div className="border-b border-gray-200 py-6 px-4 lg:px-0 ">
          <h3 className="-my-3 flow-root">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-0"
              aria-expanded="false"
              onClick={handleExperienceLevelClick}
            >
              <span className="font-medium text-gray-900">
                Experience Level
              </span>
              <span className="ml-6 flex items-center">
                {!isExperienceMenuOpen && (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                )}

                {isExperienceMenuOpen && (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </button>
          </h3>

          {isExperienceMenuOpen && (
            <div className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    name="Beginner"
                    value="Beginner"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Beginner"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Beginner Level - $
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Intermediate"
                    value="Intermediate"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Intermediate"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Intermediate - $$
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Expert"
                    value="Expert"
                    onChange={handleCheckBoxChange}
                    type="checkbox"
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Expert"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Expert - $$$
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 py-6 px-4 lg:px-0 ">
          <h3 className="-my-3 flow-root">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-2"
              aria-expanded="false"
              onClick={handleDoctorClick}
            >
              <span className="font-medium text-gray-900">Doctor Info</span>
              <span className="ml-6 flex items-center">
                {!isDoctorMenuOpen && (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                )}

                {isDoctorMenuOpen && (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </button>
          </h3>

          {isDoctorMenuOpen && (
            <div className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    name="verified"
                    value="true"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="verified"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Doctor Verified
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 py-6 px-4 lg:px-0 ">
          <h3 className="-my-3 flow-root">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-3"
              aria-expanded="false"
              onClick={handleCategoryClick}
            >
              <span className="font-medium text-gray-900">Category</span>
              <span className="ml-6 flex items-center">
                {!isCategoryMenuOpen && (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                )}

                {isCategoryMenuOpen && (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </button>
          </h3>

          {isCategoryMenuOpen && (
            <div className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    name="Dogs"
                    value="Dogs"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Dogs"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Dogs
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Cats"
                    value="Cats"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Cats"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Cats
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Birds"
                    value="Birds"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Birds"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Birds
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Horses"
                    value="Horses"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Horses"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Horses
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Cows and Sheeps"
                    value="Cows and Sheeps"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Cows and Sheeps"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Cows and Sheeps
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Wild Cats"
                    value="Wild Cats"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Wild Cats"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Wild Cats
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 py-6 px-4 lg:px-0 ">
          <h3 className="-my-3 flow-root">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-4"
              aria-expanded="false"
              onClick={handleBudgetClick}
            >
              <span className="font-medium text-gray-900">Budget</span>
              <span className="ml-6 flex items-center">
                {!isBudgetMenuOpen && (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                )}

                {isBudgetMenuOpen && (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </button>
          </h3>

          {isBudgetMenuOpen && (
            <div className="pt-6">
              <div className="space-y-2">
                <label
                  htmlFor="buget"
                  className=" font-medium text-sm text-gray-900"
                >
                  Enter Your Budget
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="budget"
                    placeholder="$ 0"
                    onChange={handlePriceInputChange}
                    className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
        </div>

        {/* <div className="border-b border-gray-200 py-6 px-4 lg:px-0">
          <h3 className="-my-3 flow-root">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-5"
              aria-expanded="false"
              onClick={handleProjectClick}
            >
              <span className="font-medium text-gray-900">Project length</span>
              <span className="ml-6 flex items-center">
                {!isProjectLengthMenuOpen && (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M10.75 4.75a.75.75 0 00-1.5 0v4.5h-4.5a.75.75 0 000 1.5h4.5v4.5a.75.75 0 001.5 0v-4.5h4.5a.75.75 0 000-1.5h-4.5v-4.5z" />
                  </svg>
                )}

                {isProjectLengthMenuOpen && (
                  <svg
                    className="h-5 w-5"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path
                      fillRule="evenodd"
                      d="M3 10a.75.75 0 01.75-.75h10.5a.75.75 0 010 1.5H3.75A.75.75 0 013 10z"
                      clipRule="evenodd"
                    />
                  </svg>
                )}
              </span>
            </button>
          </h3>

          {isProjectLengthMenuOpen && (
            <div className="pt-6">
              <div className="space-y-2">
                <label
                  htmlFor="duration"
                  className=" font-medium text-sm text-gray-900"
                >
                  Enter Your Desired Duration
                </label>
                <div className="flex items-center">
                  <input
                    type="number"
                    name="duration"
                    placeholder="Ex.2 days"
                    onChange={handleDurationInputChange}
                    className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                  />
                </div>
              </div>
            </div>
          )}
        </div> */}
      </form>
    </div>
  );
};

export default FilterForm;
