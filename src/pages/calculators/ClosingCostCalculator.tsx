import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBackIos } from '@mui/icons-material';

interface ClosingCostData {
  homePrice: number;
  loanAmount: number;
  downPayment: number;
  propertyTax: number;
  insurance: number;
  titleInsurance: number;
  appraisal: number;
  inspection: number;
  originationFee: number;
  discountPoints: number;
  prepaidInterest: number;
  escrowReserves: number;
}

interface ClosingCostResults {
  totalClosingCosts: number;
  outOfPocket: number;
  lenderCosts: number;
  thirdPartyCosts: number;
  prepaidCosts: number;
  monthlyPayment: number;
  breakEvenMonths: number;
}

const ClosingCostCalculator: React.FC = () => {
  const [formData, setFormData] = useState<ClosingCostData>({
    homePrice: 300000,
    loanAmount: 240000,
    downPayment: 60000,
    propertyTax: 3000,
    insurance: 1200,
    titleInsurance: 1000,
    appraisal: 500,
    inspection: 400,
    originationFee: 1200,
    discountPoints: 0,
    prepaidInterest: 0,
    escrowReserves: 0
  });

  const [results, setResults] = useState<ClosingCostResults | null>(null);

  useEffect(() => {
    calculateClosingCosts();
  }, [formData]);

  const calculateClosingCosts = () => {
    const {
      homePrice, loanAmount, downPayment, propertyTax, insurance, titleInsurance,
      appraisal, inspection, originationFee, discountPoints, prepaidInterest, escrowReserves
    } = formData;

    // Calculate monthly property tax and insurance
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = insurance / 12;

    // Calculate lender costs
    const lenderCosts = originationFee + (discountPoints * loanAmount / 100);

    // Calculate third-party costs
    const thirdPartyCosts = titleInsurance + appraisal + inspection;

    // Calculate prepaid costs
    const prepaidCosts = prepaidInterest + escrowReserves + (monthlyTax * 2) + (monthlyInsurance * 2);

    // Total closing costs
    const totalClosingCosts = lenderCosts + thirdPartyCosts + prepaidCosts;

    // Out of pocket costs (down payment + closing costs)
    const outOfPocket = downPayment + totalClosingCosts;

    // Calculate monthly payment for break-even analysis
    const monthlyPayment = monthlyTax + monthlyInsurance + (loanAmount * 0.005); // Simplified mortgage payment

    // Break-even analysis (how many months to recoup closing costs)
    const breakEvenMonths = totalClosingCosts / (monthlyPayment * 0.1); // Assuming 10% of payment goes to principal

    setResults({
      totalClosingCosts,
      outOfPocket,
      lenderCosts,
      thirdPartyCosts,
      prepaidCosts,
      monthlyPayment,
      breakEvenMonths
    });
  };

  const handleInputChange = (field: keyof ClosingCostData, value: number) => {
    const newData = { ...formData, [field]: value };
    
    // Auto-calculate loan amount if home price or down payment changes
    if (field === 'homePrice' || field === 'downPayment') {
      newData.loanAmount = Math.max(0, newData.homePrice - newData.downPayment);
    }
    
    setFormData(newData);
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
            <h1 className="text-2xl font-bold text-gray-900">Closing Cost Calculator</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Information</h2>
            
            <div className="space-y-6">
              {/* Home Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Price
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.homePrice}
                    onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="300,000"
                  />
                </div>
              </div>

              {/* Down Payment */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Down Payment
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.downPayment}
                    onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="60,000"
                  />
                </div>
              </div>

              {/* Loan Amount */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Loan Amount
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.loanAmount}
                    onChange={(e) => handleInputChange('loanAmount', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="240,000"
                  />
                </div>
              </div>

              {/* Property Tax */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Property Tax
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.propertyTax}
                    onChange={(e) => handleInputChange('propertyTax', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="3,000"
                  />
                </div>
              </div>

              {/* Insurance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Annual Homeowners Insurance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.insurance}
                    onChange={(e) => handleInputChange('insurance', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1,200"
                  />
                </div>
              </div>

              {/* Title Insurance */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Title Insurance
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.titleInsurance}
                    onChange={(e) => handleInputChange('titleInsurance', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1,000"
                  />
                </div>
              </div>

              {/* Appraisal */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Appraisal Fee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.appraisal}
                    onChange={(e) => handleInputChange('appraisal', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="500"
                  />
                </div>
              </div>

              {/* Inspection */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Home Inspection
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.inspection}
                    onChange={(e) => handleInputChange('inspection', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="400"
                  />
                </div>
              </div>

              {/* Origination Fee */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Origination Fee
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.originationFee}
                    onChange={(e) => handleInputChange('originationFee', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="1,200"
                  />
                </div>
              </div>

              {/* Discount Points */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Discount Points (% of loan)
                </label>
                <input
                  type="number"
                  step="0.125"
                  value={formData.discountPoints}
                  onChange={(e) => handleInputChange('discountPoints', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              {/* Prepaid Interest */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Prepaid Interest (days)
                </label>
                <input
                  type="number"
                  value={formData.prepaidInterest}
                  onChange={(e) => handleInputChange('prepaidInterest', Number(e.target.value))}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="0"
                />
              </div>

              {/* Escrow Reserves */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Escrow Reserves
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-3 text-gray-500">$</span>
                  <input
                    type="number"
                    value={formData.escrowReserves}
                    onChange={(e) => handleInputChange('escrowReserves', Number(e.target.value))}
                    className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    placeholder="0"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <>
                {/* Total Closing Costs */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Closing Cost Summary</h2>
                  <div className="space-y-4">
                    <div className="bg-red-50 p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-red-600 mb-1">Total Closing Costs</p>
                        <p className="text-3xl font-bold text-red-700">{formatCurrency(results.totalClosingCosts)}</p>
                      </div>
                    </div>
                    
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-blue-600 mb-1">Total Out of Pocket</p>
                        <p className="text-2xl font-bold text-blue-700">{formatCurrency(results.outOfPocket)}</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Cost Breakdown */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Cost Breakdown</h2>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Lender Costs:</span>
                      <span className="font-semibold">{formatCurrency(results.lenderCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Third-Party Costs:</span>
                      <span className="font-semibold">{formatCurrency(results.thirdPartyCosts)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Prepaid Costs:</span>
                      <span className="font-semibold">{formatCurrency(results.prepaidCosts)}</span>
                    </div>
                    <hr className="my-3" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total:</span>
                      <span className="text-red-600">{formatCurrency(results.totalClosingCosts)}</span>
                    </div>
                  </div>
                </div>

                {/* Break-Even Analysis */}
                <div className="bg-white rounded-lg shadow-lg p-6">
                  <h2 className="text-xl font-semibold text-gray-900 mb-4">Break-Even Analysis</h2>
                  <div className="space-y-4">
                    <div className="bg-green-50 p-4 rounded-lg">
                      <div className="text-center">
                        <p className="text-sm text-green-600 mb-1">Break-Even Time</p>
                        <p className="text-2xl font-bold text-green-700">
                          {results.breakEvenMonths.toFixed(1)} months
                        </p>
                        <p className="text-sm text-green-600 mt-1">
                          Time to recoup closing costs through equity
                        </p>
                      </div>
                    </div>
                    
                    <div className="space-y-2 text-sm text-gray-600">
                      <p>• Closing costs typically range from 2-5% of home price</p>
                      <p>• Some costs may be negotiable with the seller</p>
                      <p>• Consider rolling costs into the loan if possible</p>
                      <p>• Shop around for title insurance and other services</p>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Additional Information */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold text-gray-900 mb-4">About Closing Costs</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-gray-600">
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Lender Costs:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Origination fees and processing</li>
                <li>Discount points (optional)</li>
                <li>Underwriting fees</li>
                <li>Credit report fees</li>
              </ul>
            </div>
            <div>
              <h3 className="font-medium text-gray-900 mb-2">Third-Party Costs:</h3>
              <ul className="space-y-1 list-disc list-inside">
                <li>Title insurance and search</li>
                <li>Appraisal and inspection</li>
                <li>Recording fees</li>
                <li>Attorney fees (if applicable)</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClosingCostCalculator;
