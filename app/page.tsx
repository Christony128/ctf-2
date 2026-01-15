"use client";

import { useState } from "react";

export default function Home() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [filename, setFilename] = useState("");
  const [fileContent, setFileContent] = useState("");

  async function login() {
    const res = await fetch("/api/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await res.json();

    if (data.token) {
      localStorage.setItem("token", data.token);
      window.location.href = "/admin";
    } else {
      alert("Login failed");
    }
  }

  async function viewFile() {
    if (!filename) return;

    const res = await fetch(`/api/view?file=${encodeURIComponent(filename)}`);
    const text = await res.text();

    if (res.ok) {
      setFileContent(text);
    } else {
      try {
        const json = JSON.parse(text);
        setFileContent(`Error: ${json.error}`);
      } catch {
        setFileContent("Error: Could not read file.");
      }
    }
  }

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      
      <div style={{ marginBottom: "40px" }}>
        <h2 style={{ marginBottom: "10px" }}>Login</h2>
        
        <div style={{ marginBottom: "10px" }}>
          <b>Username:</b><br />
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </div>

        <div style={{ marginBottom: "10px" }}>
          <b>Password:</b><br />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button onClick={login}>Login</button>
      </div>

      <hr />

      <div>
        <h2 style={{ marginBottom: "10px" }}>File Viewer</h2>
        <p style={{ fontSize: "13px" }}>Enter filename to view: (welcome.txt, credentials.txt, changelog.txt)</p>

        <input
          placeholder="filename.txt"
          value={filename}
          onChange={(e) => setFilename(e.target.value)}
        />
        <button onClick={viewFile} style={{ marginLeft: "5px" }}>View</button>

        <div style={{ marginTop: "20px" }}>
          <b>File Content:</b>
          <div style={{
            marginTop: "5px",
            padding: "10px",
            border: "1px solid black",
            minHeight: "100px",
            whiteSpace: "pre-wrap",
            fontFamily: "monospace",
            backgroundColor: "#fff"
          }}>
            {fileContent || "no file loaded"}
          </div>
        </div>
      </div>

    </div>
  );
}