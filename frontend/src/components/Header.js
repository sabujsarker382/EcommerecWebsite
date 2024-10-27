import React, { useContext, useState } from "react";
import { GrSearch } from "react-icons/gr";
import { FaUserCircle, FaShoppingCart } from "react-icons/fa"; // Replaced FaRegCircleUser with FaUserCircle
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import SummaryApi from "../common";
import { toast } from "react-toastify";
import { setUserDetails } from "../store/userSlice";
import ROLE from "../common/role";
import Context from "../context";

const Header = () => {
  const user = useSelector((state) => state?.user?.user);
  const dispatch = useDispatch();
  const [menuDisplay, setMenuDisplay] = useState(false);
  const context = useContext(Context);
  const navigate = useNavigate();
  const searchInput = useLocation();
  const URLSearch = new URLSearchParams(searchInput?.search);
  const searchQuery = URLSearch.getAll("q");
  const [search, setSearch] = useState(searchQuery);

  const handleLogout = async () => {
    const fetchData = await fetch(SummaryApi.logout_user.url, {
      method: SummaryApi.logout_user.method,
      credentials: "include",
    });

    const data = await fetchData.json();

    if (data.success) {
      toast.success(data.message);
      dispatch(setUserDetails(null));
      navigate("/");
    }

    if (data.error) {
      toast.error(data.message);
    }
  };

  const handleSearch = (e) => {
    const { value } = e.target;
    setSearch(value);

    if (value) {
      navigate(`/search?q=${value}`);
    } else {
      navigate("/search");
    }
  };

  return (
    <header className="h-16 shadow-md bg-white fixed w-full z-40">
      <div className="h-full container mx-auto flex items-center px-4 justify-between">
        {/* Logo Section */}
        <div className="flex items-center">
          <Link to={"/"}>
            <p className="font-bold text-2xl text-indigo-600">E-COM</p>
          </Link>
        </div>

        {/* Search Bar */}
        <div className="hidden lg:flex items-center w-full justify-between max-w-sm border rounded-full focus-within:shadow-lg transition-shadow duration-300 pl-2">
          <input
            type="text"
            placeholder="Search products here..."
            className="w-full outline-none px-4 py-2 rounded-full"
            onChange={handleSearch}
            value={search}
          />
          <div className="text-lg min-w-[50px] h-10 bg-indigo-600 flex items-center justify-center rounded-r-full text-white cursor-pointer">
            <GrSearch />
          </div>
        </div>

        {/* User and Cart Section */}
        <div className="flex items-center gap-7">
          {/* User Avatar / Profile Dropdown */}
          <div className="relative flex justify-center items-center">
            {user?._id && (
              <div
                className="text-3xl cursor-pointer relative flex justify-center"
                onClick={() => setMenuDisplay((prev) => !prev)}
              >
                {user?.profilePic ? (
                  <img
                    src={user?.profilePic}
                    className="w-10 h-10 rounded-full"
                    alt={user?.name}
                  />
                ) : (
                  <FaUserCircle className="text-indigo-600" />
                )}
              </div>
            )}

            {/* Dropdown Menu */}
            {menuDisplay && (
              <div className="absolute bg-white top-14 right-0 p-4 shadow-lg rounded-lg z-50 transition-transform duration-300 ease-in-out">
                <nav>
                  {user?.role === ROLE.ADMIN && (
                    <Link
                      to={"/admin-panel/all-products"}
                      className="block whitespace-nowrap py-2 px-4 hover:bg-gray-100 text-gray-700"
                      onClick={() => setMenuDisplay((prev) => !prev)}
                    >
                      Admin Panel
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block whitespace-nowrap py-2 px-4 hover:bg-red-600 text-red-600 hover:text-white mt-2 w-full text-left rounded"
                  >
                    Logout
                  </button>
                </nav>
              </div>
            )}
          </div>

          {/* Shopping Cart */}
          {user?._id && (
            <Link to={"/cart"} className="text-2xl relative">
              <FaShoppingCart className="text-indigo-600" />
              <div className="bg-red-600 text-white w-5 h-5 rounded-full p-1 flex items-center justify-center absolute -top-2 -right-3">
                <p className="text-sm">{context?.cartProductCount}</p>
              </div>
            </Link>
          )}

          {/* Login / Logout Button */}
          <div>
            {!user?._id ? (
              <Link
                to={"/login"}
                className="px-4 py-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors duration-300"
              >
                Login
              </Link>
            ) : (
              <button
                onClick={handleLogout}
                className="px-4 py-2 rounded-full bg-red-600 text-white hover:bg-red-700 transition-colors duration-300"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
