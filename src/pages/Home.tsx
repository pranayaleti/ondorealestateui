import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { KeyboardArrowDown, TrendingUp } from '@mui/icons-material';

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
    <div className="min-h-screen bg-black">
      {/* Navigation Bar */}
      <nav className="bg-black shadow-lg border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-orange-500">Ondo Real Estate</h1>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                {/* Why Utah Tab */}
                <Link
                  to="/why-utah"
                  className="text-orange-500 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium flex items-center bg-gray-900 border border-orange-500"
                >
                  <TrendingUp className="mr-2 h-4 w-4" />
                  Why Utah
                </Link>

                {/* Mortgage Calculators Dropdown */}
                <div className="relative">
                  <button
                    className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    onMouseEnter={() => setIsCalculatorDropdownOpen(true)}
                    onMouseLeave={() => setIsCalculatorDropdownOpen(false)}
                  >
                    Mortgage calculators
                    <KeyboardArrowDown className="ml-1 h-4 w-4" />
                  </button>
                  
                  {/* Dropdown Menu */}
                  {isCalculatorDropdownOpen && (
                    <div
                      className="absolute z-50 mt-2 w-80 bg-gray-900 rounded-md shadow-lg ring-1 ring-orange-500 ring-opacity-50"
                      onMouseEnter={() => setIsCalculatorDropdownOpen(true)}
                      onMouseLeave={() => setIsCalculatorDropdownOpen(false)}
                    >
                      <div className="py-1">
                        {calculatorOptions.map((option) => (
                          <Link
                            key={option.path}
                            to={option.path}
                            className="block px-4 py-3 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-400 border-b border-gray-700 last:border-b-0"
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
                    className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium flex items-center"
                    onMouseEnter={() => setIsAboutDropdownOpen(true)}
                    onMouseLeave={() => setIsAboutDropdownOpen(false)}
                  >
                    About us
                    <KeyboardArrowDown className="ml-1 h-4 w-4" />
                  </button>
                  
                  {isAboutDropdownOpen && (
                    <div
                      className="absolute z-50 mt-2 w-48 bg-gray-900 rounded-md shadow-lg ring-1 ring-orange-500 ring-opacity-50"
                      onMouseEnter={() => setIsAboutDropdownOpen(true)}
                      onMouseLeave={() => setIsAboutDropdownOpen(false)}
                    >
                      <div className="py-1">
                        <Link to="/about/company" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-400">
                          Company
                        </Link>
                        <Link to="/about/team" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-400">
                          Team
                        </Link>
                        <Link to="/about/contact" className="block px-4 py-2 text-sm text-gray-300 hover:bg-gray-800 hover:text-orange-400">
                          Contact
                        </Link>
                      </div>
                    </div>
                  )}
                </div>

                {/* Why Utah Link */}
                <Link
                  to="/why-utah"
                  className="bg-gradient-to-r from-black to-orange-600 text-white hover:from-gray-800 hover:to-orange-700 px-4 py-2 rounded-md text-sm font-medium transition-all duration-300 transform hover:scale-105"
                >
                  Why Utah?
                </Link>

                {/* Help Link */}
                <Link
                  to="/help"
                  className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
                >
                  Help
                </Link>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-300 hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-md text-sm font-medium"
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
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
            Your Gateway to Smart
            <span className="text-orange-500"> Real Estate</span>
          </h1>
          <p className="text-xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Make informed decisions with our comprehensive suite of mortgage calculators. 
            From payment estimates to affordability analysis, we've got you covered.
          </p>
          
          {/* Quick Calculator Access */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-12">
            {calculatorOptions.slice(0, 4).map((option) => (
              <Link
                key={option.path}
                to={option.path}
                className="bg-gray-900 p-6 rounded-lg shadow-md hover:shadow-lg hover:shadow-orange-500/20 transition-all duration-300 border border-gray-800 hover:border-orange-500"
              >
                <h3 className="text-lg font-semibold text-white mb-2">{option.name}</h3>
                <p className="text-gray-400 text-sm">Calculate your mortgage details</p>
              </Link>
            ))}
          </div>

          <div className="flex justify-center space-x-4">
            <Link
              to="/why-utah"
              className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3 rounded-lg text-lg font-medium flex items-center"
            >
              <TrendingUp className="mr-2" />
              Why Invest in Utah
            </Link>
            <Link
              to="/calculators/mortgage-payment"
              className="bg-gray-900 hover:bg-gray-800 text-white px-8 py-3 rounded-lg text-lg font-medium border border-orange-500"
            >
              Get Started
            </Link>
            <Link
              to="/about/company"
              className="border border-gray-700 text-gray-300 hover:bg-gray-900 hover:text-orange-400 px-8 py-3 rounded-lg text-lg font-medium"
            >
              Learn More
            </Link>
          </div>
        </div>
      </div>

      {/* Founder’s Note Section */}
      <div className="bg-gray-100 dark:bg-gray-800 py-20 border-t border-gray-200 dark:border-gray-700">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row items-center gap-8">
          <img
            src="/logo.png"
            alt="Founder Pranay Reddy Aleti"
            className="w-32 h-32 rounded-full object-cover border-4 border-orange-500 shadow-lg"
          />
          <div>
            <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Founder’s Note</h3>
            <p className="text-gray-700 dark:text-gray-300 mb-4 max-w-2xl">
              "Real estate is more than property—it’s about people, growth, and legacy. At Ondo, we’re building a modern
              platform rooted in trust, transparency, and technology so owners can rest easy and tenants feel right at
              home."
            </p>
            <Link
              to="/founder-letter"
              className="inline-block bg-orange-500 hover:bg-orange-600 text-white px-6 py-2 rounded-md text-sm font-medium"
            >
              Read the full letter
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="bg-gray-900 py-20 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-white mb-16">
            Why Choose <span className="text-orange-500">Our Platform?</span>
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-orange-500 bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Accurate Calculations</h3>
              <p className="text-gray-400">Get precise mortgage estimates using current market rates and formulas.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Fast & Easy</h3>
              <p className="text-gray-400">Simple forms that give you results instantly, no complex setup required.</p>
            </div>
            <div className="text-center">
              <div className="bg-orange-500 bg-opacity-20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500">
                <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Comprehensive</h3>
              <p className="text-gray-400">Cover all aspects of mortgage planning from payment to closing costs.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
