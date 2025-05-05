const Navbar = () => {
    return (
      <nav className="flex justify-between items-center p-4 border-b text-sm">
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">Add Startup</a>
          <a href="#" className="hover:underline">Contact</a>
        </div>
        <div className="text-right text-xs">
          Found data discrepancies?{" "}
          <a href="mailto:sharayushendre7@gmail.com" className="text-green-600 underline">
            email to: sharayushendre7@gmail.com
          </a>
        </div>
      </nav>
    );
  };
  
  export default Navbar;
  