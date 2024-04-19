import { useState, useEffect } from "react";
import { useAccount, useConnect, useSwitchChain, useReadContract } from "wagmi";
import {
    HiStar,
    HiFolderArrowDown,
} from "react-icons/hi2";
import { HiDotsVertical } from "react-icons/hi";

import backendContractAbi from "../abis/uploadBackend.json";
import { backendContractAddress } from '../config';
import "./Global.css";

const Starred = () => {
 const [userFiles, setUserFiles] = useState([]);
 const { address, status, chain, isConnected } = useAccount();
 const { connect } = useConnect();
 const { switchChain } = useSwitchChain();

 const { refetch: getUserFiles, data: userFileList } = useReadContract({
      abi: backendContractAbi,
      address: backendContractAddress,
      functionName: 'getUserFiles',
      args: [address],
      account: address,
      query: { enabled: !!address },
 });

 useEffect(() => {
      if (isConnected && chain.id !== 11155111) {
          switchChain(11155111);
      }
 }, [isConnected, chain, switchChain]);

 useEffect(() => {
      if (isConnected) {
          getUserFiles();
      }
 }, [isConnected, getUserFiles]);

 useEffect(() => {
      if (userFileList) {
          setUserFiles(userFileList);
      }
 }, [userFileList]);

  // Function to convert BigInt to Date String
  const formatDate = (bigIntTimestamp) => {
      const timestamp = Number(bigIntTimestamp); // Convert BigInt to Number
      const date = new Date(timestamp * 1000); // Convert to Date object
      return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`; // Convert to readable string
  };

  // Function to classify file size
  const formatFileSize = (size) => {
      const units = ['B', 'KB', 'MB', 'GB'];
      let unitIndex = 0;
      while (size >= 1000) {
          size /= 1000;
          unitIndex++;
      }
      return `${unitIndex == 0 ? size : size.toFixed(2)} ${units[unitIndex]}`;
  };

 if (status === "loading") {
      return <div>Loading...</div>;
 }

 if (!isConnected) {
      return (
          <div className=" min-h-screen p-4 files">
              <button className="text-white" onClick={connect}>Connect Wallet</button>
          </div>
      );
 }

 return (
      <div className="bg-black min-h-screen p-4">
          <h1 className="text-white">File List</h1>
          <table className="table-auto w-full">
              <thead>
                 <tr>
                      <th className="px-4 py-2 text-white">Name</th>
                      <th className="px-4 py-2 text-white">Created Time</th>
                      <th className="px-4 py-2 text-white">File Size</th>
                      <th className="px-4 py-2 text-white">Actions</th>
                 </tr>
              </thead>
              <tbody>
                 {userFiles.map((item, index) => (
                      item.starred && (
                          <tr key={index} className={index % 2 === 0 ? 'bg-gray-800' : 'bg-gray-900'}>
                              <td className="px-4 py-2 text-white">{item.name}</td>
                              <td className="px-4 py-2 text-white">{formatDate(item.createdAt)}</td>
                              <td className="px-4 py-2 text-white">{formatFileSize(Number(item.fileSize))}</td>
                              <td className="px-4 py-2 text-white">
                                 <div className="flex mx-2 space-x-2">
                                      <button><HiFolderArrowDown /></button>
                                      <button><HiStar /></button>
                                      <button><HiDotsVertical /></button>
                                 </div>
                              </td>
                          </tr>
                      )
                  ))}
              </tbody>
          </table>
      </div>
 );
};

export default Starred;
