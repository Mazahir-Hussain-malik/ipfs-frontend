import "./Global.css";
const Footer = () => {
 return (
    <footer className="  glassnav text-white p-4">
      <div className="container mx-auto">
        <p className="text-center">&copy; 2024 DATA VORTEX. All rights reserved.</p>
        <nav className="flex justify-center space-x-4 mt-4">
          <a href="#" className="hover:text-blue-300">Privacy Policy</a>
          <a href="#" className="hover:text-blue-300">Terms of Service</a>
          <a href="#" className="hover:text-blue-300">Contact Us</a>
        </nav>
      </div>
    </footer>
 );
};

export default Footer;
