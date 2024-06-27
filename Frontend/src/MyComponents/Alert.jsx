import React, { useState } from "react";

function Alert(props) {
  // Check if props.alert exists and has type and message properties
  if (!props.alert || !props.alert.type || !props.alert.message) {
    return null; // Return null if props.alert is not valid
  }

  // Determine which icon to show based on props.alert.type
  const iconSvg =
    props.alert.type === "success" ? (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-12 text-green-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    ) : (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="1.5"
        stroke="currentColor"
        className="size-12 text-red-600"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        />
      </svg>
    );

  let containerClassName = "";
  let textClassName = "";

  if (props.alert.type === "success") {
    containerClassName = "bg-green-200";
    textClassName = "text-green-500";
  } else {
    containerClassName = "bg-red-200";
    textClassName = "text-red-500";
  }

  return (
    <div
      role="alert"
      className={`absolute z-50 w-full h-24 rounded-xl border border-blue-100 ${containerClassName} p-4`}
    >
      <div className="flex justify-center items-center gap-4">
        {/* Render dynamic iconSvg based on props.alert.type */}
        <span>{iconSvg}</span>

        <div className="flex-1">
          <strong className={`block font-medium ${textClassName}`}>
            {props.alert.type === "success" ? "Success" : "Error"}
          </strong>

          <p className={`mt-1 text-sm ${textClassName}`}>
            {props.alert.message}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Alert;
