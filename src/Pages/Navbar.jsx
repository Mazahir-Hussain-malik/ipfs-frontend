import { useState } from "react";
import { IoMdMenu } from "react-icons/io";
import { GiTireIronCross } from "react-icons/gi";
import { useWeb3Modal } from '@web3modal/wagmi/react'
import {useDisconnect, useAccount} from "wagmi"
import {PropTypes} from "prop-types";
import "./Global.css"


const Navbar = ({ toggleSidebar }) => {
    const {open} = useWeb3Modal();
    const [show, setShow] = useState(false);
    // const [popup , setPopup] = useState(false);
    const { disconnect } = useDisconnect();
    const { isConnected } = useAccount();
 return (
    <div className="flex justify-between items-center glassnav px-2 py-[1.4rem] ">
      <div className=" absolute text-[30px] text-[#fff] left-1 top-1 md:hidden block " onClick={() => toggleSidebar()}>
      {!show ?  <IoMdMenu />:    <GiTireIronCross />}
      </div>
      <div className="text-white font-bold text-xl mx-10 md:mx-0">
        <div className="flex items-center">
            <img src="/logo.png" alt="logo" width={40}/>
            <h2 className="mx-2">Data Vortex AI</h2>
        </div>

      </div>
      <div className="mx-4 hidden md:block">
        {
            isConnected ?
            <button onClick={ () => disconnect()} className="text-white">
            Disconnect
            </button> 
        :

        <button onClick={() => open()} className=" flex items-center space-x-2 text-white  bg-[#164e63] hover:scale-105   focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all ease-linear delay-150 border-2 border-[#059669]">
          Connect Wallet
        </button>
        }
      </div>
      
    </div>
 );
};

Navbar.propTypes = {
    toggleSidebar: PropTypes.func
}

export default Navbar;