import Head from "next/head"
import Link from "next/link"
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
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const styles = {
    brand: {
      marginLeft: '100px',
      fontSize: '24px',
      fontWeight: '600',
    },
  };



// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ supplier }) {
  const { register, handleSubmit, reset } = useForm();
  const [data, setData] = useState("");

  useEffect(() => {
    reset(supplier)
  }, [reset, supplier])

  const updateSupplier = async (data) => {
    const response = await fetch(`/api/stockFinal/suppliers/${supplier._id}`, {
      method: "PUT", // *GET, POST, PUT, DELETE, etc.
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
    const result = await response.json();   // deserialise
    if (result.error) {
      alert("Error: " + result.error)
    } else {
      alert("Supplier updated")
      window.location.href = "/"
    }
    console.log(result)
    setData(JSON.stringify(data))
  }

  console.log('supplier 2', supplier)
  if (!supplier) return (
    <div>
      <p>Supplier not found</p>
      <Link href="/">Back</Link>
    </div>
  );

  return (
    <>
    <Navbar bg="light" expand="lg">
        <Navbar.Brand style={styles.brand} href="/">
        Suppliers Management
        </Navbar.Brand>
    </Navbar>

      <Head>
        <title>Update {supplier.supplierName}</title>
      </Head>

    <Container
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "3rem", maxWidth: "35%", marginLeft: "30%", border: '1px solid #ccc', padding: "2.5rem", borderRadius: "1.5rem",
      }}
    >
        <Form onSubmit={handleSubmit(updateSupplier)}>
          <Row className="mb-4">
            <Col>
              <h1 className="text-center">Update Supplier</h1>
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
              placeholder="123 Main Middle St."
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
  )
}

// STEP 1: This function will be executed at the server before loading the page.
export async function getServerSideProps({ params }) {
  console.debug('params', params)
  const res = await fetch(`https://stock-final-6410381.vercel.app/api/stockFinal/suppliers/${params.id}`)
  const supplier = await res.json()
  console.debug('supplier 1', supplier)
  return { props: { supplier } }
}