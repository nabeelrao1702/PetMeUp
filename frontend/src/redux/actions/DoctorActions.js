import {
  GET_ALL_DOCTORS_SUCCESS,
  userAuth,
  GET_ALL_DOCTORS_FAIL,
  FORGET_DOCTOR_PASSWORD_FAIL,
  FORGET_DOCTOR_PASSWORD_SUCCESS,
  FORGET_DOCTOR_PASSWORD_REQUEST,
  RESET_DOCTOR_PASSWORD_FAIL,
  RESET_DOCTOR_PASSWORD_SUCCESS,
  UPDATE_DOCTOR_PROFILE_SUCCESS,
  UPDATE_DOCTOR_PROFILE_FAIL,
  UPDATE_DOCTOR_ACCOUNT_SUCCESS,
  UPDATE_DOCTOR_ACCOUNT_FAIL,
  DELETE_DOCTOR_ACCOUNT_SUCCESS,
  DELETE_DOCTOR_ACCOUNT_FAIL,
  GET_DOCTOR_PROFILE_SUCCESS,
  GET_DOCTOR_PROFILE_FAIL,
  GET_ALL_DOCTOR_BLOGS_SUCCESS,
  GET_ALL_DOCTOR_BLOGS_FAIL,
  GET_ALL_ORDERS_SUCCESS,
  GET_ALL_ORDERS_FAIL,
  GET_ALL_DOCTOR_REPORTS_SUCCESS,
  GET_ALL_DOCTOR_REPORTS_FAIL,
  READ_DOCTOR_NOTIFICATION_SUCCESS,
  READ_DOCTOR_NOTIFICATION_FAIL,
  VERIFY_DOCTOR_TOKEN_SUCCESS,
  VERIFY_DOCTOR_TOKEN_FAIL,
  CREATE_NEW_BLOG_COMMENT_SUCCESS,
  CREATE_NEW_BLOG_COMMENT_FAIL,
  ADD_PAYMENT_SUCCESS,
  ADD_PAYMENT_FAIL,
  SEND_OTP_DOCTOR_SUCCESS,
  SEND_OTP_DOCTOR_FAIL,
  SEND_OTP_DOCTOR_REQUEST,
  VERIFY_DOCTOR_EMAIL_SUCCESS,
  VERIFY_DOCTOR_EMAIL_FAIL,
  CREATE_NEW_BLOG_REPLY_COMMENT_SUCCESS,
  CREATE_NEW_BLOG_REPLY_COMMENT_FAIL,
  SUBMIT_REVIEW_SUCCESS,
  SUBMIT_REVIEW_FAIL,
  GET_USER_DOCTOR_REVIEWS_SUCCESS,
  GET_USER_DOCTOR_REVIEWS_FAIL,
  DELETE_DOCTOR_ACCOUNT_REQUEST,
  GET_DOCTOR_PROFILE_REQUEST,
  GET_ALL_ORDERS_REQUEST,
  CREATE_NEW_GIG_ORDER_REQUEST,
  CREATE_NEW_GIG_ORDER_SUCCESS,
  CREATE_NEW_GIG_ORDER_FAIL,
  GET_ALL_DOCTOR_BLOGS_REQUEST,
  CREATE_NEW_BLOG_COMMENT_REQUEST,
  CREATE_NEW_BLOG_REPLY_COMMENT_REQUEST,
  SUBMIT_REVIEW_REQUEST,
  GET_ALL_DOCTOR_REPORTS_REQUEST,
  GET_USER_DOCTOR_REVIEWS_REQUEST,
  READ_DOCTOR_NOTIFICATION_REQUEST,
  UPDATE_DOCTOR_ACCOUNT_REQUEST,
  UPDATE_DOCTOR_PROFILE_REQUEST,
  VERIFY_DOCTOR_EMAIL_REQUEST,
  ADD_PAYMENT_REQUEST,
  GET_PAYMENT_REQUEST,
  GET_PAYMENT_SUCCESS,
  GET_PAYMENT_FAIL,
  DELETE_PAYMENT_REQUEST,
  DELETE_PAYMENT_SUCCESS,
  DELETE_PAYMENT_FAIL,
  CREATE_NEW_JOB_FAIL,
  CREATE_NEW_JOB_SUCCESS,
  EDIT_JOB_FAIL,
  EDIT_JOB_SUCCESS,
  DELETE_JOB_FAIL,
  DELETE_JOB_SUCCESS,
  GET_ALL_JOBS_FAIL,
  GET_ALL_JOBS_SUCCESS,
  GET_ALL_JOBS_PROPOSALS_FOR_DOCTOR_SUCCESS,
  GET_ALL_JOBS_PROPOSALS_FOR_DOCTOR_FAIL,
  ACCEPT_PROPOSAL_FAIL,
  ACCEPT_PROPOSAL_SUCCESS,
  REJECT_PROPOSAL_FAIL,
  REJECT_PROPOSAL_SUCCESS,
  CREATE_NEW_JOB_REQUEST,
  EDIT_JOB_REQUEST,
  DELETE_JOB_REQUEST,
  GET_ALL_JOBS_REQUEST,
  GET_ALL_GIGS_FAIL,
  GET_ALL_GIGS_SUCCESS,
  GET_ALL_JOBS_PROPOSALS_FOR_DOCTOR_REQUEST,
  ACCEPT_PROPOSAL_REQUEST,
  REJECT_PROPOSAL_REQUEST,
  GET_ALL_GIGS_REQUEST,
  GET_ALL_USERS_SUCCESS,
  GET_ALL_USERS_FAIL,
  GET_ALL_USERS_REQUEST,
  VERIFY_DOCTOR_TOKEN_REQUEST,
  RESET_DOCTOR_PASSWORD_REQUEST,
  CREATE_NEW_DOCTOR_CONVERSATION_SUCCESS,
  CREATE_NEW_DOCTOR_CONVERSATION_FAIL,
  CREATE_NEW_DOCTOR_CONVERSATION_REQUEST,
  GET_DOCTOR_MESSAGES_SUCCESS,
  GET_DOCTOR_MESSAGES_FAIL,
  GET_DOCTOR_MESSAGES_REQUEST,
  CANCEL_ORDER_REQUEST,
  CANCEL_ORDER_SUCCESS,
  CANCEL_ORDER_FAIL,
} from "./types";
import axios from "axios";
import { BASE_URL } from "../../config/constant";
import { headers } from "../config";

// doctor Registration
export const RegisterDoctor = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: userAuth.DOCTOR_SIGN_UP_REQUEST,
    });
    axios
      .post(`${BASE_URL}/doctor/register`, payload, {
        headers: headers,
      })
      .then((response) => {
        navigate(`/doctor/create-doctor-profile/${response.data._id}`);
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("authID", response.data._id);
        toast.success("Sign Up Successfully", {
          theme: "colored",
        });
        dispatch({
          type: userAuth.DOCTOR_SIGN_UP_SUCCESS,
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
          type: userAuth.DOCTOR_SIGN_UP_FAIL,
        });
      });
  };
};

// DOCTOR Login
export const LoginDoctor = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: userAuth.DOCTOR_LOGIN_REQUEST,
    });
    axios
      .post(`${BASE_URL}/doctor/login`, payload, {
        headers: headers,
      })
      .then((response) => {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("authID", response.data._id);
        toast.success("Logged In Successfully", {
          theme: "colored",
        });
        dispatch({
          type: userAuth.DOCTOR_LOGIN_SUCCESS,
          payload: response.data,
        });
        if (response.status === 200 && localStorage.getItem("token")) {
          navigate("/doctor/doctor-dashboard");
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
          type: userAuth.DOCTOR_LOGIN_FAIL,
        });
      });
  };
};

// DOCTOR LogOUT
export const logoutDoctor = (navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: userAuth.DOCTOR_LOGOUT_REQUEST,
    });
    navigate("/");
    localStorage.removeItem("token");
    localStorage.removeItem("authID");
    toast.success("Logged Out Successfully", {
      theme: "colored",
    });
    dispatch({
      type: userAuth.DOCTOR_LOGOUT_SUCCESS,
    });
    setTimeout(function () {
      window.location.reload();
    }, 400);
  };
};

// Get All Orders
export const GetAllOrders = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_ORDERS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/gig/getOngoingOrderDoctor`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_ORDERS_SUCCESS,
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
          type: GET_ALL_ORDERS_FAIL,
          payload: error,
        });
      });
  };
};

// Create Gig Order
export const CreateGigOrder = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_NEW_GIG_ORDER_REQUEST,
    });
    axios
      .post(`${BASE_URL}/gig/create_order/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/doctor/doctor-dashboard");
          toast.success("Doctor Request Created Successfully", {
            theme: "colored",
          });
        }
        if (response.status === 403) {
          toast.error(response.errorMessage, {
            theme: "colored",
          });
        }
        dispatch({
          type: CREATE_NEW_GIG_ORDER_SUCCESS,
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
        navigate("/doctor/settings/add-payment");

        dispatch({
          type: CREATE_NEW_GIG_ORDER_FAIL,
          payload: error,
        });
      });
  };
};

// Read Notifications Doctor

export const ReadNotifications = (toast) => {
  return (dispatch) => {
    dispatch({
      type: READ_DOCTOR_NOTIFICATION_REQUEST,
    });
    axios
      .get(`${BASE_URL}/notification`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: READ_DOCTOR_NOTIFICATION_SUCCESS,
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
          type: READ_DOCTOR_NOTIFICATION_FAIL,
          payload: error,
        });
      });
  };
};

// Get Blogs For Doctor
export const GetAllBlogsDoctor = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_DOCTOR_BLOGS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/blog/get_all_blogs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_DOCTOR_BLOGS_SUCCESS,
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
          type: GET_ALL_DOCTOR_BLOGS_FAIL,
          payload: error,
        });
      });
  };
};

// Get All doctor Reports
export const GetDoctorReport = (toast) => {
  const id = localStorage.getItem("authID");
  return (dispatch) => {
    dispatch({
      type: GET_ALL_DOCTOR_REPORTS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/gig/getDoctorReoprt/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_DOCTOR_REPORTS_SUCCESS,
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
          type: GET_ALL_DOCTOR_REPORTS_FAIL,
          payload: error,
        });
      });
  };
};

// Get All Doctors
export const GetAllDoctors = (id) => {
  return (dispatch) => {
    axios
      .get(`${BASE_URL}/job/proposal/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_DOCTORS_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: GET_ALL_DOCTORS_FAIL,
          payload: error,
        });
      });
  };
};

// Get DOCTOR Information
export const GetDoctorInformation = (id, toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_DOCTOR_PROFILE_REQUEST,
    });
    axios
      .get(`${BASE_URL}/doctor/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_DOCTOR_PROFILE_SUCCESS,
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
          type: GET_DOCTOR_PROFILE_FAIL,
          payload: error,
        });
      });
  };
};
// Update doctor Account
export const UpdateDoctorAccount = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DOCTOR_ACCOUNT_REQUEST,
    });

    axios
      .put(`${BASE_URL}/doctor/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/doctor");
          toast.success("Account Updated Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: UPDATE_DOCTOR_ACCOUNT_SUCCESS,
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
          type: UPDATE_DOCTOR_ACCOUNT_FAIL,
          payload: error,
        });
      });
  };
};

// Update doctor Profile
export const UpdateDoctorProfile = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: UPDATE_DOCTOR_PROFILE_REQUEST,
    });
    axios
      .put(`${BASE_URL}/doctor/profile/${id}`, payload, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/doctor");
          toast.success("Profile Updated Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: UPDATE_DOCTOR_PROFILE_SUCCESS,
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
          type: UPDATE_DOCTOR_PROFILE_FAIL,
        });
      });
  };
};

// Forget doctor Password
export const ForgetDoctorPassword = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: FORGET_DOCTOR_PASSWORD_REQUEST,
    });
    axios
      .post(`${BASE_URL}/doctor/forgot-password`, payload, {
        headers: headers,
      })
      .then((response) => {
        navigate("/login-type");
        toast.success("Reset Password Link sent to your email", {
          theme: "colored",
        });
        dispatch({
          type: FORGET_DOCTOR_PASSWORD_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: FORGET_DOCTOR_PASSWORD_FAIL,
          payload: error,
        });
      });
  };
};

// Email Verification
export const EmailVerification = (id, payload, navigate, toast) => {
  return (dispatch) => {
    axios
      .post(`${BASE_URL}/doctor/${id}`, payload, {
        headers: headers,
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("user/create-doctor-profile");
          localStorage.setItem("token", response.data.token);
          toast.success("Sign Up Successfully", {
            theme: "colored",
          });
        }
        if (response.status === 403) {
          toast.error(response.errorMessage, {
            theme: "colored",
          });
        }
        dispatch({
          type: userAuth.DOCTOR_SIGN_UP_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        dispatch({
          type: userAuth.DOCTOR_SIGN_UP_FAIL,
        });
      });
  };
};

// Reset dOCTOR Password
export const ResetDoctorPassword = (token, id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: RESET_DOCTOR_PASSWORD_REQUEST,
    });
    axios
      .post(
        `${BASE_URL}/doctor/reset-password?token=${token}&id=${id}`,
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
          type: RESET_DOCTOR_PASSWORD_SUCCESS,
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
          type: RESET_DOCTOR_PASSWORD_FAIL,
          payload: error,
        });
      });
  };
};

export const verifyResetPasswordToken = (token, id, toast) => {
  return (dispatch) => {
    dispatch({
      type: VERIFY_DOCTOR_TOKEN_REQUEST,
    });
    axios
      .get(`${BASE_URL}/doctor/verify-token?token=${token}&id=${id}`, headers)
      .then((response) => {
        toast.success("Reset Token Verified Successfully", {
          theme: "colored",
        });

        dispatch({
          type: VERIFY_DOCTOR_TOKEN_SUCCESS,
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
          type: VERIFY_DOCTOR_TOKEN_FAIL,
          payload: error,
        });
      });
  };
};

// Delete Account
export const DeleteDoctorAccount = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_DOCTOR_ACCOUNT_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/doctor/${id}`, {
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
          type: DELETE_DOCTOR_ACCOUNT_SUCCESS,
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
          type: DELETE_DOCTOR_ACCOUNT_FAIL,
          payload: error,
        });
      });
  };
};

export const addBlogComment = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_NEW_BLOG_COMMENT_REQUEST,
    });
    axios
      .post(`${BASE_URL}/blog/comment/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/doctor/doctor-dashboard");
          toast.success("Comment Added on Story Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: CREATE_NEW_BLOG_COMMENT_SUCCESS,
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
          type: CREATE_NEW_BLOG_COMMENT_FAIL,
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
      type: CREATE_NEW_BLOG_REPLY_COMMENT_REQUEST,
    });
    axios
      .post(`${BASE_URL}/blog/replycomment/${blogId}/${commentId}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/doctor/doctor-dashboard");
          toast.success("Reply on Comment Added Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: CREATE_NEW_BLOG_REPLY_COMMENT_SUCCESS,
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
          type: CREATE_NEW_BLOG_REPLY_COMMENT_FAIL,
          payload: error,
        });
      });
  };
};

// Send OTP
export const SendOTP = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: SEND_OTP_DOCTOR_REQUEST,
    });
    axios
      .post(
        `${BASE_URL}/doctor/send-verification-token/${id}`,
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
          navigate("/doctor/settings/verification");
          toast.success("OTP is successfully sent to your email", {
            theme: "colored",
          });
        }
        dispatch({
          type: SEND_OTP_DOCTOR_SUCCESS,
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
          type: SEND_OTP_DOCTOR_FAIL,
          payload: error,
        });
      });
  };
};

// Verify Email
export const VerifyEmail = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: VERIFY_DOCTOR_EMAIL_REQUEST,
    });
    axios
      .post(`${BASE_URL}/doctor/verify`, payload, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/doctor");
          toast.success("Your Email Has Been Verified Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: VERIFY_DOCTOR_EMAIL_SUCCESS,
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
          type: VERIFY_DOCTOR_EMAIL_FAIL,
          payload: error,
        });
      });
  };
};

export const submitReview = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: SUBMIT_REVIEW_REQUEST,
    });
    axios
      .post(`${BASE_URL}/gig/Reviews/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/doctor/doctor-dashboard");
          toast.success("Review Submitted Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: SUBMIT_REVIEW_SUCCESS,
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
          type: SUBMIT_REVIEW_FAIL,
          payload: error,
        });
      });
  };
};

/* Get Reviews and Ratings */
export const GetReviews = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_USER_DOCTOR_REVIEWS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/gig/getUserReviews`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_USER_DOCTOR_REVIEWS_SUCCESS,
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
          type: GET_USER_DOCTOR_REVIEWS_FAIL,
          payload: error,
        });
      });
  };
};

/* Add payment */
export const addPayment = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: ADD_PAYMENT_REQUEST,
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
          navigate("/doctor/doctor-dashboard");
          toast.success("Payment Added Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: ADD_PAYMENT_SUCCESS,
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
          type: ADD_PAYMENT_FAIL,
          payload: error,
        });
      });
  };
};

/* Add payment */
export const getPayment = (id, toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_PAYMENT_REQUEST,
    });
    axios
      .get(`${BASE_URL}/doctor/doctor-payment/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_PAYMENT_SUCCESS,
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
          type: GET_PAYMENT_FAIL,
          payload: error,
        });
      });
  };
};

/* Add payment */
export const deletePayment = (id, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_PAYMENT_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/doctor/doctor-payment/${id}`, {
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
          type: DELETE_PAYMENT_SUCCESS,
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
          type: DELETE_PAYMENT_FAIL,
          payload: error,
        });
      });
  };
};

// Create New Job
export const CreateJob = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_NEW_JOB_REQUEST,
    });
    axios
      .post(`${BASE_URL}/job`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 201) {
          navigate("/doctor/doctor-dashboard/my-posted-projects");
          toast.success("Doctor availability form Created Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: CREATE_NEW_JOB_SUCCESS,
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
          type: CREATE_NEW_JOB_FAIL,
          payload: error,
        });
      });
  };
};

// Edit Job
export const UpdateJob = (id, payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: EDIT_JOB_REQUEST,
    });
    axios
      .patch(`${BASE_URL}/job/${id}`, payload, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          navigate("/doctor/doctor-dashboard/my-posted-projects");
          toast.success("Doctor availability form Updated Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: EDIT_JOB_SUCCESS,
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
          type: EDIT_JOB_FAIL,
          payload: error,
        });
      });
  };
};

// Delete JOb
export const DeleteJob = (id, toast) => {
  return (dispatch) => {
    dispatch({
      type: DELETE_JOB_REQUEST,
    });
    axios
      .delete(`${BASE_URL}/job/${id}`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        if (response.status === 200) {
          toast.success("Doctor availability form Deleted Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: DELETE_JOB_SUCCESS,
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
          type: DELETE_JOB_FAIL,
          payload: error,
        });
      });
  };
};

// Get All Jobs
export const GetAllJobs = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_JOBS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/job/my-jobs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_JOBS_SUCCESS,
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
          type: GET_ALL_JOBS_FAIL,
          payload: error,
        });
      });
  };
};

// Proposals

// Get All Jobs Proposals For Doctor
export const GetAllJobsProposalsForDoctor = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_JOBS_PROPOSALS_FOR_DOCTOR_REQUEST,
    });
    axios
      .get(`${BASE_URL}/job/doctor-proposals`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_JOBS_PROPOSALS_FOR_DOCTOR_SUCCESS,
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
          type: GET_ALL_JOBS_PROPOSALS_FOR_DOCTOR_FAIL,
          payload: error,
        });
      });
  };
};

// Accept Proposal
export const AcceptProposal = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: ACCEPT_PROPOSAL_REQUEST,
    });
    axios
      .patch(
        `${BASE_URL}/job/proposal/accept/${id}`,
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
          navigate("/doctor/doctor-dashboard");
          toast.success("Doctor availability form Accepted Successfully", {
            theme: "colored",
          });
        }

        dispatch({
          type: ACCEPT_PROPOSAL_SUCCESS,
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
        navigate("/doctor/settings/add-payment");
        dispatch({
          type: ACCEPT_PROPOSAL_FAIL,
          payload: error,
        });
      });
  };
};

// Reject Proposal
export const RejectProposal = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: REJECT_PROPOSAL_REQUEST,
    });
    axios
      .patch(
        `${BASE_URL}/job/proposal/reject/${id}`,
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
          navigate("/doctor/doctor-dashboard/project-proposals");
          toast.success("Doctor availability form Rejected Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: REJECT_PROPOSAL_SUCCESS,
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
          type: REJECT_PROPOSAL_FAIL,
          payload: error,
        });
      });
  };
};

// Get All Gigs with doctor
export const GetAllGigs = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_GIGS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/gig/get_gigs`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_GIGS_SUCCESS,
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
          type: GET_ALL_GIGS_FAIL,
          payload: error,
        });
      });
  };
};

export const GetAllUser = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_USERS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/user`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + localStorage.getItem("token"),
        },
      })
      .then((response) => {
        dispatch({
          type: GET_ALL_USERS_SUCCESS,
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
          type: GET_ALL_USERS_FAIL,
          payload: error,
        });
      });
  };
};

export const CreateConversation = (payload, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: CREATE_NEW_DOCTOR_CONVERSATION_REQUEST,
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
          navigate("/doctor/messages");
        }
        dispatch({
          type: CREATE_NEW_DOCTOR_CONVERSATION_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        toast.success("Conversation already exists", {
          theme: "colored",
        });
        dispatch({
          type: CREATE_NEW_DOCTOR_CONVERSATION_FAIL,
          payload: error,
        });
        navigate("/doctor/messages");
      });
  };
};

export const GetAllMessages = (toast, id) => {
  return (dispatch) => {
    dispatch({
      type: GET_DOCTOR_MESSAGES_REQUEST,
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
          type: GET_DOCTOR_MESSAGES_SUCCESS,
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
          type: GET_DOCTOR_MESSAGES_FAIL,
          payload: error,
        });
      });
  };
};

/* CANCEL ORDER */
export const cancelOrder = (id, navigate, toast) => {
  return (dispatch) => {
    dispatch({
      type: CANCEL_ORDER_REQUEST,
    });
    axios
      .patch(
        `${BASE_URL}/gig/cancelOrder/${id}`,
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
          navigate("/doctor/doctor-dashboard");
          toast.success("Cancelled Successfully", {
            theme: "colored",
          });
        }
        dispatch({
          type: CANCEL_ORDER_SUCCESS,
          payload: response.data,
        });
      })
      .catch((error) => {
        const err = error.response.data.errorMessage;
        toast.error(err, {
          theme: "colored",
        });
        dispatch({
          type: CANCEL_ORDER_FAIL,
          payload: error,
        });
      });
  };
};
