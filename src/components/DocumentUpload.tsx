import React, { useCallback, useState } from 'react';
import { Upload, CheckCircle, AlertCircle } from 'lucide-react';
import { useWeb3 } from '../hooks/useWeb3';

export function DocumentUpload() {
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const { uploadDocument } = useWeb3();

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) setFile(droppedFile);
  }, []);

  const handleUpload = async () => {
    if (!file) return;
    setUploading(true);
    try {
      await uploadDocument(file);
      setStatus('success');
    } catch (error) {
      setStatus('error');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-8">
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={handleDrop}
        className="border-2 border-dashed border-blue-300 rounded-lg p-8 text-center hover:border-blue-500 transition-colors"
      >
        <Upload className="mx-auto h-12 w-12 text-blue-500 mb-4" />
        <h3 className="text-lg font-semibold mb-2">Upload Document</h3>
        <p className="text-gray-600 mb-4">
          Drag and drop your file here, or click to select
        </p>
        <input
          type="file"
          onChange={(e) => e.target.files && setFile(e.target.files[0])}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="bg-blue-600 text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors"
        >
          Select File
        </label>
        {file && (
          <div className="mt-4">
            <p className="text-sm text-gray-600">{file.name}</p>
            <button
              onClick={handleUpload}
              disabled={uploading}
              className="mt-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition-colors disabled:opacity-50"
            >
              {uploading ? 'Uploading...' : 'Upload to Blockchain'}
            </button>
          </div>
        )}
        {status === 'success' && (
          <div className="mt-4 flex items-center justify-center text-green-600">
            <CheckCircle className="h-5 w-5 mr-2" />
            <span>Document uploaded successfully!</span>
          </div>
        )}
        {status === 'error' && (
          <div className="mt-4 flex items-center justify-center text-red-600">
            <AlertCircle className="h-5 w-5 mr-2" />
            <span>Error uploading document</span>
          </div>
        )}
      </div>
    </div>
  );
}