import { useState } from "react";
import { Link } from "react-router-dom";
import user from "../../../img/authPagesImg/user.png";
import doctor from "../../../img/authPagesImg/doctor.png";

const RegisterType = () => {
  const [signUpDoctor, setsignUpDoctor] = useState(true);
  const [signUpUser, setsignUpUser] = useState(false);

  const signUpDoctorHandler = () => {
    setsignUpDoctor(true);
    setsignUpUser(false);
  };

  const signUpUserHandler = () => {
    setsignUpDoctor(false);
    setsignUpUser(true);
  };

  return (
    <div>
      <section className="lg:px-60 px-auto md:m-6 mx-4 mt-6 mb-8 max-w-7xl ">
        <div className="flex flex-wrap justify-center mt-44 lg:mt-32 mb-16 lg:mb-20 space-y-2 border border-orange-600 rounded-md">
          <div className="flex flex-col flex-wrap justify-center items-center p-8 space-y-6 h-auto w-auto">
            <div className="item">
              <h1 className="mb-1 text-3xl font-medium text-center text-gray-800 md:text-3xl mb-6">
                Join in as a Vet Doctor or a User
              </h1>
            </div>
            <div className="flex flex-wrap cursor-pointer justify-center h-auto w-auto lg:gap-x-8 md:gap-x-8 gap-y-8">
              <div className="item">
                <div
                  onClick={signUpDoctorHandler}
                  className={
                    signUpDoctor
                      ? "w-full p-10 max-w-sm overflow-hidden border border-orange-600 rounded-md bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl"
                      : "w-full p-10 max-w-sm overflow-hidden border border-gray-200 rounded-md bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl"
                  }
                >
                  <img
                    src={doctor}
                    className="mx-auto mt-8 h-16 w-16 "
                    alt="doctor png"
                  />

                  <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">
                    Doctor
                  </h1>
                  <p className="my-4 text-center text-sm text-gray-500">
                    I am a Doctor,looking for clients.
                  </p>
                </div>
              </div>
              <div className="item">
                <div
                  onClick={signUpUserHandler}
                  className={
                    signUpUser
                      ? "w-full p-10 max-w-sm overflow-hidden border border-orange-600 rounded-md bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl"
                      : "w-full p-10 max-w-sm overflow-hidden border border-gray-200 rounded-md bg-white shadow-md duration-300 hover:scale-105 hover:shadow-xl"
                  }
                >
                  <img
                    src={user}
                    className="mx-auto mt-8 h-16 w-16 "
                    alt="user png"
                  />

                  <h1 className="mt-2 text-center text-2xl font-bold text-gray-500">
                    User
                  </h1>
                  <p className="my-4 text-center text-sm text-gray-500">
                    I am a User,looking for pet breeding
                  </p>
                </div>
              </div>
            </div>

            <div className="item">
              <Link
                to={signUpDoctor ? "/register-doctor" : "/register-user"}
                className="btn lg:w-96 w-80 text-sm  btn-primary btn-lg bg-orange-600 hover:bg-orange-500"
              >
                {signUpDoctor && <div>Join as a Doctor</div>}
                {signUpUser && <div>Join as a User</div>}
              </Link>
            </div>
            <div className="item">
              <div className=" text-sm font-medium text-gray-700 space-x-1">
                Already have an account?
                <span></span>
                <Link
                  to="/login-type"
                  className="text-orange-700 hover:text-orange-900"
                >
                  Sign In
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default RegisterType;
