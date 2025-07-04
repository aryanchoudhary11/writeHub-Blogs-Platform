// import { Container, Logo, LogoutBtn } from "../index";
// import { Link, useNavigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// function Header() {
//   const authStatus = useSelector((state) => state.auth.status);
//   const navigate = useNavigate();
//   const navItems = [
//     {
//       name: "Home",
//       slug: "/",
//       active: true,
//     },
//     {
//       name: "Login",
//       slug: "/login",
//       active: !authStatus,
//     },
//     {
//       name: "SignUp",
//       slug: "/signup",
//       active: !authStatus,
//     },
//     {
//       name: "All Posts",
//       slug: "/all-posts",
//       active: authStatus,
//     },
//     {
//       name: "Add Post",
//       slug: "/add-post",
//       active: authStatus,
//     },
//   ];
//   return (
//     <header className="py-3 shadow bg-gray-500">
//       <Container>
//         <nav className="flex">
//           <div className="mr-4">
//             <Link to="/">
//               <Logo />
//             </Link>
//           </div>
//           <ul className="flex ml-auto">
//             {navItems.map((item) =>
//               item.active ? (
//                 <li key={item.name}>
//                   <button
//                     onClick={() => navigate(item.slug)}
//                     className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
//                   >
//                     {item.name}
//                   </button>
//                 </li>
//               ) : null
//             )}
//             {authStatus && (
//               <li>
//                 <LogoutBtn />
//               </li>
//             )}
//           </ul>
//         </nav>
//       </Container>
//     </header>
//   );
// }
// export default Header;

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
    {
      name: "Home",
      slug: "/",
      active: true,
    },
    {
      name: "Login",
      slug: "/login",
      active: !authStatus,
    },
    {
      name: "SignUp",
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: "All Posts",
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: "Add Post",
      slug: "/add-post",
      active: authStatus,
    },
  ];

  const handleLogout = async () => {
    await authService.logout();
    window.location.reload();
  };

  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex items-center">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto items-center space-x-4">
            {navItems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    onClick={() => navigate(item.slug)}
                    className="inline-block px-4 py-2 duration-200 hover:bg-blue-100 rounded-full"
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}

            {authStatus && (
              <li className="relative">
                <button
                  onClick={() => setShowDropdown((prev) => !prev)}
                  className="inline-block px-4 py-2 bg-white text-black rounded-full hover:bg-gray-200"
                >
                  Account
                </button>

                {showDropdown && (
                  <div className="absolute right-0 mt-2 bg-white shadow-lg rounded-md w-40 z-10">
                    <button
                      onClick={() => {
                        navigate("/my-posts");
                        setShowDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100"
                    >
                      My Posts
                    </button>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 text-red-600"
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
