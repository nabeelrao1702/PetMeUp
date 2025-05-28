import { useState, useEffect } from "react";

const OngoingJobCard = ({ data }) => {
  const id = data?._id;
  const storedProgress = sessionStorage.getItem(`jobProgressDoctor-${id}`);
  const initialProgress = storedProgress ? Number(storedProgress) : 0;
  const [progress, setProgress] = useState(initialProgress);
  const jobDuration = data?.jobOrderType?.duration;

  useEffect(() => {
    const today = new Date();
    const dueDate = new Date(
      today.getTime() + jobDuration * 24 * 60 * 60 * 1000
    );

    const timeRemaining = dueDate - Date.now();
    const intervalTime = timeRemaining / 100;
    let interval = null;

    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;

          if (newProgress > 100) {
            clearInterval(interval);
            sessionStorage.removeItem(`jobProgressDoctor-${id}`);
            return 100;
          }

          sessionStorage.setItem(`jobProgressDoctor-${id}`, newProgress);
          return newProgress;
        });
      }, intervalTime);
    }

    return () => clearInterval(interval);
  }, [progress, jobDuration, id]);

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

  const limitText = (text) => {
    return text && text.split(" ").slice(0, 2).join(" ");
  };

  return (
    <div>
      <div className="shadow-lg rounded-xl mx-4 my-4 p-4 bg-gradient-to-r from-purple-500 via-yellow-500 to-red-500 relative overflow-hidden transition duration-300 transform hover:scale-105">
        <div className="h-full w-full block">
          <div className="w-full">
            <p className="text-white text-xs font-semibold mb-2">
              {dateConverter(data?.createdAt)}
            </p>
            <p className="text-red text-lg font-semibold mb-2 text-center">
              {limitText(data?.jobOrderType?.job?.title)}
            </p>
            <p className="text-white text-sm font-medium mb-2 text-center">
              {data?.jobOrderType?.job?.category}
            </p>

            <div className="flex text-white items-center justify-between">
              <p>Doctor Session in process</p>
              <p className="font-bold">{progress}%</p>
            </div>
            <div className=" mt-3 mb-6">
              <div
                style={{
                  width: `${progress}%`,
                  height: "20px",
                  background: `linear-gradient(90deg, lightgreen 0%, darkgreen 100%)`,
                }}
              ></div>
            </div>

            <div className="flex text-grey-600 font-bold items-center ">
              <p>Visit In: {data?.jobOrderType?.duration} days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingJobCard;
