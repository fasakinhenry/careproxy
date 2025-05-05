import { ExternalLink } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="bg-white border-b">
      <div className="container mx-auto px-4 py-3">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          {/* Left Links */}
          <div className="flex flex-wrap items-center gap-4 w-full sm:w-auto">
            <a
              href="https://forms.gle/Ev64W7M3aBZBbzQy8"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-900 hover:text-emerald-600 font-medium transition-colors whitespace-nowrap"
              aria-label="Google Form"
            >
              Add Startup
            </a>
            <a
              href="#contact"
              className="text-gray-900 hover:text-emerald-600 font-medium transition-colors"
            >
              Contact
            </a>
          </div>

          {/* Right Info */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 w-full sm:w-auto">
            <span className="flex items-center gap-2 text-sm">
              <span className="font-medium whitespace-nowrap hidden sm:block">
                Found data discrepancies?
              </span>
              <a
                href="mailto:sharayushendre7@gmail.com"
                className="text-emerald-700 hover:text-emerald-700 flex items-center gap-1 font-medium text-sm"
              >
                <ExternalLink className="w-3.5 h-3.5" />
                <span className="whitespace-nowrap">
                  email to: sharayushendre7@gmail.com
                </span>
              </a>

              {/* Mobile LinkedIn */}
              <a
                href="https://linkedin.com/in/sharayushendre"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-[#0A66C2] transition-colors block sm:hidden"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </span>

            {/* Desktop LinkedIn */}
            <div className="flex items-center gap-4 mt-2 sm:mt-0 sm:ml-4 sm:block hidden">
              <a
                href="https://linkedin.com/in/sharayushendre"
                target="_blank"
                rel="noopener noreferrer"
                className="text-gray-900 hover:text-[#0A66C2] transition-colors"
                aria-label="LinkedIn"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
