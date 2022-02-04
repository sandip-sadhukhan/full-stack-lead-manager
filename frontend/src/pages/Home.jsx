import React from "react";
import { Row, Col, Container, Card } from "react-bootstrap";
import header_image from "../assets/images/header_image.svg";
import { SiStackoverflow } from "react-icons/si";
import { MdAssignmentTurnedIn, MdCreateNewFolder } from "react-icons/md";

const Home = () => {
  return (
    <>
      <section id="header" style={{ backgroundColor: "#ecf0f1" }}>
        <Container className="py-md-5 py-sm-0 py-xs-0">
          <Row>
            <Col
              md={5}
              className="ms-auto"
              sm={12}
              style={{ paddingTop: "70px" }}
            >
              <h1 className="text-dark" style={{ fontWeight: 800 }}>
                <span className="text-danger">Simple</span> Lead Manger
              </h1>
              <p style={{ textAlign: "justify" }}>
                This is your easy to use lead manager application. You can add
                lead, track them, add developers/ resources to the application.
                Get your task finished as soon as possible.
              </p>
              <a href="#learn-more" className="btn btn-primary">
                Learn More
              </a>
            </Col>
            <Col md={5} sm={12} className="me-auto">
              <img src={header_image} alt="Header " className="img-fluid" />
            </Col>
          </Row>
        </Container>
      </section>

      <section id="learn-more">
        <Container className="py-5">
          <h2 className="text-center mb-5">Learn More</h2>
          <Row>
            <Col md={4} sm={12} className="mb-2">
              <Card className="bg-light">
                <Card.Body className="text-center">
                  <SiStackoverflow
                    style={{ fontSize: "80px" }}
                    className="mb-4 text-primary"
                  />
                  <h4 className="mb-2">Arrange Fast</h4>
                  <p style={{ textAlign: "justify" }}>
                    Don't waste time to arrange in a paper, like old school
                    manner, rather than use simple lead manager to arrange your
                    task fast.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Card className="bg-light">
                <Card.Body className="text-center">
                  <MdCreateNewFolder
                    style={{ fontSize: "80px" }}
                    className="mb-4 text-danger"
                  />
                  <h4 className="mb-2">Create Lead</h4>
                  <p style={{ textAlign: "justify" }}>
                    Want to create your next lead? Create in your dashboard.
                    Structure your project and add client details and many more.
                  </p>
                </Card.Body>
              </Card>
            </Col>
            <Col md={4} sm={12} className="mb-2">
              <Card className="bg-light">
                <Card.Body className="text-center">
                  <MdAssignmentTurnedIn
                    style={{ fontSize: "80px" }}
                    className="mb-4 text-primary"
                  />
                  <h4 className="mb-2">Assign Developer</h4>
                  <p style={{ textAlign: "justify" }}>
                    Want to hire developers but hard to manage them? Don't worry
                    our system will automatically discover all the resources
                    that you want.
                  </p>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Home;
