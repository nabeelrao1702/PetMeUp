import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  getAllOrders,
  DeleteOrder,
} from "../../../../redux/actions/AdminActions";
import Pagination from "./Helpers/Pagination";
import Title from "./Helpers/Title";
import EmptyState from "../PagesComponent/Helpers/EmptyState";
import Modal from "./Helpers/Modal";

const AllOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, ordersLoading } = useSelector((state) => state?.adminData);

  const [deleteModal, setDeleteModal] = useState(false);
  const [id, setId] = useState(0);
  const handleDeleteModal = (id) => {
    setDeleteModal(true);
    setId(id);
  };

  const closeDeleteModal = () => {
    setDeleteModal(false);
  };

  const [deleteJobModal, setDeleteJobModal] = useState(false);

  const handleDeleteJobModal = (id) => {
    setDeleteJobModal(true);
    setId(id);
  };

  const closeDeleteJobModal = () => {
    setDeleteJobModal(false);
  };

  const [deletePetProfilesModal, setDeletePetProfilesModal] =
    useState(false);

  const handleDeletePetProfilesModal = (id) => {
    setDeletePetProfilesModal(true);
    setId(id);
  };

  const closeDeletePetProfilesModal = () => {
    setDeletePetProfilesModal(false);
  };

  const delOrder = (orderId) => {
    dispatch(DeleteOrder(orderId, navigate, toast));
    setDeleteModal(false);
    setDeleteJobModal(false);
    setDeletePetProfilesModal(false);
  };

  useEffect(() => {
    dispatch(getAllOrders(toast));
  }, [dispatch]);

  const gigOrders =
    (orders?.filter && orders?.filter((order) => order?.type === "gig")) || [];
  const jobOrders =
    (orders?.filter && orders?.filter((job) => job?.type === "job")) || [];
  const petProfilesOrders =
    (orders?.filter &&
      orders?.filter(
        (petprofile) => petprofile?.type === "PetProfiles"
      )) ||
    [];

  const dateConverter = (createdAt) => {
    const userCreatedDate = new Date(createdAt);
    var months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    var month = months[userCreatedDate.getMonth()];
    var year = userCreatedDate.getFullYear();
    var date = userCreatedDate.getDate();

    return `${month} ${date} ${year} `;
  };

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  function hasgigOrders(
    gigOrders,
    indexOfFirstUser,
    indexOfLastUser
  ) {
    const currentgigOrders = gigOrders?.slice(
      indexOfFirstUser,
      indexOfLastUser
    );
    if (currentgigOrders.length > 0) {
      return currentgigOrders;
    } else {
      return [];
    }
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  /* job orders pagination */

  const [currentjobOrderPage, setCurrentJobOrderPage] = useState(1);
  const [jobOrdersPerPage] = useState(5);

  // Get current users
  const indexOfLastJobOrder = currentjobOrderPage * jobOrdersPerPage;
  const indexOfFirstJobOrder = indexOfLastJobOrder - jobOrdersPerPage;

  function hasjobOrders(jobOrders, indexOfFirstJobOrder, indexOfLastJobOrder) {
    const currentjobOrders = jobOrders?.slice(
      indexOfFirstJobOrder,
      indexOfLastJobOrder
    );
    if (currentjobOrders.length > 0) {
      return currentjobOrders;
    } else {
      return [];
    }
  }

  const paginateJobOrder = (pageNumber) => setCurrentJobOrderPage(pageNumber);

  /* petprofiles Orders */

  /* job orders pagination */

  const [currentPetProfilesOrderPage, setCurrentPetProfilesOrder] =
    useState(1);
  const [petProfilesOrderPerPage] = useState(5);

  // Get current users
  const indexOfLastPetProfilesOrder =
    currentPetProfilesOrderPage * petProfilesOrderPerPage;
  const indexOfFirstPetProfilesOrder =
    indexOfLastPetProfilesOrder - petProfilesOrderPerPage;

  function hasPetProfilesOrders(
    petProfilesOrders,
    indexOfFirstPetProfilesOrder,
    indexOfLastPetProfilesOrder
  ) {
    const currentPetProfilesOrder = petProfilesOrders?.slice(
      indexOfFirstPetProfilesOrder,
      indexOfLastPetProfilesOrder
    );
    if (currentPetProfilesOrder.length > 0) {
      return currentPetProfilesOrder;
    } else {
      return [];
    }
  }

  const paginatePetProfilesOrder = (pageNumber) =>
    setCurrentPetProfilesOrder(pageNumber);

  return (
    <div>
        <div className="h-full pb-16 overflow-y-auto">
          <div className="container  mx-auto grid">
            <div className="flex flex-row flex-wrap  items-center justify-between mb-4">
              {/* <Title title="All Doctor Requests " /> */}
              <h2 className="my-2 text-2xl font-semibold text-white bg-black p-1 rounded ">
            All Doctor Requests
              </h2>
            </div>
            {gigOrders && gigOrders.length > 0 ? (
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border boder-gray-500   bg-gray-100">
                        <th className="px-4 py-3">Id</th>
                        <th className="px-4 py-3">User Name</th>
                        <th className="px-4 py-3">Doctor Name</th>
                        <th className="px-4 py-3">Order Expiry</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y ">
                      {hasgigOrders(
                        gigOrders,
                        indexOfFirstUser,
                        indexOfLastUser
                      )?.map &&
                        hasgigOrders(
                          gigOrders,
                          indexOfFirstUser,
                          indexOfLastUser
                        )?.map((gigOrder, index) => (
                          <tr key={index} className="text-gray-700 ">
                            <td className="px-4 py-3">
                              <div className="flex items-center text-sm">
                                <Link
                                  to="/admin/gig-order-details"
                                  className="hover:underline hover:text-orange-600 "
                                  state={{ gigOrder }}
                                >
                                  <div>
                                    <p className="font-semibold">
                                      {gigOrder?._id}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {gigOrder?.user?.firstName}{" "}
                              {gigOrder?.user?.lastName}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <p className="text-sm  ">
                                {gigOrder?.doctor?.firstName}{" "}
                                {gigOrder?.doctor?.lastName}
                              </p>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {dateConverter(gigOrder.OrderExp)}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-4 text-sm">
                                <button
                                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Delete"
                                  onClick={() =>
                                    handleDeleteModal(gigOrder?._id)
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
                                    del={() => delOrder(id)}
                                    comment={"Doctor Request"}
                                    message={"Doctor Request"}
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
                  totalUsers={gigOrders?.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <EmptyState message="No Doctor Requests To Show" />
              </div>
            )}
          </div>

          <div className="container  mx-auto grid">
            <div className="flex flex-row flex-wrap  items-center justify-between mb-4">
              <Title title="All Doctors Available" />
            </div>
            {jobOrders && jobOrders.length > 0 ? (
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border boder-gray-500   bg-gray-100">
                        <th className="px-4 py-3">Id</th>
                        <th className="px-4 py-3">Doctor Name</th>
                        <th className="px-4 py-3">User Name</th>
                        <th className="px-4 py-3">Proposal</th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y ">
                      {hasjobOrders(
                        jobOrders,
                        indexOfFirstJobOrder,
                        indexOfLastJobOrder
                      )?.map &&
                        hasjobOrders(
                          jobOrders,
                          indexOfFirstJobOrder,
                          indexOfLastJobOrder
                        )?.map((jobOrder, index) => (
                          <tr key={index} className="text-gray-700 ">
                            <td className="px-4 py-3">
                              <div className="flex items-center text-sm">
                                <Link
                                  to="/admin/job-order-details"
                                  className="hover:underline hover:text-orange-600 "
                                  state={{ jobOrder }}
                                >
                                  <div>
                                    <p className="font-semibold">
                                      {jobOrder?._id}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {jobOrder?.doctor?.firstName}{" "}
                              {jobOrder?.doctor?.lastName}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <p className="text-sm  ">
                                {jobOrder?.user?.firstName}{" "}
                                {jobOrder?.user?.lastName}
                              </p>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {jobOrder?.jobOrderType?._id}
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-4 text-sm">
                                <button
                                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Delete"
                                  onClick={() =>
                                    handleDeleteJobModal(jobOrder?._id)
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
                                {deleteJobModal && (
                                  <Modal
                                    closeDeleteModal={closeDeleteJobModal}
                                    del={() => delOrder(id)}
                                    comment={"Doctor Available"}
                                    message={"Doctor Available"}
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
                  usersPerPage={jobOrdersPerPage}
                  totalUsers={jobOrders?.length}
                  paginate={paginateJobOrder}
                  currentPage={currentjobOrderPage}
                />
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <EmptyState message="No Doctor Available To Show" />
              </div>
            )}
          </div>

          <div className="container  mx-auto grid">
            <div className="flex flex-row flex-wrap  items-center justify-between mb-4">
              <Title title="All Pet Matting Profiles" />
            </div>
            {petProfilesOrders && petProfilesOrders.length > 0 ? (
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border boder-gray-500   bg-gray-100">
                        <th className="px-4 py-3">Id</th>
                        <th className="px-4 py-3">User 1 Name</th>
                        <th className="px-4 py-3">User 2 Name</th>
                        <th className="px-4 py-3">Request </th>
                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>

                    <tbody className="bg-white divide-y ">
                      {hasPetProfilesOrders(
                        petProfilesOrders,
                        indexOfFirstPetProfilesOrder,
                        indexOfLastPetProfilesOrder
                      )?.map &&
                        hasPetProfilesOrders(
                          petProfilesOrders,
                          indexOfFirstPetProfilesOrder,
                          indexOfLastPetProfilesOrder
                        )?.map((petProfilesOrder, index) => (
                          <tr key={index} className="text-gray-700 ">
                            <td className="px-4 py-3">
                              <div className="flex items-center text-sm">
                                <Link
                                  to="/admin/pet-profile-order-details"
                                  className="hover:underline hover:text-orange-600 "
                                  state={{ petProfilesOrder }}
                                >
                                  <div>
                                    <p className="font-semibold">
                                      {petProfilesOrder?._id}
                                    </p>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {petProfilesOrder?.user?.firstName}{" "}
                              {petProfilesOrder?.user?.lastName}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <p className="text-sm  ">
                                {petProfilesOrder?.submittedBy?.firstName}{" "}
                                {petProfilesOrder?.submittedBy?.lastName}
                              </p>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {
                                petProfilesOrder?.petProfilesOrderType
                                  ?._id
                              }
                            </td>
                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-4 text-sm">
                                <button
                                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Delete"
                                  onClick={() =>
                                    handleDeletePetProfilesModal(
                                      petProfilesOrder?._id
                                    )
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
                                {deletePetProfilesModal && (
                                  <Modal
                                    closeDeleteModal={
                                      closeDeletePetProfilesModal
                                    }
                                    del={() => delOrder(id)}
                                    comment={"Pet Matting Profile"}
                                    message={"Pet Matting Profile"}
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
                  freelancersPerPage={petProfilesOrderPerPage}
                  totalFreelancers={petProfilesOrders?.length}
                  paginate={paginatePetProfilesOrder}
                  currentPage={currentPetProfilesOrderPage}
                />
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <EmptyState message="No Pet Matting Profiles To Show" />
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default AllOrders;
