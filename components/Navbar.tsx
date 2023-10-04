import Search from "./Search";
import NavbarLogo from "./NavbarLogo";
import NavbarUser from "./NavbarUser";
import { ToastContainer, Slide } from "react-toastify";

const Navbar = () => {
  return (
    <nav className="fixed top-0 w-full grid grid-cols-4 items-center justify-center h-20 gap-2 md:gap-6 px-2 md:px-8 border-b-2 bg-main-light border-primary/20 dark:bg-main-dark dark:border-zinc-200/20 pt-4 pb-2 z-20">
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
    </nav>
  );
};

export default Navbar;
