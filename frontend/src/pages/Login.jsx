import React, { useState } from "react";
import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";
import { Link, Navigate } from "react-router-dom";
import { RiLoginCircleFill } from "react-icons/ri";
import { login } from "../redux/actions/auth";
import { connect } from "react-redux";

const Login = ({ login, isAuthenticated }) => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  let { email, password } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    login(email, password);
  };

  if (isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

  return (
    <section id="login" style={{ paddingTop: "40px", paddingBottom: "200px" }}>
      <Container>
        <Row>
          <Col sm={12} md={6} className="mx-auto">
            <Card className="bg-light">
              <Card.Body>
                <h2 className="text-center mb-4">Login</h2>
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      name="email"
                      onChange={onChange}
                      autoFocus
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password}
                      name="password"
                      onChange={onChange}
                      minLength="6"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    Login <RiLoginCircleFill className="ml-2" />
                  </Button>
                  <p className="mt-2">
                    Don't Have an account? <Link to="/signup">Signup Here</Link>
                  </p>
                </Form>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps, { login })(Login);
