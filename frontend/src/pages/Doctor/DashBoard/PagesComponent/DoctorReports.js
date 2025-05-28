import { useEffect } from "react";
import Title from "./Helpers/Title";
import { useSelector, useDispatch } from "react-redux";
import { GetDoctorReport } from "../../../../redux/actions/DoctorActions";
import { toast } from "react-toastify";

const DoctorReports = () => {
  const dispatch = useDispatch();

  const { reports, loading } = useSelector((state) => state?.doctorData);
 
  useEffect(() => {
    dispatch(GetDoctorReport(toast));
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
                        Total Income
                      </p>
                      <h2 className="text-3xl font-extrabold leading-none text-gray-800 truncate">
                        ${!reports[0]?.TotalSpend ? 0 : reports[0]?.TotalSpend}
                      </h2>
                    </div>
                  </div>
                  <div className="card">
                    <div className="p-5">
                      <p className="mb-2 text-xs font-semibold leading-none tracking-wide text-gray-500 uppercase">
                        Doctor Proposals Posted
                      </p>
                      <h2 className="text-3xl font-extrabold leading-none text-gray-800 truncate">
                        {!reports[0]?.TotalJobs ? 0 : reports[0]?.TotalJobs}
                      </h2>
                    </div>
                  </div>
                  <div className="card">
                    <div className="p-5">
                      <p className="mb-2 text-xs font-semibold leading-none tracking-wide text-gray-500 uppercase">
                        Accepted Proposals
                      </p>
                      <h2 className="text-3xl font-extrabold leading-none text-gray-800 truncate">
                        {!reports[0]?.AcceptedProposals
                          ? 0
                          : reports[0]?.AcceptedProposals}
                      </h2>
                    </div>
                  </div>
                  <div className="card">
                    <div className="p-5">
                      <p className="mb-2 text-xs font-semibold leading-none tracking-wide text-gray-500 uppercase">
                        Doctor Requests by User
                      </p>
                      <h2 className="text-3xl font-extrabold leading-none text-gray-800 truncate">
                        {!reports[0]?.GigsOrders ? 0 : reports[0]?.GigsOrders}
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

export default DoctorReports;
