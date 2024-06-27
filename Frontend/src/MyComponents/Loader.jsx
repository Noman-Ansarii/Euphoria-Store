import { squircle } from "ldrs";
import React, { useEffect } from "react";
function Loader() {
  useEffect(() => {
    squircle.register();
  }, []);

  return (
    <div className="loader-container">
      {/* // Default values shown */}
      <l-squircle
        size="37"
        stroke="5"
        stroke-length="0.15"
        bg-opacity="0.1"
        speed="0.9"
        color="black"
      ></l-squircle>
    </div>
  );
}

export default Loader;
