import { Route, Routes } from "react-router-dom";
import Home from "./Home/Home";
import Login from "./Login/Login";
import Header from "./Home/header/Header";
import Signup from "./Signup/Signup";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./AuthProvider/AuthProvider";
import PrivateRoute from "./PrivateRoute/PrivateRoute";
import Admin from "./Admin/Admin";
import AdminItems from "./Admin/items/AdminItems";
import Cart from "./Cart/Cart";
import CheckOut from "./CheckOut/CheckOut";
import Orders from "./Orders/Orders";
import Catalog from "./Catalog/Catalog";
import Footer from "./Home/Footer/Footer";

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
          <Route element={<PrivateRoute />}>
            <Route path="/cart" element={<Cart />} />
          </Route>
          <Route path="/tops" element={<Catalog type="tops" />} />
          <Route path="/trousers" element={<Catalog type="trousers" />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoute />}>
            <Route path="/admin/items" element={<AdminItems />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/checkout" element={<CheckOut />} />
          </Route>
          <Route element={<PrivateRoute />}>
            <Route path="/orders" element={<Orders />} />
          </Route>
        </Routes>
        <Footer />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
