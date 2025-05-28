import DesktopSideMenu from "./Navigation/DesktopSideMenu";
import DashBoardNavbar from "./Navigation/DashBoardNavbar";
import Container from "./Container/Container";


const Home = () => {
  return (
    <div>
      <section className="min-h-screen "
        style={{
          backgroundImage:
            'url("https://raw.githubusercontent.com/nabeelahmad/MZA-TECH/main/bgimg.jpeg")',
          backgroundSize: 'cover',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      >
        <DesktopSideMenu />
        <DashBoardNavbar />
        <Container />
      </section>
    </div>
  );
};

export default Home;
