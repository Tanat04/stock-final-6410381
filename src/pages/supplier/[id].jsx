import Head from "next/head"
import Link from "next/link"

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
      <h1>{supplier.supplierName}</h1>
      <p>Supplier's Address: {supplier.address}</p>
      <p>Supplier's Phone Number: {supplier.phoneNumber}</p>
      <Link href="/supplier">Back</Link>
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
