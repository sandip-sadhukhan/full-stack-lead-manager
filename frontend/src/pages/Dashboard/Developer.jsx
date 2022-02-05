import React, { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { connect } from "react-redux";
import {
  Modal,
  Row,
  Col,
  Container,
  Button,
  Form,
  FormGroup,
  OverlayTrigger,
  Tooltip,
  Table,
} from "react-bootstrap";
import { BsFillPersonPlusFill } from "react-icons/bs";
import { TiUserDeleteOutline } from "react-icons/ti";
import axios from "axios";
import { toast } from "react-toastify";

const Developer = ({ isAuthenticated, loading }) => {
  const [modelShow, setModelShow] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
  });

  let { name, email, phone } = formData;

  const [developers, setDevelopers] = useState([]);

  const handleModelClose = () => setModelShow(false);
  const handleModelShow = () => setModelShow(true);

  const BASE_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function getDeveloperData() {
      // fetch all developers and show
      if (isAuthenticated && !loading) {
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          let res = await axios.get(
            `${BASE_API_URL}/api/lead/developers/`,
            config
          );
          let data = res.data;
          if (data.success === true) {
            setDevelopers(data.data);
          } else {
            toast.error("Something wrong.");
          }
        } catch (err) {
          toast.error("Something wrong!");
        }
      }
    }
    getDeveloperData();
  }, [BASE_API_URL, isAuthenticated, loading]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    try {
      let res = await axios.post(
        `${BASE_API_URL}/api/lead/developers/`,
        formData,
        config
      );

      let data = res.data;
      if (data.success === true) {
        setDevelopers([...developers, data.data]);
        toast.success("Developer Added!");
      } else {
        toast.error("Something is wrong!");
      }
    } catch (err) {
      toast.error("Something is wrong!");
    }
    setFormData({ name: "", email: "", phone: "" });
    setModelShow(false);
  };

  const removeDeveloper = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(
        `${BASE_API_URL}/api/lead/developers/remove/${id}/`,
        config
      );
      let newDevelopers = [...developers].filter(
        (developer) => developer.id !== id
      );
      setDevelopers(newDevelopers);
      toast.success("Developer is removed!");
    } catch (err) {
      toast.error("Something is wrong!");
    }
  };

  if (!isAuthenticated && !loading) {
    return <Navigate to="/login" />;
  }

  return (
    <>
      {loading ? (
        <h1>Loading</h1>
      ) : (
        <>
          <section id="developer" style={{ minHeight: "70vh" }}>
            <Container className="py-3">
              <div className="d-flex justify-content-center mb-3">
                <h1
                  className="text-center me-3 text-info"
                  style={{ fontWeight: 800, textTransform: "uppercase" }}
                >
                  Developers
                </h1>
                <div className="d-flex mb-2 align-items-center">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Add Developer</Tooltip>}
                  >
                    <Button
                      variant="success"
                      size="sm"
                      onClick={handleModelShow}
                    >
                      <BsFillPersonPlusFill />
                    </Button>
                  </OverlayTrigger>
                </div>
              </div>
              <Row>
                <Col md={6} sm={12} className="mx-auto">
                  <Table striped hover className="text-center">
                    <thead className="table-dark">
                      <tr>
                        <th>Id</th>
                        <th>Name</th>
                        <th>Email</th>
                        <th>Phone</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {developers.map((developer) => (
                        <tr key={developer.id}>
                          <td>{developer.id}</td>
                          <td>{developer.name}</td>
                          <td>{developer.email}</td>
                          <td>{developer.phone}</td>
                          <td>
                            <Button
                              onClick={() => removeDeveloper(developer.id)}
                              variant="outline-danger"
                            >
                              <TiUserDeleteOutline />
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>
                </Col>
              </Row>
            </Container>
          </section>

          {/* Add Developer Modal */}
          <Modal show={modelShow} onHide={handleModelClose}>
            <Form onSubmit={onSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Add Developer</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup className="mb-2">
                  <Form.Label>Name(*)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg- John Doe"
                    minLength="3"
                    name="name"
                    value={name}
                    onChange={onChange}
                    required
                  ></Form.Control>
                </FormGroup>
                <FormGroup className="mb-2">
                  <Form.Label>Email(*)</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder="eg- john@email.com"
                    name="email"
                    value={email}
                    onChange={onChange}
                    required
                  ></Form.Control>
                </FormGroup>
                <FormGroup className="mb-4">
                  <Form.Label>Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    placeholder="eg- 999999999"
                    name="phone"
                    value={phone}
                    onChange={onChange}
                  ></Form.Control>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-danger" onClick={handleModelClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Add Developer
                </Button>
              </Modal.Footer>
            </Form>
          </Modal>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
  loading: state.auth.loading,
});

export default connect(mapStateToProps)(Developer);
