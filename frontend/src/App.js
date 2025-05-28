import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

/* Footer Common Imports */
import FAQ from "./pages/PublicPages/FAQ";
import HelpAndSupport from "./pages/PublicPages/HelpAndSupport";
import PrivacyPolicies from "./pages/PublicPages/PrivacyPolicies";
import Team from "./pages/PublicPages/Team";
import TermsAndConditions from "./pages/PublicPages/TermsAndCondtions";

/* Start Guest imports */
import GuestHomePage from "./pages/Guest/GuestHomePage/HomePage";
import GuestContainer from "./pages/Guest/Container/GuestContainer";
import RegisterType from "./pages/Guest/AuthPages/RegisterType";
import SignUpDoctor from "./pages/Guest/AuthPages/SignUpDoctor";
import SignUpUser from "./pages/Guest/AuthPages/SignUpUser";
import SignInType from "./pages/Guest/AuthPages/SignInType";
import SignInDoctor from "./pages/Guest/AuthPages/SignInDoctor";
import SignInUser from "./pages/Guest/AuthPages/SignInUser";
import ForgotPasswordDoctor from "./pages/Guest/AuthPages/ForgotPasswordDoctor";
import ForgotPasswordUser from "./pages/Guest/AuthPages/ForgotPasswordUser";
import ResetPasswordDoctor from "./pages/Guest/AuthPages/ResetPasswordDoctor";
import ResetPasswordUser from "./pages/Guest/AuthPages/ResetPasswordUser";
import PageNotFound from "./pages/Guest/GuestHomePage/PageNotFound";
import RegisterAdmin from "./pages/Admin/auth/RegisterAdmin";
import LoginAdmin from "./pages/Admin/auth/LoginAdmin";
// import GuestJobsList from "./pages/PublicPages/FindWork/JobsList";
// import GuestJobDetails from "./pages/PublicPages/FindWork/JobDetails";
// import GuestFreelancersList from "./pages/PublicPages/FindFreelancer/FreelancerList";
// import GuestFreelancerDetails from "./pages/PublicPages/FindFreelancer/GuestFreelancerDetails";
// import GuestExchangeSkillsList from "./pages/PublicPages/ExchangeSkills/ExchangeSkillsList";
// import GuestExchangeSkillsDetails from "./pages/PublicPages/ExchangeSkills/ExchangeSkillsDetails";
/* Start User imports */
import Navbar from "./pages/User/Container/Navbar";
import UserDashBoard from "./pages/User/DashBoard/Home";
import MyBlogs from "./pages/User/DashBoard/PagesComponent/MyBlogs";
import MyPetProfiles from "./pages/User/DashBoard/PagesComponent/MyPetProfiles";
import MyPetProfilesRequests from "./pages/User/DashBoard/PagesComponent/MyPetProfilesRequests";
import MySubmittedPetProfilesRequests from "./pages/User/DashBoard/PagesComponent/MySubmittedPetProfilesRequests";
import FindWork from "./pages/User/DashBoard/PagesComponent/FindWork";
import MyGigs from "./pages/User/DashBoard/PagesComponent/MyGigs";
import MyHome from "./pages/User/DashBoard/PagesComponent/MyHome";
import MyReports from "./pages/User/DashBoard/PagesComponent/MyReports";
import MyProposals from "./pages/User/DashBoard/PagesComponent/MyProposals";
import JobsList from "./pages/User/JobsList/JobsList";
import JobDetails from "./pages/User/JobsList/JobDetails";
import SendProposalForm from "./pages/User/JobsList/SendProposalForm";
import EditProposalForm from "./pages/User/JobsList/EditProposalForm";
import Proposal from "./pages/User/JobsList/Proposal";
import PetProfilesList from "./pages/User/PetProfiles/PetProfilesList";
import PetProfilesDetails from "./pages/User/PetProfiles/PetProfilesDetails";
import MyPetProfilesDetails from "./pages/User/PetProfiles/MyPetProfilesDetails";
import SendRequestForm from "./pages/User/PetProfiles/SendRequestForm";
import EditRequestForm from "./pages/User/PetProfiles/EditRequestForm";
import AddPetProfileForm from "./pages/User/PetProfiles/AddPetProfileForm";
import EditPetProfileForm from "./pages/User/PetProfiles/EditPetProfileForm";
import SubmitRequestDetails from "./pages/User/PetProfiles/SubmitRequestDetails";
import ReceivedRequestDetails from "./pages/User/PetProfiles/ReceivedRequestDetails";
import GigDetails from "./pages/User/Gigs/GigDetails";
import AddGigForm from "./pages/User/Gigs/AddGigForm";
import EditGigForm from "./pages/User/Gigs/EditGigForm";
import BlogsList from "./pages/User/Blogs/BlogsList";
import BlogDetails from "./pages/User/Blogs/BlogDetails";
import AddBlogForm from "./pages/User/Blogs/AddBlogForm";
import EditBlogForm from "./pages/User/Blogs/EditBlogForm";
import OngoingJob from "./pages/User/Ongoing/OngoingJob";
import OngoingGig from "./pages/User/Ongoing/OnGoingGig";
import OngoingPetProfile from "./pages/User/Ongoing/OngoingPetProfile";
import Notifications from "./pages/User/Notifications/Notifications";
import ChatPage from "./pages/User/Chat/ChatPage";
import CreateUserProfile from "./pages/User/Profile/CreateUserProfile";
import ProfilePage from "./pages/User/Profile/ProfilePage";
import EditUserProfile from "./pages/User/Profile/EditUserProfile";
import SettingsDashBoard from "./pages/User/Settings/Settings";
import AccountSettings from "./pages/User/Settings/PagesComponent/Account";
import SecuritySettings from "./pages/User/Settings/PagesComponent/Security";
import PaymentMethods from "./pages/User/Settings/PagesComponent/PaymentMethods";
import Verification from "./pages/User/Settings/PagesComponent/Verification";

/* Start Doctor imports */
import DoctorNavbar from "./pages/Doctor/Container/Navbar";
import CreateDoctorProfile from "./pages/Doctor/Profile/CreateDoctorProfile";
import EditDoctorProfile from "./pages/Doctor/Profile/EditDoctorProfile";
import DoctorSettingsDashBoard from "./pages/Doctor/Settings/DoctorSettings";
import DoctorAccountSettings from "./pages/Doctor/Settings/PagesComponent/DoctorAccount";
import DoctorSecuritySettings from "./pages/Doctor/Settings/PagesComponent/DoctorSecurity";
import DoctorVerification from "./pages/Doctor/Settings/PagesComponent/Verification";
import DoctorPaymentMethods from "./pages/Doctor/Settings/PagesComponent/DoctorPaymentMethods";
import DoctorProfilePage from "./pages/Doctor/Profile/DoctorProfilePage";
import DoctorDashBoard from "./pages/Doctor/DashBoard/Home";
import FindGigs from "./pages/Doctor/DashBoard/PagesComponent/FindGigs";
import ProjectProposals from "./pages/Doctor/DashBoard/PagesComponent/ProjectProposals";
import PostedProjects from "./pages/Doctor/DashBoard/PagesComponent/PostedProjects";
import DoctorHome from "./pages/Doctor/DashBoard/PagesComponent/DoctorHome";
import DoctorReports from "./pages/Doctor/DashBoard/PagesComponent/DoctorReports";
import UserList from "./pages/Doctor/UserList/UserList";
import DoctorPageUserDetails from "./pages/Doctor/UserList/DoctorPageUserDetails";
import GigListDoctorPage from "./pages/Doctor/Gigs/GigList";
import GigDetailsDoctorPage from "./pages/Doctor/Gigs/GigDetails";
import BlogListDoctorPage from "./pages/Doctor/Blogs/BlogsList";
import BlogDetailsDoctorPage from "./pages/Doctor/Blogs/BlogDetails";
import CreateProject from "./pages/Doctor/Projects/CreateProject";
import DoctorPageProposalDetails from "./pages/Doctor/Projects/DoctorPageProposalDetails";
import DoctorPageJobDetails from "./pages/Doctor/Projects/DoctorPageJobDetails";
import OngoingGigDoctor from "./pages/Doctor/Ongoing/OnGoingGig";
import DoctorNotifications from "./pages/Doctor/Notifications/DoctorNotifications";
import OngoingJobDoctor from "./pages/Doctor/Ongoing/OngoingJob";
import EditProject from "./pages/Doctor/Projects/EditProject";
import DoctorChatPage from "./pages/Doctor/Chat/DoctorChatPage";

/* Start Admin imports */
import AdminNavbar from "./pages/Admin/Container/Navbar";
import AdminDashBoard from "./pages/Admin/DashBoard/AdminHome";
import ChatPageAdmin from "./pages/Admin/Chat/ChatPage";
import AllBlogs from "./pages/Admin/DashBoard/PagesComponent/AllBlogs";
import DoctorsList from "./pages/Admin/DashBoard/PagesComponent/DoctorsList";
import AllPetProfiles from "./pages/Admin/DashBoard/PagesComponent/AllPetProfiles";
import PetProfilesRequestList from "./pages/Admin/DashBoard/PagesComponent/PetProfilesRequestList";
import AllOrders from "./pages/Admin/DashBoard/PagesComponent/AllOrders";
import AllUsersReviews from "./pages/Admin/DashBoard/PagesComponent/AllUsersReviews";
import AllBlogsComments from "./pages/Admin/DashBoard/PagesComponent/AllBlogsComments";
import AllBlogsReplyComments from "./pages/Admin/DashBoard/PagesComponent/AllBlogsReplyComments";
import UsersList from "./pages/Admin/DashBoard/PagesComponent/UsersList";
import GigsList from "./pages/Admin/DashBoard/PagesComponent/GigsList";
import JobProposalsList from "./pages/Admin/DashBoard/PagesComponent/JobProposalsList";
import AllJobs from "./pages/Admin/DashBoard/PagesComponent/AllJobs";
import UserDetails from "./pages/Admin/DetailsPages/UserDetails";
import DoctorDetails from "./pages/Admin/DetailsPages/DoctorDetails";
import ViewPetProfile from "./pages/Admin/DetailsPages/ViewPetProfile";
import ViewJobDetails from "./pages/Admin/DetailsPages/ViewJobDetails";
import ViewGigDetails from "./pages/Admin/DetailsPages/ViewGigDetails";
import ViewBlogDetails from "./pages/Admin/DetailsPages/ViewBlogDetails";
import ViewProposalDetails from "./pages/Admin/DetailsPages/ViewProposalDetails";
import ViewRequestDetails from "./pages/Admin/DetailsPages/ViewRequestDetails";
import GigOrderDetails from "./pages/Admin/DetailsPages/GigOrderDetails";
import JobOrderDetails from "./pages/Admin/DetailsPages/JobOrderDetails";
import PetProfilesOrderDetails from "./pages/Admin/DetailsPages/PetProfilesOrderDetails";

import { useSelector } from "react-redux";

const token = localStorage.getItem("token");

const App = () => {
  const user = useSelector((state) => state?.userData?.freeuserInfo);
  const doctor = useSelector((state) => state?.doctorData?.freeuserInfo);
  const admin = useSelector((state) => state?.adminData?.freeuserInfo);

  /*  function isObjectEmpty(obj) {
    return Object.keys(obj)?.length === 0;
  }
 */

  function isObjectEmpty(obj) {
    return obj ? Object.keys(obj)?.length === 0 : true;
  }

  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            {/* ResetPasswrods */}
            <Route
              path="/reset-password-doctor"
              element={<ResetPasswordDoctor />}
            />
            <Route
              path="/reset-password-user"
              element={<ResetPasswordUser />}
            />
            {/* Start Guest Routes */}
           

            <Route path="/" element={<GuestContainer />}>
              <Route index element={<GuestHomePage />} />
              <Route path="/login-type" element={<SignInType />} />
              <Route path="/login-doctor" element={<SignInDoctor />} />
              <Route path="/login-user" element={<SignInUser />} />
              <Route path="/register-type" element={<RegisterType />} />
              <Route path="/register-doctor" element={<SignUpDoctor />} />
              <Route path="/register-admin" element={<RegisterAdmin />} />
              <Route path="/login-admin" element={<LoginAdmin />} />
              <Route path="/register-user" element={<SignUpUser />} />
              <Route
                path="/forgot-password-doctor"
                element={<ForgotPasswordDoctor />}
              />
              <Route
                path="/forgot-password-user"
                element={<ForgotPasswordUser />}
              />
              <Route path="/faqs" element={<FAQ />} />
              <Route path="/help-support" element={<HelpAndSupport />} />
              <Route path="/privacy-policies" element={<PrivacyPolicies />} />
              <Route path="/team" element={<Team />} />
              <Route
                path="/terms-conditions"
                element={<TermsAndConditions />}
              />
            </Route>
            {/*  ) : null} */}
            {/* End Guest Routes */}
            {/* Start user Protected Routes */}
            <Route path="/user" element={<Navbar />}>
              {/* Profile */}
              <Route index element={<ProfilePage />} />
              <Route
                path="create-user-profile/:id"
                element={<CreateUserProfile />}
              />

              {/* Ongoing Work pages */}
              <Route
                path="ongoing-pet-profile"
                element={<OngoingPetProfile />}
              />
              <Route path="ongoing-gig" element={<OngoingGig />} />
              <Route path="ongoing-job" element={<OngoingJob />} />

              {/* Footer Pages */}
              <Route path="faqs" element={<FAQ />} />
              <Route path="help-support" element={<HelpAndSupport />} />
              <Route path="privacy-policies" element={<PrivacyPolicies />} />
              <Route path="team" element={<Team />} />
              <Route path="terms-conditions" element={<TermsAndConditions />} />

              {/* Jobs */}
              <Route path="jobs">
                <Route index element={<JobsList />} />
                <Route path="job-details" element={<JobDetails />} />
              </Route>

              <Route path="send-proposal-form" element={<SendProposalForm />} />

              <Route path="edit-proposal-form" element={<EditProposalForm />} />
              <Route path="proposal-details" element={<Proposal />} />

              {/* PetProfiles */}
              <Route path="pet-profiles">
                <Route index element={<PetProfilesList />} />
                <Route
                  path="pet-profiles-details"
                  element={<PetProfilesDetails />}
                />
                <Route
                  path="my-pet-profiles-details"
                  element={<MyPetProfilesDetails />}
                />
                <Route path="add" element={<AddPetProfileForm />} />
                <Route path="edit" element={<EditPetProfileForm />} />
              </Route>
              <Route path="send-request-form" element={<SendRequestForm />} />

              <Route path="edit-request-form" element={<EditRequestForm />} />
              {<Route path="details" element={<ProfilePage />} />}
              <Route
                path="received-request-details"
                element={<ReceivedRequestDetails />}
              />
              <Route
                path="submitted-request-details"
                element={<SubmitRequestDetails />}
              />

              {/* Gigs */}
              <Route path="gigs">
                <Route path="gig-details" element={<GigDetails />} />
                <Route path="add" element={<AddGigForm />} />
                <Route path="edit" element={<EditGigForm />} />
              </Route>

              {/* Blogs */}
              <Route path="blogs">
                <Route index element={<BlogsList />} />
                <Route path="blog-details" element={<BlogDetails />} />
                <Route path="add" element={<AddBlogForm />} />
                <Route path="edit" element={<EditBlogForm />} />
              </Route>

              {/* Dashboard */}
              <Route path="user-dashboard" element={<UserDashBoard />}>
                <Route index element={<MyHome />} />
                <Route path="find-work" element={<FindWork />} />
                <Route path="my-gigs" element={<MyGigs />} />
                <Route path="my-pet-profiles" element={<MyPetProfiles />} />
                <Route
                  path="my-pet-profiles-requests"
                  element={<MyPetProfilesRequests />}
                />

                <Route
                  path="my-submitted-pet-profiles-requests"
                  element={<MySubmittedPetProfilesRequests />}
                />

                <Route path="my-blogs" element={<MyBlogs />} />
                <Route path="my-proposals" element={<MyProposals />} />
                <Route path="my-reports" element={<MyReports />} />
              </Route>

              {/* Notifications Page */}
              <Route path="notifications" element={<Notifications />} />

              {/* ChatPage */}
              <Route path="messages" element={<ChatPage />} />

              {/* Settings Screen */}
              <Route path="settings" element={<SettingsDashBoard />}>
                <Route index element={<AccountSettings />} />
                <Route path="security" element={<SecuritySettings />} />
                <Route path="edit/profile" element={<EditUserProfile />} />
                <Route path="verification" element={<Verification />} />
                <Route path="add-payment" element={<PaymentMethods />} />
              </Route>
            </Route>
            {/*  ) : null} */}
            {/* End User Protected Routes */}
            {/* Start Doctor Protected Routes */}
            {!isObjectEmpty(doctor) && token ? (
              <Route path="/doctor" element={<DoctorNavbar />}>
                <Route index element={<DoctorProfilePage />} />

                <Route
                  path="create-doctor-profile/:id"
                  element={<CreateDoctorProfile />}
                />

                {/* Footer Pages */}
                <Route path="faqs" element={<FAQ />} />
                <Route path="help-support" element={<HelpAndSupport />} />
                <Route path="privacy-policies" element={<PrivacyPolicies />} />
                <Route path="team" element={<Team />} />
                <Route
                  path="terms-conditions"
                  element={<TermsAndConditions />}
                />

                {/* On going Pages */}
                <Route path="ongoing-gig" element={<OngoingGigDoctor />} />
                <Route path="ongoing-job" element={<OngoingJobDoctor />} />

                {/* Projects */}
                <Route path="create-project" element={<CreateProject />} />
                <Route path="edit-project" element={<EditProject />} />
                <Route
                  path="proposal-details"
                  element={<DoctorPageProposalDetails />}
                />

                <Route path="job-details" element={<DoctorPageJobDetails />} />

                {/* UsersList */}
                <Route path="users">
                  <Route index element={<UserList />} />

                  <Route
                    path="user-details"
                    element={<DoctorPageUserDetails />}
                  />
                </Route>

                {/* Gigs */}
                <Route path="gigs">
                  <Route index element={<GigListDoctorPage />} />
                  <Route
                    path="gig-details"
                    element={<GigDetailsDoctorPage />}
                  />
                </Route>

                {/* Blogs */}
                <Route path="blogs">
                  <Route index element={<BlogListDoctorPage />} />
                  <Route
                    path="blog-details"
                    element={<BlogDetailsDoctorPage />}
                  />
                </Route>

                {/* Doctor Dashboard */}
                <Route path="doctor-dashboard" element={<DoctorDashBoard />}>
                  <Route index element={<DoctorHome />} />
                  <Route path="find-gigs" element={<FindGigs />} />
                  <Route
                    path="my-posted-projects"
                    element={<PostedProjects />}
                  />

                  <Route
                    path="project-proposals"
                    element={<ProjectProposals />}
                  />
                  <Route path="my-reports" element={<DoctorReports />} />
                </Route>

                {/* Notifications Page */}
                <Route path="notifications" element={<DoctorNotifications />} />

                {/* ChatPage */}
                <Route path="messages" element={<DoctorChatPage />} />

                {/* Settings Screen */}
                <Route path="settings" element={<DoctorSettingsDashBoard />}>
                  <Route index element={<DoctorAccountSettings />} />
                  <Route path="security" element={<DoctorSecuritySettings />} />
                  <Route
                    path="edit/profile/:id"
                    element={<EditDoctorProfile />}
                  />
                  <Route path="verification" element={<DoctorVerification />} />
                  <Route
                    path="add-payment"
                    element={<DoctorPaymentMethods />}
                  />
                </Route>
              </Route>
            ) : null}
            {/* End Doctor Protected Routes */}
            {/* Start Admin Protected Routes */}
            {!isObjectEmpty(admin) && token ? (
              <Route path="admin" element={<AdminNavbar />}>
                <Route path="messages" element={<ChatPageAdmin />} />
                <Route path="user-details" element={<UserDetails />} />
                <Route path="doctor-details" element={<DoctorDetails />} />
                <Route
                  path="pet-profile-details"
                  element={<ViewPetProfile />}
                />
                <Route path="job-details" element={<ViewJobDetails />} />
                <Route path="gig-details" element={<ViewGigDetails />} />
                <Route path="blog-details" element={<ViewBlogDetails />} />
                <Route
                  path="request-details"
                  element={<ViewRequestDetails />}
                />
                <Route
                  path="proposal-details"
                  element={<ViewProposalDetails />}
                />
                <Route path="gig-order-details" element={<GigOrderDetails />} />

                <Route path="job-order-details" element={<JobOrderDetails />} />
                <Route
                  path="pet-profile-order-details"
                  element={<PetProfilesOrderDetails />}
                />

                {/* Admin DashBoard */}
                <Route path="admin-dashboard" element={<AdminDashBoard />}>
                  <Route index element={<UsersList />} />
                  <Route path="doctors-list" element={<DoctorsList />} />
                  <Route path="gigs-list" element={<GigsList />} />
                  <Route
                    path="pet-profiles-list"
                    element={<AllPetProfiles />}
                  />
                  <Route path="jobs-list" element={<AllJobs />} />

                  <Route path="blogs-list" element={<AllBlogs />} />
                  <Route
                    path="job-proposals-list"
                    element={<JobProposalsList />}
                  />
                  <Route
                    path="pet-profiles-request-list"
                    element={<PetProfilesRequestList />}
                  />
                  <Route path="orders-list" element={<AllOrders />} />
                  <Route
                    path="users-reviews-list"
                    element={<AllUsersReviews />}
                  />

                  <Route path="blog-comments" element={<AllBlogsComments />} />
                  <Route
                    path="blogs-reply-comments"
                    element={<AllBlogsReplyComments />}
                  />
                </Route>
              </Route>
            ) : null}
            {/* End Admin Protected Routes */}
            {<Route path="*" element={<PageNotFound />} />}
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
};
export default App;
