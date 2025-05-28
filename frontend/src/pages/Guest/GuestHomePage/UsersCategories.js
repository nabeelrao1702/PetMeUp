import { Link } from "react-router-dom";
import bird from "./img/bird.png";
import cat from "./img/cat.png";
import crock from "./img/crock.png";
import elephant from "./img/elephant.png";
import snake from "./img/snake.png";
import deer from "./img/deer.png";

const UsersCategories = () => {
  return (
    <div>
      <section className="sec2 p-10 container m-auto">
        <div className="subtitle text-center relative">
          <h1 className="inline-block text-3xl font-bold">
            Browse Categories By Exotic
          </h1>
          <span className="rounded absolute w-96 bg-orange-600 inline-block"></span>
        </div>
        <p className="text-gray-600 my-5 mb-10 text-sm mx-auto w-64 text-center">
        Explore our exclusive category for exotic pets. From fascinating reptiles to unique birds, connect with fellow exotic animal lovers and discover the extraordinary companions you've been dreaming of.
        </p>

        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 md:p-10">
          <div>
            <div className="flex items-center">
              <img
                src={bird}
                alt="Birds"
                className="h-12 w-12 object-fill"
              />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">Birds</h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Bursting with vibrant plumage and engaging personalities, exotic birds are a delight for avian enthusiasts seeking distinctive companions.
            </p>
          </div>
          <div>
            <div className="flex items-center">
              <img
                src={cat}
                alt="wild Cats"
                className="h-12 w-12 object-fill"
              />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">
                  Wild Cats
                </h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            From servals to caracals, exotic wild cats captivate with their untamed allure, attracting enthusiasts to unique feline companions.
            </p>
          </div>
          {/* <div>
            <div className="flex items-center">
              <img
                src={crock}
                alt="crock"
                className="h-12 w-12 object-fill"
              />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">
                  Crococdiles
                </h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            For the adventurous and experienced, crocodiles offer an exotic and daring choice in pet ownership.
            </p>
          </div> */}
          {/* <div>
            <div className="flex items-center">
              <img
                src={elephant}
                alt="elephant"
                className="h-12 w-12 object-fill"
              />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">
                  Elephant
                </h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Symbolizing wisdom and strength, elephants represent rare and exotic animal companions that command attention with their majesty.
            </p>
          </div> */}
          <div>
            <div className="flex items-center">
              <img src={deer} alt="Deer" className="h-12 w-12 object-fill" />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">Deer</h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Graceful and gentle, deer are cherished for their serene presence, making them popular choices among non-exotic pet enthusiasts.
            </p>
          </div>

          {/* <div>
            <div className="flex items-center">
              <img
                src={snake}
                alt="Snakes"
                className="h-12 w-12 object-fill"
              />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">
                  Snakes
                </h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Mysterious and captivating, snakes' unique appeal and diverse species cater to exotic pet enthusiasts seeking distinctive companions
            </p>
          </div> */}
          {/* <div>
            <div className="flex items-center">
              <img src={deer} alt="Deer" className="h-12 w-12 object-fill" />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">Deer</h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Graceful and gentle, deer are cherished for their serene presence, making them popular choices among non-exotic pet enthusiasts.
            </p>
          </div> */}
        </div>
      </section>
    </div>
  );
};
export default UsersCategories;
