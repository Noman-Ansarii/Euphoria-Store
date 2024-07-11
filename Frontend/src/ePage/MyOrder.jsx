import React, { useEffect, useState } from "react";
import { Tabs, TabList, TabPanels, Tab, TabPanel } from "@chakra-ui/react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { Link } from "react-router-dom";

const Orders = () => {
  const HOST = import.meta.env.VITE_BACKEND_HOST;

  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchMyOrders = async () => {
      const token = localStorage.getItem("AuthenticationToken");
      if (!token) return;

      try {
        const decodedToken = jwtDecode(token);
        const userId = decodedToken.user.id;
        if (!userId) {
          return;
        }

        const response = await axios.get(
          `${HOST}/api/v1/user/myorders/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (response.data.orders) {
          setOrders(response.data.orders);
        } else {
          console.error("Empty orders array in response:", response.data);
        }
      } catch (error) {
        console.error("Error fetching orders", error);
      }
    };

    fetchMyOrders();
  }, []);

  return (
    <div className="container mx-auto my-8">
      <h2 className="text-2xl font-semibold mb-4">My Orders</h2>
      <Tabs isFitted variant="enclosed">
        <TabList mb="1em">
          <Tab>Active</Tab>
          <Tab>Cancelled</Tab>
          <Tab>Completed</Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            {orders.length > 0 ? (
              orders.map((order, index) => (
                <div key={index} className="rounded-lg p-4 mb-4 border">
                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="flex">
                        <strong className="font-extrabold pe-2">
                          Order No:
                        </strong>
                        <p>#{order._id}</p>
                      </p>
                      <p className="flex">
                        <strong className="pe-2">Order Date:</strong>{" "}
                        <p> {new Date(order.createdAt).toLocaleString()}</p>
                      </p>
                      <p className="flex">
                        <strong className="pe-2">
                          Estimated Delivery Date:{" "}
                        </strong>
                        <p>5 Days Later</p>
                      </p>
                    </div>
                    <div>
                      <p className="flex">
                        <strong className="pe-2">Order Status:</strong>{" "}
                        <p> Active</p>
                      </p>
                      <p className="flex">
                        <strong className="pe-2">Payment Method:</strong>{" "}
                        <p> {order.paymentMethod}</p>
                      </p>
                    </div>
                  </div>
                  {order.cartlist.map((item) => (
                    <div key={item.productId} className="flex items-center mb-4">
                      <img
                        src={item.image}
                        alt={item.description}
                        className="w-28 h-28 mr-4"
                      />
                      <div>
                        <p className="font-bold">{item.description}</p>
                        <p className="flex">
                          Quantity:{" "}
                          <p className="font-bold ps-1">{item.quantity}</p>
                        </p>
                        <p className="flex">
                          Total:{" "}
                          <p className="font-bold ps-1">
                            ${(item.price * item.quantity).toFixed(2)}
                          </p>
                        </p>
                      </div>
                      <Link
                        to={`/order/${order._id}`} // Replace with your order detail route
                        className="ml-auto px-4 py-2 rounded transition duration-300 mainButtonCSS"
                      >
                        View Detail
                      </Link>
                    </div>
                  ))}
                  <hr />
                  <div className="flex justify-between items-center pt-3">
                    <p className="flex">
                      <p className="pe-1">Total Amount: </p>{" "}
                      <strong>${order.total}</strong>
                    </p>
                    <p className="flex">
                      <p className="pe-1">Discount: </p>{" "}
                      <strong>${order.discount}</strong>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p>No active orders</p>
            )}
          </TabPanel>
          <TabPanel>
            <p>No cancelled orders</p>
          </TabPanel>
          <TabPanel>
            <p>No completed orders</p>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
};

export default Orders;
