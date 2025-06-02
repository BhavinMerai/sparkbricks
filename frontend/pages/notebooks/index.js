import React from 'react';
import SparkBricksNavbar from '../../components/SparkBricksNavbar';
import SparkBricksFooter from '../../components/SparkBricksFooter';
import NotebookUI from '../../components/NotebookUI';

export default function NotebooksPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <SparkBricksNavbar />
      <main className="flex-grow">
        <NotebookUI />
      </main>
      <SparkBricksFooter />
    </div>
  );
}
