import React from 'react';
import { Header } from './components/Header';
import { DocumentUpload } from './components/DocumentUpload';
import { DocumentVerification } from './components/DocumentVerification';

function App() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-8">
            Secure Document Verification Platform
          </h2>
          <p className="text-gray-600 text-center mb-12">
            Upload and verify your documents using blockchain technology for
            tamper-proof authenticity verification
          </p>
          <div className="grid md:grid-cols-2 gap-8">
            <div className="bg-white rounded-lg shadow-lg p-6">
              <DocumentUpload />
            </div>
            <div className="bg-white rounded-lg shadow-lg p-6">
              <DocumentVerification />
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-gray-800 text-white py-8 mt-16">
        <div className="container mx-auto px-4 text-center">
          <p>© 2024 DocChain Verify. Powered by Ethereum Blockchain.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;