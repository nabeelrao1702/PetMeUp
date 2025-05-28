import { Link } from "react-router-dom";
import happy from "./img/happy.svg";

const PetProfiles = () => {
  return (
    <div>
      <section className="sec6 p-10 container m-auto border">
        <div className="subtitle text-center relative">
          <h1 className="inline-block text-2xl md:text-3xl font-bold">
            Why we are Different
          </h1>
          <span className="rounded absolute w-64 bg-orange-600 inline-block"></span>
        </div>

        <div className="flex items-center justify-around flex-col md:flex-row-reverse mt-20">
          <div className="w-full md:w-1/3 mb-2">
            <img src={happy} alt="project-manager" />
          </div>
          <div className="w-full md:w-1/2">
            <h2 className="font-bold mb-3 text-2xl">
              Breed your
              <span className="text-orange-500"> Pet</span> with anyone,
              anytime
            </h2>
            <p className="text-gray-800 text-md mb-5 max-w-2xl">
            Our platform simplifies pet mating partner discovery.Connect with fellow pet lovers and responsible breeders,
            </p>
            <Link to="help-support">
              <button className="px-6 py-2 text-sm font-semibold text-white bg-gray-900 mr-3 rounded-md">
                Try it Now !
              </button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default PetProfiles;
