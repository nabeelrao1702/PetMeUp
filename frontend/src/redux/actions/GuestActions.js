import {
  GET_ALL_GUEST_JOBS_SUCCESS,
  GET_ALL_GUEST_PET_PROFILES_SUCCESS,
  GET_ALL_GUEST_USERS_SUCCESS,
  GET_GUEST_REVIEWS_SUCCESS,
  GET_ALL_GUEST_JOBS_FAIL,
  GET_ALL_GUEST_JOBS_REQUEST,
  GET_ALL_GUEST_PET_PROFILES_FAIL,
  GET_ALL_GUEST_PET_PROFILES_REQUEST,
  GET_ALL_GUEST_USERS_FAIL,
  GET_ALL_GUEST_USERS_REQUEST,
  GET_GUEST_REVIEWS_FAIL,
  GET_GUEST_REVIEWS_REQUEST,
} from "./types";
import axios from "axios";
import { BASE_URL } from "../../config/constant";
import { headers } from "../config";

export const GetGuestJobs = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_GUEST_JOBS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/job/guest-jobs`, headers)
      .then((response) => {
        dispatch({
          type: GET_ALL_GUEST_JOBS_SUCCESS,
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
          type: GET_ALL_GUEST_JOBS_FAIL,
        });
      });
  };
};

export const GetGuestUsers = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_GUEST_USERS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/user/guest-users`, headers)
      .then((response) => {
        dispatch({
          type: GET_ALL_GUEST_USERS_SUCCESS,
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
          type: GET_ALL_GUEST_USERS_FAIL,
        });
      });
  };
};

export const GetGuestPetProfiles = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_ALL_GUEST_PET_PROFILES_REQUEST,
    });
    axios
      .get(`${BASE_URL}/user/guest-petprofiles`, headers)
      .then((response) => {
        dispatch({
          type: GET_ALL_GUEST_PET_PROFILES_SUCCESS,
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
          type: GET_ALL_GUEST_PET_PROFILES_FAIL,
        });
      });
  };
};

/* Get Reviews and Ratings */
export const GetReviews = (toast) => {
  return (dispatch) => {
    dispatch({
      type: GET_GUEST_REVIEWS_REQUEST,
    });
    axios
      .get(`${BASE_URL}/gig/getGuestReviews`, headers)
      .then((response) => {
        dispatch({
          type: GET_GUEST_REVIEWS_SUCCESS,
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
          type: GET_GUEST_REVIEWS_FAIL,
          payload: error,
        });
      });
  };
};
