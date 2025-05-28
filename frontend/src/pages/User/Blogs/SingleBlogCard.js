import { Link } from "react-router-dom";
import profile from "../../../img/profile.jpg";

const SingleBlogCard = ({ blog, reviews }) => {
  const { Category, title, user, story, photo, createdAt } = blog;

  const dateConverter = (createdAt) => {
    const userCreatedDate = new Date(createdAt);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var month = months[userCreatedDate.getMonth()];
    var year = userCreatedDate.getFullYear();
    var date = userCreatedDate.getDate();

    return `${month} ${date} ${year} `;
  };

  const limitText = (text, char) => {
    return text && text.split(" ").slice(0, char).join(" ");
  };
  return (
    <div>
    <div className="p-4">
      <div className="h-full rounded-xl shadow-md bg-gradient-to-r from-yellow-200 via-green-300 to-blue-400 overflow-hidden">
        <img
          className="lg:h-48 md:h-36 w-full object-cover object-center scale-110 transition-all duration-400 hover:scale-100"
          src={photo}
          alt="Story"
        />
        <div className="p-6">
          <h2 className="tracking-widest text-xs text-gray-500 mb-1 uppercase font-semibold">
            {Category}
          </h2>
          <h1 className="text-lg font-extrabold text-gray-800 mb-3">
            {limitText(title, 5)}..
          </h1>
          <p className="leading-relaxed mb-3 text-gray-600 font-light">
            {limitText(story, 8)}..
          </p>
          <div className="flex items-center my-3">
            <Link to="#" className="block relative">
              <img
                alt="profile"
                src={user[0].photo ? user[0].photo : profile}
                className="mx-auto object-cover rounded-full h-10 w-10"
              />
            </Link>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800 font-semibold">
                {user[0].firstName} {user[0].lastName}
              </p>
              <p className="text-gray-500 font-light">
                {dateConverter(createdAt)}
              </p>
            </div>
          </div>
          <div className="flex items-center flex-wrap">
            <Link to="/user/blogs/blog-details" state={{ blog, reviews }}>
              <button className="bg-gradient-to-r from-cyan-400 to-blue-400 hover:scale-105 shadow-md px-4 py-1 rounded-lg text-white font-bold">
                Learn more
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  );
};

export default SingleBlogCard;
