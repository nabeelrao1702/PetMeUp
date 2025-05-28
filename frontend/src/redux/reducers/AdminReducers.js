import {
  GET_ADMIN_JOBS_SUCCESS,
  userAuth,
  GET_ALL_USER_SUCCESS,
  GET_ALL_USER_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ADMIN_JOB_PROPOSALS_SUCCESS,
  GET_ALL_ADMIN_PET_PROFILES_SUCCESS,
  GET_ALL_DOCTORS_SUCCESS,
  GET_ALL_DOCTORS_FAIL,
  GET_ALL_DOCTORS_REQUEST,
  GET_ADMIN_ALL_GIGS_SUCCESS,
  GET_ADMIN_BLOGS_SUCCESS,
  GET_ADMIN_PET_PROFILES_REQUESTS_SUCCESS,
  GET_ADMIN_ORDERS_SUCCESS,
  GET_ADMIN_USER_REVIEWS_SUCCESS,
  GET_ADMIN_BLOGS_COMMENTS_SUCCESS,
  GET_ADMIN_BLOGS_REPLY_COMMENTS_SUCCESS,
  DELETE_ADMIN_JOBS_SUCCESS,
  DELETE_ALL_USER_SUCCESS,
  DELETE_ADMIN_JOB_PROPOSALS_SUCCESS,
  DELETE_ALL_ADMIN_PET_PROFILES_SUCCESS,
  DELETE_ALL_DOCTORS_SUCCESS,
  DELETE_ADMIN_ALL_GIGS_SUCCESS,
  DELETE_ADMIN_BLOGS_SUCCESS,
  DELETE_ADMIN_PET_PROFILES_REQUESTS_SUCCESS,
  DELETE_ADMIN_ORDERS_SUCCESS,
  DELETE_ADMIN_USER_REVIEWS_SUCCESS,
  DELETE_ADMIN_BLOGS_COMMENTS_SUCCESS,
  DELETE_ADMIN_BLOGS_REPLY_COMMENTS_SUCCESS,
  GET_ADMIN_ALL_GIGS_FAIL,
  GET_ADMIN_ALL_GIGS_REQUEST,
  GET_ALL_ADMIN_PET_PROFILES_REQUEST,
  GET_ALL_ADMIN_PET_PROFILES_FAIL,
  GET_ADMIN_JOBS_FAIL,
  GET_ADMIN_JOBS_REQUEST,
  GET_ADMIN_BLOGS_REQUEST,
  GET_ADMIN_BLOGS_FAIL,
  GET_ADMIN_JOB_PROPOSALS_FAIL,
  GET_ADMIN_JOB_PROPOSALS_REQUEST,
  GET_ADMIN_PET_PROFILES_REQUESTS_REQUEST,
  GET_ADMIN_PET_PROFILES_REQUESTS_FAIL,
  GET_ADMIN_ORDERS_FAIL,
  GET_ADMIN_ORDERS_REQUEST,
  GET_ADMIN_USER_REVIEWS_FAIL,
  GET_ADMIN_USER_REVIEWS_REQUEST,
  GET_ADMIN_BLOGS_REPLY_COMMENTS_REQUEST,
  GET_ADMIN_BLOGS_REPLY_COMMENTS_FAIL,
  GET_ADMIN_BLOGS_COMMENTS_REQUEST,
  GET_ADMIN_BLOGS_COMMENTS_FAIL,
  DELETE_ALL_USER_REQUEST,
  DELETE_ALL_USER_FAIL,
  DELETE_ALL_DOCTORS_REQUEST,
  DELETE_ALL_ADMIN_PET_PROFILES_REQUEST,
  DELETE_ADMIN_JOB_PROPOSALS_REQUEST,
  DELETE_ADMIN_PET_PROFILES_REQUESTS_REQUEST,
  DELETE_ADMIN_ALL_GIGS_REQUEST,
  DELETE_ADMIN_BLOGS_REQUEST,
  DELETE_ADMIN_JOBS_REQUEST,
  DELETE_ADMIN_ORDERS_REQUEST,
  DELETE_ADMIN_USER_REVIEWS_REQUEST,
  DELETE_ADMIN_BLOGS_COMMENTS_REQUEST,
  DELETE_ADMIN_BLOGS_REPLY_COMMENTS_REQUEST,
  DELETE_ALL_DOCTORS_FAIL,
  DELETE_ALL_ADMIN_PET_PROFILES_FAIL,
  DELETE_ADMIN_JOB_PROPOSALS_FAIL,
  DELETE_ADMIN_PET_PROFILES_REQUESTS_FAIL,
  DELETE_ADMIN_ALL_GIGS_FAIL,
  DELETE_ADMIN_BLOGS_FAIL,
  DELETE_ADMIN_JOBS_FAIL,
  DELETE_ADMIN_ORDERS_FAIL,
  DELETE_ADMIN_USER_REVIEWS_FAIL,
  DELETE_ADMIN_BLOGS_COMMENTS_FAIL,
  DELETE_ADMIN_BLOGS_REPLY_COMMENTS_FAIL,
  GET_ADMIN_MESSAGES_FAIL,
  GET_ADMIN_MESSAGES_REQUEST,
  GET_ADMIN_MESSAGES_SUCCESS,
} from "./../actions/types";
const INITIAL_STATE = {
  getUserLoader: false,
  getDoctorsLoader: false,
  getJobProposalsLoader: false,
  getPetProfileLoader: false,
  gigsLoading: false,
  blogsLoading: false,
  jobsLoading: false,
  getPetProfilesRequestsLoading: false,
  ordersLoading: false,
  doctorReviewsLoading: false,
  userReviewsLoading: false,
  blogCommentsLoading: false,
  blogReplyCommentsLoading: false,
  loginLoading: false,
  messagesLoading: false,
  users: {},
  doctors: {},
  petProfiles: {},
  jobProposals: {},
  petProfilesRequests: {},
  gigs: {},
  blogs: {},
  jobs: {},
  orders: {},
  userReviews: {},
  blogComments: {},
  blogReplyComments: {},
  freeuserInfo: {},
  messages: {},
};
const AdminReducers = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case userAuth.ADMIN_REGISTRATION_REQUEST: {
      return {
        ...state,
        loginLoading: true,
      };
    }
    case userAuth.ADMIN_REGISTRATION_SUCCESS: {
      return {
        ...state,
        freeuserInfo: action.payload,
      };
    }
    case userAuth.ADMIN_REGISTRATION_FAIL: {
      return {
        ...state,
        loginLoading: false,
      };
    }
    case userAuth.ADMIN_LOGIN_REQUEST: {
      return {
        ...state,
        loginLoading: true,
      };
    }
    case userAuth.ADMIN_LOGIN_SUCCESS: {
      return {
        ...state,
        freeuserInfo: action.payload,
        loginLoading: false,
      };
    }
    case userAuth.ADMIN_LOGIN_FAIL: {
      return {
        ...state,
        loginLoading: false,
      };
    }
    case userAuth.ADMIN_LOGOUT_SUCCESS: {
      return {
        ...state,
        freeuserInfo: {},
        loginLoading: false,
      };
    }

    case userAuth.ADMIN_LOGOUT_REQUEST: {
      return {
        ...state,
        loginLoading: true,
      };
    }

    case GET_ALL_USER_REQUEST: {
      return {
        ...state,
        getUserLoader: true,
      };
    }

    case GET_ALL_USER_SUCCESS: {
      return {
        ...state,
        users: action.payload,
        getUserLoader: false,
      };
    }
    case GET_ALL_USER_FAIL: {
      return {
        ...state,
        getUserLoader: false,
      };
    }
    case GET_ALL_DOCTORS_REQUEST: {
      return {
        ...state,
        getDoctorsLoader: true,
      };
    }
    case GET_ALL_DOCTORS_SUCCESS: {
      return {
        ...state,
        doctors: action.payload,
        getDoctorsLoader: false,
      };
    }
    case GET_ALL_DOCTORS_FAIL: {
      return {
        ...state,
        getDoctorsLoader: false,
      };
    }
    case GET_ALL_ADMIN_PET_PROFILES_REQUEST: {
      return {
        ...state,
        getPetProfileLoader: true,
      };
    }
    case GET_ALL_ADMIN_PET_PROFILES_SUCCESS: {
      return {
        ...state,
        petProfiles: action.payload,
        getPetProfileLoader: false,
      };
    }

    case GET_ALL_ADMIN_PET_PROFILES_FAIL: {
      return {
        ...state,
        getPetProfileLoader: false,
      };
    }

    case GET_ADMIN_JOB_PROPOSALS_REQUEST: {
      return {
        ...state,
        getJobProposalsLoader: true,
      };
    }
    case GET_ADMIN_JOB_PROPOSALS_SUCCESS: {
      return {
        ...state,
        jobProposals: action.payload,
        getJobProposalsLoader: false,
      };
    }

    case GET_ADMIN_JOB_PROPOSALS_FAIL: {
      return {
        ...state,
        getJobProposalsLoader: false,
      };
    }
    case GET_ADMIN_PET_PROFILES_REQUESTS_REQUEST: {
      return {
        ...state,
        getPetProfilesRequestsLoading: true,
      };
    }

    case GET_ADMIN_PET_PROFILES_REQUESTS_SUCCESS: {
      return {
        ...state,
        petProfilesRequests: action.payload,
        getPetProfilesRequestsLoading: false,
      };
    }

    case GET_ADMIN_PET_PROFILES_REQUESTS_FAIL: {
      return {
        ...state,

        getPetProfilesRequestsLoading: false,
      };
    }
    case GET_ADMIN_ALL_GIGS_REQUEST: {
      return {
        ...state,

        gigsLoading: true,
      };
    }
    case GET_ADMIN_ALL_GIGS_SUCCESS: {
      return {
        ...state,
        gigs: action.payload,
        gigsLoading: false,
      };
    }

    case GET_ADMIN_ALL_GIGS_FAIL: {
      return {
        ...state,
        gigsLoading: false,
      };
    }
    case GET_ADMIN_BLOGS_REQUEST: {
      return {
        ...state,
        blogsLoading: true,
      };
    }

    case GET_ADMIN_BLOGS_SUCCESS: {
      return {
        ...state,
        blogs: action.payload,
        blogsLoading: false,
      };
    }

    case GET_ADMIN_BLOGS_FAIL: {
      return {
        ...state,
        blogsLoading: false,
      };
    }
    case GET_ADMIN_JOBS_REQUEST: {
      return {
        ...state,
        jobsLoading: true,
      };
    }

    case GET_ADMIN_JOBS_SUCCESS: {
      return {
        ...state,
        jobs: action.payload,
        jobsLoading: false,
      };
    }
    case GET_ADMIN_JOBS_FAIL: {
      return {
        ...state,
        jobsLoading: false,
      };
    }
    case GET_ADMIN_ORDERS_REQUEST: {
      return {
        ...state,

        ordersLoading: true,
      };
    }

    case GET_ADMIN_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: action.payload,
        ordersLoading: false,
      };
    }

    case GET_ADMIN_ORDERS_FAIL: {
      return {
        ...state,

        ordersLoading: false,
      };
    }

    case GET_ADMIN_USER_REVIEWS_REQUEST: {
      return {
        ...state,

        userReviewsLoading: true,
      };
    }

    case GET_ADMIN_USER_REVIEWS_SUCCESS: {
      return {
        ...state,
        userReviews: action.payload,
        userReviewsLoading: false,
      };
    }

    case GET_ADMIN_USER_REVIEWS_FAIL: {
      return {
        ...state,

        userReviewsLoading: false,
      };
    }

    case GET_ADMIN_BLOGS_COMMENTS_REQUEST: {
      return {
        ...state,

        blogCommentsLoading: true,
      };
    }
    case GET_ADMIN_BLOGS_COMMENTS_SUCCESS: {
      return {
        ...state,
        blogComments: action.payload,
        blogCommentsLoading: false,
      };
    }

    case GET_ADMIN_BLOGS_COMMENTS_FAIL: {
      return {
        ...state,
        blogCommentsLoading: false,
      };
    }

    case GET_ADMIN_BLOGS_REPLY_COMMENTS_REQUEST: {
      return {
        ...state,

        blogReplyCommentsLoading: true,
      };
    }

    case GET_ADMIN_BLOGS_REPLY_COMMENTS_SUCCESS: {
      return {
        ...state,
        blogReplyComments: action.payload,
        blogReplyCommentsLoading: false,
      };
    }

    case GET_ADMIN_BLOGS_REPLY_COMMENTS_FAIL: {
      return {
        ...state,

        blogReplyCommentsLoading: false,
      };
    }

    case DELETE_ALL_USER_REQUEST: {
      return {
        ...state,
        getUserLoader: true,
      };
    }

    case DELETE_ALL_USER_SUCCESS: {
      return {
        ...state,
        users: state.users.filter(
          (user) => user._id !== action.payload._id
        ),
        getUserLoader: false,
      };
    }

    case DELETE_ALL_USER_FAIL: {
      return {
        ...state,
        getUserLoader: false,
      };
    }

    case DELETE_ALL_DOCTORS_SUCCESS: {
      return {
        ...state,
        doctors: state.doctors.filter(
          (doctor) => doctor._id !== action.payload._id
        ),
        getDoctorsLoader: false,
      };
    }
    case DELETE_ALL_ADMIN_PET_PROFILES_SUCCESS: {
      return {
        ...state,
        petProfiles: state.petProfiles.filter(
          (petProfile) => petProfile._id !== action.payload._id
        ),
        getPetProfileLoader: false,
      };
    }
    case DELETE_ADMIN_JOB_PROPOSALS_SUCCESS: {
      return {
        ...state,
        jobProposals: state.jobProposals.filter(
          (jobProposal) => jobProposal._id !== action.payload._id
        ),
        getProposalsLoader: false,
      };
    }
    case DELETE_ADMIN_PET_PROFILES_REQUESTS_SUCCESS: {
      return {
        ...state,
        petProfilesRequests: state.petProfilesRequests.filter(
          (petProfilesRequest) =>
            petProfilesRequest._id !== action.payload._id
        ),
        getPetProfilesRequestsLoading: false,
      };
    }
    case DELETE_ADMIN_ALL_GIGS_SUCCESS: {
      return {
        ...state,
        gigs: state.gigs.filter((gig) => gig._id !== action.payload._id),
        gigsLoading: false,
      };
    }
    case DELETE_ADMIN_BLOGS_SUCCESS: {
      return {
        ...state,
        blogs: state.blogs.filter((blog) => blog._id !== action.payload._id),
        blogsLoading: false,
      };
    }
    case DELETE_ADMIN_JOBS_SUCCESS: {
      return {
        ...state,
        jobs: state.jobs.filter((job) => job._id !== action.payload._id),
        jobsLoading: false,
      };
    }
    case DELETE_ADMIN_ORDERS_SUCCESS: {
      return {
        ...state,
        orders: state.orders.filter(
          (order) => order._id !== action.payload._id
        ),
        ordersLoading: false,
      };
    }

    case DELETE_ADMIN_USER_REVIEWS_SUCCESS: {
      return {
        ...state,
        userReviews: state.userReviews.filter(
          (userReview) => userReview._id !== action.payload._id
        ),
        userReviewsLoading: false,
      };
    }

    case DELETE_ADMIN_BLOGS_COMMENTS_SUCCESS: {
      return {
        ...state,
        blogComments: state.blogComments.filter(
          (blogComment) => blogComment._id !== action.payload._id
        ),
        blogCommentsLoading: false,
      };
    }

    case DELETE_ADMIN_BLOGS_REPLY_COMMENTS_SUCCESS: {
      return {
        ...state,
        blogReplyComments: state.blogReplyComments.filter(
          (blogReplyComment) => blogReplyComment._id !== action.payload._id
        ),
        blogReplyCommentsLoading: false,
      };
    }

    case DELETE_ALL_DOCTORS_FAIL: {
      return {
        ...state,

        getDoctorsLoader: false,
      };
    }
    case DELETE_ALL_ADMIN_PET_PROFILES_FAIL: {
      return {
        ...state,

        getPetProfileLoader: false,
      };
    }
    case DELETE_ADMIN_JOB_PROPOSALS_FAIL: {
      return {
        ...state,

        getProposalsLoader: false,
      };
    }
    case DELETE_ADMIN_PET_PROFILES_REQUESTS_FAIL: {
      return {
        ...state,

        getPetProfilesRequestsLoading: false,
      };
    }
    case DELETE_ADMIN_ALL_GIGS_FAIL: {
      return {
        ...state,

        gigsLoading: false,
      };
    }
    case DELETE_ADMIN_BLOGS_FAIL: {
      return {
        ...state,

        blogsLoading: false,
      };
    }
    case DELETE_ADMIN_JOBS_FAIL: {
      return {
        ...state,
        jobsLoading: false,
      };
    }
    case DELETE_ADMIN_ORDERS_FAIL: {
      return {
        ...state,
        ordersLoading: false,
      };
    }

    case DELETE_ADMIN_USER_REVIEWS_FAIL: {
      return {
        ...state,
        userReviewsLoading: false,
      };
    }

    case DELETE_ADMIN_BLOGS_COMMENTS_FAIL: {
      return {
        ...state,
        blogCommentsLoading: false,
      };
    }

    case DELETE_ADMIN_BLOGS_REPLY_COMMENTS_FAIL: {
      return {
        ...state,
        blogReplyCommentsLoading: false,
      };
    }

    case DELETE_ALL_DOCTORS_REQUEST: {
      return {
        ...state,
        getDoctorsLoader: true,
      };
    }
    case DELETE_ALL_ADMIN_PET_PROFILES_REQUEST: {
      return {
        ...state,
        getPetProfileLoader: true,
      };
    }
    case DELETE_ADMIN_JOB_PROPOSALS_REQUEST: {
      return {
        ...state,
        getProposalsLoader: true,
      };
    }
    case DELETE_ADMIN_PET_PROFILES_REQUESTS_REQUEST: {
      return {
        ...state,
        getPetProfilesRequestsLoading: true,
      };
    }
    case DELETE_ADMIN_ALL_GIGS_REQUEST: {
      return {
        ...state,
        gigsLoading: true,
      };
    }
    case DELETE_ADMIN_BLOGS_REQUEST: {
      return {
        ...state,
        blogsLoading: true,
      };
    }
    case DELETE_ADMIN_JOBS_REQUEST: {
      return {
        ...state,
        jobsLoading: true,
      };
    }
    case DELETE_ADMIN_ORDERS_REQUEST: {
      return {
        ...state,
        ordersLoading: true,
      };
    }

    case DELETE_ADMIN_USER_REVIEWS_REQUEST: {
      return {
        ...state,
        userReviewsLoading: true,
      };
    }

    case DELETE_ADMIN_BLOGS_COMMENTS_REQUEST: {
      return {
        ...state,
        blogCommentsLoading: true,
      };
    }

    case DELETE_ADMIN_BLOGS_REPLY_COMMENTS_REQUEST: {
      return {
        ...state,
        blogReplyCommentsLoading: true,
      };
    }

    case GET_ADMIN_MESSAGES_REQUEST: {
      return {
        ...state,
        messagesLoading: true,
      };
    }

    case GET_ADMIN_MESSAGES_SUCCESS: {
      return {
        ...state,
        messages: action.payload,
        messagesLoading: false,
      };
    }

    case GET_ADMIN_MESSAGES_FAIL: {
      return {
        ...state,
        messagesLoading: false,
      };
    }

    default:
      return state;
  }
};

export default AdminReducers;
