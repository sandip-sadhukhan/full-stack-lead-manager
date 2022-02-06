import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import { toast } from "react-toastify";
import {
  Button,
  Row,
  Col,
  Container,
  Form,
  FormGroup,
  Card,
  Table,
} from "react-bootstrap";
import { BiArrowBack } from "react-icons/bi";

const LeadDetail = ({ loading, isAuthenticated }) => {
  const { id } = useParams();
  const BASE_API_URL = process.env.REACT_APP_API_URL;
  const token = localStorage.getItem("token");

  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });

  const [assignedDevelopers, setAssignedDevelopers] = useState([]);
  const [unAssignedDevelopers, setUnAssignedDevelopers] = useState([]);

  let { title, description, clientName, clientEmail, clientPhone } = formData;

  // fetch formData
  useEffect(() => {
    async function fetchFormData() {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        let res = await axios.get(
          `${BASE_API_URL}/api/lead/detail/${id}/`,
          config
        );
        let data = res.data;
        if (data.success === true) {
          // update
          setFormData({
            title: data.data.title,
            description: data.data.description,
            clientName: data.data.clientName,
            clientEmail: data.data.clientEmail,
            clientPhone: data.data.clientPhone,
          });
        } else {
          toast.error("Something is wrong!");
        }
      } catch (err) {
        toast.error("Something is wrong!");
      }
    }

    fetchFormData();
  }, [BASE_API_URL, token, id]);

  // fetch assigned and unassigned developers
  useEffect(() => {
    async function fetchDevelopers() {
      const config = {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      };

      try {
        let res = await axios.get(
          `${BASE_API_URL}/api/lead/developers/${id}/`,
          config
        );
        let data = res.data;
        if (data.success === true) {
          // update
          setAssignedDevelopers(data.data.assigned);
          setUnAssignedDevelopers(data.data.unassigned);
        } else {
          toast.error("Something is wrong!");
        }
      } catch (err) {
        toast.error("Something is wrong!");
      }
    }
    fetchDevelopers();
  }, [BASE_API_URL, token, id]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    // patch request
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.patch(
        `${BASE_API_URL}/api/lead/detail/${id}/`,
        formData,
        config
      );

      let data = res.data;
      if (data.success === true) {
        // update
        setFormData({
          title: data.data.title,
          description: data.data.description,
          clientName: data.data.clientName,
          clientEmail: data.data.clientEmail,
          clientPhone: data.data.clientPhone,
        });
        toast.success("Lead is updated!");
      } else {
        toast.error("Something is wrong");
      }
    } catch (err) {
      toast.error("Something is wrong");
    }
  };

  const assignDeveloper = () => {
    alert("Assigned");
  };

  const removeDeveloper = (id) => {
    alert(id);
  };

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          <section id="lead-detail" style={{ minHeight: "75vh" }}>
            <h1 className="text-center pt-3 pb-3">
              <Link to="/dashboard/lead" className="me-2">
                <BiArrowBack />
              </Link>
              Lead Id - {id}
            </h1>
            <Container>
              <Row className="mb-2">
                <Col md={6} sm={12} className="mb-2">
                  <Card className="bg-light">
                    <Card.Header>
                      <Card.Title>
                        <h4 className="text-center">Edit Lead</h4>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <Form onSubmit={onSubmit}>
                        <Container className="mt-2">
                          <FormGroup className="mb-2">
                            <Form.Label>Title(*)</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="ex- john doe"
                              name="title"
                              value={title}
                              onChange={onChange}
                              required
                            ></Form.Control>
                          </FormGroup>
                          <FormGroup className="mb-2">
                            <Form.Label>Description</Form.Label>
                            <Form.Control
                              as="textarea"
                              name="description"
                              value={description}
                              onChange={onChange}
                            ></Form.Control>
                          </FormGroup>
                          <hr />
                          <h5 className="mb-2">Client Details</h5>
                          <FormGroup className="mb-2">
                            <Form.Label>Client Name(*)</Form.Label>
                            <Form.Control
                              type="text"
                              placeholder="ex- jane doe"
                              name="clientName"
                              value={clientName}
                              onChange={onChange}
                              required
                            ></Form.Control>
                          </FormGroup>
                          <FormGroup className="mb-2">
                            <Form.Label>Client Email</Form.Label>
                            <Form.Control
                              type="email"
                              placeholder="ex- jane@email.com"
                              name="clientEmail"
                              value={clientEmail}
                              onChange={onChange}
                            ></Form.Control>
                          </FormGroup>
                          <FormGroup>
                            <Form.Label>Client Phone</Form.Label>
                            <Form.Control
                              type="tel"
                              placeholder="ex- 9999999999"
                              name="clientPhone"
                              value={clientPhone}
                              onChange={onChange}
                            ></Form.Control>
                          </FormGroup>
                          <div className="d-flex justify-content-center mt-3">
                            <Button variant="primary" type="submit">
                              Update Lead
                            </Button>
                          </div>
                        </Container>
                      </Form>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={6} sm={12} className="mb-2">
                  <Card className="bg-light">
                    <Card.Header>
                      <Card.Title>
                        <h3 className="text-center">Assign Developers</h3>
                      </Card.Title>
                    </Card.Header>
                    <Card.Body>
                      <div className="d-flex">
                        <Form.Select>
                          <option value="-1">----------</option>
                          {unAssignedDevelopers.map((dev) => (
                            <option value={dev.id} key={dev.id}>
                              {dev.name}
                            </option>
                          ))}
                        </Form.Select>
                        <Button
                          variant="primary"
                          className="ms-2"
                          onClick={assignDeveloper}
                        >
                          Assign
                        </Button>
                      </div>
                      <Table striped hover responsive className="mt-3">
                        <thead className="table-dark">
                          <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {assignedDevelopers.map((dev) => (
                            <tr key={dev.id}>
                              <td>{dev.id}</td>
                              <td>{dev.name}</td>
                              <td>{dev.email}</td>
                              <td>
                                <Button
                                  onClick={() => removeDeveloper(dev.id)}
                                  variant="outline-danger"
                                  size="sm"
                                >
                                  Remove
                                </Button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            </Container>
          </section>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(LeadDetail);
