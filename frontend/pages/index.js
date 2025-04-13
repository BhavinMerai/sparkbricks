import React from 'react';
import Head from 'next/head';
import SparkBricksNavbar from '../components/SparkBricksNavbar';
import SparkBricksFooter from '../components/SparkBricksFooter';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Head>
        <title>SparkBricks | Data Engineering Platform</title>
        <meta name="description" content="Collaborative data science platform" />
      </Head>

      <SparkBricksNavbar />

      <main className="flex-grow container mx-auto px-4 py-8">
        {/* Hero Section */}
        <section className="text-center py-16">
          <h1 className="text-4xl font-bold text-gray-800 mb-6">
            Your Data Engineering Workbench
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Build, share, and compete on SparkBricks
          </p>
        </section>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {['Notebooks', 'Competitions', 'Datasets'].map((feature) => (
            <div key={feature} className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h3 className="text-xl font-semibold mb-3">{feature}</h3>
              <p className="text-gray-600">
                {feature === 'Notebooks' && 'Create and share executable notebooks'}
                {feature === 'Competitions' && 'Compete in DE challenges'} 
                {feature === 'Datasets' && 'Explore curated datasets'}
              </p>
            </div>
          ))}
        </div>
      </main>

      <SparkBricksFooter />
    </div>
  );
}
