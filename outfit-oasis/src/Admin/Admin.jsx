import { useEffect } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import { Link } from "react-router-dom";
import { backend_url } from "../Helpers/helpers";
function Admin() {
  const auth = useAuth();
  const token = auth.token;

  const validateAdmin = async () => {
    if (!token) {
      window.location.href = "/login";
    }
    try {
      const response = await fetch(`${backend_url}/api/checkadmin`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log(data);
      if (!data.isAdmin) {
        auth.logout();
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    validateAdmin();
  }, []);
  return (
    <div className="mt-[30%] lg:mt-[200px] h-[50svh] w-full max-w-[1300px] mx-auto flex flex-col items-center justify-center">
      <Link to="items" className="m-7">
        <span className="px-16 py-2 border border-[#b4b0b0] ">Items</span>
      </Link>
      <Link to="users" className="m-7">
        <span className="px-16 py-2 border border-[#b4b0b0]">users</span>
      </Link>
    </div>
  );
}

export default Admin;
