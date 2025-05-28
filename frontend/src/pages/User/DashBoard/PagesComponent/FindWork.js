import { useEffect } from "react";
import { Link } from "react-router-dom";
import SingleJob from "../../JobsList/SingleJob";
import Title from "./Helpers/Title";
import { GetAllJobs } from "../../../../redux/actions/UserActions";
import { useSelector, useDispatch } from "react-redux";
import EmptyState from "./Helpers/EmptyState";
import { toast } from "react-toastify";

const FindWork = () => {
  const dispatch = useDispatch();
  const jobs = useSelector((state) => state.userData.jobs);
  const { loading } = useSelector((state) => state.userData);

  useEffect(() => {
    dispatch(GetAllJobs(toast));
  }, [dispatch]);

  return (
    <div>
        <div className="h-full pb-16 overflow-y-auto">
          <div className="container  mx-auto grid">
            <div>
              <Title title="Doctors Who are Available" />
            </div>
            {jobs && jobs.length > 0 ? (
              <>
                {jobs?.map &&
                  jobs?.map((job, index) => (
                    <Link
                      key={index}
                      to="/user/jobs/job-details"
                      state={{ singleJob: job }}
                    >
                      <SingleJob data={job} />
                    </Link>
                  ))}
              </>
            ) : (
              <div className="flex justify-center w-full">
                <EmptyState message="No Doctor Proposals For You" />
              </div>
            )}
          </div>
        </div>
    </div>
  );
};

export default FindWork;
