
import  { useState } from 'react';
import {
  Home,
  Sidebar,
  Navbar,
  Footer,
  Trash,
  Starred,
  UploadElement,
} from './Pages';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query' 
import { WagmiProvider } from 'wagmi'
import { createWeb3Modal } from '@web3modal/wagmi/react'
import { wagmiConfig, PROJECT_ID } from "./config";

// 3. Create modal
createWeb3Modal({
  wagmiConfig: wagmiConfig,
  projectId: PROJECT_ID,
  enableAnalytics: true, // Optional - defaults to your Cloud configuration
  themeMode: "dark"
})

const queryClient = new QueryClient()


// function App() {
//   return (
//         <WagmiProvider config={wagmiConfig}>
//           <QueryClientProvider client={queryClient}>
//             <Router>
//               <div>
//                 <Routes>
//                   <Route path="/" element={<LandingPage />} />
//                   <Route path="/upload" element={<Uploads />} />
//                   {/* Add other routes as needed */}
//                 </Routes>
//               </div>
//             </Router>
//           </QueryClientProvider>
//         </WagmiProvider>
//  );
// }

function App() {
const [isOpen, setIsOpen] = useState(false);
 const [currentPage, setCurrentPage] = useState('Home');
 const [openUpload, setOpenUpload] = useState(false);

 const toggleSidebar = (open) => {
    setIsOpen(open);
 };

 const toggleUploadPage = (open) => {
  setOpenUpload(open)
 }


 const setPage = (page) => {
  setCurrentPage(page);
 }

 const renderPage = () => {
    switch (currentPage) {
      case 'Home':
        return <Home setPage={setPage} />;
      case 'Starred':
        return <Starred />;
      case 'Trash':
        return <Trash />;
      case 'Storage':
        return <Uploads />;
      default:
        return <Home />;
    }
 };

  return (
    <WagmiProvider config={wagmiConfig}>
      <QueryClientProvider client={queryClient}>
        <div className="flex flex-col">
          <Navbar toggleSidebar={() => toggleSidebar(!isOpen)} />
          <div className="flex">
            <Sidebar 
            isOpen={isOpen} 
            toggleSidebar={toggleSidebar} 
            setCurrentPage={setCurrentPage}
            setUploadElem={setOpenUpload}
            openUpload={openUpload}
            />
            <div className="flex-grow">
              {openUpload && <UploadElement toggleUpload={toggleUploadPage} openUpload={openUpload}/>}
              {renderPage()}
            </div>
          </div>
            <Footer />
        </div>
      </QueryClientProvider>
    </WagmiProvider>
  );
}

export default App;
