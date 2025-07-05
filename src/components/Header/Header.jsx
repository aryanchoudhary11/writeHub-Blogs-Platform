import { Container, Logo } from "../index";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import { useEffect, useRef, useState } from "react";
import authService from "../../Appwrite/auth";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null); // 👈 ref for dropdown

  const navItems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authStatus },
    { name: "SignUp", slug: "/signup", active: !authStatus },
    { name: "All Posts", slug: "/all-posts", active: authStatus },
    { name: "Add Post", slug: "/add-post", active: authStatus },
  ];

  const handleLogout = async () => {
    await authService.logout();
    window.location.reload();
  };

  // 👇 useEffect to detect outside clicks
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    if (showDropdown) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showDropdown]);

  return (
    <header className="py-4 shadow-md bg-white border-b border-gray-200">
      <Container>
        <nav className="flex items-center justify-between">
          {/* Logo */}
          <Link to="/">
            <Logo />
          </Link>

          {/* Navigation Items */}
          <ul className="flex items-center gap-4">
            {navItems.map(
              (item) =>
                item.active && (
                  <li key={item.name}>
                    <button
                      onClick={() => navigate(item.slug)}
                      className={`px-4 py-2 font-medium rounded-md transition duration-200 cursor-pointer ${
                        location.pathname === item.slug
                          ? "text-blue-600 bg-gray-100"
                          : "text-gray-700 hover:text-blue-600"
                      }`}
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Dropdown for logged-in user */}
            {authStatus && (
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition duration-200 cursor-pointer"
                >
                  {userData?.name || "Account"}
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-50 border border-gray-200">
                    <button
                      onClick={() => {
                        navigate("/my-posts");
                        setShowDropdown(false);
                      }}
                      className={`w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer ${
                        location.pathname === "/my-posts"
                          ? "text-blue-600 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      My Posts
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600 cursor-pointer"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </li>
            )}
          </ul>
        </nav>
      </Container>
    </header>
  );
}

export default Header;
