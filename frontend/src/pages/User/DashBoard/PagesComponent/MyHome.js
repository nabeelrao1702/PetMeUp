import { useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "./Helpers/Title";
import OngoingJobCard from "./Helpers/OngoingJobCard";
import OngoingGigCard from "./Helpers/OngoingGigCard";
import OngoingPetProfilesCard from "./Helpers/OngoingPetProfilesCard";
import { useSelector, useDispatch } from "react-redux";
import {
  GetAllOrders,
  GetPetProfilesOrders,
} from "./../../../../redux/actions/UserActions";
import EmptyState from "./Helpers/EmptyState";
import { toast } from "react-toastify";

const MyHome = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.userData.orders);
  const { loading } = useSelector((state) => state?.userData);
  const submittedExchangeOrders = useSelector(
    (state) => state.userData.petProfilesOrders
  );

  useEffect(() => {
    dispatch(GetAllOrders(toast));
  }, [dispatch]);

  useEffect(() => {
    dispatch(GetPetProfilesOrders(toast));
  }, [dispatch]);

  const gigOrders =
    (orders?.filter &&
      orders?.filter((order) => order?.type === "gig" && order.status === 1)) ||
    [];

  const jobOrders =
    (orders?.filter &&
      orders?.filter((job) => job?.type === "job" && job?.status === 1)) ||
    [];

  const acceptedPetProfiles =
    (orders?.filter &&
      orders?.filter((job) => job?.type === "PetProfiles")) ||
    [];

  const combinedPetProfilesOrders = acceptedPetProfiles.concat(
    submittedExchangeOrders
  );

  return (
    <div className="h-full pb-16 overflow-y-auto">
        <div className="container  mx-auto grid">
        <div className="flex flex-row flex-wrap  items-center justify-between my-4 mx-4">
            <Title title="Your Pet Mattings" />
          </div>

          {combinedPetProfilesOrders &&
          combinedPetProfilesOrders.length > 0 ? (
            <div className="container overflow-hidden rounded-lg shadow-xs">
              <div className="sm:grid grid-cols-4 gap-2 grid-cols-2 gap-4 ">
                {combinedPetProfilesOrders?.map &&
                  combinedPetProfilesOrders?.map((job, index) => (
                    <div key={index}>
                      <Link
                        to="/user/ongoing-pet-profile"
                        state={{ singlePetProfile: job }}
                      >
                        <OngoingPetProfilesCard data={job} />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <EmptyState message="Currently No Pet Matting" />
            </div>
          )}


          <div className="flex flex-row flex-wrap  items-center justify-between mb-4 mx-4">
            <Title title="Your Doctor Sessions" />
          </div>
          {jobOrders && jobOrders.length > 0 ? (
            <div className="container overflow-hidden rounded-lg shadow-xs">
              <div className=" sm:grid grid-cols-4 gap-2 grid-cols-2 gap-4 ">
                {jobOrders?.map &&
                  jobOrders?.map((job, index) => (
                    <div key={index}>
                      <Link to="/user/ongoing-job" state={{ job }}>
                        <OngoingJobCard data={job} />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center w-full">
              <EmptyState message="Currently No Doctor Session" />
            </div>
          )}

       

          <div className="flex flex-row flex-wrap  items-center justify-between my-4 mx-4">
            <Title title="Your Veterinary Requests" />
          </div>
          {gigOrders && gigOrders.length > 0 ? (
            <div className="container overflow-hidden rounded-lg shadow-xs">
              <div className="sm:grid grid-cols-4 gap-2 grid-cols-2 gap-4 ">
                {gigOrders?.map &&
                  gigOrders?.map((order, index) => (
                    <div key={index}>
                      <Link to="/user/ongoing-gig" state={{ order }}>
                        <OngoingGigCard data={order} />
                      </Link>
                    </div>
                  ))}
              </div>
            </div>
          ) : (
            <div className="flex justify-center ">
              <EmptyState message="Currently No Veterinary Requests" />
            </div>
          )}
        </div>
    </div>
  );
};

export default MyHome;
