import Header from "./Header";
import UsersCategories from "./UsersCategories";
import Features from "./Features";
import Testimonials from "./Testimonials";
import NonExoticCategories from "./NonExoticCategories";

const HomePage = () => {
  return (
    <div>
      <Header />
      <UsersCategories />
      <NonExoticCategories />
      <Features />
      <Testimonials />
    </div>
  );
};
export default HomePage;
