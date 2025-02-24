import { useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../../AuthProvider/AuthProvider";
import { useEffect } from "react";

function Header() {
  // Authentication
  const auth = useAuth();
  const token = auth.token;

  const [userSigned, setUserSigned] = useState(false);
  const location = useLocation();

  useEffect(() => {
    hideSideSection();
  }, [location.pathname]);

  useEffect(() => {
    const checkToken = async () => {
      const checker = await auth.checkToken(token);
      setUserSigned(checker);
    };
    checkToken();
    hideSideSection();
  }, [auth, token]);

  // Items list on phones and its functions
  const sectionToShow = useRef();

  // Show Function
  const showOtherList = () => {
    sectionToShow.current.style.display = "flex";
  };

  // Hide function
  const hideSideSection = () => {
    const sectionToHide = document.getElementById("hidden-section");
    sectionToHide.style.display = "none";
  };

  return (
    <header
      className="
              fixed
              w-full
              left-0
              right-0
              top-0
              bg-[transparent]
              backdrop-blur-sm
              h-20
              z-10"
    >
      <div
        className="
              max-w-[1300px]
              w-full
              mx-auto
              px-5
              h-full
              flex
              items-center
              justify-between
              "
      >
        {/** Logo */}
        <Link to="/">
          <h2
            className="
                          logo
                          font-sans
                          text-4xl"
          >
            OUTFITOASIS
          </h2>
        </Link>

        {/** Nav Links */}
        <ul
          className="
                          hidden
                          sm:flex
                          justify-between
                          w-[60%]
                          text-[#878787]
                          font-thin
                          px-20
                          py-4
                          rounded-xl
                          mx-auto
                          bg-gray-300
                          bg-opacity-10"
        >
          <Link to="/tops" className="hover:text-[#636363] text-gray-400">
            <li className="text-xs ">Tops</li>
          </Link>
          <Link to="/trousers" className="hover:text-[#636363] text-gray-400">
            <li className="text-xs">Trousers</li>
          </Link>
          {userSigned ? (
            <>
              <Link to="/cart" className="hover:text-[#636363] text-gray-100">
                <li className="text-2xl mt-[-8px]">
                  <i className="fa-solid fa-cart-shopping"></i>
                </li>
              </Link>
              <Link to="/orders" className="hover:text-[#636363] text-gray-400">
                <li className="text-xs">Orders</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login" className="hover:text-[#636363]">
                <li className="text-xs">LOGIN</li>
              </Link>

              <Link to="/signup" className="hover:text-[#636363]">
                <li className="text-xs">SIGNUP</li>
              </Link>
            </>
          )}
        </ul>

        {/** Button to show nav buttons on phones*/}
        <i
          className="fa-solid fa-bars block sm:hidden cursor-pointer"
          id="nav-button"
          onClick={showOtherList}
        />

        {/** Nav Links on Phones*/}
        <ul
          id="hidden-section"
          ref={sectionToShow}
          className="
                fixed
                top-0
                left-0
                right-0
                mx-auto
                h-screen
                items-center
                bg-black
                justify-start
                flex-col
                text-3xl
                gap-6
                hidden
                font-sans"
        >
          <a
            onClick={hideSideSection}
            className="mt-10 ml-auto mr-5 cursor-pointer"
          >
            x
          </a>
          <Link to="/tops">
            <li className="my-5">Tops</li>
          </Link>
          <Link to="/trousers">
            <li className="my-5">Trousers</li>
          </Link>
          {userSigned ? (
            <>
              <Link to="/cart">
                <li className="my-5">CART</li>
              </Link>

              <Link to="/orders">
                <li className="my-5">Orders</li>
              </Link>
            </>
          ) : (
            <>
              <Link to="/login">
                <li className="my-5">Login</li>
              </Link>
              <Link to="/signup">
                <li className="my-5">Signup</li>
              </Link>
            </>
          )}
        </ul>
      </div>
    </header>
  );
}

export default Header;
