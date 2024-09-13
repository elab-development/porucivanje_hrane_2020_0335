import React, { useEffect, useState } from "react";
import axios from "axios";

const MyOrders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch the token from session storage
    const token = sessionStorage.getItem("auth_token");

    // Define Axios configuration with headers
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    // Fetch orders (deliveries) for the logged-in user
    axios
      .get("http://127.0.0.1:8000/api/deliveries", config)
      .then((response) => {
        setOrders(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the orders!", error);
      });
  }, []);

  return (
    <div>
      <h2>Moje Porudžbine</h2>
      <table>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Store Name</th>
            <th>Delivery Person</th>
            <th>Total Price</th>
            <th>Estimated Time</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.delivery_id}>
              <td>{order.order_id}</td>
              <td>{order.store_name}</td>
              <td>{order.delivery_person_name}</td>
              <td>{order.total_price} €</td>
              <td>{new Date(`1970-01-01T${order.estimated_time}`).toLocaleTimeString()}</td>
              <td>{order.status === "delivered" ? "Delivered" : "In Progress"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
