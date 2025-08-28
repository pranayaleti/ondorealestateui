import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';

interface HomeSaleData {
  homeValue: number;
  mortgageBalance: number;
  realtorCommission: number;
  closingCosts: number;
  repairs: number;
  movingCosts: number;
  capitalGainsTax: number;
}

interface HomeSaleResults {
  netProceeds: number;
  totalCosts: number;
  equity: number;
  profit: number;
}

const HomeSaleCalculator: React.FC = () => {
  const [formData, setFormData] = useState<HomeSaleData>({
    homeValue: 400000,
    mortgageBalance: 250000,
    realtorCommission: 6,
    closingCosts: 8000,
    repairs: 5000,
    movingCosts: 2000,
    capitalGainsTax: 0
  });

  const [results, setResults] = useState<HomeSaleResults | null>(null);

  useEffect(() => {
    calculateHomeSale();
  }, [formData]);

  const calculateHomeSale = () => {
    const { homeValue, mortgageBalance, realtorCommission, closingCosts, repairs, movingCosts, capitalGainsTax } = formData;
    
    // Calculate realtor commission
    const realtorFee = (homeValue * realtorCommission) / 100;
    
    // Calculate total costs
    const totalCosts = realtorFee + closingCosts + repairs + movingCosts + capitalGainsTax;
    
    // Calculate equity
    const equity = homeValue - mortgageBalance;
    
    // Calculate net proceeds
    const netProceeds = homeValue - totalCosts - mortgageBalance;
    
    // Calculate profit (assuming original purchase price was mortgage balance + down payment)
    const estimatedOriginalPrice = mortgageBalance * 1.2; // Rough estimate
    const profit = homeValue - estimatedOriginalPrice - totalCosts;
    
    setResults({
      netProceeds,
      totalCosts,
      equity,
      profit
    });
  };

  const handleInputChange = (field: keyof HomeSaleData, value: number) => {
    setFormData({ ...formData, [field]: value });
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center space-x-4">
            <Link to="/" className="text-blue-600 hover:text-blue-800">
              <ArrowBackIos className="h-6 w-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Home Sale Calculator</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Information</h2>
            
            <div className="space-y-6">
              {/* Home Value */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Estimated Home Sale Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.homeValue}
                    onChange={(e) => handleInputChange('homeValue', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="400,000"
                  />
                </div>
              </div>

              {/* Mortgage Balance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Remaining Mortgage Balance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.mortgageBalance}
                    onChange={(e) => handleInputChange('mortgageBalance', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="250,000"
                  />
                </div>
              </div>

              {/* Realtor Commission */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Realtor Commission (%)
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={formData.realtorCommission}
                  onChange={(e) => handleInputChange('realtorCommission', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="6.0"
                />
              </div>

              {/* Closing Costs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Closing Costs
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.closingCosts}
                    onChange={(e) => handleInputChange('closingCosts', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="8,000"
                  />
                </div>
              </div>

              {/* Repairs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Repairs & Improvements
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.repairs}
                    onChange={(e) => handleInputChange('repairs', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="5,000"
                  />
                </div>
              </div>

              {/* Moving Costs */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Moving Costs
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.movingCosts}
                    onChange={(e) => handleInputChange('movingCosts', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="2,000"
                  />
                </div>
              </div>

              {/* Capital Gains Tax */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Capital Gains Tax (if applicable)
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.capitalGainsTax}
                    onChange={(e) => handleInputChange('capitalGainsTax', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
                <p className="text-sm text-gray-500 mt-1">
                  Usually exempt for primary residence if lived in 2+ years
                </p>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <>
                {/* Net Proceeds */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Sale Results</h2>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-green-600 mb-1">Net Proceeds</p>
                        <p className="text-3xl font-bold text-green-700">{formatCurrency(results.netProceeds)}</p>
                        <p className="text-sm text-green-600 mt-1">
                          Cash you'll receive after sale
                        </p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-blue-600 mb-1">Total Equity</p>
                        <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.equity)}</p>
                        <p className="text-sm text-blue-600 mt-1">
                          Home value minus mortgage
                        </p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Cost Breakdown</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Realtor Commission:</span>
                      <span className="font-semibold">{formatCurrency((formData.homeValue * formData.realtorCommission) / 100)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Closing Costs:</span>
                      <span className="font-semibold">{formatCurrency(formData.closingCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Repairs & Improvements:</span>
                      <span className="font-semibold">{formatCurrency(formData.repairs)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Moving Costs:</span>
                      <span className="font-semibold">{formatCurrency(formData.movingCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Capital Gains Tax:</span>
                      <span className="font-semibold">{formatCurrency(formData.capitalGainsTax)}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total Costs:</span>
                      <span className="text-red-600">{formatCurrency(results.totalCosts)}</span>
                    </div>
                  </div>
                </div>

                {/* Profit Analysis */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Profit Analysis</h2>
                  <div className="space-y-4">
                    <div className="bg-yellow-50 p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-yellow-600 mb-1">Estimated Profit</p>
                        <p className="text-2xl font-bold text-yellow-700">{formatCurrency(results.profit)}</p>
                        <p className="text-sm text-yellow-600 mt-1">
                          After all costs and original investment
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• This is a rough estimate based on available information</p>
                      <p>• Actual costs may vary significantly</p>
                      <p>• Consider consulting a real estate professional</p>
                      <p>• Factor in market conditions and timing</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About Home Sales</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Common Sale Costs:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Realtor commission (typically 5-6%)</li>
                <li>Closing costs and transfer taxes</li>
                <li>Repairs and staging costs</li>
                <li>Moving and storage expenses</li>
                <li>Capital gains tax (if applicable)</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Tips for Maximizing Proceeds:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Improve curb appeal and staging</li>
                <li>Make necessary repairs before listing</li>
                <li>Price competitively for your market</li>
                <li>Consider timing and market conditions</li>
                <li>Negotiate commission rates</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeSaleCalculator;
