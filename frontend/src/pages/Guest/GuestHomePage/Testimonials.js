import bobbyT from "./img/bobbyT.jpg";
const Testimonials = () => {
  return (
    <div>
      <section className="sec5 p-10 container m-auto border">
        <div className="subtitle text-center relative">
          <h1 className="inline-block text-3xl font-bold">Testimonials</h1>
          <span className="rounded absolute w-32 bg-orange-600 inline-block"></span>
        </div>
        <h3 className="font-bold mt-6 text-center text-sm">
          See what our users say about us
        </h3>
        <div className="max-w-5xl px-4 py-8 mx-auto">
          <section className="p-8 bg-gray-100 rounded-lg">
            <div className="grid grid-cols-1 gap-12 sm:grid-cols-3 sm:items-center">
              <div className="relative">
                <div className="aspect-w-1 aspect-h-1">
                  <img
                    src={bobbyT}
                    alt="man"
                    className=" object-cover rounded-lg   "
                  />
                </div>

                <div className="absolute inline-flex px-4 py-2 bg-gray-200 rounded-lg shadow-xl -bottom-4 -right-4">
                  <span className="inline-block w-12 h-10 bg-orange-400 rounded-lg"></span>
                </div>
              </div>

              <blockquote className="sm:col-span-2">
                <p className="text-xl font-medium sm:text-2xl">
                  "I found the perfect match for my beloved Labrador on this pet matchmaking website. The location-friendly feature made it a breeze to connect with local pet owners. The chat support was incredibly helpful, and the matchmaking algorithm really understood our needs. It's a fantastic platform for pet lovers!"
                </p>

                <cite className="inline-flex items-center mt-8 not-italic">
                  <span className="hidden w-6 h-px bg-gray-400 sm:inline-block"></span>
                  <p className="text-sm text-orange-500 uppercase sm:ml-3">
                    <strong>Nabeel Ahmad</strong>
                  </p>
                </cite>
              </blockquote>
            </div>
          </section>
        </div>
      </section>
    </div>
  );
};

export default Testimonials;
