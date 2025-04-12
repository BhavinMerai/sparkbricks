// pages/notebook.js
"use client";

import React, { useState } from "react";
import Navbar from "../components/Navbar";
import NotebookLayout from "../components/NotebookLayout";

export default function NotebookPage() {
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("");

  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans">
      <Navbar />
      <NotebookLayout code={code} setCode={setCode} output={output} setOutput={setOutput} />
    </div>
  );
}
