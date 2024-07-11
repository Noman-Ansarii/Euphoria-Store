import React from "react";
import { Link } from "react-router-dom";

function OrderConfirm() {
  return (
    <>
      <div className="flex justify-center items-center">
        <div className="inner-container relative">
          <div className="image">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dvo26dhuq/image/upload/v1720594612/order-confirmed_1_3_bvm3aq.png"
                alt="Your Order is Confirmed"
              />
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderConfirm;
