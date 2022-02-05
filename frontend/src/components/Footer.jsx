import React from "react";

const Footer = () => {
  return (
    <footer className="footer py-3 text-white text-center bg-primary">
      Developer By Sandip Sadhukhan | &copy; All Rights Reserved{" "}
      {new Date().getFullYear()}
    </footer>
  );
};

export default Footer;
