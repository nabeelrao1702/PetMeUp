import { useState, useEffect } from "react";

const FilterForm = ({ onFilterDataChange, petProfiles, searchQuery }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [requiredSkillsFilters, setRequiredSkillsFilters] = useState([]);

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

  const handleRequiredSkillsBoxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setRequiredSkillsFilters([...requiredSkillsFilters, value]);
    } else {
      setRequiredSkillsFilters(
        requiredSkillsFilters.filter((filter) => filter !== value)
      );
    }
  };

  const handleDurationInputChange = (event) => {
    setDurationInputValue(event.target.value);
  };

  useEffect(() => {
    // const filteredData = petProfiles?.filter(
    //   (petProfile) =>
    //     petProfile?.duration === parseInt(durationInputValue) ||
    //     requiredSkillsFilters.includes(petProfile?.offeredSkills) ||
    //     requiredSkillsFilters.includes(petProfile?.petcity) ||
    //     selectedFilters.includes(petProfile?.requiredSkills) ||
    //     selectedFilters.includes(petProfile?.user?.verified.toString()) ||
    //     petProfile?.title.toString().toLowerCase().includes(search)
    // );
    const filteredData = petProfiles?.filter(
      (petProfile) =>
        petProfile?.duration === parseInt(durationInputValue) ||
        (petProfile?.petcity &&
          petProfile?.requiredSkills &&
          requiredSkillsFilters.includes(petProfile.petcity) ||
          selectedFilters.includes(petProfile.requiredSkills)) ||
        requiredSkillsFilters.includes(petProfile?.offeredSkills) ||
        selectedFilters.includes(petProfile?.user?.verified?.toString()) ||
        petProfile?.title.toString().toLowerCase().includes(search)
    );

    if (filteredData?.length < 1) {
      onFilterDataChange([]);
    } else {
      onFilterDataChange(filteredData);
    }
    setSearch(searchQuery);
  }, [
    selectedFilters,
    durationInputValue,
    onFilterDataChange,
    petProfiles,
    search,
    searchQuery,
    requiredSkillsFilters,
  ]);

  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isYourSkillsMenuOpen, setIsYourSkillsMenuOpen] = useState(false);
  const [isRequiredSkillsMenuOpen, setIsRequiredSkillsMenuOpen] =
    useState(false);
  const [isExchangeDurationMenuOpen, setIsExchangeDurationMenuOpen] =
    useState(false);

  const handleUserClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleYourSkillsClick = () => {
    setIsYourSkillsMenuOpen(!isYourSkillsMenuOpen);
  };

  const handleRequiredSkillsClick = () => {
    setIsRequiredSkillsMenuOpen(!isRequiredSkillsMenuOpen);
  };

  const handleDurationClick = () => {
    setIsExchangeDurationMenuOpen(!isExchangeDurationMenuOpen);
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
              onClick={handleUserClick}
            >
              <span className="font-medium text-gray-900">User Info</span>
              <span className="ml-6 flex items-center">
                {!isUserMenuOpen && (
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

                {isUserMenuOpen && (
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

          {isUserMenuOpen && (
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
                    Verified User
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
              aria-controls="filter-section-1"
              aria-expanded="false"
              onClick={handleYourSkillsClick}
            >
              <span className="font-medium text-gray-900">City</span>
              <span className="ml-6 flex items-center">
                {!isYourSkillsMenuOpen && (
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

                {isYourSkillsMenuOpen && (
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

          {isYourSkillsMenuOpen && (
            <div className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    name="Lahore"
                    value="Lahore"
                    type="checkbox"
                    onChange={handleRequiredSkillsBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Lahore"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Lahore
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Multan "
                    value="Multan "
                    type="checkbox"
                    onChange={handleRequiredSkillsBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Multan "
                    className="ml-3 text-sm text-gray-600"
                  >
                    Multan
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Islamabad"
                    value="Islamabad"
                    type="checkbox"
                    onChange={handleRequiredSkillsBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Islamabad"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Islamabad
                  </label>
                </div>

                {/* <div className="flex items-center">
                  <input
                    name="Horses"
                    value="Horses"
                    type="checkbox"
                    onChange={handleRequiredSkillsBoxChange}
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
                    onChange={handleRequiredSkillsBoxChange}
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
                    onChange={handleRequiredSkillsBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Wild Cats"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Wild Cats
                  </label>
                </div> */}
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
              onClick={handleYourSkillsClick}
            >
              <span className="font-medium text-gray-900">Category</span>
              <span className="ml-6 flex items-center">
                {!isYourSkillsMenuOpen && (
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

                {isYourSkillsMenuOpen && (
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

          {isYourSkillsMenuOpen && (
            <div className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    name="Dogs"
                    value="Dogs"
                    type="checkbox"
                    onChange={handleRequiredSkillsBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="Dogs" className="ml-3 text-sm text-gray-600">
                    Dogs
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Cats"
                    value="Cats"
                    type="checkbox"
                    onChange={handleRequiredSkillsBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="Cats" className="ml-3 text-sm text-gray-600">
                    Cats
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Birds"
                    value="Birds"
                    type="checkbox"
                    onChange={handleRequiredSkillsBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="Birds" className="ml-3 text-sm text-gray-600">
                    Birds
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Horses"
                    value="Horses"
                    type="checkbox"
                    onChange={handleRequiredSkillsBoxChange}
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
                    onChange={handleRequiredSkillsBoxChange}
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
                    onChange={handleRequiredSkillsBoxChange}
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
              aria-controls="filter-section-3"
              aria-expanded="false"
              onClick={handleRequiredSkillsClick}
            >
              <span className="font-medium text-gray-900">Looking for</span>
              <span className="ml-6 flex items-center">
                {!isRequiredSkillsMenuOpen && (
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

                {isRequiredSkillsMenuOpen && (
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

          {isRequiredSkillsMenuOpen && (
            <div className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    name="Same Breed"
                    value="Same Breed"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Same Breed"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Same Breed
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Cross Breed"
                    value="Cross Breed"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Cross Breed"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Cross Breed
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="border-b border-gray-200 py-6 px-4 lg:px-0">
          <h3 className="-my-3 flow-root">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              aria-controls="filter-section-6"
              aria-expanded="false"
              onClick={handleDurationClick}
            >
              <span className="font-medium text-gray-900">
                Pet Matting Duration
              </span>
              <span className="ml-6 flex items-center">
                {!isExchangeDurationMenuOpen && (
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

                {isExchangeDurationMenuOpen && (
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

          {isExchangeDurationMenuOpen && (
            <div className="pt-6">
              <div className="space-y-2">
                <label
                  htmlFor="duration"
                  className=" font-medium text-sm text-gray-900"
                >
                  Enter Your Desired Pet Matting Duration
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
        </div>
      </form>
    </div>
  );
};

export default FilterForm;
