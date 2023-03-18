import Head from "next/head"
import Link from "next/link"
import Card from 'react-bootstrap/Card';
import ListGroup from 'react-bootstrap/ListGroup';
import Button from 'react-bootstrap/Button';
import {Navbar, NavDropdown, Container, Nav} from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";


const styles = {
    brand: {
      marginLeft: '100px',
      fontSize: '24px',
      fontWeight: '600',
    },
  };

  
// Step 2: This component is rendered from the server (Server-Side Rendering) SSR
export default function Supplier({ supplier }) {
  console.log('Supplier 2', supplier)
  if (!supplier) return (
    <div>
      <p>Supplier not found</p>
      <Link href="/supplier">Back</Link>
      </div>
  );

  return (
    <>
      <Head>
        <title>{supplier.name}</title>
      </Head>

      <Navbar bg="light" expand="lg">
      <Navbar.Brand style={styles.brand} href="/">
        Suppliers Management
      </Navbar.Brand>
    </Navbar>
    
    <div style={{display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        marginTop: "6rem", maxWidth: "35%", marginLeft: "30%"}}>
      <Card style={{ width: '35rem' , border: '1px solid #ccc', padding: "2.5rem", borderRadius: "1.5rem",}}>
      <Card.Body>
        <Card.Title style={{ fontSize: '2rem' }}>{supplier.supplierName}</Card.Title>
      </Card.Body>
      <ListGroup className="list-group-flush">
        <ListGroup.Item style={{ fontSize: '1.2rem', marginTop: '0.4em', marginBottom: '0.4em'}}><b>Supplier&apos;s Address:</b> <u>{supplier.address}</u></ListGroup.Item>
        <ListGroup.Item style={{ fontSize: '1.2rem' }}><b>Supplier&apos;s Phone Number:</b> <u>{supplier.phoneNumber}</u></ListGroup.Item>
      </ListGroup>
      <Card.Body>
        <Button variant="primary" href="/">Go Back</Button>
      </Card.Body>
    </Card>
    </div>
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
