import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import {
  SendOTP,
  VerifyEmail,
} from "../../../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Verification = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const freeuserId = useSelector((state) => state.userData.freeuserInfo._id);
  const freeuserInfo = useSelector((state) => state?.userData?.freeuserInfo);
  const { loading } = useSelector((state) => state?.userData);

  const formData = {
    otp1: "",
    otp2: "",
    otp3: "",
    otp4: "",
  };

  const onSubmitUser = (formData) => {
    const { otp1, otp2, otp3, otp4 } = formData;
    const userData = {
      otp: `${otp1}${otp2}${otp3}${otp4}`,
      userId: freeuserId,
    };

    dispatch(VerifyEmail(userData, navigate, toast));
  };

  const sendOTP = (freeuserId) => {
    dispatch(SendOTP(freeuserId, navigate, toast));
  };

  const validate = Yup.object({
    otp1: Yup.string().required("4 Characters OTP is required"),
    otp2: Yup.string().required("4 Characters  OTP is required"),
    otp3: Yup.string().required("4 Characters  OTP is required"),
    otp4: Yup.string().required("Please Enter Complete OTP"),
  });

  return (
    <div>
        <>
          <div className="flex flex-col flex-wrap items-left font-bold text-lg text-gray-700 ">
            <div className="item ml-4 mb-2 ">
              <h3>Profile Verification</h3>
            </div>
          </div>
          <div className=" col-span-6 sm:col-span-6 border-b mb-4 "></div>
          <Formik
            initialValues={formData}
            onSubmit={onSubmitUser}
            validationSchema={validate}
          >
            <Form>
              <div className=" py-20 px-3">
                <div className="container mx-auto">
                  <div className="max-w-sm mx-auto md:max-w-lg">
                    <div className="w-full">
                      {freeuserInfo?.verified ? (
                        <div className=" border bg-white text-gray-700  py-3 rounded text-center">
                          <div className="flex flex-col mt-4 justify-center items-center">
                            <svg
                              strokeWidth="1.5"
                              stroke="currentColor"
                              className="shrink-0 w-10 h-10  text-orange-600 transition group-hover:text-gray-900"
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill="none"
                            >
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                              />
                            </svg>
                            <span className="font-bold ">
                              Your Account is Verified!!
                            </span>
                          </div>
                        </div>
                      ) : (
                        <div className=" border bg-white text-gray-700  py-3 rounded text-center">
                          <div className="flex flex-col mt-4">
                            <span className="font-medium text-gray-700 ">
                              Enter the OTP you received at
                            </span>
                            <span className="font-bold ">
                              {freeuserInfo?.email}
                            </span>
                          </div>

                          <div className="flex flex-row justify-center text-center px-2 mt-5">
                            <Field
                              className="m-2 border h-10 w-10 text-center focus:outline-none focus:border-orange-500 focus:ring-orange-500  rounded"
                              label="otp-1"
                              name="otp1"
                              type="text"
                              maxLength={1}
                            />

                            <Field
                              className="m-2 border h-10 w-10 text-center focus:outline-none focus:border-orange-500 focus:ring-orange-500  rounded"
                              label="otp-2"
                              name="otp2"
                              type="text"
                              maxLength={1}
                            />
                            <Field
                              className="m-2 border h-10 w-10 text-center focus:outline-none focus:border-orange-500 focus:ring-orange-500  rounded"
                              label="otp-3"
                              name="otp3"
                              type="text"
                              maxLength={1}
                            />
                            <Field
                              className="m-2 border h-10 w-10 text-center focus:outline-none focus:border-orange-500 focus:ring-orange-500  rounded"
                              label="otp-4"
                              name="otp4"
                              type="text"
                              maxLength={1}
                            />
                          </div>

                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                            <ErrorMessage component="p" name="otp4" />
                          </div>
                          <input
                            type="submit"
                            className="w-36 btn btn-primary btn-lg bg-orange-600 hover:bg-orange-500 focus:outline-none focus:border-orange-500 focus:ring-orange-500 mt-6"
                            value="Verify"
                          />

                          <div className="flex flex-row justify-center mb-8 mt-6">
                            <span className=" text-sm absolute bg-white font-medium px-4 text-gray-700">
                              Didn't receive the code?
                            </span>
                            <div className="w-full bg-gray-200 mt-3 h-px"></div>
                          </div>

                          <div className="grid grid-cols-1 mx-20">
                            <button
                              className=" btn text-sm btn-primary btn-lg bg-orange-600 hover:bg-orange-500"
                              onClick={() => sendOTP(freeuserId)}
                            >
                              Resend OTP
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Form>
          </Formik>
        </>
    </div>
  );
};

export default Verification;
