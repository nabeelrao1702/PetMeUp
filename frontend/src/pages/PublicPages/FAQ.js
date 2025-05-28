
import { useLocation } from "react-router-dom";

const FAQ = () => {
  const { pathname } = useLocation();
  const url = "/doctor/faqs";
  const url2 = "/user/faqs";

  return (
    <div>
      <div
        className={
          pathname.includes(url) || pathname.includes(url2)
            ? "bg-lightblue py-9 px-4"
            : "bg-lightblue py-40 lg:py-24 px-4"
        }
      >
        <div className="mx-auto max-w-6xl flex flex-col md:flex-row ">
          <h2 className="mr-8 w-full md:w-1/3 text-3xl font-extrabold leading-9 mb-8">
            Frequently-asked questions
          </h2>
          <dl className="w-full md:w-2/3">
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">
              Is creating a pet profile on your website free?
              </h3>
            </dt>
            <dd className="mb-16">
              <p>
              Yes, registering and creating a pet profile is absolutely free. We believe in making pet matchmaking accessible to all pet owners.
              </p>
            </dd>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">
              What types of pets can I find on your website?
              </h3>
            </dt>
            <dd className="mb-16">
              <p>
              You can find a wide variety of pets, including dogs, cats, rabbits, birds, and even exotic animals like reptiles. We cater to all types of pet lovers.
              </p>
            </dd>
            <dt className="mb-4">
              <h3 className="text-xl font-semibold">
              Is it safe to meet with other pet owners and their pets through your platform?
              </h3>
            </dt>
            <dd className="mb-16">
              <p>
              While we provide a platform for connections, we recommend taking safety precautions when meeting other members. Arrange meetups in public places, inform someone about your plans, and trust your instincts.We also verify our users and doctors.
              </p>
            </dd>
          </dl>
        </div>
      </div>
    </div>
  );
};

export default FAQ;
