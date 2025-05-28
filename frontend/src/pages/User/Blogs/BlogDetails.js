import { useLocation } from "react-router-dom";
import CommentSection from "./CommentSection";
import profile from "../../../img/profile.jpg";

const BlogDetails = () => {
  const blogDetail = useLocation()?.state?.blog;
  const reviews = useLocation()?.state?.reviews;

  const { Category, title, user, story, photo, createdAt } = blogDetail;

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

  return (
    <div>
      <main className="relative container mx-auto bg-white px-4 mt-2 ">
      {/* <div className="relative">
        <div className="w-full rounded-2xl overflow-hidden">
          <img
            className="w-full h-auto object-cover"
            src={photo}
            alt="Story"
          />
        </div>
        </div> */}

        <div className="mt-4 w-1/2 mx-auto">
        <div className="relative">
          <div className="w-full rounded-2xl overflow-hidden">
            <img
              className="w-full h-auto object-cover"
              src={photo}
              alt="Story"
            />
          </div>
          </div>
        </div>

        <article className="max-w-prose mx-auto py-8">
          <h1 className="text-2xl font-bold">{title}</h1>
          <h2 className="tracking-widest text-md title-font font-medium text-gray-400 my-4">
            {Category}
          </h2>
          <div className="flex items-center my-3">
            <div className="block relative">
              <img
                alt="profile"
                src={user[0].photo ? user[0].photo : profile}
                className="mx-auto object-cover rounded-full h-10 w-10 "
              />
            </div>
            <div className="flex flex-col justify-between ml-4 text-sm">
              <p className="text-gray-800 dark:text-black">
                {user[0].firstName} {user[0].lastName}
              </p>
              <p className="text-gray-400 dark:text-gray-300">
                {" "}
                {dateConverter(createdAt)}
              </p>
            </div>
          </div>

          <p className="mt-6">{story}</p>
        </article>
        <div className=" border-b border-gray-200"></div>
        <CommentSection blogDetail={blogDetail} reviews={reviews} />
      </main>
    </div>
  );
};

export default BlogDetails;
