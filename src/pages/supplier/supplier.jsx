import { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

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
      alert("Supplier Added");
      window.location.href = "/supplier";
    }
    console.log(result);
    setData(JSON.stringify(data));
  };

  return (
    <div style={{ margin: "1rem" }}>
      <nav>
        <ul>
          <li>
            <Link href="/">Home</Link>
          </li>
          <li>
            <Link href="/supplier">Suppliers</Link>
          </li>
        </ul>
      </nav>
      <form onSubmit={handleSubmit(saveSupplier)}>
        <h1>New Supplier</h1>
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

        <input type="submit" value="Add"/>
        <p>{data}</p>
        <br />
      </form>
    </div>
  );
}
