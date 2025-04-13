import React from 'react';
import SparkBricksNavbar from '../../components/SparkBricksNavbar';
import SparkBricksFooter from '../../components/SparkBricksFooter';

export default function DatasetsPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SparkBricksNavbar />
      <main className="flex-grow container mx-auto py-8 px-4">
        <h1 className="text-3xl font-bold mb-6">Datasets</h1>
        <div className="bg-white p-6 rounded-lg shadow">
          <p>Available datasets will appear here</p>
        </div>
      </main>
      <SparkBricksFooter />
    </div>
  );
}
