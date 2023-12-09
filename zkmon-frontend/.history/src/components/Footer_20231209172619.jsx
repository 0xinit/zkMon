import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer>
      <div className="mx-auto px-4 sm:px-6 mt-20">
        {/* Top area: Blocks */}
        <div className="grid sm:grid-cols-12 gap-8 py-8 md:py-12 border-t border-gray-200">
          {/* 1st block */}
          <div className="sm:col-span-12 lg:col-span-3">
            <div className="mb-2">
              <p>Eth India</p>
            </div>
          </div>

          {/* 4th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-2">
            <h6 className="font-medium mb-2">Quick Links</h6>
            <ul className="text-sm">
              <li className="mb-2">
                <Link
                  to="/"
                  className="text-gray-600 hover:text-white transition duration-150 ease-in-out"
                >
                  Home
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/takeLoan"
                  className="text-gray-600 hover:text-white transition duration-150 ease-in-out"
                >
                  Take Loan
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/repayloan"
                  className="text-gray-600 hover:text-white transition duration-150 ease-in-out"
                >
                  Repay Loan
                </Link>
              </li>
              <li className="mb-2">
                <Link
                  to="/liquidatenft"
                  className="text-gray-600 hover:text-white transition duration-150 ease-in-out"
                >
                  Liquidate NFT
                </Link>
              </li>
            </ul>
          </div>

          {/* 5th block */}
          <div className="sm:col-span-6 md:col-span-3 lg:col-span-3">
            <h6 className="font-medium mb-2">Any Queries?</h6>
            <p className="text-sm text-gray-600 mb-4">
              We will try to resolve, just enter your email here.
            </p>
            <form>
              <div className="flex flex-wrap mb-4">
                <div className="w-full">
                  <label className="block text-sm sr-only" htmlFor="newsletter">
                    Email
                  </label>
                  <div className="relative flex items-center max-w-xs">
                    <input
                      id="newsletter"
                      type="email"
                      className="form-input w-full text-gray-800 px-3 py-2 pr-12 text-sm bg-transparent border focus:outline-none rounded-full"
                      placeholder="Your email"
                      required
                    />
                    <button
                      type="submit"
                      className="absolute inset-0 left-auto"
                      aria-label="Subscribe"
                    >
                      <span
                        className="absolute inset-0 right-auto w-px -ml-px my-2 bg-gray-300"
                        aria-hidden="true"
                      ></span>
                      <svg
                        className="w-3 h-3 fill-current text-primaryColor mx-3 shrink-0"
                        viewBox="0 0 12 12"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M11.707 5.293L7 .586 5.586 2l3 3H0v2h8.586l-3 3L7 11.414l4.707-4.707a1 1 0 000-1.414z"
                          fillRule="nonzero"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>

        {/* Bottom area */}
        <div className="flex items-center justify-center py-4 md:py-8 border-t border-gray-200">
          <div className="text-sm text-center mr-4">
            Thanks for visiting this website 😊. Sending love from our team
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
