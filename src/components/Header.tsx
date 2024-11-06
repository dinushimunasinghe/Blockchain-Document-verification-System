import React from 'react';
import { FileCheck, Shield } from 'lucide-react';

export function Header() {
  return (
    <header className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-6">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <FileCheck className="h-8 w-8" />
            <h1 className="text-2xl font-bold">DocChain Verify</h1>
          </div>
          <div className="flex items-center space-x-2">
            <Shield className="h-5 w-5" />
            <span className="text-sm">Secured by Ethereum</span>
          </div>
        </div>
      </div>
    </header>
  );
}