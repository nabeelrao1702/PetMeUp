import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Pagination from "./Helpers/Pagination";
import Title from "./Helpers/Title";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import {
  GetMyPetProfiles,
  DeletePetProfile,
} from "../../../../redux/actions/UserActions";
import { GetReviews } from "./../../../../redux/actions/UserActions";
import EmptyState from "./Helpers/EmptyState";
import Modal from "./Helpers/Modal";

const PetProfiles = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const freeuserId = useSelector((state) => state.userData.freeuserInfo._id);
  const myPetProfiles = useSelector(
    (state) => state?.userData?.myPetProfiles
  );
  const { loading } = useSelector((state) => state?.userData);
  const reviews = useSelector((state) => state?.userData?.reviews);

  useEffect(() => {
    dispatch(GetMyPetProfiles(toast));
    dispatch(GetReviews(freeuserId, toast));
  }, [dispatch, freeuserId]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(0);
  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setId(id);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const deletePetProfile = (petProfileId) => {
    dispatch(DeletePetProfile(petProfileId, navigate, toast));
    setDeleteModal(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  function hasPetProfiles(
    petProfilesList,
    indexOfFirstUser,
    indexOfLastUser
  ) {
    const currentPetProfiles = petProfilesList?.slice(
      indexOfFirstUser,
      indexOfLastUser
    );
    if (currentPetProfiles.length > 0) {
      return currentPetProfiles;
    } else {
      return [];
    }
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const limitText = (text, char) => {
    return text && text.split(" ").slice(0, char).join(" ");
  };

  return (
    <div className="h-full pb-16 overflow-y-auto">
    <div className="container mx-auto grid">
      <div className="flex flex-row flex-wrap items-center justify-between my-4">
        <Title title="Your Pet Profiles" />
            <Link to="/user/pet-profiles/add">
              <button className=" h-8 flex items-center mr-2  justify-between px-2 py-1 text-sm font-medium leading-5 text-white transition-colors duration-150 bg-orange-600 border border-transparent rounded-md active:bg-orange-600 hover:bg-orange-700 focus:outline-none focus:shadow-outline-orange">
                <svg
                  className="w-4 h-4 mr-2 -ml-1"
                  fill="currentColor"
                  aria-hidden="true"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
                    clipRule="evenodd"
                  />
                </svg>

                <span>Add a Pet Profile</span>
              </button>
            </Link>
          </div>

          {myPetProfiles && myPetProfiles.length > 0 ? (
            <div className="w-full overflow-hidden rounded-lg shadow-md hover:shadow-lg transition duration-300 ease-in-out">
            <div className="w-full overflow-x-auto">
              <table className="w-full whitespace-no-wrap">
                  <thead>
                  <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border boder-gray-500 bg-gray-100">
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Pet Category</th>
                      <th className="px-4 py-3">Description</th>
                      <th className="px-4 py-3">Required Pet Breed</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y ">
                    {hasPetProfiles(
                      myPetProfiles,
                      indexOfFirstUser,
                      indexOfLastUser
                    )?.map &&
                      hasPetProfiles(
                        myPetProfiles,
                        indexOfFirstUser,
                        indexOfLastUser
                      )?.map((myPetProfile, index) => (
                        <tr key={index} className="text-gray-700 ">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <Link
                                to="/user/pet-profiles/my-pet-profiles-details"
                                className="hover:underline hover:text-orange-600"
                                state={{
                                  singlePetProfile: myPetProfile,
                                  reviews,
                                }}
                              >
                                <div>
                                  <p className="font-semibold">
                                    {limitText(myPetProfile?.title, 5)}..
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {myPetProfile?.offeredSkills}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <p className="text-sm ">
                              {limitText(myPetProfile?.discription, 6)}..
                            </p>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {myPetProfile?.requiredSkills}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-4 text-sm">
                              <Link
                                to="/user/pet-profiles/edit"
                                state={{ myPetProfile }}
                              >
                                <button
                                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-blue-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Edit"
                                >
                                  <svg
                                    className="w-5 h-5"
                                    aria-hidden="true"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                  >
                                    <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z"></path>
                                  </svg>
                                </button>
                              </Link>
                              <button
                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                aria-label="Delete"
                                onClick={() =>
                                  handleDeleteModal(myPetProfile._id)
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
                                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                                    clipRule="evenodd"
                                  ></path>
                                </svg>
                              </button>
                              {deleteModal && (
                                <Modal
                                  closeDeleteModal={closeDeleteModal}
                                  del={() => deletePetProfile(id)}
                                  comment={"Pet Profile"}
                                  message={"Pet Profile"}
                                />
                              )}
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
              <Pagination
                usersPerPage={usersPerPage}
                totalUsers={myPetProfiles?.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <EmptyState message="You don't have any Pet Profiles" />
            </div>
          )}
        </div>
    </div>
  );
};

export default PetProfiles;
