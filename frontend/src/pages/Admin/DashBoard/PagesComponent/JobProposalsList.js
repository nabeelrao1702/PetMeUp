import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllJobsProposals,
  DeleteJobProposal,
  getAllUsersReviews,
} from "../../../../redux/actions/AdminActions";
import Pagination from "./Helpers/Pagination";
import Title from "./Helpers/Title";
import EmptyState from "../PagesComponent/Helpers/EmptyState";
import Modal from "./Helpers/Modal";

const JobProposalsList = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { jobProposals, getJobProposalsLoader } = useSelector(
    (state) => state?.adminData
  );
  const reviews = useSelector((state) => state?.adminData?.userReviews);

  useEffect(() => {
    dispatch(getAllJobsProposals(toast));
    dispatch(getAllUsersReviews(toast));
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

  const delJobProposal = (jobProposalId) => {
    dispatch(DeleteJobProposal(jobProposalId, navigate, toast));
    setDeleteModal(false);
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  function hasjobProposals(
    jobProposals,
    indexOfFirstUser,
    indexOfLastUser
  ) {
    const currentjobProposals = jobProposals?.slice(
      indexOfFirstUser,
      indexOfLastUser
    );
    if (currentjobProposals.length > 0) {
      return currentjobProposals;
    } else {
      return [];
    }
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const limitText = (text) => {
    return text && text.split(" ").slice(0, 3).join(" ");
  };

  return (
    <div className="h-full pb-16 overflow-y-auto">
        <div className="container  mx-auto grid">
          <div className="flex flex-row flex-wrap  items-center justify-between mb-4">
            {/* <Title title="All Doctors Proposals" /> */}
            <h2 className="my-2 text-2xl font-semibold text-white bg-black p-1 rounded ">
                All Doctors Proposals
              </h2>
          </div>
          {jobProposals && jobProposals?.length > 0 ? (
            <div className="w-full overflow-hidden rounded-lg shadow-xs">
              <div className="w-full overflow-x-auto">
                <table className="w-full whitespace-no-wrap">
                  <thead>
                    <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border boder-gray-500   bg-gray-100">
                      <th className="px-4 py-3">Title</th>
                      <th className="px-4 py-3">User Name</th>
                      <th className="px-4 py-3">Session Duration</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Actions</th>
                    </tr>
                  </thead>

                  <tbody className="bg-white divide-y ">
                    {hasjobProposals(
                      jobProposals,
                      indexOfFirstUser,
                      indexOfLastUser
                    )?.map &&
                      hasjobProposals(
                        jobProposals,
                        indexOfFirstUser,
                        indexOfLastUser
                      )?.map((jobProposal, index) => (
                        <tr key={index} className="text-gray-700 ">
                          <td className="px-4 py-3">
                            <div className="flex items-center text-sm">
                              <Link
                                to="/admin/proposal-details"
                                className="hover:underline hover:text-orange-600 "
                                state={{ jobProposal }}
                              >
                                <div>
                                  <p className="font-semibold">
                                    {limitText(jobProposal?.job?.title)}..
                                  </p>
                                </div>
                              </Link>
                            </div>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <Link
                              to="/admin/user-details"
                              className="hover:underline hover:text-orange-600"
                              state={{
                                user: jobProposal?.submittedBy,
                                reviews,
                              }}
                            >
                              <div>
                                <p className="font-semibold">
                                  {" "}
                                  {jobProposal?.submittedBy?.firstName}{" "}
                                  {jobProposal?.submittedBy?.lastName}
                                </p>
                              </div>
                            </Link>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            <span className="px-2 py-1  leading-tight  rounded-full ">
                              {jobProposal?.duration} days
                            </span>
                          </td>
                          <td className="px-4 py-3 text-sm">
                            {" "}
                            {jobProposal?.job?.category}
                          </td>
                          <td className="px-4 py-3">
                            <div className="flex items-center space-x-4 text-sm">
                              <button
                                className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                aria-label="Delete"
                                onClick={() =>
                                  handleDeleteModal(jobProposal?._id)
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
                                  comment={"Doctor Proposal"}
                                  message={"Doctor Proposal"}
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
                totalUsers={jobProposals?.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <EmptyState message="No Doctor Proposals To Show" />
            </div>
          )}
        </div>
    </div>
  );
};

export default JobProposalsList;
