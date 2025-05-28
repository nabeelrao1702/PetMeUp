import { Link } from "react-router-dom";
import clinic from "./img/clinic.jpg";
import location from "./img/location.jpg";
import match from "./img/match.jpg";

const Features = () => {
  return (
    <div>
      <section className="sec3 p-10 container m-auto ">
        <div className="subtitle text-center relative">
          <h1 className="inline-block text-3xl font-bold">
            Come Breed With Us
          </h1>
          <span className="rounded absolute w-52 bg-orange-600 inline-block"></span>
        </div>

        <div className="md:flex sm:flex-col md:flex-row justify-center md:p-10 mt-10">
          <div className="md:px-8 w-full md:w-2/5">
            <img src={clinic} alt="work-illustration" />
          </div>
          <div className="md:p-4 mt-2 md:mt-0 w-full md:w-1/2">
            <h2 className="text-2xl font-bold mt-0">Clinic Support</h2>
            <p className="text-gray-600 mt-2 mb-4 text-sm">
            In addition to our user-friendly features for pet matchmaking, we also offer clinical support to ensure the well-being of your beloved pets. Our platform provides access to expert veterinarians and pet health professionals who can offer guidance, answer your health-related questions, and provide valuable advice on pet care. Whether you're seeking advice on nutrition, behavior, or general health concerns, our clinical support feature is there to provide the necessary assistance, giving you peace of mind and ensuring your pets are in the best of hands. Your pet's health and happiness are our top priorities.
            </p>
            <Link
              to="/"
              className="px-6 py-2 text-sm font-semibold text-white bg-orange-600 rounded-md"
            >
              Read more
            </Link>
          </div>
        </div>

        <div className="md:flex justify-center md:p-10 mt-10 felx-col md:flex-row-reverse">
          <div className="md:px-8 w-full md:w-2/5">
            <img src={location} alt="work-illustration" />
          </div>
          <div className="md:p-4 mt-2 md:mt-0 w-full md:w-1/2">
            <h2 className="text-2xl font-bold mt-0">Location Friendly</h2>
            <p className="text-gray-600 mt-2 mb-4 text-sm">
            Our pet matchmaking website prioritizes local connections. Find nearby companions for your furry friends, ensuring that playdates and meetups are easy to arrange. Whether you live in a bustling city or a quiet town, our location-friendly feature eliminates the need for long-distance travel, making it a hassle-free experience for pet owners to connect with potential mates and playmates.
            </p>
            <Link
              to="/"
              className="px-6 py-2 text-sm font-semibold text-orange-600 bg-white border border-orange-600 rounded-md"
            >
              Read more
            </Link>
          </div>
        </div>

        <div className="md:flex sm:flex-col md:flex-row justify-center md:p-10 mt-10">
          <div className="md:px-8 w-full md:w-2/5">
            <img src={match} alt="work-illustration" />
          </div>
          <div className="md:p-4 mt-2 md:mt-0 w-full md:w-1/2">
            <h2 className="text-2xl font-bold mt-0">Matchmaking</h2>
            <p className="text-gray-600 mt-2 mb-4 text-sm">
            Finding the ideal pet companion is at the heart of our platform. We've developed an advanced matchmaking algorithm that takes into account various factors, such as pet type, age, breed, and behavior. This algorithm suggests potential matches that align with your pet's unique qualities and preferences. It's like personalized dating for pets, ensuring that your furry friends find the perfect mate or playmate. Our matchmaking feature guarantees meaningful and lasting connections.
            </p>
            <Link
              to="/"
              className="px-6 py-2 text-sm font-semibold text-white bg-orange-600 rounded-md"
            >
              Read more
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Features;
