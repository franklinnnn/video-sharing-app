import Search from "./Search";
import NavbarLogo from "./NavbarLogo";
import NavbarUser from "./NavbarUser";
import { ToastContainer, Slide } from "react-toastify";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full grid grid-cols-6 items-center justify-center h-20 gap-2 md:gap-6 px-2 md:px-8 border-b-2 border-gray-1 bg-white py-2 z-20">
      <NavbarLogo />
      <Search />
      <NavbarUser />

      <ToastContainer
        position="top-center"
        autoClose={2500}
        hideProgressBar={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        transition={Slide}
        theme="light"
      />
    </div>
  );
};

export default Navbar;
