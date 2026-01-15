"use client";

import { useEffect, useState } from "react";

export default function AdminPage() {
  const [message, setMessage] = useState("Checking access...");

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (!token) {
      setMessage("Not logged in");
      return;
    }

    fetch("/api/admin", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setMessage(data.message))
      .catch(() => setMessage("Error"));
  }, []);

  return (<div>
    <main style={{ padding: 40, fontFamily: "monospace" }}>
      <h1>Admin Panel</h1>
      <p>{message}</p>
    </main>
    <button onClick={()=>{localStorage.removeItem("token"); window.location.href="/"}}>Logout</button>  
  </div>);
}
