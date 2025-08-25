import { FaGithub, FaLinkedin, FaEnvelope, FaFileAlt, FaBrain, FaCog } from 'react-icons/fa';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-gray-800 to-gray-900 text-white py-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4 bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent">
              DocProcessor
            </h3>
            <p className="text-gray-300">
              Advanced document processing with AI-powered extraction capabilities. 
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
                <span>AI Extraction</span>
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
              Contact & Support
            </h3>
            <div className="space-y-3 text-gray-300">
              <a
                href="mailto:support@docprocessor.com"
                className="flex items-center space-x-2 hover:text-red-400 transition-colors"
              >
                <FaEnvelope className="text-red-500" />
                <span>support@docprocessor.com</span>
              </a>
              
              <div className="flex space-x-4 mt-4">
                <a
                  href="https://github.com/docprocessor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors text-xl"
                >
                  <FaGithub />
                </a>
                <a
                  href="https://linkedin.com/company/docprocessor"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-red-400 transition-colors text-xl"
                >
                  <FaLinkedin />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p className="text-gray-400">
            &copy; {new Date().getFullYear()} DocProcessor. All rights reserved. 
            Advanced document processing powered by AI.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
