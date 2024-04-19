import { useState, useEffect } from "react";
import { IoClose } from "react-icons/io5";
import {
 useAccount,
 useReadContract,
 useWriteContract,
} from "wagmi";

import backendContractAbi from "../abis/uploadBackend.json";
import { postData } from "../utils/apiHelpers";
import {
 backendContractAddress,
} from "../config";

function UploadElement({toggleUpload, openUpload}) {
 const [isLoading, setIsLoading] = useState(false);

 const { address, isConnected } = useAccount();

 const { writeContractAsync: write } = useWriteContract();

 const { refetch: getUserFileSize, data: userSize } = useReadContract({
    abi: backendContractAbi,
    address: backendContractAddress,
    functionName: 'userFileSize',
    args: [address],
    account: address,
    query: { enabled: !!address },
 });

 const { data: fileSizeLimit } = useReadContract({
    abi: backendContractAbi,
    address: backendContractAddress,
    functionName: "getFileSizeLimit",
    args: [],
    query: { enabled: !!address },
 });

 const changeHandler = (event) => {
    event.preventDefault();
    setIsLoading(true);
    handleSubmission(event.target.files[0]);
 };

 const handleSubmission = async (selectedFile) => {
  console.log("Selected File", selectedFile)
  console.log("Selected Name", selectedFile?.name);
  console.log("Selected Size", selectedFile?.size);
    try {
      if (Number(userSize) + selectedFile?.size > Number(fileSizeLimit)) {
        alert("File size limit exceeded. Upgrade to get more space.");
        return;
      }

      const formData = new FormData();
      formData.append("file", selectedFile);
      const metadata = JSON.stringify({
        name: selectedFile?.name,
      });
      formData.append("pinataMetadata", metadata);

      const options = JSON.stringify({
        cidVersion: 0,
      });
      formData.append("pinataOptions", options);

      let resData = await postData(formData);
      console.log("IPFS Hash: ", resData.IpfsHash);
      if(!resData) { throw new Error("Error uploading file to IPFS")}

      const size = BigInt(selectedFile?.size);

      console.log(size, selectedFile?.name, resData?.IpfsHash)

      await write({
        abi: backendContractAbi,
        address: backendContractAddress,
        functionName: "uploadFile",
        args: [size, selectedFile?.name, resData?.IpfsHash],
        account: address,
      });

      setIsLoading(false);
      toggleUpload(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
 };

 useEffect(() => {
        if (isConnected) {
            getUserFileSize();
        }
    }, [isConnected, getUserFileSize]);

 return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <button
        className="absolute top-4 right-4 bg-red-800 w-8 h-8 rounded-md flex items-center justify-center text-white hover:bg-red-600 transition-colors duration-200"
        onClick={() => toggleUpload(false)}
      >
        <IoClose size={24} />
      </button>

      {isLoading ? (
        <div className="animate-pulse space-y-2 bg-gradient-to-br from-gray-800 to-red-600 bg-white p-6 rounded-lg shadow-lg z-10">
          <div className="flex w-full pt-5 pb-6">
            <div className="h-4 bg-gray-500 rounded "></div>
            <div className="h-4 bg-gray-500 rounded "></div>
            <div className="h-4 bg-gray-500 rounded "></div>
            <div className="h-4 bg-gray-500 rounded "></div>
            <div className="h-4 bg-gray-500 rounded "></div>
          </div>
        </div>
      ) : (
        <div 
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => { e.preventDefault(); e.stopPropagation();}}
        className="bg-white p-6 rounded-lg shadow-lg z-10">
          <div className="flex items-center justify-center w-full">
            <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
              <div className="flex flex-col items-center justify-center pt-5 pb-6">
                <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                 <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
                </svg>
                <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span></p>
                <p className="text-xs text-gray-500 dark:text-gray-400">SAVE ANY FILE (MAX 1GB)</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">Upgrade with <span className="text-green-500">0.005ETH </span>to save more</p>
              </div>
              <input id="dropzone-file" type="file" className="hidden" onChange={changeHandler} />
            </label>
          </div>
        </div>
      )}
    </div>
 );
}

export default UploadElement;
