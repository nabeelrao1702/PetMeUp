
import PetProfilesFilterDesktop from "./PetProfilesFilterDesktop";
import { Outlet } from "react-router-dom";

const PetProfilesList = () => {
  return (
    <div>
      <PetProfilesFilterDesktop />
      <Outlet />
    </div>
  );
};

export default PetProfilesList;
