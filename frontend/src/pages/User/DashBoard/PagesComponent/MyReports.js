import { useEffect } from "react";
import Title from "./Helpers/Title";
import { useSelector, useDispatch } from "react-redux";
import { GetMyReports } from "../../../../redux/actions/UserActions";
import { toast } from "react-toastify";
const MyReports = () => {
  const dispatch = useDispatch();
  const { reports } = useSelector((state) => state.userData);
  const { loading } = useSelector((state) => state?.userData);
;
  useEffect(() => {
    dispatch(GetMyReports(toast));
  }, [dispatch]);

  return (
    <div className="h-full pb-16 overflow-y-auto">
        <div className="container  mx-auto grid">
          <div className="flex flex-row flex-wrap  items-center justify-between mb-4">
            <Title title="Your Account Report " />
          </div>

          <div className="w-full overflow-hidden rounded-lg shadow-xs">
            <div className="w-full overflow-x-auto">
              <section className="  mx-auto max-w-7xl">
                <div className="grid grid-cols-1 gap-5 md:grid-cols-2 lg:grid-cols-4">
                  <div className="card">
                    <div className="p-5">
                      <p className="mb-2 text-xs font-semibold leading-none tracking-wide text-gray-500 uppercase">
                        Total Payments
                      </p>
                      <h2 className="text-3xl font-extrabold leading-none text-gray-800 truncate">
                        $
                        {!reports[0]?.TotalEarned ? 0 : reports[0]?.TotalEarned}
                      </h2>
                    </div>
                  </div>
                  <div className="card">
                    <div className="p-5">
                      <p className="mb-2 text-xs font-semibold leading-none tracking-wide text-gray-500 uppercase">
                        Stories Posted
                      </p>
                      <h2 className="text-3xl font-extrabold leading-none text-gray-800 truncate">
                        {!reports[0]?.TotalBlogs ? 0 : reports[0]?.TotalBlogs}
                      </h2>
                    </div>
                  </div>
                  <div className="card">
                    <div className="p-5">
                      <p className="mb-2 text-xs font-semibold leading-none tracking-wide text-gray-500 uppercase">
                        Pet Profile Posted
                      </p>
                      <h2 className="text-3xl font-extrabold leading-none text-gray-800 truncate">
                        {!reports[0]?.TotalPetProfiles
                          ? 0
                          : reports[0]?.TotalPetProfiles}
                      </h2>
                    </div>
                  </div>
                  <div className="card">
                    <div className="p-5">
                      <p className="mb-2 text-xs font-semibold leading-none tracking-wide text-gray-500 uppercase">
                        Doctor Request Completed
                      </p>
                      <h2 className="text-3xl font-extrabold leading-none text-gray-800 truncate">
                        {!reports[0]?.TotalGigs ? 0 : reports[0]?.TotalGigs}
                      </h2>
                    </div>
                  </div>

                  <div className="card">
                    <div className="p-5">
                      <p className="mb-2 text-xs font-semibold leading-none tracking-wide text-gray-500 uppercase">
                        Total Doctor Requests
                      </p>
                      <h2 className="text-3xl font-extrabold leading-none text-gray-800 truncate">
                        {!reports[0]?.TotalOrders ? 0 : reports[0]?.TotalOrders}
                      </h2>
                    </div>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
    </div>
  );
};

export default MyReports;
