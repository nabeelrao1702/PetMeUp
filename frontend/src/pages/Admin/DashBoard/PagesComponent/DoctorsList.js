import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllDoctors,
  DeleteDoctor,
} from "../../../../redux/actions/AdminActions";
import Pagination from "./Helpers/Pagination";
import EmptyState from "./Helpers/EmptyState";
import Profile from "../../../../img/profile.jpg";
import Modal from "./Helpers/Modal";

const DoctorsList = () => {
  const { doctors, getDoctorsLoader } = useSelector(
    (state) => state?.adminData
  );

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(5);

  // Get current users
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;

  function hasDoctors(doctors, indexOfFirstUser, indexOfLastUser) {
    const currentDoctors = doctors?.slice(
      indexOfFirstUser,
      indexOfLastUser
    );
    if (currentDoctors.length > 0) {
      return currentDoctors;
    } else {
      return [];
    }
  }

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    dispatch(GetAllDoctors(toast));
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

  const delDoctor = (doctorId) => {
    dispatch(DeleteDoctor(doctorId, navigate, toast));
    setDeleteModal(false);
  };

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

  return (
    <div>
        <div className="h-full pb-16 overflow-y-auto">
          <div className="container  mx-auto grid">
            <div className="flex flex-row flex-wrap  items-center justify-between mb-4">
              <h2 className="my-2 text-2xl font-semibold text-white bg-black p-1 rounded ">
                Doctor List
              </h2>
            </div>
            {doctors && doctors.length > 0 ? (
              <div className="w-full overflow-hidden rounded-lg shadow-xs">
                <div className="w-full overflow-x-auto">
                  <table className="w-full whitespace-no-wrap">
                    <thead>
                      <tr className="text-xs font-semibold tracking-wide text-left text-gray-500 uppercase border boder-gray-500   bg-gray-100">
                        <th className="px-4 py-3">Doctor Name</th>
                        <th className="px-4 py-3">Country</th>
                        <th className="px-4 py-3">Join Date</th>

                        <th className="px-4 py-3">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="bg-white divide-y ">
                      {hasDoctors(
                        doctors,
                        indexOfFirstUser,
                        indexOfLastUser
                      )?.map &&
                        hasDoctors(
                          doctors,
                          indexOfFirstUser,
                          indexOfLastUser
                        )?.map((doctor, index) => (
                          <tr key={index} className="text-gray-700 ">
                            <td className="px-4 py-3">
                              <div className="flex items-center text-sm">
                                <Link
                                  to="/admin/doctor-details"
                                  className="hover:underline hover:text-orange-600 "
                                  state={{ doctor }}
                                >
                                  <div className="flex items-center text-sm space-x-2">
                                    <img
                                      className=" avatar avatar-sm object-cover w-8 h-8 rounded-full"
                                      src={
                                        !doctor.photo ? Profile : doctor.photo
                                      }
                                      alt="avatar"
                                      aria-hidden="true"
                                    />
                                    <div>
                                      <p className="font-semibold">
                                        {doctor.firstName} {doctor.lastName}
                                      </p>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </td>
                            <td className="px-4 py-3 text-sm">
                              {doctor?.address?.country}
                            </td>
                            <td className="px-4 py-3 text-xs">
                              <p className="text-sm  ">
                                Member Since {dateConverter(doctor.createdAt)}
                              </p>
                            </td>

                            <td className="px-4 py-3">
                              <div className="flex items-center space-x-4 text-sm">
                                <button
                                  className="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 text-red-600 rounded-lg  focus:outline-none focus:shadow-outline-gray"
                                  aria-label="Delete"
                                  onClick={() => handleDeleteModal(doctor._id)}
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
                                    del={() => delDoctor(id)}
                                    comment={"Doctor"}
                                    message={"Doctor"}
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
                  totalUsers={doctors?.length}
                  paginate={paginate}
                  currentPage={currentPage}
                />
              </div>
            ) : (
              <div className="flex justify-center w-full">
                <EmptyState message="No Doctors To Show" />
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default DoctorsList;
