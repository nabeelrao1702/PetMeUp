import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import { Formik, Form } from "formik";
import * as Yup from "yup";
import { LoginUser } from "../../../redux/actions/UserActions";
import TextField from "./TextField";

const SignInUser = () => {
  const { loading } = useSelector((state) => state?.userData);
  const formData = {
    email: "",
    password: "",
  };

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onSubmit = (formData) => {
    const { email, password } = formData;

    const userData = {
      email,
      password,
    };
    dispatch(LoginUser(userData, navigate, toast));
  };

  const validate = Yup.object({
    email: Yup.string().email("Email is invalid").required("Email is required"),
    password: Yup.string().required("Password is required"),
  });

  return (
    <div>
      <section className="px-6 lg:px-0 py-8 lg:py-0 pb-24 mx-auto max-w-7xl mt-32 -mb-50">

        <>
          <div className="w-full py-6 mx-auto md:w-3/5 lg:w-2/5 ">
            <h1 className=" text-3xl font-medium text-center text-gray-800 md:text-3xl mb-6">
              Log in to PetMeUp
            </h1>

            <Formik
              initialValues={formData}
              validationSchema={validate}
              onSubmit={onSubmit}
            >
              <Form className="mt-8 space-y-3">
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
                <input
                  type="submit"
                  className="w-full btn btn-primary btn-lg bg-orange-600 hover:bg-orange-500"
                  value="Sign In"
                />
              </Form>
            </Formik>
            <p className="mb-4 space-y-2 text-sm text-left text-gray-600 sm:text-center sm:space-y-0 mt-4">
              <Link
                to="/forgot-password-user"
                className="w-full btn btn-sm  text-orange-700 hover:text-orange-600  sm:w-auto"
              >
                Forgot password
              </Link>
              <Link
                to="/register-type"
                className="w-full btn  text-orange-700 hover:text-orange-600 btn-sm  sm:w-auto"
              >
                Sign Up
              </Link>
            </p>
          </div>
        </>

      </section>
    </div>
  );
};
export default SignInUser;
