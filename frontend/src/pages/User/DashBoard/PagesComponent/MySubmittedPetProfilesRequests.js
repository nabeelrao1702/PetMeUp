import { useEffect, useState } from "react";
import Pagination from "./Helpers/Pagination";
import Title from "./Helpers/Title";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  GetSubmittedPetProfilesRequests,
  DeletePetProfileRequest,
} from "./../../../../redux/actions/UserActions";
import EmptyState from "./Helpers/EmptyState";
import Modal from "./Helpers/Modal";

const MySubmittedPetProfilesRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state?.userData);
  const submittedPetProfilesRequests = useSelector(
    (state) => state?.userData?.submittedRequests?.response
  );

  useEffect(() => {
    dispatch(GetSubmittedPetProfilesRequests(toast));
  }, [dispatch]);

  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(0);
  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setId(id);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const delJobProposal = (proposalId) => {
    dispatch(DeletePetProfileRequest(proposalId, navigate, toast));
    setDeleteModal(false);
  };

  const acceptedProposals =
    (submittedPetProfilesRequests?.filter &&
      submittedPetProfilesRequests?.filter(
        (jobProposal) => jobProposal?.status === 1
      )) ||
    [];

  const rejectedProposals =
    (submittedPetProfilesRequests?.filter &&
      submittedPetProfilesRequests?.filter(
        (jobProposal) => jobProposal?.status === -1
      )) ||
    [];

  const pendingProposals =
    (submittedPetProfilesRequests?.filter &&
      submittedPetProfilesRequests?.filter(
        (jobProposal) => jobProposal?.status === 0
      )) ||
    [];

  const [currentPage, setCurrentPage] = useState(1);
  const [pendingsPerPage] = useState(5);

  // Get pending users
  const indexOfLastPending = currentPage * pendingsPerPage;
  const indexOfFirstPending = indexOfLastPending - pendingsPerPage;

  function hasPendingProposals(
    pendingProposals,
    indexOfFirstPending,
    indexOfLastPending
  ) {
    const currentPendingProposals = pendingProposals?.slice(
      indexOfFirstPending,
      indexOfLastPending
    );
    if (currentPendingProposals.length > 0) {
      return currentPendingProposals;
    } else {
      return [];
    }
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  /* accpted pagination */

  const [currentAcceptedPage, setCurrentAcceptedPage] = useState(1);
  const [acceptedPerPage] = useState(5);

  // Get current users
  const indexOfLastAccepted = currentAcceptedPage * acceptedPerPage;
  const indexOfFirstAccepted = indexOfLastAccepted - acceptedPerPage;

  function hasAcceptedProposals(
    acceptedProposals,
    indexOfFirstAccepted,
    indexOfLastAccepted
  ) {
    const currentAcceptedProposals = acceptedProposals?.slice(
      indexOfFirstAccepted,
      indexOfLastAccepted
    );
    if (currentAcceptedProposals.length > 0) {
      return currentAcceptedProposals;
    } else {
      return [];
    }
  }

  const paginateAccepted = (pageNumber) => setCurrentAcceptedPage(pageNumber);

  /* rejected pagination */

  const [currentRejectedPage, setCurrentRejectedPage] = useState(1);
  const [RejectedPerPage] = useState(5);

  // Get current users
  const indexOfLastRejected = currentRejectedPage * RejectedPerPage;
  const indexOfFirstRejected = indexOfLastRejected - RejectedPerPage;

  function hasRejectedProposals(
    rejectedProposals,
    indexOfFirstRejected,
    indexOfLastRejected
  ) {
    const currentRejectedProposals = rejectedProposals?.slice(
      indexOfFirstRejected,
      indexOfLastRejected
    );
    if (currentRejectedProposals.length > 0) {
      return currentRejectedProposals;
    } else {
      return [];
    }
  }

  const paginateRejected = (pageNumber) => setCurrentRejectedPage(pageNumber);

  return (
    <div className="h-full pb-16 overflow-y-auto">
        <div className="container  mx-auto grid">
          <div className="flex flex-row flex-wrap  items-center justify-between mb-4">
            <Title title="Pending Submitted Pet Matting Requests" />
          </div>
          {pendingProposals && pendingProposals.length > 0 ? (
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border boder-gray-500   bg-gray-100">
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Pet Category</th>
                      <th className="px-4 py-3">Pet Matting Duration</th>
                      <th className="px-4 py-3">Required Pet Breed</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  {pendingProposals && pendingProposals?.length > 0 ? (
                    <tbody className="bg-white divide-y ">
                      {hasPendingProposals(
                        pendingProposals,
                        indexOfFirstPending,
                        indexOfLastPending
                      )?.map &&
                        hasPendingProposals(
                          pendingProposals,
                          indexOfFirstPending,
                          indexOfLastPending
                        )?.map((proposal, index) => (
                          <tr key={index} className="text-gray-700 ">
                            <td className="px-4 py-3">
                              <div className="flex items-center text-sm">
                                <Link
                                  to="/user/submitted-request-details"
                                  className="hover:underline hover:text-orange-600 "
                                  state={{ proposal }}
                                >
                                  <div>
                                    <p className="font-semibold">
                                      {" "}
                                      {proposal?.petProfilesId?.title}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {proposal?.petProfilesId?.offeredSkills}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <p className="text-sm font-semibold ">
                                {proposal?.duration} days
                              </p>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {proposal?.petProfilesId?.requiredSkills}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-4 text-sm">
                                <Link
                                  to="/user/edit-request-form"
                                  state={{ proposal }}
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
                                    handleDeleteModal(proposal._id)
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
                                    del={() => delJobProposal(id)}
                                    comment={"Pet Matting Request"}
                                    message={"Pet Matting Request"}
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  ) : (
                    " No Records Found"
                  )}
                </table>
              </div>
              <Pagination
                usersPerPage={pendingsPerPage}
                totalUsers={pendingProposals?.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <EmptyState message="You don't have any Pending Submitted Pet Matting Requests" />
            </div>
          )}

          <div className="flex flex-row flex-wrap  items-center justify-between mb-4">
            <Title title="Accepted Pet Matting Requests" />
          </div>
          {acceptedProposals && acceptedProposals.length > 0 ? (
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border boder-gray-500   bg-gray-100">
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Pet Category</th>
                      <th className="px-4 py-3">Pet Matting Duration</th>
                      <th className="px-4 py-3">Required Pet Breed</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  {acceptedProposals && acceptedProposals?.length > 0 ? (
                    <tbody className="bg-white divide-y ">
                      {hasAcceptedProposals(
                        acceptedProposals,
                        indexOfFirstAccepted,
                        indexOfLastAccepted
                      )?.map &&
                        hasAcceptedProposals(
                          acceptedProposals,
                          indexOfFirstAccepted,
                          indexOfLastAccepted
                        )?.map((proposal, index) => (
                          <tr key={index} className="text-gray-700 ">
                            <td className="px-4 py-3">
                              <div className="flex items-center text-sm">
                                <Link
                                  to="/user/submitted-request-details"
                                  className="hover:underline hover:text-orange-600 "
                                  state={{ proposal }}
                                >
                                  <div>
                                    <p className="font-semibold">
                                      {" "}
                                      {proposal?.petProfilesId?.title}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {proposal?.petProfilesId?.offeredSkills}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <p className="text-sm font-semibold ">
                                {proposal?.duration} days
                              </p>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {proposal?.petProfilesId?.requiredSkills}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-4 text-sm">
                                <button
                                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Delete"
                                  onClick={() =>
                                    handleDeleteModal(proposal._id)
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
                                    del={() => delJobProposal(id)}
                                    comment={"Pet Matting Request"}
                                    message={"Pet Matting Request"}
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  ) : (
                    " No Records Found"
                  )}
                </table>
              </div>
              <Pagination
                usersPerPage={acceptedPerPage}
                totalUsers={acceptedProposals?.length}
                paginate={paginateAccepted}
                currentPage={currentAcceptedPage}
              />
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <EmptyState message="You don't have any Accepted Pet Matting Requests" />
            </div>
          )}

          <div className="flex flex-row flex-wrap  items-center justify-between mb-4">
            <Title title="Rejected Pet Matting Requests" />
          </div>
          {rejectedProposals && rejectedProposals.length > 0 ? (
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border boder-gray-500   bg-gray-100">
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">Pet Category</th>
                      <th className="px-4 py-3">Pet Matting Duration</th>
                      <th className="px-4 py-3">Required Pet Breed</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
                  {rejectedProposals && rejectedProposals?.length > 0 ? (
                    <tbody className="bg-white divide-y ">
                      {hasRejectedProposals(
                        rejectedProposals,
                        indexOfFirstRejected,
                        indexOfLastRejected
                      )?.map &&
                        hasRejectedProposals(
                          rejectedProposals,
                          indexOfFirstRejected,
                          indexOfLastRejected
                        )?.map((proposal, index) => (
                          <tr key={index} className="text-gray-700 ">
                            <td className="px-4 py-3">
                              <div className="flex items-center text-sm">
                                <Link
                                  to="/user/submitted-request-details"
                                  className="hover:underline hover:text-orange-600 "
                                  state={{ proposal }}
                                >
                                  <div>
                                    <p className="font-semibold">
                                      {" "}
                                      {proposal?.petProfilesId?.title}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {proposal?.petProfilesId?.offeredSkills}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <p className="text-sm font-semibold ">
                                {proposal?.duration} days
                              </p>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {proposal?.petProfilesId?.requiredSkills}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-4 text-sm">
                                <button
                                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Delete"
                                  onClick={() =>
                                    handleDeleteModal(proposal._id)
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
                                    del={() => delJobProposal(id)}
                                    comment={"Pet Matting Request"}
                                    message={"Pet Matting Request"}
                                  />
                                )}
                              </div>
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  ) : (
                    " No Records Found"
                  )}
                </table>
              </div>
              <Pagination
                usersPerPage={RejectedPerPage}
                totalUsers={rejectedProposals?.length}
                paginate={paginateRejected}
                currentPage={currentRejectedPage}
              />
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <EmptyState message="You don't have any Rejected Pet Matting Requests" />
            </div>
          )}
        </div>
    </div>
  );
};

export default MySubmittedPetProfilesRequests;
