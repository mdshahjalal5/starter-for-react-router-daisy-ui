import Banner from "./Banner";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <div className="lg:w-11/12 mx-auto   sticky top-4  z-[1000] mb-10">
      <Navbar></Navbar>
    </div>
  );
};

export default Header;
