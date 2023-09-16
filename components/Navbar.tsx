import Search from "./Search";
import NavbarLogo from "./NavbarLogo";
import NavbarUser from "./NavbarUser";

const Navbar = () => {
  return (
    <div className="fixed top-0 w-full grid grid-cols-5 items-center justify-center h-20 gap-6 px-8 border-b-2 border-gray-1 bg-white py-2 z-20">
      <NavbarLogo />
      <Search />
      <NavbarUser />
    </div>
  );
};

export default Navbar;
