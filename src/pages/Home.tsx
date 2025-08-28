import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyboardArrowDown } from '@mui/icons-material';

const Home: React.FC = () => {
  const [isCalculatorDropdownOpen, setIsCalculatorDropdownOpen] = useState(false);
  const [isAboutDropdownOpen, setIsAboutDropdownOpen] = useState(false);

  const calculatorOptions = [
    { name: 'Mortgage payment calculator', path: '/calculators/mortgage-payment' },
    { name: 'Mortgage affordability calculator', path: '/calculators/affordability' },
    { name: 'Mortgage income calculator', path: '/calculators/income' },
    { name: 'Closing cost calculator', path: '/calculators/closing-cost' },
    { name: 'Refinance calculator', path: '/calculators/refinance' },
    { name: 'Home sale calculator', path: '/calculators/home-sale' },
    { name: 'Buying power calculator', path: '/calculators/buying-power' },
    { name: 'Temporary Buydown calculator', path: '/calculators/temporary-buydown' },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-lg border-b-2 border-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-blue-600">Ondo Real Estate</h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {/* Why Utah Tab */}
                <Link
                  to="/why-utah"
                  className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Why Utah
                </Link>
                {/* Mortgage Calculators Dropdown */}
                <div className="relative">
                  <button
                    className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    onMouseEnter={() => setIsCalculatorDropdownOpen(true)}
                    onMouseLeave={() => setIsCalculatorDropdownOpen(false)}
                  >
                    Mortgage calculators
                    <KeyboardArrowDown className="ml-1 h-4 w-4" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isCalculatorDropdownOpen && (
                    <div
                      className="absolute z-50 mt-2 w-80 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                      onMouseEnter={() => setIsCalculatorDropdownOpen(true)}
                      onMouseLeave={() => setIsCalculatorDropdownOpen(false)}
                    >
                      <div className="py-1">
                        {calculatorOptions.map((option) => (
                          <Link
                            key={option.path}
                            to={option.path}
                            className="block px-4 py-3 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800 border-b border-gray-100 last:border-b-0"
                          >
                            {option.name}
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* About Us Dropdown */}
                <div className="relative">
                  <button
                    className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    onMouseEnter={() => setIsAboutDropdownOpen(true)}
                    onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  >
                    About us
                    <KeyboardArrowDown className="ml-1 h-4 w-4" />
                  </button>
                  
                  {isAboutDropdownOpen && (
                    <div
                      className="absolute z-50 mt-2 w-48 bg-white rounded-md shadow-lg ring-1 ring-black ring-opacity-5"
                      onMouseEnter={() => setIsAboutDropdownOpen(true)}
                      onMouseLeave={() => setIsAboutDropdownOpen(false)}
                    >
                      <div className="py-1">
                        <Link to="/about/company" className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800">
                          Company
                        </Link>
                        <Link to="/about/team" className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800">
                          Team
                        </Link>
                        <Link to="/about/contact" className="block px-4 py-2 text-sm text-blue-600 hover:bg-blue-50 hover:text-blue-800">
                          Contact
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Help Link */}
                <Link
                  to="/help"
                  className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Help
                </Link>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-blue-600 hover:text-blue-800 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-md text-sm font-medium"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
            Your Gateway to Smart
            <span className="text-blue-600"> Real Estate</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Make informed decisions with our comprehensive suite of mortgage calculators. 
            From payment estimates to affordability analysis, we've got you covered.
          </p>
          
          {/* Quick Calculator Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {calculatorOptions.slice(0, 4).map((option) => (
              <Link
                key={option.path}
                to={option.path}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200"
              >
                <h3 className="text-lg font-semibold text-gray-800 mb-2">{option.name}</h3>
                <p className="text-gray-600 text-sm">Calculate your mortgage details</p>
              </Link>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Link
              to="/calculators/mortgage-payment"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg text-lg font-medium"
            >
              Get Started
            </Link>
            <Link
              to="/about/company"
              className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-8 py-3 rounded-lg text-lg font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-16">
            Why Choose Our Calculators?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Accurate Calculations</h3>
              <p className="text-gray-600">Get precise mortgage estimates using current market rates and formulas.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Fast & Easy</h3>
              <p className="text-gray-600">Simple forms that give you results instantly, no complex setup required.</p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Comprehensive</h3>
              <p className="text-gray-600">Cover all aspects of mortgage planning from payment to closing costs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
