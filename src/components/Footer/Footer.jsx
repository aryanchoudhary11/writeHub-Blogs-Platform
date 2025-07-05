import React from "react";
import { Link } from "react-router-dom";
import inverted_logo from "../../assets/inverted_logo.png";

function Footer() {
  return (
    <footer className="bg-gray-900 text-white py-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10">
          {/* Logo and copyright */}
          <div className="flex flex-col justify-between">
            <div className="mb-4">
              <img src={inverted_logo} alt="logo" style={{ width: "120px" }} />
            </div>
            <p className="text-sm text-gray-400">
              &copy; {new Date().getFullYear()} All Rights Reserved.
            </p>
          </div>

          {/* Company */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Features
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Affiliate Program
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Press Kit
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Account
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Help
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Contact Us
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Customer Support
                </Link>
              </li>
            </ul>
          </div>

          {/* Legals */}
          <div>
            <h3 className="text-sm font-semibold text-gray-400 uppercase mb-4">
              Legals
            </h3>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Terms & Conditions
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/" className="hover:text-gray-300">
                  Licensing
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
