import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
import {
  Container,
  Form,
  Button,
  Row,
  Col,
  Navbar,
  Nav,
} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";

const styles = {
  brand: {
    marginLeft: '100px',
    fontSize: '24px',
    fontWeight: '600',
  },
};

export default function AddSupplier() {
  const { register, handleSubmit } = useForm();
  const [data, setData] = useState("");

  const saveSupplier = async (data) => {
    const response = await fetch("/api/stockFinal/suppliers", {
      method: "POST", // *GET, POST, PUT, DELETE, etc.
      mode: "cors", // no-cors, *cors, same-origin
      cache: "no-cache", // *default, no-cache, reload, force-cache, only-if-cached
      // credentials: "same-origin", // include, *same-origin, omit
      headers: {
        "Content-Type": "application/json",
        // 'Content-Type': 'application/x-www-form-urlencoded',
      },
      // redirect: "follow", // manual, *follow, error
      referrerPolicy: "no-referrer", // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
      // serialisation
      body: JSON.stringify(data), // body data type must match "Content-Type" header
    });
    const result = await response.json(); // deserialise
    if (result.error) {
      alert("Error: " + result.error);
    } else {
      alert(`Supplier ${data.supplierName} added`);
      window.location.href = "/";
    }
    console.log(result);
    setData(JSON.stringify(data));
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
    <Navbar.Brand style={styles.brand} href="/">
    Suppliers Management
  </Navbar.Brand>
    </Navbar>
    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "3rem", maxWidth: "35%", marginLeft: "30%", border: '1px solid #ccc', padding: "2.5rem", borderRadius: "1.5rem",
      }}
    >
      <Form onSubmit={handleSubmit(saveSupplier)}>
      <Row className="mb-4">
        <Col>
          <h1 className="text-center">New Supplier</h1>
        </Col>
      </Row>

        <Form.Group controlId="supplierName">
            <Form.Label>Supplier Name</Form.Label>
            <Form.Control
              {...register("supplierName", { required: true })}
              placeholder="Tanat Arora"
            />
          </Form.Group>
          <br />

          <Form.Group controlId="address">
            <Form.Label>Address</Form.Label>
            <Form.Control
              {...register("address", { required: true })}
              placeholder="123 Black Clover St."
            />
          </Form.Group>
          <br />

          <Form.Group controlId="phoneNumber">
            <Form.Label>Phone Number</Form.Label>
            <Form.Control
              {...register("phoneNumber", { required: true })}
              placeholder="555-123-1234"
            />
          </Form.Group>
          <br />

          <div
          style={{display: "flex",
          justifyContent: "center",
          alignItems: "center",}}>
              <Button variant="outline-secondary" href="/" style={{width: '7em',marginLeft: '12em'}}>
                Back
              </Button>

              <Button variant="primary" type="submit" style={{width: '7em', marginLeft: '1em'}}>
                Save
              </Button>
          </div>
      </Form>
      </Container>
      </>
  );
}
