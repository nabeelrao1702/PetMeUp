import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Pagination from "./Helpers/Pagination";
import Title from "./Helpers/Title";
import { toast } from "react-toastify";
import { useSelector, useDispatch } from "react-redux";
import {
  GetReceivedPetProfilesRequests,
  acceptPetProfileRequest,
  rejectPetProfileRequest,
} from "../../../../redux/actions/UserActions";
import EmptyState from "./Helpers/EmptyState";

const MyPetProfilesRequests = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading } = useSelector((state) => state?.userData);
  const jobProposals = useSelector(
    (state) => state?.userData?.receivedRequests?.response
  );

  useEffect(() => {
    dispatch(GetReceivedPetProfilesRequests(toast));
  }, [dispatch]);

  const acceptProposal = (proposalId) => {
    dispatch(acceptPetProfileRequest(proposalId, navigate, toast));
  };

  const rejectProposal = (proposalId) => {
    dispatch(rejectPetProfileRequest(proposalId, navigate, toast));
  };

  const acceptedProposals =
    (jobProposals?.filter &&
      jobProposals?.filter((jobProposal) => jobProposal?.status === 1)) ||
    [];

  const rejectedProposals =
    (jobProposals?.filter &&
      jobProposals?.filter((jobProposal) => jobProposal?.status === -1)) ||
    [];

  const pendingProposals =
    (jobProposals?.filter &&
      jobProposals?.filter((jobProposal) => jobProposal?.status === 0)) ||
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

  const limitText = (text, char) => {
    return text && text.split(" ").slice(0, char).join(" ");
  };

  return (
    <div className="h-full pb-16 overflow-y-auto">
        <div className="container  mx-auto grid">
          <div className="flex flex-row flex-wrap  items-center justify-between mb-4">
            <Title title="Pending Pet Matting Requests" />
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
                      <th className="px-4 py-3">Requried Pet Breed</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>
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
                                to="/user/received-request-details"
                                className="hover:underline hover:text-orange-600 "
                                state={{ proposal }}
                              >
                                <div>
                                  <p className="font-semibold">
                                    {" "}
                                    {limitText(
                                      proposal?.petProfilesId?.title,
                                      5
                                    )}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {proposal?.petProfilesId?.offeredSkills}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <p className="text-sm  ">
                              {proposal?.duration} days
                            </p>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {proposal?.petProfilesId?.requiredSkills}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-4 text-sm">
                              <button
                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-orange-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                aria-label="Edit"
                                onClick={() => acceptProposal(proposal._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M19.916 4.626a.75.75 0 01.208 1.04l-9 13.5a.75.75 0 01-1.154.114l-6-6a.75.75 0 011.06-1.06l5.353 5.353 8.493-12.739a.75.75 0 011.04-.208z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>

                              <button
                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                aria-label="Delete"
                                onClick={() => rejectProposal(proposal._id)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  className="w-6 h-6"
                                >
                                  <path
                                    fillRule="evenodd"
                                    d="M5.47 5.47a.75.75 0 011.06 0L12 10.94l5.47-5.47a.75.75 0 111.06 1.06L13.06 12l5.47 5.47a.75.75 0 11-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 01-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 010-1.06z"
                                    clipRule="evenodd"
                                  />
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                  </tbody>
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
              <EmptyState message="You don't have any Pending Pet Matting Requests" />
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
                    </tr>
                  </thead>
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
                                to="/user/received-request-details"
                                className="hover:underline hover:text-orange-600 "
                                state={{ proposal }}
                              >
                                <div>
                                  <p className="font-semibold">
                                    {" "}
                                    {limitText(
                                      proposal?.petProfilesId?.title,
                                      5
                                    )}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {proposal?.petProfilesId?.offeredSkills}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <p className="text-sm ">
                              {proposal?.duration} days
                            </p>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {proposal?.petProfilesId?.requiredSkills}
                          </td>
                        </tr>
                      ))}
                  </tbody>
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
                    </tr>
                  </thead>
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
                                to="/user/received-request-details"
                                className="hover:underline hover:text-orange-600 "
                                state={{ proposal }}
                              >
                                <div>
                                  <p className="font-semibold">
                                    {" "}
                                    {limitText(
                                      proposal?.petProfilesId?.title,
                                      5
                                    )}
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {proposal?.petProfilesId?.offeredSkills}
                          </td>
                          <td className="px-4 py-3 text-xs">
                            <p className="text-sm ">
                              {proposal?.duration} days
                            </p>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {proposal?.petProfilesId?.requiredSkills}
                          </td>
                        </tr>
                      ))}
                  </tbody>
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

export default MyPetProfilesRequests;
