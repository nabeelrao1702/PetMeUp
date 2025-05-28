import { useState, useEffect } from "react";

const OngoingPetProfilesCard = ({ data }) => {
  const id = data?._id;
  const storedProgress = sessionStorage.getItem(`petProfiles-${id}`);
  const initialProgress = storedProgress ? Number(storedProgress) : 0;
  const [progress, setProgress] = useState(initialProgress);

  const exchangeDuration = data?.petProfilesOrderType?.duration;

  useEffect(() => {
    const today = new Date();
    const dueDate = new Date(today.getTime() + exchangeDuration * 24 * 60 * 60 * 1000);

    const timeRemaining = dueDate - Date.now();
    const intervalTime = timeRemaining / 100;
    let interval = null;
    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;
          if (newProgress > 100) {
            clearInterval(interval);
            sessionStorage.removeItem(`petProfiles-${id}`);
            return 100;
          }
          sessionStorage.setItem(`petProfiles-${id}`, newProgress);
          return newProgress;
        });
      }, intervalTime);
    }
    return () => clearInterval(interval);
  }, [progress, exchangeDuration, id]);

  const dateConverter = (createdAt) => {
    const userCreatedDate = new Date(createdAt);
    const months = [
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
    const month = months[userCreatedDate.getMonth()];
    const year = userCreatedDate.getFullYear();
    const date = userCreatedDate.getDate();

    return `${month} ${date} ${year} `;
  };

  const limitText = (text) => {
    return text && text.split(" ").slice(0, 2).join(" ");
  };

  return (
    <div>
      <div className="shadow-lg rounded-xl mx-4 my-4 p-4 bg-gradient-to-r from-orange-300 via-yellow-300 to-red-300 relative overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 my-4 transform hover:scale-105 transition-transform transition-shadow duration-300">
        <div className="w-full h-full block">
          <div className="w-full">
            <p className="text-blue-500 text-sm font-medium mb-2">
              {dateConverter(data?.createdAt)}
            </p>
            <p className="text-grey-600 text-lg font-semibold mb-2 text-center">
              {limitText(data?.petProfilesOrderType?.petProfilesId?.title)}
            </p>
            <p className="text-gray-700 text-sm font-medium mb-2 text-center">
              {data?.petProfilesOrderType?.petProfilesId?.requiredSkills}
            </p>

            <p className="text-pink-700 text-sm font-medium mb-2 text-center">
              {data?.petProfilesOrderType?.petProfilesId?.offeredSkills}
            </p>

            <div className="flex text-gray-700 items-center justify-between">
              <p className="font-medium">Pet Matting progress</p>
              <p className="font-bold">{progress}%</p>
            </div>
            <div className="mt-3 mb-6">
              <div
                style={{
                  width: `${progress}%`,
                  height: "20px",
                  background: `linear-gradient(to right, #ff8c00, #ff4500)`,
                }}
              ></div>
            </div>
            <div className="flex text-orange-900 font-bold items-center">
              <p>Pet Matting: {data?.petProfilesOrderType?.duration} days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingPetProfilesCard;
