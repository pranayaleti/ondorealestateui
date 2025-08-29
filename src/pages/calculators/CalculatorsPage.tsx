import React from 'react';
import { Link } from 'react-router-dom';
import { 
  Calculate, 
  Home, 
  AccountBalance, 
  TrendingUp, 
  Sell, 
  ShoppingCart, 
  SwapHoriz, 
  Savings,
  CompareArrows
} from '@mui/icons-material';

interface CalculatorTile {
  id: string;
  name: string;
  description: string;
  path: string;
  icon: React.ReactNode;
  category: string;
  color: string;
}

const CalculatorsPage: React.FC = () => {
  const calculators: CalculatorTile[] = [
    {
      id: 'mortgage-payment',
      name: 'Mortgage Payment Calculator',
      description: 'Calculate your monthly mortgage payment including principal, interest, taxes, and insurance.',
      path: '/calculators/mortgage-payment',
      icon: <Calculate className="h-8 w-8" />,
      category: 'Mortgage',
      color: 'from-blue-500 to-blue-600'
    },
    {
      id: 'affordability',
      name: 'Affordability Calculator',
      description: 'Determine how much house you can afford based on your income and expenses.',
      path: '/calculators/affordability',
      icon: <Home className="h-8 w-8" />,
      category: 'Mortgage',
      color: 'from-green-500 to-green-600'
    },
    {
      id: 'income',
      name: 'Income Calculator',
      description: 'Calculate required income to qualify for a specific mortgage amount.',
      path: '/calculators/income',
      icon: <TrendingUp className="h-8 w-8" />,
      category: 'Mortgage',
      color: 'from-purple-500 to-purple-600'
    },
    {
      id: 'closing-cost',
      name: 'Closing Cost Calculator',
      description: 'Estimate all closing costs when purchasing a home.',
      path: '/calculators/closing-cost',
      icon: <AccountBalance className="h-8 w-8" />,
      category: 'Purchase',
      color: 'from-orange-500 to-orange-600'
    },
    {
      id: 'refinance',
      name: 'Refinance Calculator',
      description: 'Analyze the benefits of refinancing your existing mortgage.',
      path: '/calculators/refinance',
      icon: <SwapHoriz className="h-8 w-8" />,
      category: 'Mortgage',
      color: 'from-indigo-500 to-indigo-600'
    },
    {
      id: 'home-sale',
      name: 'Home Sale Calculator',
      description: 'Calculate net proceeds from selling your home after all costs.',
      path: '/calculators/home-sale',
      icon: <Sell className="h-8 w-8" />,
      category: 'Sale',
      color: 'from-red-500 to-red-600'
    },
    {
      id: 'buying-power',
      name: 'Buying Power Calculator',
      description: 'Determine your maximum home purchase price based on available funds.',
      path: '/calculators/buying-power',
      icon: <ShoppingCart className="h-8 w-8" />,
      category: 'Purchase',
      color: 'from-teal-500 to-teal-600'
    },
    {
      id: 'temporary-buydown',
      name: 'Temporary Buydown Calculator',
      description: 'Calculate temporary interest rate buydown benefits and costs.',
      path: '/calculators/temporary-buydown',
      icon: <Savings className="h-8 w-8" />,
      category: 'Mortgage',
      color: 'from-pink-500 to-pink-600'
    },
    {
      id: 'rent-vs-own',
      name: 'Rent vs Own Calculator',
      description: 'Compare the financial implications of renting versus buying a home.',
      path: '/calculators/rent-vs-own',
      icon: <CompareArrows className="h-8 w-8" />,
      category: 'Analysis',
      color: 'from-amber-500 to-amber-600'
    },
    {
      id: 'retirement',
      name: 'Retirement Calculator',
      description: 'Plan your retirement savings and investment strategy for real estate.',
      path: '/calculators/retirement',
      icon: <AccountBalance className="h-8 w-8" />,
      category: 'Planning', 
      color: 'from-emerald-500 to-emerald-600'
    }
  ];

  const categories = ['All', 'Mortgage', 'Purchase', 'Sale', 'Analysis', 'Planning'];

  const [selectedCategory, setSelectedCategory] = React.useState('All');

  const filteredCalculators = selectedCategory === 'All' 
    ? calculators 
    : calculators.filter(calc => calc.category === selectedCategory);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Real Estate Calculators</h1>
              <p className="text-gray-600 mt-1">Comprehensive tools to help you make informed real estate decisions</p>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Category Filter */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                  selectedCategory === category
                    ? 'bg-blue-600 text-white'
                    : 'bg-white text-gray-700 hover:bg-gray-100 border border-gray-300'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>

        {/* Calculator Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredCalculators.map((calculator) => (
            <Link
              key={calculator.id}
              to={calculator.path}
              className="group block"
            >
              <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 border border-gray-200 overflow-hidden">
                <div className={`bg-gradient-to-r ${calculator.color} p-6 text-white`}>
                  <div className="flex items-center justify-between">
                    {calculator.icon}
                    <span className="text-xs font-medium bg-white/20 px-2 py-1 rounded-full">
                      {calculator.category}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mt-4">{calculator.name}</h3>
                </div>
                <div className="p-6">
                  <p className="text-gray-600 text-sm leading-relaxed">
                    {calculator.description}
                  </p>
                  <div className="mt-4 flex items-center text-blue-600 group-hover:text-blue-800 font-medium text-sm">
                    Use Calculator
                    <svg className="ml-2 h-4 w-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Additional Information */}
        <div className="mt-16 bg-white rounded-xl shadow-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Why Use Our Calculators?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Accurate Calculations</h3>
              <p className="text-gray-600 text-sm">Professional-grade calculations using current market rates and formulas</p>
            </div>
            <div className="text-center">
              <div className="bg-green-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Save Time</h3>
              <p className="text-gray-600 text-sm">Quick calculations that would take hours to do manually</p>
            </div>
            <div className="text-center">
              <div className="bg-purple-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="h-8 w-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Make Better Decisions</h3>
              <p className="text-gray-600 text-sm">Compare scenarios and understand the financial impact of your choices</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CalculatorsPage;
