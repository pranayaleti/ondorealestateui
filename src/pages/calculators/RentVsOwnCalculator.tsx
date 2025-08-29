import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowBackIos, Download, TrendingUp, Home, Apartment } from '@mui/icons-material';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';

interface RentVsOwnData {
  // Rent scenario
  monthlyRent: number;
  rentIncrease: number;
  securityDeposit: number;
  rentersInsurance: number;
  
  // Buy scenario
  homePrice: number;
  downPayment: number;
  interestRate: number;
  loanTerm: number;
  propertyTax: number;
  homeownersInsurance: number;
  pmi: number;
  maintenance: number;
  hoa: number;
  
  // Analysis period
  analysisYears: number;
  
  // Investment assumptions
  investmentReturn: number;
  homeAppreciation: number;
}

interface RentVsOwnResults {
  rentTotalCost: number;
  buyTotalCost: number;
  buyTotalCostWithInvestment: number;
  breakEvenYears: number;
  monthlyRentEquivalent: number;
  annualComparison: Array<{
    year: number;
    rentCost: number;
    buyCost: number;
    buyWithInvestment: number;
    difference: number;
  }>;
  recommendation: string;
  explanation: string;
}

const RentVsOwnCalculator: React.FC = () => {
  const [formData, setFormData] = useState<RentVsOwnData>({
    monthlyRent: 2000,
    rentIncrease: 3,
    securityDeposit: 2000,
    rentersInsurance: 200,
    homePrice: 400000,
    downPayment: 80000,
    interestRate: 4.5,
    loanTerm: 30,
    propertyTax: 4000,
    homeownersInsurance: 1200,
    pmi: 0,
    maintenance: 3000,
    hoa: 0,
    analysisYears: 10,
    investmentReturn: 7,
    homeAppreciation: 3
  });

  const [results, setResults] = useState<RentVsOwnResults | null>(null);

  useEffect(() => {
    calculateRentVsOwn();
  }, [formData]);

  const calculateRentVsOwn = () => {
    const {
      monthlyRent,
      rentIncrease,
      securityDeposit,
      rentersInsurance,
      homePrice,
      downPayment,
      interestRate,
      loanTerm,
      propertyTax,
      homeownersInsurance,
      pmi,
      maintenance,
      hoa,
      analysisYears,
      investmentReturn,
      homeAppreciation
    } = formData;

    // Calculate loan details
    const loanAmount = homePrice - downPayment;
    const monthlyRate = interestRate / 100 / 12;
    const totalPayments = loanTerm * 12;
    const monthlyPayment = loanAmount * 
      (monthlyRate * Math.pow(1 + monthlyRate, totalPayments)) / 
      (Math.pow(1 + monthlyRate, totalPayments) - 1);

    // Calculate PMI if down payment is less than 20%
    const downPaymentPercent = (downPayment / homePrice) * 100;
    const monthlyPmi = downPaymentPercent < 20 ? (loanAmount * 0.005) / 12 : 0;

    // Calculate monthly costs for buying
    const monthlyTax = propertyTax / 12;
    const monthlyInsurance = homeownersInsurance / 12;
    const monthlyMaintenance = maintenance / 12;
    const monthlyHoa = hoa / 12;
    const totalMonthlyBuy = monthlyPayment + monthlyTax + monthlyInsurance + monthlyPmi + monthlyMaintenance + monthlyHoa;

    // Calculate annual comparison
    const annualComparison = [];
    let rentTotalCost = 0;
    let buyTotalCost = 0;
    let currentRent = monthlyRent;
    let currentHomeValue = homePrice;
    let remainingLoan = loanAmount;

    for (let year = 1; year <= analysisYears; year++) {
      // Rent costs
      const annualRentCost = currentRent * 12 + (year === 1 ? securityDeposit : 0) + rentersInsurance;
      rentTotalCost += annualRentCost;
      currentRent *= (1 + rentIncrease / 100);

      // Buy costs
      const annualBuyCost = totalMonthlyBuy * 12;
      buyTotalCost += annualBuyCost;

      // Home appreciation
      currentHomeValue *= (1 + homeAppreciation / 100);

      // Investment opportunity cost (what down payment + monthly difference could earn)
      const monthlyDifference = totalMonthlyBuy - currentRent;
      const investmentOpportunity = downPayment * Math.pow(1 + investmentReturn / 100, year) + 
        monthlyDifference * 12 * Math.pow(1 + investmentReturn / 100, year - 0.5);

      annualComparison.push({
        year,
        rentCost: annualRentCost,
        buyCost: annualBuyCost,
        buyWithInvestment: annualBuyCost + investmentOpportunity,
        difference: annualBuyCost - annualRentCost
      });
    }

    // Calculate break-even point
    let breakEvenYears = 0;
    let cumulativeRent = 0;
    let cumulativeBuy = 0;
    
    for (let year = 1; year <= analysisYears; year++) {
      cumulativeRent += annualComparison[year - 1].rentCost;
      cumulativeBuy += annualComparison[year - 1].buyCost;
      
      if (cumulativeBuy <= cumulativeRent) {
        breakEvenYears = year;
        break;
      }
    }

    // Calculate monthly rent equivalent (what rent would need to be to match buying)
    const monthlyRentEquivalent = totalMonthlyBuy;

    // Determine recommendation
    let recommendation = '';
    let explanation = '';

    if (breakEvenYears <= 3) {
      recommendation = 'Buying is likely the better choice';
      explanation = 'You\'ll break even within 3 years, making buying financially advantageous.';
    } else if (breakEvenYears <= 7) {
      recommendation = 'Buying could be beneficial';
      explanation = 'Moderate break-even time suggests buying may be worthwhile if you plan to stay long-term.';
    } else {
      recommendation = 'Renting may be more cost-effective';
      explanation = 'Long break-even time suggests renting could be cheaper in the short to medium term.';
    }

    setResults({
      rentTotalCost,
      buyTotalCost,
      buyTotalCostWithInvestment: buyTotalCost + (downPayment * Math.pow(1 + investmentReturn / 100, analysisYears)),
      breakEvenYears,
      monthlyRentEquivalent,
      annualComparison,
      recommendation,
      explanation
    });
  };

  const handleInputChange = (field: keyof RentVsOwnData, value: number) => {
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

  const downloadPDF = async () => {
    if (!results) return;

    const element = document.getElementById('pdf-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        allowTaint: true
      });

      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgWidth = 210;
      const pageHeight = 295;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
      let heightLeft = imgHeight;

      let position = 0;

      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;

      while (heightLeft >= 0) {
        position = heightLeft - imgHeight;
        pdf.addPage();
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
        heightLeft -= pageHeight;
      }

      pdf.save('rent-vs-own-analysis.pdf');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-yellow-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <Link to="/calculators" className="text-blue-600 hover:text-blue-800">
                <ArrowBackIos className="h-6 w-6" />
              </Link>
              <h1 className="text-2xl font-bold text-gray-900">Rent vs Own Calculator</h1>
            </div>
            {results && (
              <button
                onClick={downloadPDF}
                className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center space-x-2 transition-colors"
              >
                <Download className="h-5 w-5" />
                <span>Download PDF</span>
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Input Form */}
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-900 mb-6">Enter Your Information</h2>
            
            <div className="space-y-6">
              {/* Rent Scenario */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Apartment className="h-5 w-5 mr-2 text-blue-600" />
                  Rent Scenario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Monthly Rent
                    </label>
                    <input
                      type="number"
                      value={formData.monthlyRent}
                      onChange={(e) => handleInputChange('monthlyRent', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Rent Increase (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.rentIncrease}
                      onChange={(e) => handleInputChange('rentIncrease', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Security Deposit
                    </label>
                    <input
                      type="number"
                      value={formData.securityDeposit}
                      onChange={(e) => handleInputChange('securityDeposit', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Renters Insurance
                    </label>
                    <input
                      type="number"
                      value={formData.rentersInsurance}
                      onChange={(e) => handleInputChange('rentersInsurance', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Buy Scenario */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <Home className="h-5 w-5 mr-2 text-green-600" />
                  Buy Scenario
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Home Price
                    </label>
                    <input
                      type="number"
                      value={formData.homePrice}
                      onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Down Payment
                    </label>
                    <input
                      type="number"
                      value={formData.downPayment}
                      onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Interest Rate (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.interestRate}
                      onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Loan Term (years)
                    </label>
                    <input
                      type="number"
                      value={formData.loanTerm}
                      onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Property Tax
                    </label>
                    <input
                      type="number"
                      value={formData.propertyTax}
                      onChange={(e) => handleInputChange('propertyTax', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Homeowners Insurance
                    </label>
                    <input
                      type="number"
                      value={formData.homeownersInsurance}
                      onChange={(e) => handleInputChange('homeownersInsurance', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual Maintenance
                    </label>
                    <input
                      type="number"
                      value={formData.maintenance}
                      onChange={(e) => handleInputChange('maintenance', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Annual HOA Fees
                    </label>
                    <input
                      type="number"
                      value={formData.hoa}
                      onChange={(e) => handleInputChange('hoa', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>

              {/* Analysis Settings */}
              <div>
                <h3 className="text-lg font-medium text-gray-900 mb-4 flex items-center">
                  <TrendingUp className="h-5 w-5 mr-2 text-purple-600" />
                  Analysis Settings
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Analysis Period (years)
                    </label>
                    <input
                      type="number"
                      value={formData.analysisYears}
                      onChange={(e) => handleInputChange('analysisYears', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Investment Return (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.investmentReturn}
                      onChange={(e) => handleInputChange('investmentReturn', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Home Appreciation (%)
                    </label>
                    <input
                      type="number"
                      step="0.1"
                      value={formData.homeAppreciation}
                      onChange={(e) => handleInputChange('homeAppreciation', Number(e.target.value))}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="space-y-6">
            {results && (
              <div id="pdf-content" className="bg-white rounded-lg shadow-lg p-6">
                <h2 className="text-xl font-semibold text-gray-900 mb-6">Analysis Results</h2>
                
                {/* Summary */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                  <div className="bg-blue-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-blue-900 mb-2">Total Rent Cost ({formData.analysisYears} years)</h3>
                    <p className="text-2xl font-bold text-blue-900">{formatCurrency(results.rentTotalCost)}</p>
                  </div>
                  <div className="bg-green-50 p-4 rounded-lg">
                    <h3 className="text-sm font-medium text-green-900 mb-2">Total Buy Cost ({formData.analysisYears} years)</h3>
                    <p className="text-2xl font-bold text-green-900">{formatCurrency(results.buyTotalCost)}</p>
                  </div>
                </div>

                {/* Break-even Analysis */}
                <div className="bg-yellow-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-yellow-900 mb-2">Break-even Analysis</h3>
                  <p className="text-sm text-yellow-800 mb-2">
                    <strong>Break-even point:</strong> {results.breakEvenYears} years
                  </p>
                  <p className="text-sm text-yellow-800">
                    <strong>Monthly rent equivalent:</strong> {formatCurrency(results.monthlyRentEquivalent)}
                  </p>
                </div>

                {/* Recommendation */}
                <div className="bg-purple-50 p-4 rounded-lg mb-6">
                  <h3 className="text-lg font-medium text-purple-900 mb-2">Recommendation</h3>
                  <p className="text-lg font-semibold text-purple-900 mb-2">{results.recommendation}</p>
                  <p className="text-sm text-purple-800">{results.explanation}</p>
                </div>

                {/* Annual Comparison */}
                <div>
                  <h3 className="text-lg font-medium text-gray-900 mb-4">Annual Cost Comparison</h3>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Year</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-blue-500 uppercase tracking-wider">Rent Cost</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-green-500 uppercase tracking-wider">Buy Cost</th>
                          <th className="px-3 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Difference</th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {results.annualComparison.slice(0, 10).map((year) => (
                          <tr key={year.year}>
                            <td className="px-3 py-2 whitespace-nowrap text-sm font-medium text-gray-900">{year.year}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-blue-600">{formatCurrency(year.rentCost)}</td>
                            <td className="px-3 py-2 whitespace-nowrap text-sm text-green-600">{formatCurrency(year.buyCost)}</td>
                            <td className={`px-3 py-2 whitespace-nowrap text-sm font-medium ${
                              year.difference > 0 ? 'text-red-600' : 'text-green-600'
                            }`}>
                              {year.difference > 0 ? '+' : ''}{formatCurrency(year.difference)}
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default RentVsOwnCalculator;
