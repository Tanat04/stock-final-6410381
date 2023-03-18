import Head from "next/head"
import Link from "next/link"

import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";



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
      <Head>
        <title>Update {supplier.supplierName}</title>
      </Head>

{/* <p>{JSON.stringify(supplier)}</p> */}
      <div style={{ margin: '1rem' }}>
        <form onSubmit={handleSubmit(updateSupplier)}>
          <h1>Update Supplier</h1>
        <label htmlFor="supplierName">Supplier Name</label>
        <br />
        <input
          id="supplierName"
          {...register("supplierName", { required: true })}
          placeholder="Tanat Arora"
        />
        <br />

        <label htmlFor="address">Address</label>
        <br />
        <input
          id="address"
          {...register("address", { required: true })}
          placeholder="123 Main St."
        />
        <br />

        <label htmlFor="phoneNumber">Phone Number</label>
        <br />
        <input
          id="phoneNumber"
          {...register("phoneNumber", { required: true })}
          placeholder="555-123-1234"
        />
        <br />

        <input type="submit" />
        <br />
      </form>
      </div>

      <Link href="/">Back</Link>
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