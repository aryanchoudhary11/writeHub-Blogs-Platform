import { Container, Logo } from "../index";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import authService from "../../Appwrite/auth";

function Header() {
  const authStatus = useSelector((state) => state.auth.status);
  const userData = useSelector((state) => state.auth.userData);
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);

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
                      className="text-gray-700 hover:text-blue-600 font-medium px-4 py-2 rounded-md transition duration-200"
                    >
                      {item.name}
                    </button>
                  </li>
                )
            )}

            {/* Dropdown for logged in user */}
            {authStatus && (
              <li className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="bg-gray-800 text-white font-medium px-4 py-2 rounded-md hover:bg-gray-700 transition duration-200"
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
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-gray-700"
                    >
                      My Posts
                    </button>
                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
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
