import axios from "axios";
import { BASE_URL } from "../../config/constant";
import { headers } from "../config";
import {
  ADD_PET_PROFILES_FAIL,
  GET_ALL_USER_PET_PROFILES_SUCCESS,
  GET_ALL_USER_PET_PROFILES_FAIL,
  GET_ALL_USER_PET_PROFILES_REQUEST,
  ADD_PET_PROFILES_SUCCESS,
  userAuth,
  UPDATE_PET_PROFILES_SUCCESS,
  UPDATE_PET_PROFILES_FAIL,
  UPDATE_PET_PROFILES_REQUEST,
  COMPLETE_USER_PROFILE_SUCCESS,
  COMPLETE_USER_PROFILE_FAIL,
  GET_ALL_USER_JOBS_SUCCESS,
  GET_ALL_USER_JOBS_REQUEST,
  GET_ALL_USER_JOBS_FAIL,
  CREATE_NEW_BLOG_FAIL,
  CREATE_NEW_BLOG_SUCCESS,
  CREATE_NEW_BLOG_REQUEST,
  UPDATE_BLOG_SUCCESS,
  UPDATE_BLOG_FAIL,
  UPDATE_BLOG_REQUEST,
  USER_PROPOSAL_SENT_SUCCESS,
  USER_PROPOSAL_SENT_FAIL,
  USER_PROPOSAL_SENT_REQUEST,
  GET_ALL_USER_ORDERS_SUCCESS,
  GET_ALL_USER_ORDERS_FAIL,
  GET_ALL_USER_ORDERS_REQUEST,
  GET_ALL_USER_BLOGS_SUCCESS,
  GET_ALL_USER_BLOGS_FAIL,
  GET_ALL_USER_BLOGS_REQUEST,
  GET_ALL_USER_REPORTS_FAIL,
  GET_ALL_USER_REPORTS_SUCCESS,
  GET_ALL_USER_REPORTS_REQUEST,
  GET_USER_PROFILE_SUCCESS,
  GET_USER_PROFILE_FAIL,
  UPDATE_USER_ACCOUNT_SUCCESS,
  UPDATE_USER_ACCOUNT_FAIL,
  DELETE_USER_ACCOUNT_SUCCESS,
  DELETE_USER_ACCOUNT_FAIL,
  FORGET_USER_PASSWORD_SUCCESS,
  FORGET_USER_PASSWORD_FAIL,
  VERIFY_USER_TOKEN_SUCCESS,
  VERIFY_USER_TOKEN_FAIL,
  RESET_USER_PASSWORD_SUCCESS,
  RESET_USER_PASSWORD_FAIL,
  GET_MY_USER_BLOGS_SUCCESS,
  GET_MY_USER_BLOGS_FAIL,
  GET_MY_USER_BLOGS_REQUEST,
  GET_ALL_MY_PET_PROFILES_SUCCESS,
  GET_ALL_MY_PET_PROFILES_FAIL,
  GET_ALL_MY_PET_PROFILES_REQUEST,
  DELETE_BLOG_SUCCESS,
  DELETE_BLOG_FAIL,
  DELETE_BLOG_REQUEST,
  DELETE_PET_PROFILES_SUCCESS,
  DELETE_PET_PROFILES_FAIL,
  DELETE_PET_PROFILES_REQUEST,
  USER_PET_PROFILE_PROPOSAL_SENT_SUCCESS,
  USER_PET_PROFILE_PROPOSAL_SENT_FAIL,
  USER_PET_PROFILE_PROPOSAL_SENT_REQUEST,
  GET_ALL_SUBMITTED_PET_PROFILES_REQUESTS_SUCCESS,
  GET_ALL_SUBMITTED_PET_PROFILES_REQUESTS_FAIL,
  GET_ALL_SUBMITTED_PET_PROFILES_REQUESTS_REQUEST,
  GET_ALL_RECEIVED_PET_PROFILES_REQUESTS_SUCCESS,
  GET_ALL_RECEIVED_PET_PROFILES_REQUESTS_FAIL,
  GET_ALL_RECEIVED_PET_PROFILES_REQUESTS_REQUEST,
  USER_PET_PROFILE_PROPOSAL_UPDATE_SUCCESS,
  USER_PET_PROFILE_PROPOSAL_UPDATE_FAIL,
  USER_PET_PROFILE_PROPOSAL_UPDATE_REQUEST,
  DELETE_PET_PROFILE_REQUEST_SUCCESS,
  DELETE_PET_PROFILE_REQUEST_FAIL,
  DELETE_PET_PROFILE_REQUEST_REQUEST,
  ACCEPT_REQUEST_SUCCESS,
  ACCEPT_REQUEST_FAIL,
  ACCEPT_REQUEST_REQUEST,
  REJECT_REQUEST_SUCCESS,
  REJECT_REQUEST_FAIL,
  REJECT_REQUEST_REQUEST,
  READ_USER_NOTIFICATION_SUCCESS,
  READ_USER_NOTIFICATION_FAIL,
  READ_USER_NOTIFICATION_REQUEST,
  GET_ALL_USER_PET_PROFILES_ORDERS_SUCCESS,
  GET_ALL_USER_PET_PROFILES_ORDERS_FAIL,
  GET_ALL_USER_PET_PROFILES_ORDERS_REQUEST,
  SEND_OTP_SUCCESS,
  SEND_OTP_FAIL,
  SEND_OTP_REQUEST,
  VERIFY_EMAIL_SUCCESS,
  VERIFY_EMAIL_FAIL,
  CREATE_NEW_BLOG_REPLY_COMMENT_USER_SUCCESS,
  CREATE_NEW_BLOG_REPLY_COMMENT_USER_FAIL,
  CREATE_NEW_BLOG_REPLY_COMMENT_USER_REQUEST,
  GET_USER_REVIEWS_SUCCESS,
  GET_USER_REVIEWS_FAIL,
  GET_USER_REVIEWS_REQUEST,
  GET_USER_ALL_REVIEWS_SUCCESS,
  GET_USER_ALL_REVIEWS_FAIL,
  GET_USER_ALL_REVIEWS_REQUEST,
  GET_ALL_JOBS_PROPOSALS_FOR_USER_SUCCESS,
  GET_ALL_JOBS_PROPOSALS_FOR_USER_FAIL,
  GET_ALL_JOBS_PROPOSALS_FOR_USER_REQUEST,
  DELETE_JOB_PROPOSAL_SUCCESS,
  DELETE_JOB_PROPOSAL_FAIL,
  DELETE_JOB_PROPOSAL_REQUEST,
  EDIT_PROPOSAL_SUCCESS,
  EDIT_PROPOSAL_FAIL,
  EDIT_PROPOSAL_REQUEST,
  CREATE_NEW_GIG_FAIL,
  CREATE_NEW_GIG_SUCCESS,
  CREATE_NEW_GIG_REQUEST,
  EDIT_GIG_FAIL,
  EDIT_GIG_SUCCESS,
  EDIT_GIG_REQUEST,
  DELETE_GIG_FAIL,
  DELETE_GIG_SUCCESS,
  DELETE_GIG_REQUEST,
  GET_MY_GIGS_SUCCESS,
  GET_MY_GIGS_FAIL,
  GET_MY_GIGS_REQUEST,
  ACCEPT_GIG_ORDER_SUCCESS,
  ACCEPT_GIG_ORDER_FAIL,
  ACCEPT_GIG_ORDER_REQUEST,
  FORGET_USER_PASSWORD_REQUEST,
  GET_USER_PROFILE_REQUEST,
  COMPLETE_USER_PROFILE_REQUEST,
  UPDATE_USER_ACCOUNT_REQUEST,
  RESET_USER_PASSWORD_REQUEST,
  VERIFY_USER_TOKEN_REQUEST,
  VERIFY_EMAIL_REQUEST,
  DELETE_USER_ACCOUNT_REQUEST,
  DELETE_USER_PAYMENT_SUCCESS,
  DELETE_USER_PAYMENT_FAIL,
  DELETE_USER_PAYMENT_REQUEST,
  ADD_USER_PAYMENT_REQUEST,
  ADD_USER_PAYMENT_SUCCESS,
  ADD_USER_PAYMENT_FAIL,
  GET_USER_PAYMENT_REQUEST,
  GET_USER_PAYMENT_SUCCESS,
  GET_USER_PAYMENT_FAIL,
  ADD_PET_PROFILES_REQUEST,
  CREATE_NEW_USER_CONVERSATION_SUCCESS,
  CREATE_NEW_USER_CONVERSATION_FAIL,
  CREATE_NEW_USER_CONVERSATION_REQUEST,
  GET_USER_MESSAGES_SUCCESS,
  GET_USER_MESSAGES_FAIL,
  GET_USER_MESSAGES_REQUEST,
} from "./types";

// USER Registration
export const RegisterUser = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: userAuth.USER_SIGN_UP_REQUEST,
    });
    axios
      .post(`${BASE_URL}/user/register`, payload, {
        headers: headers,
      })
      .then((response) => {
        navigate(`/user/create-user-profile/${response.data._id}`);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("authID", response.data._id);
        toast.success("Signed Up Successfully", {
          theme: "colored",
        });
        dispatch({
          type: userAuth.USER_SIGN_UP_SUCCESS,
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
          type: userAuth.USER_SIGN_UP_FAIL,
        });
      });
  };
};

export const LoginUser = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: userAuth.USER_LOG_IN_REQUEST,
    });
    axios
      .post(`${BASE_URL}/user/login`, payload, headers)
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("authID", response.data._id);
        toast.success("Logged In Successfully", {
          theme: "colored",
        });
        dispatch({
          type: userAuth.USER_LOG_IN_SUCCESS,
          payload: response.data,
        });
        if (response.status === 200 && localStorage.getItem("token")) {
          navigate("/user/user-dashboard");
        }
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
          type: userAuth.USER_LOG_IN_FAIL,
        });
      });
  };
};

// user LogOUT
export const logoutUser = (navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: userAuth.USER_LOGOUT_REQUEST,
    });
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("authID");
    toast.success("Logged Out Successfully", {
      theme: "colored",
    });
    dispatch({
      type: userAuth.USER_LOGOUT_SUCCESS,
    });
    setTimeout(function () {
      window.location.reload();
    }, 400);
  };
};

// Forget user Password
export const ForgetUserPassword = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: FORGET_USER_PASSWORD_REQUEST,
    });
    axios
      .post(`${BASE_URL}/user/forgot-password`, payload, {
        headers: headers,
      })
      .then((response) => {
        navigate("/login-type");
        toast.success("Reset Password Link sent to your email", {
          theme: "colored",
        });
        dispatch({
          type: FORGET_USER_PASSWORD_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: FORGET_USER_PASSWORD_FAIL,
          payload: error,
        });
      });
  };
};

// Get user Information
export const GetUserInformation = (id, toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_PROFILE_REQUEST,
    });
    axios
      .get(`${BASE_URL}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USER_PROFILE_SUCCESS,
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
          type: GET_USER_PROFILE_FAIL,
          payload: error,
        });
      });
  };
};

// Complete user Profile
export const CreateUserProfile = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: COMPLETE_USER_PROFILE_REQUEST,
    });
    axios
      .put(`${BASE_URL}/user/profile/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user");
          toast.success("Profile Updated Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: COMPLETE_USER_PROFILE_SUCCESS,
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
          type: COMPLETE_USER_PROFILE_FAIL,
        });
      });
  };
};

// Update user Account
export const UpdateUserAccount = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_USER_ACCOUNT_REQUEST,
    });
    axios
      .put(`${BASE_URL}/user/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        navigate("/user");
        toast.success("Account Updated Successfully", {
          theme: "colored",
        });
        dispatch({
          type: UPDATE_USER_ACCOUNT_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: UPDATE_USER_ACCOUNT_FAIL,
          payload: error,
        });
      });
  };
};

// Reset user Password
export const ResetUserPassword = (token, id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: RESET_USER_PASSWORD_REQUEST,
    });
    axios
      .post(
        `${BASE_URL}/user/reset-password?token=${token}&id=${id}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        navigate("/login-type");
        toast.success("Password Reset Successfully", {
          theme: "colored",
        });

        dispatch({
          type: RESET_USER_PASSWORD_SUCCESS,
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
          type: RESET_USER_PASSWORD_FAIL,
          payload: error,
        });
      });
  };
};

export const verifyResetPasswordToken = (token, id, toast) => {
  return (dispatch) => {
    dispatch({
      type: VERIFY_USER_TOKEN_REQUEST,
    });
    axios
      .get(`${BASE_URL}/user/verify-token?token=${token}&id=${id}`, headers)
      .then((response) => {
        toast.success("Reset Token Verified Successfully", {
          theme: "colored",
        });

        dispatch({
          type: VERIFY_USER_TOKEN_SUCCESS,
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
          type: VERIFY_USER_TOKEN_FAIL,
          payload: error,
        });
      });
  };
};

// Send OTP
export const SendOTP = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: SEND_OTP_REQUEST,
    });
    axios
      .post(
        `${BASE_URL}/user/send-verification-token/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 201) {
          navigate("/user/settings/verification");
          toast.success("OTP is successfully sent to your email", {
            theme: "colored",
          });
        }
        if (response.status === 400) {
          toast.error(response.errorMessage, {
            theme: "colored",
          });
        }
        dispatch({
          type: SEND_OTP_SUCCESS,
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
          type: SEND_OTP_FAIL,
          payload: error,
        });
      });
  };
};

// Verify Email
export const VerifyEmail = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: VERIFY_EMAIL_REQUEST,
    });
    axios
      .post(`${BASE_URL}/user/verify`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/user");
          toast.success("Your Email Has Been Verified Successfully", {
            theme: "colored",
          });
        }
        if (response.status === 400) {
          toast.error(response.errorMessage, {
            theme: "colored",
          });
        }
        dispatch({
          type: VERIFY_EMAIL_SUCCESS,
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
          type: VERIFY_EMAIL_FAIL,
          payload: error,
        });
      });
  };
};

// Delete user Account
export const DeleteUserAccount = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_USER_ACCOUNT_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/user/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/");
          localStorage.removeItem("token");
          localStorage.removeItem("authID");
          toast.success("Account Deleted Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: DELETE_USER_ACCOUNT_SUCCESS,
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
          type: DELETE_USER_ACCOUNT_FAIL,
          payload: error,
        });
      });
  };
};

/* Add payment */
export const addUserPayment = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: ADD_USER_PAYMENT_REQUEST,
    });
    axios
      .post("http://localhost:5000/payment", payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/user/user-dashboard");
          toast.success("Payment Added Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: ADD_USER_PAYMENT_SUCCESS,
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
          type: ADD_USER_PAYMENT_FAIL,
          payload: error,
        });
      });
  };
};

/* get payment */
export const getUserPayment = (id, toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_PAYMENT_REQUEST,
    });
    axios
      .get(`${BASE_URL}/user/user-payment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USER_PAYMENT_SUCCESS,
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
          type: GET_USER_PAYMENT_FAIL,
          payload: error,
        });
      });
  };
};

/* delete payment */
export const deleteUserPayment = (id, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_USER_PAYMENT_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/user/user-payment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Payment Method Deleted Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: DELETE_USER_PAYMENT_SUCCESS,
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
          type: DELETE_USER_PAYMENT_FAIL,
          payload: error,
        });
      });
  };
};

// Add petprofiles
export const AdPetProfiles = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PET_PROFILES_REQUEST,
    });
    axios
      .post(`${BASE_URL}/user/PetProfiles`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/user/user-dashboard/my-pet-profiles");
          toast.success("Pet Profile Added Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: ADD_PET_PROFILES_SUCCESS,
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
          type: ADD_PET_PROFILES_FAIL,
        });
      });
  };
};
// Update PET PROFILEs
export const UpdatePetProfiles = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_PET_PROFILES_REQUEST,
    });
    axios
      .patch(`${BASE_URL}/user/PetProfiles`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-pet-profiles");
          toast.success("Pet Profile Updated Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: UPDATE_PET_PROFILES_SUCCESS,
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
          type: UPDATE_PET_PROFILES_FAIL,
        });
      });
  };
};

// DeletePET PROFILEs
export const DeletePetProfile = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PET_PROFILES_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/user/deletePetProfile/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-pet-profiles");
          toast.success("Pet Profile Deleted Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: DELETE_PET_PROFILES_SUCCESS,
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
          type: DELETE_PET_PROFILES_FAIL,
          payload: error,
        });
      });
  };
};

// Get All Pet Profiles
export const GetMyPetProfiles = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_MY_PET_PROFILES_REQUEST,
    });
    axios
      .get(`${BASE_URL}/user/petProfilesList`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_MY_PET_PROFILES_SUCCESS,
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
          type: GET_ALL_MY_PET_PROFILES_FAIL,
        });
      });
  };
};

// Get All PET PROFILEs
export const GetAllPetProfiles = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_USER_PET_PROFILES_REQUEST,
    });
    axios
      .get(`${BASE_URL}/user/PetProfiles`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_USER_PET_PROFILES_SUCCESS,
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
          type: GET_ALL_USER_PET_PROFILES_FAIL,
        });
      });
  };
};

export const GetAllJobs = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_USER_JOBS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/job`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_USER_JOBS_SUCCESS,
          payload: response.data.response,
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
          type: GET_ALL_USER_JOBS_FAIL,
          payload: error,
        });
      });
  };
};

export const GetAllBlogs = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_USER_BLOGS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/blog/get_user_blogs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_USER_BLOGS_SUCCESS,
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
          type: GET_ALL_USER_BLOGS_FAIL,
          payload: error,
        });
      });
  };
};

/* Get Reviews and Ratings */
export const GetReviews = (id, toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_REVIEWS_REQUEST,
    });

    axios
      .get(`${BASE_URL}/gig/getUserReviews/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USER_REVIEWS_SUCCESS,
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
          type: GET_USER_REVIEWS_FAIL,
          payload: error,
        });
      });
  };
};

/* Get Reviews and Ratings */
export const GetAllReviews = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_ALL_REVIEWS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/gig/getReviews`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USER_ALL_REVIEWS_SUCCESS,
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
          type: GET_USER_ALL_REVIEWS_FAIL,
          payload: error,
        });
      });
  };
};

// Submit Pet profile Request
// Proposals

// Get All Submit pet profile Request For Freelancer who submitted Request
export const GetSubmittedPetProfilesRequests = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_SUBMITTED_PET_PROFILES_REQUESTS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/user/submitted-requests`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_SUBMITTED_PET_PROFILES_REQUESTS_SUCCESS,
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
          type: GET_ALL_SUBMITTED_PET_PROFILES_REQUESTS_FAIL,
          payload: error,
        });
      });
  };
};

export const SubmitPetProfileRequest = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: USER_PET_PROFILE_PROPOSAL_SENT_REQUEST,
    });
    axios
      .post(`${BASE_URL}/user/proposal`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/user/user-dashboard/my-submitted-pet-profiles-requests");
          toast.success("Pet Matting Request Sent Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: USER_PET_PROFILE_PROPOSAL_SENT_SUCCESS,
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
          type: USER_PET_PROFILE_PROPOSAL_SENT_FAIL,
          payload: error,
        });
      });
  };
};

/* update request  */

export const UpdateRequest = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: USER_PET_PROFILE_PROPOSAL_UPDATE_REQUEST,
    });
    axios
      .patch(`${BASE_URL}/user/proposal`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/user/user-dashboard/my-submitted-pet-profiles-requests");
          toast.success("Pet Matting Request Updated Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: USER_PET_PROFILE_PROPOSAL_UPDATE_SUCCESS,
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
          type: USER_PET_PROFILE_PROPOSAL_UPDATE_FAIL,
          payload: error,
        });
      });
  };
};

// Delete Blog
export const DeletePetProfileRequest = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PET_PROFILE_REQUEST_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/user/deleteRequest/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-submitted-pet-profiles-requests");
          toast.success("Pet Matting Request Deleted Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: DELETE_PET_PROFILE_REQUEST_SUCCESS,
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
          type: DELETE_PET_PROFILE_REQUEST_FAIL,
          payload: error,
        });
      });
  };
};

// Get All Submit PET PROFILE Request For user who submitted Request
export const GetReceivedPetProfilesRequests = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_RECEIVED_PET_PROFILES_REQUESTS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/user/received-requests`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_RECEIVED_PET_PROFILES_REQUESTS_SUCCESS,
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
          type: GET_ALL_RECEIVED_PET_PROFILES_REQUESTS_FAIL,
          payload: error,
        });
      });
  };
};

// Accept PET PROFILE
export const acceptPetProfileRequest = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: ACCEPT_REQUEST_REQUEST,
    });
    axios
      .patch(
        `${BASE_URL}/user/proposal/accept/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-pet-profiles-requests");
          toast.success("Request Accepted Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: ACCEPT_REQUEST_SUCCESS,
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
          type: ACCEPT_REQUEST_FAIL,
          payload: error,
        });
      });
  };
};

// Reject Pet Profile
export const rejectPetProfileRequest = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: REJECT_REQUEST_REQUEST,
    });
    axios
      .patch(
        `${BASE_URL}/user/proposal/reject/${id}`,
        {},
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-pet-profiles-requests");
          toast.success("Request Rejected Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: REJECT_REQUEST_SUCCESS,
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
          type: REJECT_REQUEST_FAIL,
          payload: error,
        });
      });
  };
};

// user Blogs

// Get My Blogs in Dashboard
export const GetMyBlogs = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_MY_USER_BLOGS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/blog/getMyBlogs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_MY_USER_BLOGS_SUCCESS,
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
          type: GET_MY_USER_BLOGS_FAIL,
          payload: error,
        });
      });
  };
};

// Ad New Blog
export const addBlog = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_NEW_BLOG_REQUEST,
    });
    axios
      .post(`${BASE_URL}/blog/add_blog`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-blogs");
          toast.success("Story Created Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: CREATE_NEW_BLOG_SUCCESS,
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
          type: CREATE_NEW_BLOG_FAIL,
          payload: error,
        });
      });
  };
};

// Update Blog

export const updateBlog = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_BLOG_REQUEST,
    });
    axios
      .patch(`${BASE_URL}/blog/update_blog/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-blogs");
          toast.success("Story Updated Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: UPDATE_BLOG_SUCCESS,
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
          type: UPDATE_BLOG_FAIL,
          payload: error,
        });
      });
  };
};

// Delete Blog
export const DeleteBlog = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_BLOG_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/blog/deleteblog/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-blogs");
          toast.success("Story Deleted Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: DELETE_BLOG_SUCCESS,
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
          type: DELETE_BLOG_FAIL,
          payload: error,
        });
      });
  };
};

// Proposals

export const GetAllJobsProposalsForUser = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_JOBS_PROPOSALS_FOR_USER_REQUEST,
    });
    axios
      .get(`${BASE_URL}/job/user-proposals`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_JOBS_PROPOSALS_FOR_USER_SUCCESS,
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
          type: GET_ALL_JOBS_PROPOSALS_FOR_USER_FAIL,
          payload: error,
        });
      });
  };
};

export const SendProposal = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: USER_PROPOSAL_SENT_REQUEST,
    });
    axios
      .post(`${BASE_URL}/job/submitProposal`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/user/user-dashboard");
          toast.success("Proposal Sent Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: USER_PROPOSAL_SENT_SUCCESS,
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
          type: USER_PROPOSAL_SENT_FAIL,
          payload: error,
        });
      });
  };
};

// Update Proposal
export const UpdateProposal = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_PROPOSAL_REQUEST,
    });
    axios
      .patch(`${BASE_URL}/job/proposal/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/user/user-dashboard/my-proposals");
          toast.success("Proposal Updated Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: EDIT_PROPOSAL_SUCCESS,
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
          type: EDIT_PROPOSAL_FAIL,
          payload: error,
        });
      });
  };
};

// Delete JOb Proposal with single user
export const DeleteJobProposal = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_JOB_PROPOSAL_REQUEST,
    });

    axios
      .delete(`${BASE_URL}/job/deleteProposal/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-proposals");
          toast.success("Proposal Deleted Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: DELETE_JOB_PROPOSAL_SUCCESS,
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
          type: DELETE_JOB_PROPOSAL_FAIL,
          payload: error,
        });
      });
  };
};

// Get Home Page Orders (USER Dashboard)
export const GetAllOrders = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_USER_ORDERS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/gig/getOrders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_USER_ORDERS_SUCCESS,
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
          type: GET_ALL_USER_ORDERS_FAIL,
          payload: error,
        });
      });
  };
};

// Get All pet profile Order
export const GetPetProfilesOrders = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_USER_PET_PROFILES_ORDERS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/gig/getPetProfilesOrders`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_USER_PET_PROFILES_ORDERS_SUCCESS,
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
          type: GET_ALL_USER_PET_PROFILES_ORDERS_FAIL,
          payload: error,
        });
      });
  };
};

// Get My Report
export const GetMyReports = (toast) => {
  const id = localStorage.getItem("authID");
  return (dispatch) => {
    dispatch({
      type: GET_ALL_USER_REPORTS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/gig/getUserReport/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_USER_REPORTS_SUCCESS,
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
          type: GET_ALL_USER_REPORTS_FAIL,
          payload: error,
        });
      });
  };
};

// Read Notifications USER

export const ReadNotifications = (toast) => {
  return (dispatch) => {
    dispatch({
      type: READ_USER_NOTIFICATION_REQUEST,
    });
    axios
      .get(`${BASE_URL}/notification/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: READ_USER_NOTIFICATION_SUCCESS,
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
          type: READ_USER_NOTIFICATION_FAIL,
          payload: error,
        });
      });
  };
};

export const replyBlogComment = (
  blogId,
  commentId,
  payload,
  navigate,
  toast
) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_NEW_BLOG_REPLY_COMMENT_USER_REQUEST,
    });
    axios
      .post(
        `${BASE_URL}/blog/replycommentuser/${blogId}/${commentId}`,
        payload,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      )
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard");
          toast.success("Reply on Comment Added Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: CREATE_NEW_BLOG_REPLY_COMMENT_USER_SUCCESS,
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
          type: CREATE_NEW_BLOG_REPLY_COMMENT_USER_FAIL,
          payload: error,
        });
      });
  };
};

// Create New Gig
export const CreateGig = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_NEW_GIG_REQUEST,
    });
    axios
      .post(`${BASE_URL}/gig/add_gig`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-gigs");
          toast.success("Doctor Request Added Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: CREATE_NEW_GIG_SUCCESS,
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
          type: CREATE_NEW_GIG_FAIL,
          payload: error,
        });
      });
  };
};

// Get All Gigs created by user himself
export const GetMyGigs = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_MY_GIGS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/gig/myGigs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_MY_GIGS_SUCCESS,
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
          type: GET_MY_GIGS_FAIL,
          payload: error,
        });
      });
  };
};

// Edit Gig
export const EditGig = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_GIG_REQUEST,
    });
    axios
      .patch(`${BASE_URL}/gig/edit_gig/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-gigs");
          toast.success("Doctor Request Updated Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: EDIT_GIG_SUCCESS,
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
          type: EDIT_GIG_FAIL,
        });
      });
  };
};

// Delete Gig
export const DeleteGig = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_GIG_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/gig/delete_gig/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard/my-gigs");
          toast.success("Doctor Request Deleted Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: DELETE_GIG_SUCCESS,
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
          type: DELETE_GIG_FAIL,
          payload: error,
        });
      });
  };
};

// Response to  Gig Order
export const ResponseGigOrder = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: ACCEPT_GIG_ORDER_REQUEST,
    });
    axios
      .patch(`${BASE_URL}/gig/responseOrder/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/user-dashboard");
          toast.success("Doctor Request Accepted Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: ACCEPT_GIG_ORDER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: ACCEPT_GIG_ORDER_FAIL,
          payload: error,
        });
      });
  };
};

// Create New Gig
export const CreateConversation = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_NEW_USER_CONVERSATION_REQUEST,
    });
    axios
      .post(`${BASE_URL}/conversations`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/user/messages");
        }
        dispatch({
          type: CREATE_NEW_USER_CONVERSATION_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        toast.success("Conversation already exists", {
          theme: "colored",
        });
        dispatch({
          type: CREATE_NEW_USER_CONVERSATION_FAIL,
          payload: error,
        });
        navigate("/user/messages");
      });
  };
};

export const GetAllMessages = (toast, id) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_MESSAGES_REQUEST,
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
          type: GET_USER_MESSAGES_SUCCESS,
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
          type: GET_USER_MESSAGES_FAIL,
          payload: error,
        });
      });
  };
};
