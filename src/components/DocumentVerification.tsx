import React, { useState } from 'react';
import { Search, CheckCircle2, XCircle } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';

export function DocumentVerification() {
  const [hash, setHash] = useState('');
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);
  const { verifyDocument } = useWeb3();

  const handleVerify = async () => {
    if (!hash) return;
    const isVerified = await verifyDocument(hash);
    setVerificationStatus(isVerified);
  };

  return (
    <div className="max-w-xl mx-auto mt-12 p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-semibold mb-4">Verify Document</h2>
      <div className="flex space-x-2">
        <input
          type="text"
          value={hash}
          onChange={(e) => setHash(e.target.value)}
          placeholder="Enter document hash"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <button
          onClick={handleVerify}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center"
        >
          <Search className="h-4 w-4 mr-2" />
          Verify
        </button>
      </div>
      {verificationStatus !== null && (
        <div className={`mt-4 flex items-center ${verificationStatus ? 'text-green-600' : 'text-red-600'}`}>
          {verificationStatus ? (
            <>
              <CheckCircle2 className="h-5 w-5 mr-2" />
              <span>Document is verified and authentic</span>
            </>
          ) : (
            <>
              <XCircle className="h-5 w-5 mr-2" />
              <span>Document verification failed</span>
            </>
          )}
        </div>
      )}
    </div>
  );
}