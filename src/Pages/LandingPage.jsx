import {PropTypes} from "prop-types";

export default function LandingPage(setPage) {
 return (
    <div className="flex flex-col min-h-screen m-2">

      {/* Hero Section */}
      <section className="bg-gradient-to-r from-green-400 to-blue-500 text-white py-10">
        <div className="container mx-auto px-6 ">
          <h1 className="text-4xl font-bold mb-4">Welcome to Data Vortex AI</h1>
          <p className="text-xl mb-8">Easily upload and share files on the decentralized web with IPFS.</p>
          <button onClick={() => setPage("Uploads")} className="bg-white text-blue-500 font-bold rounded-full py-4 px-8">
            Get Started
          </button>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 flex-grow">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8">Key Features</h2>
          <div className="flex flex-wrap -mx-2">
            <div className="w-full md:w-1/2 px-2 mb-4">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">Secure File Storage</h3>
                <p className="text-gray-700">Files are securely stored on the IPFS network, ensuring data integrity and privacy.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
                <p className="text-gray-700">Our intuitive interface makes uploading and sharing files a breeze.</p>
              </div>
            </div>
            <div className="w-full md:w-1/2 px-2 mb-4">
              <div className="p-6 bg-white rounded-lg shadow-lg">
                <h3 className="text-xl font-bold mb-2">Decentralized</h3>
                <p className="text-gray-700">Leverage the power of decentralized storage to ensure your files are always accessible.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
 );
}

LandingPage.propTypes = {
  setPage: PropTypes.func
}