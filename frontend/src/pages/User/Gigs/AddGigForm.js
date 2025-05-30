import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Modal from "../Profile/Modal";
import { CreateGig } from "./../../../redux/actions/UserActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import gig from "../../../img/blog.png";
const AddGigForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState();
  const { loading } = useSelector((state) => state?.userData);
  const handleModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const formData = {
    title: "",
    description: "",
    Category: "",
    requirements: "",
    attachments: "",
    // BASIC: {
    //   name: "",
    //   details: "",
    //   time: "",
    //   revisions: "",
    //   Price: "",
    // },

     STANDARD: {
       name: "",
       details: "",
       time: "",
       revisions: "",
       Price: "",
     },

    //  PREMIUM: {
    //    name: "",
    //    details: "",
    //    time: "",
    //    revisions: "",
    //    Price: "",
    //  },

    skills: [""],
  };

  const onSubmit = async (formValues) => {
    dispatch(CreateGig(formValues, navigate, toast));
  };
  const validate = Yup.object({
    title: Yup.string().required("Breed Name is Required"),
    description: Yup.string()
      .min(100, "Description must have at least 100 words")
      .required("Description is Required"),
    Category: Yup.string().required("Category is Required"),
    requirements: Yup.string()
      .min(50, "Requirements must have at least 50 words")
      .required("Requirements is Required"),
    attachments: Yup.mixed().required("Pet Photo is Required"),

    // BASIC: Yup.object({
    //   name: Yup.string().required("Name is Required"),
    //   details: Yup.string().required("Details are Required"),
    //   time: Yup.number().required("Time is Required").positive().min(1),
    //   revisions: Yup.number()
    //     .required(" Follow-Up are Required")
    //     .positive()
    //     .min(1),
    //   Price: Yup.number().required("Budget is Required").positive().min(1),
    // }),

     STANDARD: Yup.object({
       name: Yup.string().required("Name is Required"),
       details: Yup.string().required("Details are Required"),
       time: Yup.number().required("days are Required").positive().min(1),
       revisions: Yup.number()
         .required(" Follow-Ups are Required")
         .positive()
         .min(1),
       Price: Yup.number().required("Budget is Required").positive().min(1),
     }),

    //  PREMIUM: Yup.object({
    //    name: Yup.string().required("Name is Required"),
    //    details: Yup.string().required("Details are Required"),
    //    time: Yup.number().required("Time is Required").positive().min(1),
    //    revisions: Yup.number()
    //      .required(" Revisions are Required")
    //      .positive()
    //      .min(1),
    //    Price: Yup.number().required("Price is Required").positive().min(1),
    //  }),
    skills: Yup.array(Yup.string().required("Your Pet Deatils are Required")),
  });

  return (
    <>
      <section className="px-4 mx-auto   max-w-7xl bg-gray-100">

          <div className="-mt-6 sm:mt-0">
            <div className="md:grid md:grid-cols-3 md:gap-6">
              <div className="mt-6 md:mt-0 md:col-span-3">
                <Formik
                  initialValues={formData}
                  onSubmit={onSubmit}
                  validationSchema={validate}
                >
                  {({ values, setFieldValue }) => (
                    <Form>
                      <div className=" mx-auto lg:mx-60 shadow-md overflow-hidden rounded-lg my-auto lg:my-8  ">
                        <div className=" mt-4 sm:mt-0 px-4 py-5 bg-white sm:p-6">
                          <div className="flex flex-col border-0  border-b flex-wrap items-center font-bold text-xl text-gray-700 mb-2">
                            <div className="item mb-2 ">
                              <h3>Create Doctor Request</h3>
                            </div>
                          </div>
                          <div className="flex flex-col flex-wrap items-center font-bold text-lg text-gray-700 mb-2">
                            <div className="item my-2">
                              <h3>Overview</h3>
                            </div>
                          </div>

                          <div className="grid grid-cols-6 gap-4  ">
                            <div className="col-span-6 sm:col-span-4 ">
                              <label
                                htmlFor="title"
                                className="block text-sm font-medium text-gray-700 mb-2"
                              >
                                Breed Name
                              </label>
                              <Field
                                type="text"
                                name="title"
                                placeholder="Ex.Russain Cat"
                                className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage component="p" name="title" />
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-6">
                              <label
                                htmlFor="Category"
                                className="block text-sm font-medium text-gray-700 "
                              >
                                Category
                              </label>
                              <Field
                                component="select"
                                name="Category"
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                              >
                                <option>Please Select</option>
                                <option value="Dogs">
                                Dogs
                                </option>
                                <option value="Cats">
                                  Cats
                                </option>
                                <option value="Birds">Birds</option>
                                <option value="Horses">
                                Horses
                                </option>
                                <option value="Cows and Sheeps">
                                Cows and Sheeps
                                </option>
                                <option value="Wild Cats">
                                Wild Cats
                                </option>
                              </Field>
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage component="p" name="Category" />
                              </div>
                            </div>
                          </div>

                          <FieldArray name="skills">
                            {({ length, remove, push }) => (
                              <div>
                                {values.skills.map((skill, index) => (
                                  <div
                                    key={index}
                                    className=" col-span-6 sm:col-span-6"
                                  >
                                    <div className="flex  flex-row space-x-4 my-4 ">
                                      <div className="item  basis-1/2">
                                        <label
                                          htmlFor={`skills.${index}`}
                                          className=" block text-sm font-medium text-gray-700 my-2"
                                        >
                                          Pet Details
                                        </label>
                                        <Field
                                          name={`skills.${index}`}
                                          placeholder="Pedigree || Non-Pedigree"
                                          type="text"
                                          className="mt-1 w-full focus:ring-orange-500 focus:border-orange-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                                        />

                                        <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                          <ErrorMessage
                                            component="p"
                                            name={`skills.${index}`}
                                          />
                                        </div>
                                      </div>
                                      {values.skills.length > 1 ? (
                                        <div className="flex  space-x-2 mt-6 text-sm grow">
                                          <button
                                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                            type="button"
                                            onClick={() => remove(index)}
                                          >
                                            <svg
                                              className="w-5 h-5"
                                              aria-hidden="true"
                                              fill="currentColor"
                                              viewBox="0 0 20 20"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zM7 9a1 1 0 000 2h6a1 1 0 100-2H7z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          </button>
                                          {values?.skills?.length < 3 && (
                                            <button
                                              className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                              type="button"
                                              onClick={() => push("")}
                                            >
                                              <svg
                                                className="w-5 h-5"
                                                aria-hidden="true"
                                                fill="currentColor"
                                                viewBox="0 0 20 20"
                                              >
                                                <path
                                                  fillRule="evenodd"
                                                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                  clipRule="evenodd"
                                                />
                                              </svg>
                                            </button>
                                          )}
                                        </div>
                                      ) : (
                                        <div className="flex  space-x-2 mt-6 text-sm grow">
                                          <button
                                            className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                            type="button"
                                            onClick={() => push("")}
                                          >
                                            <svg
                                              className="w-5 h-5"
                                              aria-hidden="true"
                                              fill="currentColor"
                                              viewBox="0 0 20 20"
                                            >
                                              <path
                                                fillRule="evenodd"
                                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z"
                                                clipRule="evenodd"
                                              />
                                            </svg>
                                          </button>
                                        </div>
                                      )}
                                    </div>
                                  </div>
                                ))}
                              </div>
                            )}
                          </FieldArray>

                          <div className=" col-span-6 sm:col-span-6 border-b"></div>
                          <div className="grid grid-cols-6 gap-4 ">
                            <div className=" col-span-6 sm:col-span-6 justify-self-center my-2 font-bold text-gray-700 text-lg">
                              <h3>How much can you pay to Doctor</h3>
                            </div>
                            <div className="col-span-6 sm:col-span-6 mb-2">
                              <div className="w-full overflow-hidden border rounded-md shadow-xs">
                                <div className="w-full overflow-x-auto ">
                                  <table className="w-full whitespace-no-wrap">
                                    <thead>
                                      <tr className="text-xs divide-x font-semibold tracking-wide text-left text-gray-500 uppercase border boder-gray-500   bg-gray-100">
                                        {/* <th className="px-4 py-3 ">User Est.Budget</th> */}

                                        <th className="px-4 py-3">User Est.Budget</th>
                                        {/* <th className="px-4 py-3">Premium</th> */}
                                      </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y  ">
                                      <tr className="text-gray-700 divide-x ">
                                        {/* <td className="px-4 py-3 text-sm">
                                          <Field
                                            type="text"
                                            name="BASIC.name"
                                            placeholder="Name of your Pet "
                                            className="mt-1 w-full focus:ring-orange-500 focus:border-orange-500 block  shadow-sm sm:text-sm border-gray-300 rounded-md"
                                          />
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="BASIC.name"
                                            />
                                          </div>
                                        </td> */}
                                        <td className="px-4 py-3 text-sm">
                                          <Field
                                            type="text"
                                            name="STANDARD.name"
                                            placeholder="Name of your Pet"
                                            className="mt-1 w-full focus:ring-orange-500 focus:border-orange-500 block  shadow-sm sm:text-sm border-gray-300 rounded-md"
                                          />
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="STANDARD.name"
                                            />
                                          </div>
                                        </td>
                                        {/* <td className="px-4 py-3 text-xs">
                                          <Field
                                            type="text"
                                            name="PREMIUM.name"
                                            placeholder="Name your package "
                                            className="mt-1 w-full focus:ring-orange-500 focus:border-orange-500 block  shadow-sm sm:text-sm border-gray-300 rounded-md"
                                          />
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="PREMIUM.name"
                                            />
                                          </div>
                                        </td> */}
                                      </tr>
                                      <tr className="text-gray-700 divide-x ">
                                        {/* <td className="px-4 py-3 text-sm">
                                          <Field
                                            type="text"
                                            name="BASIC.details"
                                            placeholder="Since when did you faced problems. "
                                            className="mt-1 w-full focus:ring-orange-500 focus:border-orange-500 block h-20 shadow-sm sm:text-sm border-gray-300 rounded-md"
                                          />
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="BASIC.details"
                                            />
                                          </div>
                                        </td> */}
                                        <td className="px-4 py-3 text-sm">
                                          <Field
                                            type="text"
                                            name="STANDARD.details"
                                            id="standardPackageDetails"
                                            placeholder="Since when did you faced problems. "
                                            className="mt-1  w-full text-left focus:ring-orange-500 focus:border-orange-500 block  shadow-sm h-20 sm:text-sm border-gray-300 rounded-md"
                                          />
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="STANDARD.details"
                                            />
                                          </div>
                                        </td>
                                        {/* <td className="px-4 py-3 text-xs">
                                          <Field
                                            type="text"
                                            name="PREMIUM.details"
                                            placeholder=" Details of your offerings "
                                            className="mt-1 w-full focus:ring-orange-500 focus:border-orange-500 block h-20  shadow-sm sm:text-sm border-gray-300 rounded-md"
                                          />
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="PREMIUM.details"
                                            />
                                          </div>
                                        </td> */}
                                      </tr>
                                      <tr className="text-gray-700 divide-x ">
                                        {/* <td className="px-4 py-3 text-sm">
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <Field
                                              type="number"
                                              name="BASIC.time"
                                              className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                              placeholder="WithIn how many days you want doctor to visit. Ex.3 days"
                                            />
                                            <span className="inline-flex items-center rounded-r-md border border-r-1 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                              days
                                            </span>
                                          </div>
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="BASIC.time"
                                            />
                                          </div>
                                        </td> */}
                                        <td className="px-4 py-3 text-sm">
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <Field
                                              type="number"
                                              name="STANDARD.time"
                                              className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                              placeholder="WithIn how many days you want doctor to visit. Ex.3 days"
                                            />
                                            <span className="inline-flex items-center rounded-r-md border border-r-1 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                              days
                                            </span>
                                          </div>
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="STANDARD.time"
                                            />
                                          </div>
                                        </td>
                                        {/* <td className="px-4 py-3 text-xs">
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <Field
                                              type="number"
                                              name="PREMIUM.time"
                                              className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                              placeholder="2"
                                            />
                                            <span className="inline-flex items-center rounded-r-md border border-r-1 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                              days
                                            </span>
                                          </div>
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="PREMIUM.time"
                                            />
                                          </div>
                                        </td> */}
                                      </tr>

                                      <tr className="text-gray-700 divide-x ">
                                        {/* <td className="px-4 py-3 text-sm">
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <Field
                                              type="number"
                                              name="BASIC.revisions"
                                              className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                              placeholder="how long you want to follow up Doctor, Ex.2 Days"
                                            />
                                            <span className="inline-flex items-center rounded-r-md border border-r-1 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                              Follow Up 
                                            </span>
                                          </div>
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="BASIC.revisions"
                                            />
                                          </div>
                                        </td> */}
                                        <td className="px-4 py-3 text-sm">
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <Field
                                              type="number"
                                              name="STANDARD.revisions"
                                              className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                              placeholder="how long you want to follow up Doctor, Ex.2 Days"
                                            />
                                            <span className="inline-flex items-center rounded-r-md border border-r-1 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                            Follow Up 
                                            </span>
                                          </div>
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="STANDARD.revisions"
                                            />
                                          </div>
                                        </td>
                                        {/* <td className="px-4 py-3 text-xs">
                                          <div className="mt-1 flex rounded-md shadow-sm">
                                            <Field
                                              type="number"
                                              name="PREMIUM.revisions"
                                              className="block w-full flex-1 rounded-none rounded-l-md border-gray-300 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                              placeholder="2"
                                            />
                                            <span className="inline-flex items-center rounded-r-md border border-r-1 border-gray-300 bg-gray-50 px-3 text-sm text-gray-500">
                                              revisions
                                            </span>
                                          </div>
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="PREMIUM.revisions"
                                            />
                                          </div>
                                        </td> */}
                                      </tr>
                                      <tr className="text-gray-700 divide-x ">
                                        {/* <td className="px-4 py-3 text-sm">
                                          <div className="relative mt-1 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                              <span className="text-gray-500 sm:text-sm">
                                                $
                                              </span>
                                            </div>
                                            <Field
                                              type="number"
                                              name="BASIC.Price"
                                              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                              placeholder="User Est.Budget"
                                            />
                                          </div>
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="BASIC.Price"
                                            />
                                          </div>
                                        </td> */}
                                        <td className="px-4 py-3 text-sm">
                                          <div className="relative mt-1 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                              <span className="text-gray-500 sm:text-sm">
                                                $
                                              </span>
                                            </div>
                                            <Field
                                              type="number"
                                              name="STANDARD.Price"
                                              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                              placeholder="User Est.Budget"
                                            />
                                          </div>
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="STANDARD.Price"
                                            />
                                          </div>
                                        </td>
                                        {/* <td className="px-4 py-3 text-xs">
                                          <div className="relative mt-1 rounded-md shadow-sm">
                                            <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                              <span className="text-gray-500 sm:text-sm">
                                                $
                                              </span>
                                            </div>
                                            <Field
                                              type="number"
                                              name="PREMIUM.Price"
                                              className="block w-full rounded-md border-gray-300 pl-7 pr-12 focus:border-orange-500 focus:ring-orange-500 sm:text-sm"
                                              placeholder="Price"
                                            />
                                          </div>
                                          <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                            <ErrorMessage
                                              component="p"
                                              name="PREMIUM.Price"
                                            />
                                          </div>
                                        </td> */}
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>

                            <div className=" col-span-6 sm:col-span-6 border-b"></div>
                            <div className=" col-span-6 sm:col-span-6 justify-self-center font-bold text-gray-700 text-lg ">
                              <h3>Description and Requirements</h3>
                            </div>

                            <div className="col-span-6 sm:col-span-6 ">
                              <label
                                htmlFor="description"
                                className="block text-sm font-medium text-gray-700 my-2"
                              >
                                Description
                              </label>
                              <div className="mt-1">
                                <Field
                                  component="textarea"
                                  rows="5"
                                  name="description"
                                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                  placeholder="briefly describe your Pet and Issues"
                                />
                              </div>
                              <p className="mt-2 text-sm text-gray-500">
                                Min. 100 characters
                              </p>
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage
                                  component="p"
                                  name="description"
                                />
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-6 ">
                              <label
                                htmlFor="requirements"
                                className="block text-sm font-medium text-gray-700 my-2"
                              >
                                Requirements
                              </label>
                              <div className="mt-1">
                                <Field
                                  component="textarea"
                                  rows="5"
                                  name="requirements"
                                  className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                                  placeholder="What are you looking for.."
                                />
                              </div>
                              <p className="mt-2 text-sm text-gray-500">
                                Min. 50 characters
                              </p>
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage
                                  component="p"
                                  name="requirements"
                                />
                              </div>
                            </div>

                            <div className="col-span-6 sm:col-span-4">
                              <label className="block text-sm font-medium text-gray-700 my-2">
                                Pet Image
                              </label>
                              <div className="mt-1 flex justify-center rounded-md border-3 border border-gray-300 px-6 pt-5 pb-6">
                                <div className="space-y-1 text-center">
                                  <img
                                    className="mx-auto text-gray-400"
                                    src={!preview ? gig : preview}
                                    alt="PetImage"
                                  />
                                  <div className="flex text-sm text-gray-600 text-left">
                                    <label
                                      htmlFor="attachments"
                                      className="relative cursor-pointer my-1 rounded-md bg-white font-medium text-orange-600 focus-within:outline-none focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2 hover:text-orange-500"
                                    >
                                      <span>Upload a file</span>
                                      <input
                                        id="attachments"
                                        name="attachments"
                                        type="file"
                                        className="sr-only"
                                        onChange={(event) => {
                                          setFieldValue(
                                            "attachments",
                                            event.target.files[0]
                                          );
                                          setPreview(
                                            URL.createObjectURL(
                                              event.target.files[0]
                                            )
                                          );
                                        }}
                                      />
                                    </label>
                                  </div>
                                  <p className="text-xs text-gray-500 text-left ">
                                    PNG, JPG, GIF up to 10MB
                                  </p>
                                </div>
                              </div>
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage
                                  component="p"
                                  name="attachments"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 ">
                          <button
                            type="submit"
                            className="w-36 inline-flex justify-center py-2 px-4 mr-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                          >
                            Publish
                          </button>
                          <div
                            onClick={handleModal}
                            className="w-36 inline-flex cursor-pointer justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                          >
                            Cancel
                          </div>
                          {modal && (
                            <Modal
                              WarningTitle="Cancel Posting"
                              Description=" Are you sure you want to cancel? All of
                  your filled data will be lost. This action
                  cannot be undone."
                              SuccessText="I am Sure!"
                              FailureText="Cancel"
                              Link="/user/user-dashboard"
                              closeModal={closeModal}
                            />
                          )}
                        </div>
                      </div>
                    </Form>
                  )}
                </Formik>
              </div>
            </div>
          </div>
      </section>
    </>
  );
};

export default AddGigForm;
