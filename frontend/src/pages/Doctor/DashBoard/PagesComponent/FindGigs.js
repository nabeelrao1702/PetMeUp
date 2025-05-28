import { useEffect } from "react";
import { Link } from "react-router-dom";
import Title from "./Helpers/Title";
import SingleGig from "../../Gigs/SingleGig";
import { useDispatch, useSelector } from "react-redux";
import { GetAllGigs } from "../../../../redux/actions/DoctorActions";
import EmptyState from "../PagesComponent/Helpers/EmptyState";
import { GetReviews } from "../../../../redux/actions/DoctorActions";
import { toast } from "react-toastify";

const FindUsers = () => {
  const dispatch = useDispatch();
  const { gigs, loading } = useSelector((state) => state?.doctorData);
  const reviews = useSelector((state) => state?.doctorData?.reviews);

  useEffect(() => {
    dispatch(GetAllGigs());
    dispatch(GetReviews(toast));
  }, [dispatch]);

 
  return (
    <div>
        <div className="h-full pb-16.. overflow-y-auto ">
          <div className="container  mx-auto grid ">
            <div className=" mx-8">
              <Title title="User's looking for  Vet Doctor" />
            </div>
            <div className="container overflow-hidden rounded-lg shadow-xs">
              <div className="sm:grid grid-cols-2 gap-2 grid-cols-2 gap-4 ">
                {gigs && gigs.length > 0 ? (
                  <>
                    {gigs.map &&
                      gigs?.map((gig, index) => (
                        <div key={index}>
                          <Link
                            to="/doctor/gigs/gig-details"
                            state={{ gig, reviews }}
                          >
                            <SingleGig gig={gig} reviews={reviews} />
                          </Link>
                        </div>
                      ))}
                  </>
                ) : (
                  <div className="flex justify-center w-full">
                    <EmptyState message="No Pet Profiles To Show You" />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    </div>
  );
};

export default FindUsers;
