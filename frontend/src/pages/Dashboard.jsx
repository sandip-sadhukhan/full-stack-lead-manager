import React from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";

const Dashboard = ({ isAuthenticated, loading }) => {
  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <div>
          Dashboard
          <h1>Secret</h1>
        </div>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(Dashboard);
