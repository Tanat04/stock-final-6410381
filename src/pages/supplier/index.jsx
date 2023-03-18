import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from "next/router";

export default function Home({ suppliers }) {

  const router = useRouter()

  function deletesupplier(id) {
    fetch(`/api/stockFinal/suppliers/${id}`,
      {
        method: 'DELETE'
      })
      .then(res => res.json())
      .then(data => {
        // alert("Deleting " + id)
        window.location.reload(false);
      })

  }

  return (
    <>
      <Head>
        <title>Suppliers Management</title>
      </Head>
      <h1>suppliers</h1>
          <p style={{ margin: '0.4rem' }}>
            <Link href="/supplier/supplier">+New Supplier</Link>
          </p>
      <table>
        <thead>
          <tr>
            <th style={{width: '20rem'}}>Supplier Name</th>
            <th style={{width: '10rem'}}>Address</th>
            <th style={{width: '10rem'}}>Phone Number</th>
          </tr>
        </thead>
        <tbody>
          {
            suppliers.map(supplier => {
              return (
                <tr key={supplier._id}>
                  <td >
                    <Link href={`/supplier/${supplier._id}`}>
                      {supplier.supplierName}
                    </Link>
                  </td>
                  <td style={{textAlign:'center'}}>{supplier.address}</td>
                  <td style={{textAlign:'center'}}>{supplier.phoneNumber}</td>
                  <td>                      
                      <>
                        <button onClick={() => { router.push(`/supplier/update/${supplier._id}`); }}>Update</button>
                        &nbsp;&nbsp;&nbsp;
                        <button onClick={() => deletesupplier(supplier._id)}>Delete</button>
                      </>
                  </td>
                </tr>
              )
            })
          }
        </tbody>
      </table>
      <hr/>
      <Link href="/">Home</Link>
      <p>
      </p>

    </>
  )
}
export async function getServerSideProps() {
  const res = await fetch(`https://stock-final-6410381.vercel.app/api/stockFinal/suppliers`)
  const suppliers = await res.json()
  return { props: { suppliers } }
}
