import { Route, Routes } from "react-router-dom";
import Tops from "./Tops/Tops";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Header from "./Home/header/Header";
import Signup from "./Signup/Signup";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthProvider/AuthProvider";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Admin from "./Admin/Admin";
import AdminItems from "./Admin/items/AdminItems";

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin" element={<Admin />} />
          </Route>
          <Route path="/tops" element={<Tops />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/admin/items" element={<AdminItems/>} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
