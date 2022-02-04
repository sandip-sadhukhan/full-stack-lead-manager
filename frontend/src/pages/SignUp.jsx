import React, { useState } from "react";
import { Row, Col, Container, Card, Form, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { RiLoginCircleFill } from "react-icons/ri";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    password2: "",
  });

  let { name, email, password, password2 } = formData;

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    alert("submit");
  };

  return (
    <section id="signUp" style={{ paddingTop: "40px", paddingBottom: "20px" }}>
      <Container>
        <Row>
          <Col sm={12} md={6} className="mx-auto">
            <Card className="bg-light">
              <Card.Body>
                <h2 className="text-center mb-4">SignUp</h2>
                <Form onSubmit={onSubmit}>
                  <Form.Group className="mb-3">
                    <Form.Label>Name</Form.Label>
                    <Form.Control
                      type="text"
                      placeholder="ex- John Doe"
                      value={name}
                      name="name"
                      onChange={onChange}
                      autoFocus
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Email Address</Form.Label>
                    <Form.Control
                      type="email"
                      placeholder="name@example.com"
                      value={email}
                      name="email"
                      onChange={onChange}
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
                  <Form.Group className="mb-3">
                    <Form.Label>Confim Password</Form.Label>
                    <Form.Control
                      type="password"
                      value={password2}
                      name="password2"
                      onChange={onChange}
                      minLength="6"
                      required
                    ></Form.Control>
                  </Form.Group>
                  <Button type="submit" variant="primary">
                    SignUp <RiLoginCircleFill className="ml-2" />
                  </Button>
                  <p className="mt-2">
                    Already Have an account? <Link to="/login">Login Here</Link>
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

export default SignUp;
