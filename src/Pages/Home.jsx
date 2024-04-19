import { HiStar, HiFolderArrowDown } from "react-icons/hi2";
import { useState, useEffect } from "react";
import { HiDotsVertical } from "react-icons/hi";
import { RxCross2 } from "react-icons/rx";


import {
  useAccount,
  useConnect,
  useSwitchChain,
  useReadContract,
  useWriteContract,
} from "wagmi";

import backendContractAbi from "../abis/uploadBackend.json";
import { backendContractAddress } from "../config";
import "./Global.css";

const Home = () => {
  const [userFiles, setUserFiles] = useState([]);
  const { switchChain } = useSwitchChain();
  const { address, chain, isConnected } = useAccount();
  const { connect } = useConnect();
     const [warning , setWarning] = useState(true);
  const { writeContractAsync: starFile } = useWriteContract();

  const starFileHandler = async (item) => {
    await starFile({
      abi: backendContractAbi,
      address: backendContractAddress,
      functionName: "starFile",
      args: [item.fileHash, !item.starred],
      account: address,
      onSent: () => {
        console.log("Starred file");
      },
      onSuccess: () => {
        console.log("File starred");
      },
      onError: (error) => {
        console.error("Error starring file:", error);
      },
    });
  };

  const {
    refetch: getUserFiles,
    data: userFileList,
    error,
  } = useReadContract({
    abi: backendContractAbi,
    address: backendContractAddress,
    functionName: "getUserFiles",
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
    if (error) {
      console.error("Error fetching user files:", error);
    } else if (userFileList) {
      setUserFiles(userFileList);
    }
  }, [userFileList, error]);

  useEffect(() => {
    if (isConnected) {
      getUserFiles();
    }
  }, [isConnected, getUserFiles]);

  // Function to convert bigint from contract to Date String
  const formatDate = (bigIntTimestamp) => {
    const timestamp = Number(bigIntTimestamp); // Convert BigInt to Number
    const date = new Date(timestamp * 1000); // Convert to Date object
    return `${date.getDay()}/${date.getMonth()}/${date.getFullYear()}`; // Convert to readable string
  };

  // Function to classify file size
  const formatFileSize = (size) => {
    const units = ["B", "KB", "MB", "GB"];
    let unitIndex = 0;
    while (size >= 1000) {
      size /= 1000;
      unitIndex++;
    }
    return `${unitIndex == 0 ? size : size.toFixed(2)} ${units[unitIndex]}`;
  };

  if (!isConnected) {
    return (
      <div className=" min-h-screen p-4 files shadow-2xl  ">
        <img src="/logo-dark.svg" alt="" className="w-[80px] cursor-pointer " />
        {/* <button className="text-white" onClick={connect}>Connect Wallet</button> */}
        <div className={` flex justify-center items-center text-[#fff] md:text-[30px] text-[18px] font-semibold   bg-red-900 md:w-[60%]  w-[90%] h-[400px] shadow-2xl rounded-[40px] mx-auto relative ${ warning ? " block" : "hidden"} `}>
        <span onClick={() => setWarning(!warning)} className=" cursor-pointer absolute right-5 top-2">
            <RxCross2 />
        </span>
          <p>“connect your wallet to start your account”</p>
        </div>
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
            <tr
              key={index}
              className={index % 2 === 0 ? "bg-gray-800" : "bg-gray-900"}
            >
              <td className="px-4 py-2 text-white">{item.name}</td>
              <td className="px-4 py-2 text-white">
                {formatDate(item.createdAt)}
              </td>
              <td className="px-4 py-2 text-white">
                {formatFileSize(Number(item.fileSize))}
              </td>
              <td className="px-4 py-2 text-white">
                <div className="flex mx-2 space-x-2">
                  <button>
                    <HiFolderArrowDown />
                  </button>
                  <button onClick={() => starFileHandler(item)}>
                    <HiStar />
                  </button>
                  <button>
                    <HiDotsVertical />
                  </button>
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
