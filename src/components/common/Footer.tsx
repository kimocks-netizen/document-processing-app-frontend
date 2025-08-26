'use client';

import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt, FaBrain, FaCog, FaEye } from 'react-icons/fa';
import Link from 'next/link';
import { useState } from 'react';

const Footer = () => {
  const [isPortfolioModalOpen, setIsPortfolioModalOpen] = useState(false);

  const openPortfolioModal = () => setIsPortfolioModalOpen(true);
  const closePortfolioModal = () => setIsPortfolioModalOpen(false);

  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              DocProcessor
            </h3>
            <p className="text-gray-300">
              Document processing with intelligent extraction capabilities. 
              Transform your documents into structured data efficiently and accurately.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Features
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li className="flex items-center space-x-2">
                <FaBrain className="text-red-500" />
                <span>Smart Extraction</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaCog className="text-red-500" />
                <span>Standard Processing</span>
              </li>
              <li className="flex items-center space-x-2">
                <FaFileAlt className="text-red-500" />
                <span>Multiple Formats</span>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Quick Links
            </h3>
            <ul className="space-y-2 text-gray-300">
              <li><Link href="/" className="hover:text-red-400 transition-colors">Upload Document</Link></li>
              <li><Link href="/results" className="hover:text-red-400 transition-colors">View Results</Link></li>
              <li><Link href="/documents" className="hover:text-red-400 transition-colors">Document History</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              Contact
            </h3>
            <div className="space-y-3 text-gray-300">
              <a
                href="mailto:kimocks12@gmail.com"
                className="flex items-center space-x-2 hover:text-red-400 transition-colors"
              >
                <FaEnvelope className="text-red-500" />
                <span>kimocks12@gmail.com</span>
              </a>
              
              <button
                onClick={openPortfolioModal}
                className="flex items-center space-x-2 hover:text-red-400 transition-colors"
              >
                <FaEye className="text-red-500" />
                <span>My Portfolio</span>
              </button>
              
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://github.com/kimocks-netizen"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors text-xl"
                >
                  <FaGithub />
                </a>
                <a
                  href="mailto:kimocks12@gmail.com"
                  className="hover:text-red-400 transition-colors text-xl"
                >
                  <FaEnvelope />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} DocProcessor. All rights reserved. 
            Developed by <span className="text-red-400 font-semibold">Bryne</span> - 
            <button 
              onClick={openPortfolioModal}
              className="text-red-400 hover:text-red-300 underline ml-1"
            >
              View Portfolio
            </button>
          </p>
        </div>
      </div>

      {/* Portfolio Modal */}
      {isPortfolioModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg w-full max-w-2xl max-h-[90vh] overflow-auto">
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                My Personal Projects
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Below are some of my personal projects I created using React and Tailwind CSS:
              </p>
              
              <div className="space-y-4 mb-6">
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Autoline Panel Shop
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    A comprehensive auto repair shop management system with invoice generation and customer management.
                  </p>
                  <a
                    href="https://autolinepanelshop.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Visit Website →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Caro Group Investments
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Investment portfolio management platform with real-time tracking and analytics.
                  </p>
                  <a
                    href="https://carogroupinvestments.com"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Visit Website →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    Batman Panic Button
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    Emergency response system with real-time alerts and location tracking.
                  </p>
                  <a
                    href="https://batman-panic-button.vercel.app/login"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    Visit Website →
                  </a>
                </div>
                
                <div className="border border-gray-200 dark:border-gray-700 rounded-lg p-4">
                  <h3 className="font-semibold text-lg text-gray-900 dark:text-white mb-2">
                    GitHub Repository
                  </h3>
                  <p className="text-gray-600 dark:text-gray-400 mb-3">
                    View my complete source code and other projects on GitHub.
                  </p>
                  <a
                    href="https://github.com/kimocks-netizen"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-red-600 hover:text-red-700 font-medium"
                  >
                    View GitHub →
                  </a>
                </div>
              </div>
              
              <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg mb-6">
                <p className="text-blue-800 dark:text-blue-200 text-sm">
                  <strong>Note:</strong> Contact me to get login credentials for testing these applications.
                </p>
              </div>
              
              <div className="flex justify-end">
                <button
                  onClick={closePortfolioModal}
                  className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </footer>
  );
};

export default Footer;
