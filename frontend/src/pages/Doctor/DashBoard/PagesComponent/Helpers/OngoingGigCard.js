import { useState, useEffect } from "react";

const OngoingGigCard = ({ data }) => {
  const id = data?._id;
  const storedProgress = sessionStorage.getItem(`gigProgressDoctor-${id}`);
  const initialProgress = storedProgress ? Number(storedProgress) : 0;
  const [progress, setProgress] = useState(initialProgress);

  const gigDuration = data?.duration;

  useEffect(() => {
    const today = new Date();
    const dueDate = new Date(today.getTime() + gigDuration * 24 * 60 * 60 * 1000);

    const timeRemaining = dueDate - Date.now();
    const intervalTime = timeRemaining / 100;
    let interval = null;

    if (progress < 100) {
      interval = setInterval(() => {
        setProgress((prevProgress) => {
          const newProgress = prevProgress + 1;

          if (newProgress > 100) {
            clearInterval(interval);
            sessionStorage.removeItem(`gigProgressDoctor-${id}`);
            return 100;
          }

          sessionStorage.setItem(`gigProgressDoctor-${id}`, newProgress);
          return newProgress;
        });
      }, intervalTime);
    }

    return () => clearInterval(interval);
  }, [progress, gigDuration, id]);

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
      <div className="shadow-lg rounded-xl mx-4 my-4 p-4 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 relative overflow-hidden transition duration-300 transform hover:scale-105">
        <div className="w-full h-full block">
          <div className="w-full">
            <p className="text-white text-xs font-semibold mb-2">
              {dateConverter(data?.createdAt)}
            </p>
            <p className="text-red text-lg font-semibold mb-2 text-center">
              {limitText(data?.gigOrderType?.title)}
            </p>
            <p className="text-white text-sm font-medium mb-2 text-center">
              {data?.gigOrderType?.Category}
            </p>

            <div className="flex text-white items-center justify-between">
              <p>Consultation process</p>
              <p className="font-bold">{progress}%</p>
            </div>
            <div className=" mt-3 mb-6">
              <div
                style={{
                  width: `${progress}%`,
                  height: "20px",
                  background: `linear-gradient(90deg, #8e44ad 0%, #3498db 100%)`,
                }}
              ></div>
            </div>
            <div className="flex text-grey-500 font-bold items-center justify-between ">
              <p>Check-Up In: {data?.duration} days</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OngoingGigCard;
