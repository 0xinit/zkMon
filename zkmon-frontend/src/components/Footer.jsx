import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto px-4 sm:px-6 mt-20">
              {/* Bottom area */}
        <div className="flex items-center justify-center py-4 md:py-8 border-t border-gray-200">
          <div className="text-sm text-center mr-4" style={{ color: 'white' }}>
            Thanks for visiting this website 😊. Sending love from our teams.
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
