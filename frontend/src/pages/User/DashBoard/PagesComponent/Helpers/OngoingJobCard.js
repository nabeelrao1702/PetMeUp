import { useState, useEffect } from "react";

const OngoingJobCard = ({ data }) => {
  const id = data?._id;
  const storedProgress = sessionStorage.getItem(`jobProgressUser-${id}`);
  const initialProgress = storedProgress ? Number(storedProgress) : 0;
  const [progress, setProgress] = useState(initialProgress);
  const jobDuration = data?.jobOrderType?.duration;

  useEffect(() => {
    const today = new Date();
    const dueDate = new Date(today.getTime() + jobDuration * 24 * 60 * 60 * 1000);

    const timeRemaining = dueDate - Date.now();
    const intervalTime = timeRemaining / 100;
    let interval = null;

    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;

          if (newProgress > 100) {
            clearInterval(interval);
            sessionStorage.removeItem(`jobProgressUser-${id}`);
            return 100;
          }

          sessionStorage.setItem(`jobProgressUser-${id}`, newProgress);
          return newProgress;
        });
      }, intervalTime);
    }

    return () => clearInterval(interval);
  }, [progress, jobDuration, id]);

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

    return `${month} ${date} ${year}`;
  };

  const limitText = (text) => {
    return text && text.split(" ").slice(0, 2).join(" ");
  };

  return (
    <div className="bg-gradient-to-b from-blue-300 via-purple-300 to-pink-300 p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 mx-4 my-4 transform hover:scale-105 transition-transform transition-shadow duration-300">
      <div className="h-full w-full block">
        <div className="w-full">
          <p className="text-blue-500 text-sm font-semibold mb-2">
            {dateConverter(data?.createdAt)}
          </p>
          <p className="text-purple-800 text-lg font-bold mb-2 text-center">
            {limitText(data?.jobOrderType?.job?.title)}
          </p>
          <p className="text-pink-500 text-sm font-medium mb-2 text-center">
            {data?.jobOrderType?.job?.category}
          </p>

          <div className="flex items-center justify-between text-gray-500">
            <p className="font-medium">Doctor Session progress</p>
            <p className="font-bold">{progress}%</p>
          </div>
          <div className="mt-3 mb-6">
            <div
              style={{
                width: `${progress}%`,
                height: "8px",
                background: "linear-gradient(to right, #4CAF50, #8BC34A)",
                borderRadius: "4px",
                transition: "width 0.5s ease",
              }}
            ></div>
          </div>

          <div className="flex text-orange-600 font-bold items-center">
            <p>Visit In: {data?.jobOrderType?.duration} days</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingJobCard;
