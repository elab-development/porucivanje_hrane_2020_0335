import React, { useEffect, useState } from "react";
import axios from "axios";
import { jsPDF } from "jspdf";
import QRCode from "qrcode";
import './MyOrders.css'; // Importovanje CSS fajla

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

  const generatePDF = async (order) => {
    // Fetch user data from sessionStorage
    const user = JSON.parse(sessionStorage.getItem("user"));

    // Check if user data exists
    if (!user) {
      alert("Podaci o korisniku nisu pronađeni. Molimo prijavite se ponovo.");
      return;
    }

    const doc = new jsPDF();

    // Generating QR code
    const qrCodeData = `Order ID: ${order.order_id}, Total Price: ${order.total_price} €, Customer: ${user.name}`;
    const qrCodeImage = await QRCode.toDataURL(qrCodeData);

    // Add user details and header
    doc.setFontSize(18);
    doc.text("Fiskalni Racun", 10, 10);
    doc.setFontSize(12);
    doc.text(`Ime i Prezime: ${user.name}`, 10, 20);
    doc.text(`Email: ${user.email}`, 10, 30);
    doc.text("Porudžbina:", 10, 40);
    
    // Draw line
    doc.line(10, 45, 200, 45);

    // Add order details
    doc.text(`Order ID: ${order.order_id}`, 10, 55);
    doc.text(`Store Name: ${order.store_name}`, 10, 65);
    doc.text(`Delivery Person: ${order.delivery_person_name}`, 10, 75);
    doc.text(`Total Price: ${order.total_price} €`, 10, 85);
    doc.text(`Estimated Time: ${new Date(`1970-01-01T${order.estimated_time}`).toLocaleTimeString()}`, 10, 95);
    doc.text(`Status: ${order.status === "delivered" ? "Delivered" : "In Progress"}`, 10, 105);
    
    // Draw line
    doc.line(10, 110, 200, 110);

    // Add QR code
    doc.text("QR Code:", 10, 120);
    doc.addImage(qrCodeImage, "PNG", 10, 130, 50, 50); // QR Code

    // Save the generated PDF
    doc.save(`fiskalni_racun_${order.order_id}.pdf`);
  };

  return (
    <div className="my-orders-container">
      <h2>Moje Porudžbine</h2>
      <table className="my-orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Store Name</th>
            <th>Delivery Person</th>
            <th>Total Price</th>
            <th>Estimated Time</th>
            <th>Status</th>
            <th>Generate Invoice</th>
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
              <td>
                <button className="generate-invoice-btn" onClick={() => generatePDF(order)}>
                  Preuzmi Fiskalni Račun
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyOrders;
