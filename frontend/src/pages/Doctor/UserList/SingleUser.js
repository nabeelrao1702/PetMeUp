import RatingStars from "../DashBoard/PagesComponent/Helpers/RatingStars";
import profile from "../../../img/profile.jpg";

const SingleUser = ({ data, reviews }) => {
  const {
    firstName,
    lastName,
    photo,
    languages,
    address,
    Title,
    Description,
    Skills,
    verified,
    _id,
  } = data;

  const filteredReviews = reviews?.filter(
    (review) => review?.user?._id === _id
  );

  const calculateAverage = (reviews) => {
    let average = 0;

    if (reviews && reviews?.length > 0) {
      const total = reviews?.reduce((acc, rating) => {
        if (rating && rating.Ratings) {
          return acc + rating.Ratings;
        }
        return acc;
      }, 0);
      average = total / reviews.length;
    }

    return average;
  };

  const average = calculateAverage(filteredReviews);

  const limitText = (text) => {
    return text && text.split(" ").slice(0, 6).join(" ");
  };
  return (
        <div className="flex flex-wrap w-auto mx-6 lg:mx-20 my-8 ">
            <div className="item w-full  lg:w-1/3 h-auto border-3 border lg:rounded-l-md border-r-1 lg:border-r-0 border-gray-300 ">
              <div className="flex flex-col flex-nowrap justify-center items-center space-y-2 my-4 ">
                <div className="flex flex-row space-x-6 ">
                  <div className="item w-full h-auto flex-grow ml-16 lg:ml-10 ">
              <div>
                <button
                  className="align-middle rounded-full focus:shadow-outline-orange-600 focus:outline-none"
                  aria-label="Account"
                  aria-haspopup="true"
                >
                  <img
                    className=" avatar avatar-md object-cover rounded-full"
                    src={photo ? photo : profile}
                    alt="profile"
                    aria-hidden="true"
                  />
                </button>
              </div>
              <div>
                <h2 className=" text-xl font-semibold text-gray-700 ">
                  {firstName} {lastName}
                </h2>
                <h3 className=" text-sm font-semibold text-gray-700 ">
                  {Title}
                </h3>
              </div>
            </div>

            <div className="flex flex-row items-center  flex-wrap space-x-2 text-sm text-gray-500">
              <div className="flex flex-row flex-wrap space-x-1">
                <div>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-4 w-4 mt-1"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div>{address?.country}</div>
              </div>
              {languages?.map(({ language }, index) => (
                <div key={index} className="flex flex-row flex-wrap space-x-1">
                  <div>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-4 w-4 mt-1"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M9 2.25a.75.75 0 01.75.75v1.506a49.38 49.38 0 015.343.371.75.75 0 11-.186 1.489c-.66-.083-1.323-.151-1.99-.206a18.67 18.67 0 01-2.969 6.323c.317.384.65.753.998 1.107a.75.75 0 11-1.07 1.052A18.902 18.902 0 019 13.687a18.823 18.823 0 01-5.656 4.482.75.75 0 11-.688-1.333 17.323 17.323 0 005.396-4.353A18.72 18.72 0 015.89 8.598a.75.75 0 011.388-.568A17.21 17.21 0 009 11.224a17.17 17.17 0 002.391-5.165 48.038 48.038 0 00-8.298.307.75.75 0 01-.186-1.489 49.159 49.159 0 015.343-.371V3A.75.75 0 019 2.25zM15.75 9a.75.75 0 01.68.433l5.25 11.25a.75.75 0 01-1.36.634l-1.198-2.567h-6.744l-1.198 2.567a.75.75 0 01-1.36-.634l5.25-11.25A.75.75 0 0115.75 9zm-2.672 8.25h5.344l-2.672-5.726-2.672 5.726z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </div>
                  <div>{language}</div>
                </div>
              ))}
            </div>

            <div>
              <div className="flex flex-row flex-wrap space-x-2 w-full ">
                {Skills?.map(({ skill }, index) => (
                  <div
                    key={index}
                    className="flex flex-col flex-nowrap justify-center space-y-1 "
                  >
                    <div className="item ">
                      <div className="item w-full h-auto flex-grow  ">
                        <div className="flex flex-row flex-wrap space-x-2 w-full ">
                          <div className=" px-3 py-1 text-sm font-thin text-white bg-orange-600  rounded-md ">
                            <span>{skill}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="flex flex-row flex-wrap space-x-2">
                <div>
                  <div className="flex items-center justify-around px-2 py-1 text-sm font-semibold text-sky-500 ">
                    {verified ? (
                      <>
                        <svg
                          className="w-4 h-4 -ml-3 "
                          fill="#0ea5e9"
                          aria-hidden="true"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        <span className="text-gray-700">
                          User's Verified
                        </span>
                      </>
                    ) : (
                      <>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="black"
                          viewBox="0 0 20 20"
                          strokeWidth="1.5"
                          stroke="white"
                          className="w-4 h-4 -ml-3"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLineJoin="round"
                            d="M9.75 9.75l4.5 4.5m0-4.5l-4.5 4.5M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                        <span className="text-gray-700 ml-1">
                          User's Not Verified
                        </span>
                      </>
                    )}
                  </div>
                </div>
                <RatingStars
                  rating={average ? average : 0}
                  color="text-yellow-500"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SingleUser;
