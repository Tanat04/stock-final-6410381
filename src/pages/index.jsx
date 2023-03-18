import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/router";
import "bootstrap/dist/css/bootstrap.min.css";
import {Navbar, NavDropdown, Container, Nav, Button, Table} from "react-bootstrap";

const styles = {
  addButton: {
    marginLeft: '865px',
    marginBottom: '1.5em',
    fontFamily: 'Arial',
    fontWeight: 'bold',
  },
  brand: {
    marginLeft: '100px',
    fontSize: '24px',
    fontWeight: '600',
  },
};

export default function Home({ suppliers }) {

  const router = useRouter()

  function deletesupplier(id, supplierName) {
    if (window.confirm(`Supplier ${supplierName} will be deleted!`)) {
      fetch(`/api/stockFinal/suppliers/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          window.location.reload(false);
        });
    }
  }

  return (
    <>
      <Head>
        <title>Suppliers Management</title>
      </Head>
      <Navbar bg="light" expand="lg">
      <Navbar.Brand style={styles.brand} href="/">
        Suppliers Management
      </Navbar.Brand>
    </Navbar>

    <Container style={{ width: '69%', marginTop: '3em' }}>
          <Link href="/supplier">
          <Button style={styles.addButton} variant="primary">
            New Supplier
          </Button>
        </Link>
          <Table responsive>
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Address</th>
                <th>Phone Number</th>
                <th style={{ width: "0rem" }}></th>
                <th style={{ width: "0rem" }}></th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier._id}>
                  <td>
                    <Link href={`/supplier/${supplier._id}`} style={{textDecoration: 'none', color: 'black'}}>
                      {supplier.supplierName}
                    </Link>
                  </td>
                  <td>{supplier.address}</td>
                  <td>{supplier.phoneNumber}</td>
                  <td>
                    <Button
                      variant="outline-primary"
                      onClick={() => {
                        router.push(`/supplier/update/${supplier._id}`);
                      }}
                    >
                      Update
                    </Button>
                  </td>
                  <td>
                    <Button
                      variant="outline-danger"
                      onClick={() => deletesupplier(supplier._id, supplier.supplierName)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          </Container>
    </>
  )
}
export async function getServerSideProps() {
  const res = await fetch(`https://stock-final-6410381.vercel.app/api/stockFinal/suppliers`)
  const suppliers = await res.json()
  suppliers.sort((a, b) => a.supplierName.localeCompare(b.supplierName));

  return { props: { suppliers } }
}
