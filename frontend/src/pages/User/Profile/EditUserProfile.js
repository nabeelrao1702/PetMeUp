import { useState } from "react";
import { Formik, Form, Field, ErrorMessage, FieldArray } from "formik";
import * as Yup from "yup";
import Modal from "./Modal";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { CreateUserProfile } from "../../../redux/actions/UserActions";
import profile from "../../../img/profile.jpg";

const EditUserProfile = () => {
  const freeuserId = useSelector((state) => state.userData.freeuserInfo._id);
  const { loading } = useSelector((state) => state?.userData);
  const freeuserInfo = useSelector((state) => state.userData.freeuserInfo);

  const {
    phoneNumber,
    gender,
    languages,
    photo,
    address,
    Education,
    Description,
    Title,
    Category,
    Skills,
  } = freeuserInfo;

  const display = photo ? photo : profile;
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [modal, setModal] = useState(false);
  const [preview, setPreview] = useState(display);
  const handleModal = () => {
    setModal(true);
  };

  const closeModal = () => {
    setModal(false);
  };

  const photoUrl = fetch(display)
    .then((response) => response.blob())
    .then((blob) => {
      // Create a file object from the blob
      const file = new File([blob], "photo.jpg", { type: "image/jpeg" });

      formData.photo = file;
    });

  const formData = {
    Title: Title,
    photo: photoUrl,
    Description: Description,
    gender: gender,
    Category: Category,
    languages:
      languages?.length === 0 ? [{ language: "", proficiency: "" }] : languages,
    Education: Education?.length === 0 ? [{ degree: "", year: "" }] : Education,
    Skills: Skills?.length === 0 ? [{ skill: "", level: "" }] : Skills,
    phoneNumber: phoneNumber,
    address: {
      country: address?.country,
      city: address?.city,
      zipCode: address?.zipCode,
      streetAddress: address?.streetAddress,
      province: address?.province,
    },
  };

  const onSubmit = async (formValues) => {
    dispatch(CreateUserProfile(freeuserId, formValues, navigate, toast));
  };

  const validate = Yup.object({
    photo: Yup.mixed().required("Photo is Required"),
    gender: Yup.string().required("Gender is Required"),
    Title: Yup.string().required("Title is Required"),
    Description: Yup.string()
      .min(50, "Description must have at least 50 words")
      .required("Description is Required"),
    Category: Yup.string().required("Services is Required"),
    address: Yup.object({
      country: Yup.string().required("Country is Required"),
      zipCode: Yup.string()
        .matches(/^[0-9]{5}$/, "Zip code must be 5 digits")
        .required("Zip code is required"),
      city: Yup.string().required("City is Required"),
      streetAddress: Yup.string().required("Street Address is Required"),
      province: Yup.string().required("Province is Required"),
    }),
    phoneNumber: Yup.string()
      .matches(/^[0-9]{11}$/, "Phone number must be 11 digits")
      .required("Phone number is required"),
    languages: Yup.array(
      Yup.object({
        language: Yup.string().required("Language is Required"),
        proficiency: Yup.string().required("Proficiency level is Required"),
      })
    ),
    Education: Yup.array(
      Yup.object({
        degree: Yup.string().required("Degree is Required"),
        year: Yup.string().required("Year of Degree is Required"),
      })
    ),
    Skills: Yup.array(
      Yup.object({
        skill: Yup.string().required("Achievement is Required"),
        level: Yup.string().required("Positon is Required"),
      })
    ),
  });

  return (
    <>
      <>
        <Formik
          initialValues={formData}
          onSubmit={onSubmit}
          validationSchema={validate}
        >
          {({ values, setFieldValue }) => (
            <Form className="mb-12">
              <div className=" mt-4 sm:mt-0 px-4 py-5 bg-white sm:p-6 ">
                <div className="flex flex-col border-0  border-b flex-wrap items-center font-bold text-xl text-gray-700 mb-2">
                  <div className="item my-2 ">
                    <h3>Edit Profile</h3>
                  </div>
                </div>
                <div className="flex flex-col flex-wrap items-center font-bold text-lg text-gray-700 mb-2">
                  <div className="item my-2 ">
                    <h3>Personal Information</h3>
                  </div>
                </div>
                <div className="grid grid-cols-6 gap-4 ">
                  <div className="col-span-6 sm:col-span-4 ">
                    <label
                      htmlFor="Title"
                      className="block text-sm font-medium text-gray-700 mb-2"
                    >
                      Title
                    </label>
                    <Field
                      type="text"
                      name="Title"
                      placeholder="Exortic Pet Lover || Non-Exortic Pet Lover "
                      className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage component="p" name="Title" />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-6 ">
                    <label
                      htmlFor="Description"
                      className="block text-sm font-medium text-gray-700 my-2"
                    >
                      Description
                    </label>
                    <div className="mt-1">
                      <Field
                        type="text"
                        name="Description"
                        className="shadow-sm focus:ring-orange-500 focus:border-orange-500 mt-1 block w-full sm:text-sm border border-gray-300 rounded-md"
                        placeholder="Tell us more about yourself"
                      />
                    </div>
                    <p className="mt-2 text-sm text-gray-500">
                      Min. 50 characters
                    </p>
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage component="p" name="Description" />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-medium text-gray-700 my-2"
                    >
                      Profile Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <span className="inline-block h-24 w-24 rounded-full overflow-hidden bg-gray-100">
                        <img
                          className="w-24 h-24 rounded-full"
                          src={preview}
                          alt="profile-avatar"
                        />
                      </span>

                      <label
                        htmlFor="photo"
                        className="ml-5 cursor-pointer py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                      >
                        <span>Upload a file</span>
                        <input
                          id="photo"
                          name="photo"
                          type="file"
                          className="sr-only"
                          onChange={(event) => {
                            setFieldValue("photo", event.target.files[0]);
                            setPreview(
                              URL.createObjectURL(event.target.files[0])
                            );
                          }}
                        />
                      </label>
                    </div>
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage component="p" name="photo" />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-6 ">
                    <label className="block text-sm font-medium text-gray-700 my-2">
                      Gender
                    </label>
                    <div className="flex flex-wrap">
                      <div className="flex items-center mr-4">
                        <Field
                          type="radio"
                          name="gender"
                          value="male"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 "
                        />
                        <label
                          htmlFor="male"
                          className="ml-2 text-sm font-medium text-gray-700 "
                        >
                          Male
                        </label>
                      </div>
                      <div className="flex items-center mr-4">
                        <Field
                          type="radio"
                          name="gender"
                          value="female"
                          className="w-4 h-4 text-pink-600 bg-gray-100 border-gray-300 focus:ring-pink-500"
                        />
                        <label
                          htmlFor="female"
                          className="ml-2 text-sm font-medium text-gray-700 "
                        >
                          Female
                        </label>
                      </div>
                    </div>
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage component="p" name="gender" />
                    </div>
                  </div>
                </div>
                <div className=" col-span-6 sm:col-span-6  font-semibold text-gray-700 my-4 ">
                  <h3>Languages</h3>
                </div>
                <FieldArray name="languages">
                  {({ length, remove, push }) => (
                    <div>
                      {values.languages.map((language, index) => (
                        <div
                          key={index}
                          className=" col-span-6 sm:col-span-6"
                        >
                          <div className="flex  flex-row space-x-4 ">
                            <div className="item  basis-1/2">
                              <label
                                htmlFor={`languages.${index}.language`}
                                className=" block text-sm font-medium text-gray-700 my-2"
                              >
                                Language
                              </label>
                              <Field
                                component="select"
                                name={`languages.${index}.language`}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                              >
                                <option>Please Select</option>
                                <option value="English">English</option>
                                <option value="Urdu">Urdu</option>
                              </Field>
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage
                                  component="p"
                                  name={`languages.${index}.language`}
                                />
                              </div>
                            </div>
                            <div className="item basis-1/2">
                              <label
                                htmlFor={`languages.${index}.proficiency`}
                                className=" block text-sm font-medium text-gray-700 my-2"
                              >
                                Proficiency
                              </label>
                              <Field
                                component="select"
                                name={`languages.${index}.proficiency`}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                              >
                                <option>Please Select</option>
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">
                                  Intermediate
                                </option>
                                <option value="Fluent">Fluent</option>
                              </Field>
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage
                                  component="p"
                                  name={`languages.${index}.proficiency`}
                                />
                              </div>
                            </div>
                            {values.languages.length > 1 ? (
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
                                {values?.languages?.length < 2 && (
                                  <button
                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                    type="button"
                                    onClick={() =>
                                      push({ language: "", proficiency: "" })
                                    }
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
                                  onClick={() =>
                                    push({ language: "", proficiency: "" })
                                  }
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

                <div className=" col-span-6 sm:col-span-6 border-b my-4"></div>
                <div className="grid grid-cols-6 gap-4  ">
                  <div className=" col-span-6 sm:col-span-6 justify-self-center font-bold text-gray-700 text-lg">
                    <h3>Professional Information</h3>
                  </div>
                  <div className="col-span-6 sm:col-span-6">
                    <label
                      htmlFor="Category"
                      className="block text-sm font-medium text-gray-700 "
                    >
                      Services
                    </label>
                    <Field
                      component="select"
                      name="Category"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    >
                      <option>Please Select</option>
                      <option value="Home Pet owner">
                        Home Pet owner
                      </option>
                      <option value="Market Pet Breeder">
                        Market Pet Breeder
                      </option>
                      <option value="Pet Lover">Pet Lover</option>

                    </Field>
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage component="p" name="Category" />
                    </div>
                  </div>
                </div>
                <div className=" col-span-6 sm:col-span-6  font-semibold text-gray-700 my-4 ">
                  <h3>Level of Education</h3>
                </div>

                <FieldArray name="Education">
                  {({ length, remove, push }) => (
                    <div>
                      {values.Education.map((education, index) => (
                        <div
                          key={index}
                          className=" col-span-6 sm:col-span-6"
                        >
                          <div className="flex  flex-row space-x-4 ">
                            <div className="item  basis-1/2">
                              <label
                                htmlFor={`Education.${index}.degree`}
                                className=" block text-sm font-medium text-gray-700 my-2"
                              >
                                Degree
                              </label>
                              <Field
                                name={`Education.${index}.degree`}
                                placeholder="Software Engineering"
                                type="text"
                                className="mt-1 w-full focus:ring-orange-500 focus:border-orange-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage
                                  component="p"
                                  name={`Education.${index}.degree`}
                                />
                              </div>
                            </div>
                            <div className="item basis-1/2">
                              <label
                                htmlFor={`Education.${index}.year`}
                                className=" block text-sm font-medium text-gray-700 my-2"
                              >
                                Year
                              </label>
                              <Field
                                name={`Education.${index}.year`}
                                placeholder="2023"
                                type="text"
                                className="mt-1 w-full focus:ring-orange-500 focus:border-orange-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage
                                  component="p"
                                  name={`Education.${index}.year`}
                                />
                              </div>
                            </div>
                            {values.Education.length > 1 ? (
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
                                {values.Education.length < 2 && (
                                  <button
                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                    type="button"
                                    onClick={() =>
                                      push({ degree: "", year: "" })
                                    }
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

                              </div>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </FieldArray>
                <div className=" col-span-6 sm:col-span-6  font-semibold text-gray-700 my-4 ">
                  <h3>Your Pet Achievements</h3>
                </div>

                <FieldArray name="Skills">
                  {({ length, remove, push }) => (
                    <div>
                      {values.Skills.map((skill, index) => (
                        <div
                          key={index}
                          className=" col-span-6 sm:col-span-6"
                        >
                          <div className="flex  flex-row space-x-4 ">
                            <div className="item  basis-1/2">
                              <label
                                htmlFor={`Skills.${index}.skill`}
                                className=" block text-sm font-medium text-gray-700 my-2"
                              >
                                Achievements
                              </label>
                              <Field
                                name={`Skills.${index}.skill`}
                                placeholder="awards"
                                type="text"
                                className="mt-1 w-full focus:ring-orange-500 focus:border-orange-500 block shadow-sm sm:text-sm border-gray-300 rounded-md"
                              />
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage
                                  component="p"
                                  name={`Skills.${index}.skill`}
                                />
                              </div>
                            </div>
                            <div className="item basis-1/2">
                              <label
                                htmlFor={`Skills.${index}.level`}
                                className=" block text-sm font-medium text-gray-700 my-2"
                              >
                                Position
                              </label>
                              <Field
                                component="select"
                                name={`Skills.${index}.level`}
                                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                              >
                                <option>Please Select</option>
                                <option value="Top Position">Top Position</option>
                                <option value="Second Position">
                                  Second Position
                                </option>
                                <option value="Third Positon">Third Postition</option>
                                <option value="Participated">Participated</option>
                              </Field>
                              <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                                <ErrorMessage
                                  component="p"
                                  name={`Skills.${index}.level`}
                                />
                              </div>
                            </div>
                            {values.Skills.length > 1 ? (
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
                                {values?.Skills?.length < 3 && (
                                  <button
                                    className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                    type="button"
                                    onClick={() =>
                                      push({ skill: "", level: "" })
                                    }
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
                                  onClick={() =>
                                    push({ skill: "", level: "" })
                                  }
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

                <div className=" col-span-6 sm:col-span-6 border-b my-4"></div>
                <div className="grid grid-cols-6 gap-4 ">
                  <div className=" col-span-6 sm:col-span-6 justify-self-center font-bold text-gray-700 text-lg ">
                    <h3>Address</h3>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="address.country"
                      className="block text-sm font-medium text-gray-700 "
                    >
                      Country
                    </label>
                    <Field
                      component="select"
                      name="address.country"
                      className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm"
                    >
                      <option>Please Select</option>
                      <option value="Pakistan">Pakistan</option>
                      {/* <option value="Multan ">Multan </option>
                        <option value="Islamabad">Islamabad</option> */}
                    </Field>
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage component="p" name="address.country" />
                    </div>
                  </div>

                  <div className="col-span-6">
                    <label
                      htmlFor="address.streetAddress"
                      className="block text-sm font-medium text-gray-700 my-2"
                    >
                      Street address
                    </label>
                    <Field
                      type="text"
                      name="address.streetAddress"
                      placeholder="Ex. mohalla rajput fatehpur "
                      className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage
                        component="p"
                        name="address.streetAddress"
                      />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-6 lg:col-span-2">
                    <label
                      htmlFor="address.city"
                      className="block text-sm font-medium text-gray-700 my-2"
                    >
                      City
                    </label>
                    <Field
                      type="text"
                      name="address.city"
                      placeholder="Ex.Multan "
                      className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage component="p" name="address.city" />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="address.province"
                      className="block text-sm font-medium text-gray-700 my-2"
                    >
                      State / Province
                    </label>
                    <Field
                      type="text"
                      name="address.province"
                      placeholder="Ex.Province"
                      className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage component="p" name="address.province" />
                    </div>
                  </div>

                  <div className="col-span-6 sm:col-span-3 lg:col-span-2">
                    <label
                      htmlFor="address.zipCode"
                      className="block text-sm font-medium text-gray-700 my-2"
                    >
                      ZIP / Postal code
                    </label>
                    <Field
                      type="text"
                      name="address.zipCode"
                      placeholder="Ex.38000"
                      className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage component="p" name="address.zipCode" />
                    </div>
                  </div>
                  <div className="col-span-6 sm:col-span-3">
                    <label
                      htmlFor="phoneNumber"
                      className="block text-sm font-medium text-gray-700 my-2"
                    >
                      Phone Number
                    </label>
                    <Field
                      type="text"
                      name="phoneNumber"
                      placeholder="Ex.0308-0722833"
                      className="mt-1 focus:ring-orange-500 focus:border-orange-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md"
                    />
                    <div className="mt-2 text-sm text-red-600 dark:text-red-500">
                      <ErrorMessage component="p" name="phoneNumber" />
                    </div>
                  </div>
                </div>
              </div>
              <div className="px-4 py-3 bg-gray-50 text-right sm:px-6 ">
                <button
                  type="submit"
                  className="w-36 inline-flex justify-center py-2 px-4 mr-8 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-orange-600 hover:bg-orange-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-500"
                >
                  Update
                </button>
                <div
                  onClick={handleModal}
                  className="w-36 inline-flex cursor-pointer justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Cancel
                </div>
                {modal && (
                  <Modal
                    WarningTitle="Cancel Form Submission"
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
            </Form>
          )}
        </Formik>
      </>
    </>
  );
};

export default EditUserProfile;
