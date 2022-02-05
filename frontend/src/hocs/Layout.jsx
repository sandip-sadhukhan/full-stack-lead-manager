import React from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AiOutlineClose } from "react-icons/ai";

const Layout = (props) => {
  return (
    <div>
      <Navbar />
      {props.children}
      <Footer />
      <ToastContainer
        autoClose={6000}
        closeButton={AiOutlineClose}
        hideProgressBar={false}
        position={toast.POSITION.BOTTOM_RIGHT}
        pauseOnHover={true}
        theme="colored"
      />
    </div>
  );
};

export default Layout;
