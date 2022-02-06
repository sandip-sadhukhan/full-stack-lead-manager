import React, { useState, useEffect } from "react";
import { Navigate, Link } from "react-router-dom";
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

const Lead = ({ isAuthenticated, loading }) => {
  const [modelShow, setModelShow] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    clientName: "",
    clientEmail: "",
    clientPhone: "",
  });

  let { title, description, clientName, clientEmail, clientPhone } = formData;

  const [leads, setLeads] = useState([]);

  const handleModelClose = () => setModelShow(false);
  const handleModelShow = () => setModelShow(true);

  const BASE_API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    async function getLeadsData() {
      // fetch all leads and show
      if (isAuthenticated && !loading) {
        try {
          const token = localStorage.getItem("token");
          const config = {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          };
          let res = await axios.get(`${BASE_API_URL}/api/lead/`, config);
          let data = res.data;
          if (data.success === true) {
            setLeads(data.data);
          } else {
            toast.error("Something wrong.");
          }
        } catch (err) {
          toast.error("Something wrong!");
        }
      }
    }
    getLeadsData();
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
      let res = await axios.post(`${BASE_API_URL}/api/lead/`, formData, config);

      let data = res.data;
      if (data.success === true) {
        setLeads([...leads, data.data]);
        toast.success("Lead Added!");
      } else {
        toast.error("Something is wrong!");
      }
    } catch (err) {
      toast.error("Something is wrong!");
    }
    setFormData({
      title: "",
      description: "",
      clientName: "",
      clientPhone: "",
      clientEmail: "",
    });
    setModelShow(false);
  };

  const removeLead = async (id) => {
    const token = localStorage.getItem("token");
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };

    try {
      await axios.delete(`${BASE_API_URL}/api/lead/detail/${id}/`, config);
      let newLeads = [...leads].filter((lead) => lead.id !== id);
      setLeads(newLeads);
      toast.success("Lead is removed!");
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
          <section id="leads" style={{ minHeight: "70vh" }}>
            <Container className="py-3">
              <div className="d-flex justify-content-center mb-3">
                <h1
                  className="text-center me-3 text-info"
                  style={{ fontWeight: 800, textTransform: "uppercase" }}
                >
                  Leads
                </h1>
                <div className="d-flex mb-2 align-items-center">
                  <OverlayTrigger
                    placement="top"
                    overlay={<Tooltip>Add Lead</Tooltip>}
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
                        <th>Title</th>
                        <th>Description</th>
                        <th>Delete</th>
                      </tr>
                    </thead>
                    <tbody>
                      {leads.map((lead) => (
                        <tr key={lead.id}>
                          <td>{lead.id}</td>
                          <td>
                            <Link to={`/dashboard/lead/${lead.id}`}>
                              {lead.title}
                            </Link>
                          </td>
                          <td>{lead.description}</td>
                          <td>
                            <Button
                              onClick={() => removeLead(lead.id)}
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

          {/* Add Lead Modal */}
          <Modal show={modelShow} onHide={handleModelClose}>
            <Form onSubmit={onSubmit}>
              <Modal.Header closeButton>
                <Modal.Title>Add Lead</Modal.Title>
              </Modal.Header>
              <Modal.Body>
                <FormGroup className="mb-2">
                  <Form.Label>Title(*)</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="eg- John Doe"
                    minLength="3"
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
                <FormGroup className="mb-2">
                  <Form.Label>Client Name(*)</Form.Label>
                  <Form.Control
                    type="text"
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
                    name="clientEmail"
                    value={clientEmail}
                    onChange={onChange}
                  ></Form.Control>
                </FormGroup>
                <FormGroup className="mb-2">
                  <Form.Label>Client Phone</Form.Label>
                  <Form.Control
                    type="tel"
                    name="clientPhone"
                    value={clientPhone}
                    onChange={onChange}
                  ></Form.Control>
                </FormGroup>
              </Modal.Body>
              <Modal.Footer>
                <Button variant="outline-danger" onClick={handleModelClose}>
                  Close
                </Button>
                <Button variant="primary" type="submit">
                  Add Lead
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

export default connect(mapStateToProps)(Lead);
