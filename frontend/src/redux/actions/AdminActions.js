import {
  GET_ADMIN_JOB_PROPOSALS_SUCCESS,
  GET_ADMIN_JOB_PROPOSALS_FAIL,
  GET_ALL_DOCTORS_FAIL,
  GET_ALL_DOCTORS_SUCCESS,
  GET_ALL_USER_FAIL,
  userAuth,
  GET_ALL_ADMIN_PET_PROFILES_SUCCESS,
  GET_ALL_ADMIN_PET_PROFILES_FAIL,
  GET_ALL_USER_SUCCESS,
  GET_ADMIN_ALL_GIGS_SUCCESS,
  GET_ADMIN_ALL_GIGS_FAIL,
  GET_ADMIN_BLOGS_SUCCESS,
  GET_ADMIN_BLOGS_FAIL,
  GET_ADMIN_JOBS_SUCCESS,
  GET_ADMIN_JOBS_FAIL,
  GET_ADMIN_PET_PROFILES_REQUESTS_SUCCESS,
  GET_ADMIN_PET_PROFILES_REQUESTS_FAIL,
  GET_ADMIN_ORDERS_SUCCESS,
  GET_ADMIN_ORDERS_FAIL,
  GET_ADMIN_USER_REVIEWS_SUCCESS,
  GET_ADMIN_USER_REVIEWS_FAIL,
  GET_ADMIN_BLOGS_COMMENTS_SUCCESS,
  GET_ADMIN_BLOGS_COMMENTS_FAIL,
  GET_ADMIN_BLOGS_REPLY_COMMENTS_SUCCESS,
  GET_ADMIN_BLOGS_REPLY_COMMENTS_FAIL,
  DELETE_ADMIN_JOBS_SUCCESS,
  DELETE_ALL_USER_SUCCESS,
  DELETE_ADMIN_JOB_PROPOSALS_SUCCESS,
  DELETE_ALL_ADMIN_PET_PROFILES_SUCCESS,
  DELETE_ALL_DOCTORS_SUCCESS,
  DELETE_ADMIN_ALL_GIGS_SUCCESS,
  DELETE_ADMIN_BLOGS_SUCCESS,
  DELETE_ADMIN_PET_PROFILES_REQUESTS_SUCCESS,
  DELETE_ADMIN_ORDERS_SUCCESS,
  DELETE_ADMIN_ORDERS_FAIL,
  DELETE_ADMIN_USER_REVIEWS_SUCCESS,
  DELETE_ADMIN_BLOGS_COMMENTS_SUCCESS,
  DELETE_ADMIN_BLOGS_REPLY_COMMENTS_SUCCESS,
  DELETE_ADMIN_JOBS_FAIL,
  DELETE_ALL_USER_FAIL,
  DELETE_ADMIN_JOB_PROPOSALS_FAIL,
  DELETE_ALL_ADMIN_PET_PROFILES_FAIL,
  DELETE_ALL_DOCTORS_FAIL,
  DELETE_ADMIN_ALL_GIGS_FAIL,
  DELETE_ADMIN_BLOGS_FAIL,
  DELETE_ADMIN_PET_PROFILES_REQUESTS_FAIL,
  DELETE_ADMIN_USER_REVIEWS_FAIL,
  DELETE_ADMIN_BLOGS_COMMENTS_FAIL,
  DELETE_ADMIN_BLOGS_REPLY_COMMENTS_FAIL,
  GET_ALL_USER_REQUEST,
  GET_ALL_DOCTORS_REQUEST,
  GET_ADMIN_ALL_GIGS_REQUEST,
  GET_ALL_ADMIN_PET_PROFILES_REQUEST,
  GET_ADMIN_JOBS_REQUEST,
  GET_ADMIN_BLOGS_REQUEST,
  GET_ADMIN_JOB_PROPOSALS_REQUEST,
  GET_ADMIN_PET_PROFILES_REQUESTS_REQUEST,
  GET_ADMIN_ORDERS_REQUEST,
  GET_ADMIN_USER_REVIEWS_REQUEST,
  GET_ADMIN_BLOGS_COMMENTS_REQUEST,
  GET_ADMIN_BLOGS_REPLY_COMMENTS_REQUEST,
  DELETE_ALL_USER_REQUEST,
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
  GET_ADMIN_MESSAGES_REQUEST,
  GET_ADMIN_MESSAGES_SUCCESS,
  GET_ADMIN_MESSAGES_FAIL,
} from "./types";
import axios from "axios";
import { BASE_URL } from "../../config/constant";
import { authHeader } from "../config";
import { headers } from "../config";

export const RegisterAdmin = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: userAuth.ADMIN_REGISTRATION_REQUEST,
    });
    axios
      .post(`${BASE_URL}/admin/register`, payload, {
        headers: headers,
      })
      .then((response) => {
        navigate("/admin/admin-dashboard");
        localStorage.setItem("token", response.data.token);
        toast.success("Signed Up Successfully", {
          theme: "colored",
        });
        dispatch({
          type: userAuth.ADMIN_REGISTRATION_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 50);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: userAuth.ADMIN_REGISTRATION_FAIL,
        });
      });
  };
};

// Admin Login
export const LoginAdmin = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: userAuth.ADMIN_LOGIN_REQUEST,
    });
    axios
      .post(`${BASE_URL}/admin/login`, payload, {
        headers: headers,
      })
      .then((response) => {
        navigate("/admin/admin-dashboard");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("authID", response.data._id);
        toast.success("Logged In Successfully", {
          theme: "colored",
        });
        dispatch({
          type: userAuth.ADMIN_LOGIN_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 50);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: userAuth.ADMIN_LOGIN_FAIL,
        });
      });
  };
};

// Admin LogOUT
export const logoutAdmin = (navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: userAuth.ADMIN_LOGOUT_REQUEST,
    });
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("authID");
    toast.success("Logged Out Successfully", {
      theme: "colored",
    });
    dispatch({
      type: userAuth.ADMIN_LOGOUT_SUCCESS,
    });
    setTimeout(function () {
      window.location.reload();
    }, 400);
  };
};

// Get All USERS
export const GetAllUsers = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_USER_REQUEST });
    axios
      .get(`${BASE_URL}/admin/users`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ALL_USER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ALL_USER_FAIL,
        });
      });
  };
};

// Get All DOCTORS
export const GetAllDoctors = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_DOCTORS_REQUEST });
    axios
      .get(`${BASE_URL}/admin/doctors`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ALL_DOCTORS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ALL_DOCTORS_FAIL,
        });
      });
  };
};

// Get All Gigs
export const getAllGigs = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ADMIN_ALL_GIGS_REQUEST });
    axios
      .get(`${BASE_URL}/admin/gigs`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_ALL_GIGS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ADMIN_ALL_GIGS_FAIL,
        });
      });
  };
};

// Get All PET PROFILES
export const GetAllPetProfiles = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ALL_ADMIN_PET_PROFILES_REQUEST });
    axios
      .get(`${BASE_URL}/admin/PetProfiles`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ALL_ADMIN_PET_PROFILES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ALL_ADMIN_PET_PROFILES_FAIL,
        });
      });
  };
};

// Get All Jobs
export const getAllJobs = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ADMIN_JOBS_REQUEST });
    axios
      .get(`${BASE_URL}/admin/jobs`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_JOBS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ADMIN_JOBS_FAIL,
        });
      });
  };
};

// Get All Blogs
export const getAllBlogs = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ADMIN_BLOGS_REQUEST });
    axios
      .get(`${BASE_URL}/admin/blogs`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_BLOGS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ADMIN_BLOGS_FAIL,
        });
      });
  };
};

// Get All Jobs Proposals
export const getAllJobsProposals = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ADMIN_JOB_PROPOSALS_REQUEST });
    axios
      .get(`${BASE_URL}/admin/jobProposals`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_JOB_PROPOSALS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ADMIN_JOB_PROPOSALS_FAIL,
        });
      });
  };
};

// Get All Exchange Skills Requests

export const getAllPetProfilesRequests = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ADMIN_PET_PROFILES_REQUESTS_REQUEST });
    axios
      .get(`${BASE_URL}/admin/pet-profiles-proposals`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_PET_PROFILES_REQUESTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ADMIN_PET_PROFILES_REQUESTS_FAIL,
        });
      });
  };
};

// Get All Orders

export const getAllOrders = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ADMIN_ORDERS_REQUEST });
    axios
      .get(`${BASE_URL}/admin/orders`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_ORDERS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ADMIN_ORDERS_FAIL,
        });
      });
  };
};

// Get All users Reviews

export const getAllUsersReviews = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ADMIN_USER_REVIEWS_REQUEST });
    axios
      .get(`${BASE_URL}/admin/user-reviews`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_USER_REVIEWS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ADMIN_USER_REVIEWS_FAIL,
        });
      });
  };
};

// Get All Blogs Comments

export const getAllBlogsComments = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ADMIN_BLOGS_COMMENTS_REQUEST });
    axios
      .get(`${BASE_URL}/admin/blog-comments`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_BLOGS_COMMENTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ADMIN_BLOGS_COMMENTS_FAIL,
        });
      });
  };
};

// Get All Blogs Reply Comments

export const getAllBlogsReplyComments = (toast) => {
  return (dispatch) => {
    dispatch({ type: GET_ADMIN_BLOGS_REPLY_COMMENTS_REQUEST });
    axios
      .get(`${BASE_URL}/admin/blog-replies`, authHeader)
      .then((response) => {
        dispatch({
          type: GET_ADMIN_BLOGS_REPLY_COMMENTS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: GET_ADMIN_BLOGS_REPLY_COMMENTS_FAIL,
        });
      });
  };
};

/* Delete Actions for Admin */

// Delete User
export const DeleteUser = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ALL_USER_REQUEST });
    axios
      .delete(`${BASE_URL}/admin/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard");
          toast.success("User Deleted Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: DELETE_ALL_USER_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: DELETE_ALL_USER_FAIL,
          payload: error,
        });
      });
  };
};

// Delete DOCTOR
export const DeleteDoctor = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ALL_DOCTORS_REQUEST });
    axios
      .delete(`${BASE_URL}/admin/doctor/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/doctors-list");
          toast.success("Doctor Deleted Successfully ", {
            theme: "colored",
          });
        }
        dispatch({
          type: DELETE_ALL_DOCTORS_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: DELETE_ALL_DOCTORS_FAIL,
          payload: error,
        });
      });
  };
};

// Delete Gig
export const DeleteGig = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ADMIN_ALL_GIGS_REQUEST });
    axios
      .delete(`${BASE_URL}/admin/gig/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/gigs-list");
          toast.success("Doctor Request Deleted Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: DELETE_ADMIN_ALL_GIGS_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: DELETE_ADMIN_ALL_GIGS_FAIL,
          payload: error,
        });
      });
  };
};

// Delete Job
export const DeleteJob = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ADMIN_JOBS_REQUEST });
    axios
      .delete(`${BASE_URL}/admin/job/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/jobs-list");
          toast.success("Doctor Availability Deleted Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: DELETE_ADMIN_JOBS_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: DELETE_ADMIN_JOBS_FAIL,
          payload: error,
        });
      });
  };
};

// Delete petprofiles
export const DeletePetProfiles = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({ type: DELETE_ALL_ADMIN_PET_PROFILES_REQUEST });
    axios
      .delete(`${BASE_URL}/admin/PetProfiles/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/pet-profiles-list");
          toast.success("Pet Profile Successfully Deleted", {
            theme: "colored",
          });
        }
        dispatch({
          type: DELETE_ALL_ADMIN_PET_PROFILES_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: DELETE_ALL_ADMIN_PET_PROFILES_FAIL,
          payload: error,
        });
      });
  };
};

// Delete Blog
export const DeleteBlog = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ADMIN_BLOGS_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/admin/blog/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/blogs-list");
          toast.success("Story Deleted Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: DELETE_ADMIN_BLOGS_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: DELETE_ADMIN_BLOGS_FAIL,
          payload: error,
        });
      });
  };
};

// Delete PetProfilesRequest
export const DeletePetProfilesRequest = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ADMIN_PET_PROFILES_REQUESTS_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/admin/pet-profiles-proposal/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/pet-profiles-request-list");
          toast.success("Pet Matting Request Successfully Deleted", {
            theme: "colored",
          });
        }
        dispatch({
          type: DELETE_ADMIN_PET_PROFILES_REQUESTS_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });

        dispatch({
          type: DELETE_ADMIN_PET_PROFILES_REQUESTS_FAIL,
          payload: error,
        });
      });
  };
};

// Delete Job Proposal
export const DeleteJobProposal = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ADMIN_JOB_PROPOSALS_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/admin/jobProposal/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/job-proposals-list");
          toast.success("Doctor Availability Proposal Successfully Deleted", {
            theme: "colored",
          });
        }

        dispatch({
          type: DELETE_ADMIN_JOB_PROPOSALS_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: DELETE_ADMIN_JOB_PROPOSALS_FAIL,
          payload: error,
        });
      });
  };
};

// Delete Orders
export const DeleteOrder = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ADMIN_ORDERS_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/admin/order/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/orders-list");
          toast.success("Order Successfully Deleted", {
            theme: "colored",
          });
        }

        dispatch({
          type: DELETE_ADMIN_ORDERS_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: DELETE_ADMIN_ORDERS_FAIL,
          payload: error,
        });
      });
  };
};

// Delete USER Review
export const DeleteUserReview = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ADMIN_USER_REVIEWS_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/admin/user-reviews/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/users-reviews-list");
          toast.success("User Review Successfully Deleted", {
            theme: "colored",
          });
        }

        dispatch({
          type: DELETE_ADMIN_USER_REVIEWS_SUCCESS,
          payload: response.data,
        });

        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });

        dispatch({
          type: DELETE_ADMIN_USER_REVIEWS_FAIL,
          payload: error,
        });
      });
  };
};

// Delete Blog Comment
export const DeleteBlogComment = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ADMIN_BLOGS_COMMENTS_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/admin/blog-comment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/blog-comments");
          toast.success("Story Comment Successfully Deleted ", {
            theme: "colored",
          });
        }

        dispatch({
          type: DELETE_ADMIN_BLOGS_COMMENTS_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: DELETE_ADMIN_BLOGS_COMMENTS_FAIL,
          payload: error,
        });
      });
  };
};

// Delete Blog Reply Comment
export const DeleteBlogReplyComment = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_ADMIN_BLOGS_REPLY_COMMENTS_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/admin/blog-replies/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/admin/admin-dashboard/blogs-reply-comments");
          toast.success("Story Reply Successfully Deleted", {
            theme: "colored",
          });
        }

        dispatch({
          type: DELETE_ADMIN_BLOGS_REPLY_COMMENTS_SUCCESS,
          payload: response.data,
        });
        setTimeout(function () {
          window.location.reload();
        }, 400);
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: DELETE_ADMIN_BLOGS_REPLY_COMMENTS_FAIL,
          payload: error,
        });
      });
  };
};

export const GetAllMessages = (toast, id) => {
  return (dispatch) => {
    dispatch({
      type: GET_ADMIN_MESSAGES_REQUEST,
    });
    axios
      .get(`${BASE_URL}/messages/?participants[]=${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ADMIN_MESSAGES_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        const err2 = error.message;
        toast.error(err, {
          theme: "colored",
        });
        toast.error(err2, {
          theme: "colored",
        });
        dispatch({
          type: GET_ADMIN_MESSAGES_FAIL,
          payload: error,
        });
      });
  };
};
