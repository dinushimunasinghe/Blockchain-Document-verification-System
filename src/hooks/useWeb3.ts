import { useState, useEffect } from 'react';
import { Web3Storage } from 'web3.storage';
import { ethers } from 'ethers';

const contractABI = [
  "function addDocument(string memory hash) public",
  "function verifyDocument(string memory hash) public view returns (bool)"
];

const contractAddress = "YOUR_CONTRACT_ADDRESS";

export function useWeb3() {
  const [provider, setProvider] = useState<ethers.BrowserProvider | null>(null);
  const [signer, setSigner] = useState<ethers.Signer | null>(null);
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    const init = async () => {
      if (typeof window.ethereum !== 'undefined') {
        const provider = new ethers.BrowserProvider(window.ethereum);
        const signer = await provider.getSigner();
        const contract = new ethers.Contract(contractAddress, contractABI, signer);
        
        setProvider(provider);
        setSigner(signer);
        setContract(contract);
      }
    };

    init();
  }, []);

  const uploadDocument = async (file: File) => {
    if (!contract || !signer) throw new Error('Web3 not initialized');

    // Upload to IPFS
    const client = new Web3Storage({ token: 'YOUR_WEB3_STORAGE_TOKEN' });
    const cid = await client.put([file]);

    // Store hash in smart contract
    const tx = await contract.addDocument(cid);
    await tx.wait();

    return cid;
  };

  const verifyDocument = async (hash: string) => {
    if (!contract) throw new Error('Web3 not initialized');
    return await contract.verifyDocument(hash);
  };

  return {
    provider,
    signer,
    contract,
    uploadDocument,
    verifyDocument
  };
}