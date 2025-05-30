import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import icon4 from "../../../img/icon4.jpg";
import TextField from "./TextField";
import { RegisterDoctor } from "../../../redux/actions/DoctorActions";

const SignUpDoctor = () => {
  const { loading } = useSelector((state) => state?.doctorData);
  const formData = {
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const onSubmit = (formData) => {
    const { firstName, lastName, email, password } = formData;

    const userData = {
      firstName,
      lastName,
      email,
      password,
    };

    dispatch(RegisterDoctor(userData, navigate, toast));

  };

  const validate = Yup.object({
    firstName: Yup.string()
      .max(15, "Must be 15 characters or less")
      .required("Required"),
    lastName: Yup.string()
      .max(20, "Must be 20 characters or less")
      .required("Required"),
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string()
      .min(8, "Password must be at least 8 charaters")
      .required("Password is required"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Password do not match")
      .required("Confirm password is required"),
  });
  return (
    <>
      <section className="grid grid-cols-1 lg:grid-cols-2 mt-20 lg:mt-0">

        <>
          <div className="w-full px-4 py-20 mx-auto bg-white xl:py-32 md:w-3/5 lg:w-4/5 xl:w-3/5">
            <h1 className="mb-4 -mt-3 text-2xl semibold leading-snug tracking-tight text-left text-gray-900 md:text-4xl">
              Sign up as Vet Doctor
            </h1>

            <Formik
              initialValues={formData}
              validationSchema={validate}
              onSubmit={onSubmit}

            >
              <Form className="mt-8 space-y-3">
                <div className="grid grid-cols-2 gap-4">
                  <TextField
                    label="First Name"
                    name="firstName"
                    type="text"
                    placeholder="Ex.Nabeel"
                  />
                  <TextField
                    label="Last Name"
                    name="lastName"
                    type="text"
                    placeholder="Ex.Ahmad"
                  />
                </div>
                <TextField
                  label="Email"
                  name="email"
                  type="email"
                  placeholder="Ex.nabeelrao1702@gmail.com"
                />
                <TextField
                  label="Password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                />
                <TextField
                  label="Confirm Password"
                  name="confirmPassword"
                  type="password"
                  placeholder="••••••••"
                />
                <input
                  type="submit"
                  className="w-full btn btn-primary btn-lg bg-orange-600 hover:bg-orange-500"
                  value="Register"
                />
              </Form>
            </Formik>
            <p className="my-5 text-xs font-medium text-center text-gray-700 space-x-1">
              By clicking "Sign Up" you agree to our
              <span></span>
              <Link
                to="/help-support"
                className="text-orange-700 hover:text-orange-600"
              >
                Terms of Service
              </Link>
              <span></span>
              and
              <Link
                to="/help-support"
                className="text-orange-700 hover:text-orange-600"
              >
                Privacy Policy
              </Link>
              .
            </p>
            <div className="pt-6 mt-6 text-sm font-medium text-gray-700 border-t border-gray-200 space-x-1">
              Already have an account?
              <span></span>
              <Link
                to="/login-type"
                className="text-orange-700 hover:text-orange-900"
              >
                Sign In
              </Link>
            </div>
            <div className="pt-2 mt-2 text-sm font-medium text-gray-700 space-x-1 border-t border-gray-200">
              Looking For Pet-profiles?
              <span></span>
              <Link
                to="/register-user"
                className="text-orange-700 hover:text-orange-900"
              >
                Join as a User
              </Link>
            </div>
          </div>
          <div className="px-4 py-20 space-y-10 bg-gray-100 xl:py-32 md:px-40 lg:px-20 xl:px-40">
            <Link
              to="/"
              className="logo text-md md:text-2xl font-bold text-orange-600"
            >
              <img
                src={icon4}
                className="h-6 w-6 mr-2 inline-block transform md:scale-150"
                alt="PetmeUp icon"
              />
              <span className="inline-block font-serif text-3xl">PET</span>
              <span className="inline-block font-mono text-xl ml-1">Me</span>
              <span className="inline-block font-serif text-3xl ml-1">UP</span>
            </Link>
            <div className="flex space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-none w-6 h-6 mt-1 text-orange-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h2 className="text-xl font-medium text-orange-700">
                  Free account
                </h2>
                <p className="mt-1 text-gray-700">
                  Register for a free account and give your pets the opportunity to find their perfect match without any financial barriers. We're committed to inclusivity and your pet's happiness.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-none w-6 h-6 mt-1 text-orange-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h2 className="text-xl font-medium text-orange-700">
                  MatchMaking
                </h2>
                <p className="mt-1 text-gray-700">
                  Our advanced matchmaking algorithm considers pet type, age, breed, and behavior to suggest ideal pet matches, creating tailored connections for your beloved companions.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-none w-6 h-6 mt-1 text-orange-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h2 className="text-xl font-medium text-orange-700">
                  Chat Support
                </h2>
                <p className="mt-1 text-gray-700">
                  Communicate effortlessly with fellow pet owners through our chat support feature, ensuring meaningful connections for your pets and fostering lasting bonds.
                </p>
              </div>
            </div>
            <div className="flex space-x-3">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 20 20"
                fill="currentColor"
                className="flex-none w-6 h-6 mt-1 text-orange-700"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
              <div>
                <h2 className="text-xl font-medium text-orange-700">
                  Location Friendly
                </h2>
                <p className="mt-1 text-gray-700">
                  Our website connects pet owners with nearby matches, making it convenient to find the perfect companion for your furry friends without the hassle of long journeys.
                </p>
              </div>
            </div>
          </div>
        </>

      </section>
    </>
  );
};
export default SignUpDoctor;
