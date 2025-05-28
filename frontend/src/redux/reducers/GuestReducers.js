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
} from "../actions/types";

const INITIAL_STATE = {
  loading: false,
  guestjobs: {},
  guestusers: {},
  guestPetprofiles: {},
  guestReviews: {},
};
const JobReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case GET_ALL_GUEST_JOBS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_ALL_GUEST_JOBS_SUCCESS: {
      return {
        ...state,
        guestjobs: action.payload,
        loading: false,
      };
    }

    case GET_ALL_GUEST_JOBS_FAIL: {
      return {
        ...state,

        loading: false,
      };
    }

    case GET_ALL_GUEST_PET_PROFILES_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_ALL_GUEST_PET_PROFILES_SUCCESS: {
      return {
        ...state,
        guestPetprofiles: action.payload,
        loading: false,
      };
    }

    case GET_ALL_GUEST_PET_PROFILES_FAIL: {
      return {
        ...state,

        loading: false,
      };
    }

    case GET_ALL_GUEST_USERS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_ALL_GUEST_USERS_SUCCESS: {
      return {
        ...state,
        guestusers: action.payload,
        loading: false,
      };
    }

    case GET_ALL_GUEST_USERS_FAIL: {
      return {
        ...state,

        loading: false,
      };
    }

    case GET_GUEST_REVIEWS_REQUEST: {
      return {
        ...state,
        loading: true,
      };
    }

    case GET_GUEST_REVIEWS_SUCCESS: {
      return {
        ...state,
        guestReviews: action.payload,
        loading: false,
      };
    }

    case GET_GUEST_REVIEWS_FAIL: {
      return {
        ...state,
        loading: false,
      };
    }
    default:
      return state;
  }
};

export default JobReducer;
