
import { HiHome, HiStar, HiTrash, HiCloud } from "react-icons/hi2";
import "./Global.css";
// import WalletInfo from "../PopUps/WalletInfo";
import {PropTypes} from "prop-types";

// const Navbar = ({isOpen}) => {
//   const {open} = useWeb3Modal();
//   const [show, setShow] = useState(isOpen);
//   // const [popup , setPopup] = useState(false);
//   const { disconnect } = useDisconnect();
//   const { status } = useAccount();

//   return (
//     <nav className="bg-gray-800 flex justify-around md:items-center items-start md:flex-row flex-col relative py-4  ">
//       <div>
//         <img src="/logo.svg" alt="" className=" w-[200px]" />
//       </div>
//       <ul className={`${show ? "flex md:gap-[2rem] gap-[1rem] md:flex-row flex-col md:mx-0 mx-8" : " md:flex gap-[2rem] hidden" } ` }>
//         <Link to="/upload" 
//         className="text-[16px] hover:text-blue-800 hover:scale-105 transition-all bg-[#1f6093] rounded-lg text-cyan-100 ease-linear delay-150 p-2">
//           <img src="/upload.png" alt=""  />
//           Upload
//         </Link>
//         {
//           status !== "connected" ?
//           <button className="flex gap-[0.4rem] items-center justify-center bg-[#1f6093] px-[8px] py-[4px] text-[16px] font-normal text-cyan-100 hover:bg-blue-500 transition-all rounded-lg ease-linear delay-200"
//           onClick={open()}>
//             <img src="/circum_wallet.svg" alt="diamond" /> CONNECT WALLET
//           </button> : 
//           <button
//           className="flex gap-[0.4rem] items-center justify-center bg-[#1f6093] px-[8px] py-[4px] text-[16px] font-normal text-cyan-100 hover:bg-blue-500 transition-all rounded-lg ease-linear delay-200"
//           onClick={() =>{ disconnect()}}>
//             <img src="/disconnect.svg" alt="disconnect" />
//             Disconnect</button>
//         }

//       </ul>
//       <div className=" absolute text-[30px] text-[#fff] right-5 top-7 md:hidden block " onClick={() => setShow(!show)}>
//       {!show ?  <IoMdMenu />:    <GiTireIronCross />}
//       </div>
//     </nav>
//   );
// };

const Sidebar = ({ isOpen, toggleSidebar, setCurrentPage, setUploadElem, openUpload }) => {
 const handleLinkClick = (page) => {
    setCurrentPage(page);
    toggleSidebar(false); // Close the sidebar on mobile
 };

 return (
    <>
      <div className={` glass w-64 min-h-screen items center p- lg:block ${isOpen ? 'block' : 'hidden'}`}>
        <ul className="space-y-4 flex flex-col justify-center items-center gap-[1rem] py-[2rem] transition-all ease-linear delay-150">
          <li>
            <button className="flex items-center space-x-2 text-white   bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500   focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all ease-linear delay-150" onClick={() => setUploadElem(!openUpload)}>
              <HiCloud className="h-5 w-5" />
              <span>Add File</span>
            </button>
          </li>
          <li>
            <a href="#" onClick={() => handleLinkClick('Home')} className="flex items-center space-x-2 text-white   hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500   focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all ease-linear delay-150">
              <HiHome className="h-5 w-5" />
              <span>Home</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleLinkClick('Starred')} className="flex items-center space-x-2 text-white   hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500   focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all ease-linear delay-150">
              <HiStar className="h-5 w-5" />
              <span>Starred</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleLinkClick('Trash')} className="flex items-center space-x-2 text-white   hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500   focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all ease-linear delay-150">
              <HiTrash className="h-5 w-5" />
              <span>Trash</span>
            </a>
          </li>
          <li>
            <a href="#" onClick={() => handleLinkClick('Storage')} className="flex items-center space-x-2 text-white   hover:bg-gradient-to-r from-blue-500 via-blue-600 to-blue-500   focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all ease-linear delay-150">
              <HiCloud className="h-5 w-5" />
              <span>Storage</span>
            </a>
          </li>
          <li>
            <button href="#" onClick={() => handleLinkClick('Storage')} className="flex items-center space-x-2 text-white  bg-[#164e63] hover:scale-105   focus:outline-none focus:ring-blue-300 dark:focus:ring-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2 transition-all ease-linear delay-150 border-2 border-[#059669]">
              
              Ai optimization
            </button>
          </li>
        </ul>
      </div>
    </>
 );
};

Sidebar.propTypes = {
  isOpen: PropTypes.bool,
  toggleSidebar: PropTypes.func,
  setCurrentPage: PropTypes.func,
  setUploadElem: PropTypes.func,
  openUpload: PropTypes.bool,
};


export default Sidebar