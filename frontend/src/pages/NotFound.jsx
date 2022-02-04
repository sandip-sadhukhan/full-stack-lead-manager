import React from "react";
import { Link } from "react-router-dom";
import { Button } from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";

const NotFound = () => {
  return (
    <div className="text-center my-5 py-5">
      <h1 className="display-4 text-danger">404</h1>
      <h1>Page Not Found</h1>
      <Button as={Link} to="/" variant="primary" className="mt-3">
        <BiArrowBack className="me-2" />
        Back to Home
      </Button>
    </div>
  );
};

export default NotFound;
