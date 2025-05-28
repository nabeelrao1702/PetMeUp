import { combineReducers } from "redux";
import AdminReducers from "./AdminReducers";
import DoctorReducers from "./DoctorReducers";
import UserReducers from "./UserReducers";
import GuestReducers from "./GuestReducers";
const rootReducer = combineReducers({
  doctorData: DoctorReducers,
  userData: UserReducers,
  adminData: AdminReducers,
  guestData: GuestReducers,
});

export default rootReducer;
