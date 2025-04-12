// pages/index.js
import React from "react";
import { useRouter } from "next/router";
import Navbar from "../components/Navbar";
import NotebookList from "../components/NotebookList";

export default function Home() {
  const router = useRouter();

  return (
    <div className="bg-gray-950 text-white min-h-screen font-sans">
      <Navbar />

      {/* Hero Section */}
      <header className="text-center p-10 bg-gray-900 border-b border-gray-800">
        <h2 className="text-4xl font-bold">Learn, Compete & Collaborate</h2>
        <p className="mt-2 text-gray-400">
          Join the world's largest data science community
        </p>
        <div className="mt-6 relative w-full max-w-md mx-auto">
          <input
            type="text"
            placeholder="Search for datasets, notebooks..."
            className="w-full px-4 py-2 rounded-md text-black"
          />
          <button className="absolute right-2 top-1.5 bg-blue-600 text-white px-3 py-1.5 rounded-md">
            🔍
          </button>
        </div>
      </header>

      {/* Datasets Section */}
      <section className="p-10">
        <h3 className="text-2xl font-semibold mb-1">📊 Datasets</h3>
        <p className="text-gray-400 mb-3">
          Explore and share high-quality datasets.
        </p>
        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md">
          Browse Datasets
        </button>
      </section>

      {/* Notebooks Section */}
      <section className="p-10">
        <h3 className="text-2xl font-semibold mb-1">📓 Notebooks</h3>
        <p className="text-gray-400 mb-3">
          Create and collaborate on data science notebooks.
        </p>

        <button
          onClick={() => router.push("/notebook")}
          className="px-4 py-2 bg-blue-600 hover:bg-blue-500 rounded-md"
        >
          Open Notebook Editor
        </button>

        <div className="mt-6 p-4 bg-gray-900 border border-gray-800 rounded-md">
          <NotebookList />
        </div>
      </section>

      {/* Competitions Section */}
      <section className="p-10">
        <h3 className="text-2xl font-semibold mb-1">🏆 Competitions</h3>
        <p className="text-gray-400 mb-3">
          Join machine learning challenges and win prizes.
        </p>
        <button className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-md">
          View Competitions
        </button>
      </section>

      {/* Footer */}
      <footer className="p-6 text-center bg-gray-900 border-t border-gray-800 text-sm text-gray-500">
        © 2025 Kaggle Clone. All rights reserved.
      </footer>
    </div>
  );
}
