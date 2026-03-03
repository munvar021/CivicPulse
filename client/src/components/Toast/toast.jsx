import React from "react";
import { Slide } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { StyledToastContainer } from "./toastStyles";

const Toast = () => {
  return (
    <StyledToastContainer
      position="bottom-right"
      autoClose={2000}
      hideProgressBar
      newestOnTop
      closeOnClick
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="dark"
      closeButton={false}
      transition={Slide}
    />
  );
};

export default Toast;
