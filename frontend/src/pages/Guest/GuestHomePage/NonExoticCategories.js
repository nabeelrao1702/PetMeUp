import { Link } from "react-router-dom";
import dog from "./img/dog.png";
import catts from "./img/catts.png";
import rabbit from "./img/rabbit.png";
import hen from "./img/hen.png";
import cow from "./img/cow.png";
import horse from "./img/horse.png";

const NonExorticCategories = () => {
  return (
    <div>
      <section className="sec2 p-10 container m-auto  bg-gray-100">
        <div className="subtitle text-center relative">
          <h1 className="inline-block text-3xl font-bold">
            Browse Categories By Non-Exotic
          </h1>
          <span className="rounded absolute w-96 bg-orange-600 inline-block"></span>
        </div>
        <p className="text-gray-600 my-5 mb-10 text-sm mx-auto w-64 text-center">
        For those who appreciate the charm of traditional, non-exotic pets, we have a dedicated category that celebrates the timeless appeal of cats, dogs, rabbits, and more. Connect with pet owners who share your love for these classic companions on our platform.
        </p>

        <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8 md:p-10">
          <div>
            <div className="flex items-center">
              <img
                src={dog}
                alt="Dogs"
                className="h-12 w-12 object-fill"
              />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">Dogs</h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Loyal and affectionate, dogs are cherished companions, offering unwavering friendship and a diverse range of breeds to suit various lifestyles.
            </p>
          </div>
          <div>
            <div className="flex items-center">
              <img
                src={catts}
                alt="cats"
                className="h-12 w-12 object-fill"
              />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">Cats</h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Independent and elegant, cats bring grace and charm to any household, offering playful and affectionate interactions for cat lovers.
            </p>
          </div>
          {/* <div>
            <div className="flex items-center">
              <img
                src={rabbit}
                alt="rabbit"
                className="h-12 w-12 object-fill"
              />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">
                  Rabbits
                </h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Gentle and endearing, rabbits make delightful pets, captivating owners with their sweet nature and soft, furry charm.
            </p>
          </div> */}
          {/* <div>
            <div className="flex items-center">
              <img src={hen} alt="hen" className="h-12 w-12 object-fill" />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">Hen</h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Providing fresh eggs and charming clucks, hens are popular among those with a passion for backyard farming and sustainability.
            </p>
          </div>
          <div>
            <div className="flex items-center">
              <img
                src={cow}
                alt="Cows"
                className="h-12 w-12 object-fill"
              />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">Cows</h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Known for their gentle demeanor and milk production, cows are farm animals cherished for their role in agriculture and rural life.
            </p>
          </div> */}
          <div>
            <div className="flex items-center">
              <img
                src={horse}
                alt="Horse"
                className="h-12 w-12 object-fill"
              />
              <Link to="/">
                <h1 className="text-orange-500 font-bold text-lg p-2">Horse</h1>
              </Link>
            </div>
            <p className="mt-1 text-gray-600 my-5 text-sm">
            Symbolizing grace and strength, horses are versatile companions, from equestrian sports to leisure riding, appealing to horse lovers and riders.
            </p>
          </div>
        </div>
      </section>
      ;
    </div>
  );
};
export default NonExorticCategories;
