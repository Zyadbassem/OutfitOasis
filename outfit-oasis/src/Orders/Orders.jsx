import { useEffect, useState } from "react";
import { useAuth } from "../AuthProvider/AuthProvider";
import LoadingHelper from "../Helpers/LoadingHelper";
import OrderItem from "./OrderItem";
import { backend_url } from "../Helpers/helpers";
function Orders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();
  const token = auth.token;
  useEffect(() => {
    const getOrders = async () => {
      try {
        const response = await fetch(`${backend_url}/api/orders`, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        if (response.ok) {
          console.log(data);
          setOrders(data);
          setLoading(false);
        }
      } catch (error) {
        console.log(error.message);
      }
    };

    getOrders();
  }, [token]);

  return (
    <div
      className="
      welcome-section
      w-full
      max-w-[1300px]
      mx-auto
      h-full
      flex
      flex-col
      mt-[20%]
      border-x-0
      items-start
      min-h-[80vh]
      p-6
      mb-11
      lg:mt-28"
    >
      <h1 className="text-5xl mb font-sans text-center mx-auto">Orders</h1>
      {loading ? <LoadingHelper /> : null}
      {orders.map((order) => (
        <OrderItem
          orderId={order._id}
          key={order._id}
          total_amount={order.total_amount}
          date={order.createdAt}
        />
      ))}
    </div>
  );
}

export default Orders;
