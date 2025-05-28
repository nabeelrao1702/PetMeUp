import { useState, useEffect } from "react";

const FilterForm = ({ onFilterDataChange, users, searchQuery }) => {
  const [selectedFilters, setSelectedFilters] = useState([]);

  const [search, setSearch] = useState(searchQuery);

  const handleCheckBoxChange = (event) => {
    const { value, checked } = event.target;
    if (checked) {
      setSelectedFilters([...selectedFilters, value]);
    } else {
      setSelectedFilters(selectedFilters.filter((filter) => filter !== value));
    }
  };

  useEffect(() => {
    const filteredData = users?.filter(
      (user) =>
        selectedFilters.includes(user?.languages[0]?.language) ||
        selectedFilters.includes(user?.languages[1]?.language) ||
        selectedFilters.includes(user?.address?.country) ||
        selectedFilters.includes(user?.Category) ||
        selectedFilters.includes(user?.verified?.toString()) ||
        user?.Title?.toString()?.toLowerCase()?.includes(search) ||
        user?.firstName?.toString()?.toLowerCase()?.includes(search)
    );

    if (filteredData?.length < 1) {
      onFilterDataChange([]);
    } else {
      onFilterDataChange(filteredData);
    }
    setSearch(searchQuery);
  }, [selectedFilters, onFilterDataChange, users, search, searchQuery]);

  const [isLanguagesMenuOpen, setIsLanguagesMenuOpen] = useState(false);
  const [isCountryMenuOpen, setIsCountryMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isCategoriesMenuOpen, setIsCategoriesMenuOpen] = useState(false);

  const handleLanguagesClick = () => {
    setIsLanguagesMenuOpen(!isLanguagesMenuOpen);
  };

  const handleCountryClick = () => {
    setIsCountryMenuOpen(!isCountryMenuOpen);
  };

  const handleUserClick = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleCategoriesClick = () => {
    setIsCategoriesMenuOpen(!isCategoriesMenuOpen);
  };

  return (
    <div>
      <form>
        <h2 className="hidden lg:block text-2xl font-medium tracking-tight text-gray-900 mb-2  ">
          Filter By
        </h2>
        <div className="border-b border-gray-200 py-6  px-4 lg:px-0 ">
          <h3 className="-my-3 flow-root">
            <button
              type="button"
              className="flex w-full items-center justify-between bg-white py-3 text-sm text-gray-400 hover:text-gray-500"
              aria-expanded="false"
              onClick={handleLanguagesClick}
            >
              <span className="font-medium text-gray-900 ">Language</span>
              <span className="ml-6 flex items-center">
                {!isLanguagesMenuOpen && (
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

                {isLanguagesMenuOpen && (
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

          {isLanguagesMenuOpen && (
            <div className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    name="English"
                    value="English"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="English"
                    className="ml-3 text-sm text-gray-600"
                  >
                    English
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Urdu"
                    value="Urdu"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="Urdu" className="ml-3 text-sm text-gray-600">
                    Urdu
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
              onClick={handleCountryClick}
            >
              <span className="font-medium text-gray-900">City</span>
              <span className="ml-6 flex items-center">
                {!isCountryMenuOpen && (
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

                {isCountryMenuOpen && (
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

          {isCountryMenuOpen && (
            <div className="pt-6">
              <div className="space-y-4">
                <div className="flex items-center">
                  <input
                    name="Lahore"
                    value="Lahore"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
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
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label htmlFor="Multan " className="ml-3 text-sm text-gray-600">
                    Multan
                  </label>
                </div>

                <div className="flex items-center">
                  <input
                    name="Islamabad"
                    value="Islamabad"
                    type="checkbox"
                    onChange={handleCheckBoxChange}
                    className="h-4 w-4 rounded border-gray-300 text-orange-600 focus:ring-orange-500"
                  />
                  <label
                    htmlFor="Islamabad"
                    className="ml-3 text-sm text-gray-600"
                  >
                    Islamabad
                  </label>
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
