import React from 'react';
import { 
  TrendingUp, 
  Business, 
  Home, 
  School, 
  EmojiEvents,
  LocationOn,
  Groups,
  AttachMoney,
  Landscape,
  Security
} from '@mui/icons-material';

const WhyUtah: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-orange-900">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-orange-900/80"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl md:text-7xl font-bold text-white mb-8">
              Why <span className="text-orange-500">Utah?</span>
            </h1>
            <p className="text-xl md:text-2xl text-gray-200 mb-12 max-w-4xl mx-auto leading-relaxed">
              Discover the Beehive State - America's fastest-growing economy, tech innovation hub, 
              and the future host of the 2034 Winter Olympics. Your gateway to unprecedented investment opportunities.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="bg-orange-600 hover:bg-orange-700 text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105">
                Explore Opportunities
              </button>
              <button className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-white px-8 py-4 rounded-lg text-lg font-semibold transition-all duration-300">
                Download Investment Guide
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Key Statistics */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Utah by the <span className="text-orange-600">Numbers</span>
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">4.5%</div>
              <div className="text-gray-700 font-medium">GDP Growth Rate</div>
              <div className="text-sm text-gray-500">Leading the Nation</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">#1</div>
              <div className="text-gray-700 font-medium">Tech Industry Growth</div>
              <div className="text-sm text-gray-500">Silicon Slopes</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">250K</div>
              <div className="text-gray-700 font-medium">College Students</div>
              <div className="text-sm text-gray-500">Skilled Workforce</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-orange-600 mb-2">2034</div>
              <div className="text-gray-700 font-medium">Winter Olympics</div>
              <div className="text-sm text-gray-500">Global Spotlight</div>
            </div>
          </div>
        </div>
      </div>

      {/* Economic Powerhouse */}
      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                America's <span className="text-orange-500">Economic Powerhouse</span>
              </h2>
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <TrendingUp className="text-orange-500 mt-1" sx={{ fontSize: 28 }} />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Record-Breaking Growth</h3>
                    <p className="text-gray-300">Utah leads the nation with a 4.5% real GDP growth rate, nearly double the national average of 2.8%. This exceptional performance drives job creation and business opportunities.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <Business className="text-orange-500 mt-1" sx={{ fontSize: 28 }} />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Business-Friendly Environment</h3>
                    <p className="text-gray-300">Low taxes, minimal regulations, and streamlined processes make Utah the ideal state for business formation and expansion. Major companies choose Utah for its pro-business policies.</p>
                  </div>
                </div>
                <div className="flex items-start space-x-4">
                  <AttachMoney className="text-orange-500 mt-1" sx={{ fontSize: 28 }} />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Diverse Economy</h3>
                    <p className="text-gray-300">From aerospace and defense to technology and manufacturing, Utah's diversified economy provides stability and multiple investment opportunities across industries.</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-6">Economic Highlights</h3>
              <div className="space-y-4">
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-orange-200 text-sm font-medium">Unemployment Rate</div>
                  <div className="text-2xl font-bold text-white">2.9%</div>
                  <div className="text-orange-200 text-sm">Below National Average</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-orange-200 text-sm font-medium">Job Growth</div>
                  <div className="text-2xl font-bold text-white">3.2%</div>
                  <div className="text-orange-200 text-sm">Annual Rate</div>
                </div>
                <div className="bg-white/10 p-4 rounded-lg">
                  <div className="text-orange-200 text-sm font-medium">Fortune 500 Companies</div>
                  <div className="text-2xl font-bold text-white">15+</div>
                  <div className="text-orange-200 text-sm">Headquartered in Utah</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Silicon Slopes Tech Scene */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              <span className="text-orange-600">Silicon Slopes:</span> The Tech Revolution
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Utah's tech corridor rivals Silicon Valley with explosive growth, major company headquarters, and a thriving startup ecosystem.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl text-white">
              <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp sx={{ fontSize: 24 }} />
              </div>
              <h3 className="text-xl font-bold mb-3">56.1% Growth</h3>
              <p className="text-gray-300">Tech employment growth since 2000, leading all U.S. states in technology sector expansion.</p>
            </div>
            
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-8 rounded-2xl text-white">
              <div className="bg-white w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <Business sx={{ fontSize: 24, color: '#ea580c' }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Major Companies</h3>
              <p className="text-orange-100">Adobe, Microsoft, Oracle, Salesforce, and hundreds of innovative startups call Utah home.</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl text-white">
              <div className="bg-orange-500 w-12 h-12 rounded-lg flex items-center justify-center mb-4">
                <School sx={{ fontSize: 24 }} />
              </div>
              <h3 className="text-xl font-bold mb-3">Talent Pipeline</h3>
              <p className="text-gray-300">250,000 college students and top-ranked universities producing skilled tech professionals.</p>
            </div>
          </div>

          <div className="bg-gray-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Tech Investment Opportunities</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Data center development and infrastructure</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Office space and tech campuses</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Residential developments for tech workers</span>
                </div>
              </div>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Innovation districts and research facilities</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Mixed-use developments near tech hubs</span>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
                  <span className="text-gray-700">Transportation and mobility infrastructure</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 2034 Olympics */}
      <div className="bg-gradient-to-br from-black to-gray-900 py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center space-x-3 mb-6">
                <EmojiEvents className="text-orange-500" sx={{ fontSize: 48 }} />
                <h2 className="text-4xl font-bold text-white">
                  2034 Winter <span className="text-orange-500">Olympics</span>
                </h2>
              </div>
              <p className="text-xl text-gray-300 mb-8">
                Utah will host the 2034 Olympic and Paralympic Winter Games, bringing global attention and massive infrastructure investments to the region.
              </p>
              
              <div className="space-y-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-500 mb-3">Economic Impact</h3>
                  <p className="text-gray-300">Estimated $6.6 billion economic boost, creating thousands of jobs and driving long-term tourism growth.</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-500 mb-3">Infrastructure Development</h3>
                  <p className="text-gray-300">Major investments in transportation, venues, and urban development will transform the region.</p>
                </div>
                
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold text-orange-500 mb-3">Global Recognition</h3>
                  <p className="text-gray-300">Worldwide media coverage will showcase Utah to billions of viewers, attracting future investment and tourism.</p>
                </div>
              </div>
            </div>
            
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-white mb-8 text-center">Olympic Investment Timeline</h3>
              
              <div className="space-y-6">
                <div className="relative">
                  <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-orange-300"></div>
                  <div className="relative bg-white/10 p-4 rounded-lg ml-8">
                    <div className="absolute -left-6 top-4 w-3 h-3 bg-orange-300 rounded-full"></div>
                    <div className="text-orange-200 text-sm font-medium">2024-2026</div>
                    <div className="text-white font-semibold">Pre-Olympic Development</div>
                    <div className="text-orange-100 text-sm">Infrastructure planning and early construction</div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-orange-300"></div>
                  <div className="relative bg-white/10 p-4 rounded-lg ml-8">
                    <div className="absolute -left-6 top-4 w-3 h-3 bg-orange-300 rounded-full"></div>
                    <div className="text-orange-200 text-sm font-medium">2027-2030</div>
                    <div className="text-white font-semibold">Major Construction Phase</div>
                    <div className="text-orange-100 text-sm">Venue construction and urban development</div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-4 top-6 bottom-0 w-0.5 bg-orange-300"></div>
                  <div className="relative bg-white/10 p-4 rounded-lg ml-8">
                    <div className="absolute -left-6 top-4 w-3 h-3 bg-orange-300 rounded-full"></div>
                    <div className="text-orange-200 text-sm font-medium">2031-2034</div>
                    <div className="text-white font-semibold">Final Preparations</div>
                    <div className="text-orange-100 text-sm">Completion and Olympic events</div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="relative bg-white/10 p-4 rounded-lg ml-8">
                    <div className="absolute -left-6 top-4 w-3 h-3 bg-orange-300 rounded-full"></div>
                    <div className="text-orange-200 text-sm font-medium">2035+</div>
                    <div className="text-white font-semibold">Olympic Legacy</div>
                    <div className="text-orange-100 text-sm">Long-term tourism and economic benefits</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Estate Investment Opportunities */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Real Estate <span className="text-orange-600">Investment Opportunities</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Utah's booming economy and population growth create exceptional opportunities across all real estate sectors.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
            {/* Single Family Homes */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl text-white">
              <Home className="text-orange-500 mb-4" sx={{ fontSize: 48 }} />
              <h3 className="text-2xl font-bold mb-4">Single Family Homes</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-300">Median Home Price</span>
                  <span className="text-orange-500 font-semibold">$550K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Annual Appreciation</span>
                  <span className="text-orange-500 font-semibold">8.2%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Rental Yield</span>
                  <span className="text-orange-500 font-semibold">6.5%</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Strong demand from growing population</li>
                <li>• Tech worker influx driving premium markets</li>
                <li>• Family-friendly communities</li>
                <li>• Excellent school districts</li>
              </ul>
            </div>

            {/* Townhomes */}
            <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-8 rounded-2xl text-white">
              <Business className="text-white mb-4" sx={{ fontSize: 48 }} />
              <h3 className="text-2xl font-bold mb-4">Townhomes</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-orange-100">Median Price</span>
                  <span className="text-white font-semibold">$425K</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-100">Annual Growth</span>
                  <span className="text-white font-semibold">9.1%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-orange-100">Occupancy Rate</span>
                  <span className="text-white font-semibold">97%</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-orange-100">
                <li>• High demand from young professionals</li>
                <li>• Lower maintenance than SFH</li>
                <li>• Strong rental market</li>
                <li>• Urban and suburban options</li>
              </ul>
            </div>

            {/* Land Development */}
            <div className="bg-gradient-to-br from-gray-900 to-black p-8 rounded-2xl text-white">
              <Landscape className="text-orange-500 mb-4" sx={{ fontSize: 48 }} />
              <h3 className="text-2xl font-bold mb-4">Land Development</h3>
              <div className="space-y-4 mb-6">
                <div className="flex justify-between">
                  <span className="text-gray-300">Price per Acre</span>
                  <span className="text-orange-500 font-semibold">$75K+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Development ROI</span>
                  <span className="text-orange-500 font-semibold">25%+</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-300">Population Growth</span>
                  <span className="text-orange-500 font-semibold">2.5%/year</span>
                </div>
              </div>
              <ul className="space-y-2 text-sm text-gray-300">
                <li>• Major development projects planned</li>
                <li>• Olympic infrastructure investments</li>
                <li>• Growing tech corridor expansion</li>
                <li>• Business-friendly zoning</li>
              </ul>
            </div>
          </div>

          <div className="bg-orange-50 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">Why Utah Real Estate is Booming</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="text-white" sx={{ fontSize: 28 }} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Population Growth</h4>
                <p className="text-gray-600 text-sm">2.5% annual growth rate, one of the fastest in the nation</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Business className="text-white" sx={{ fontSize: 28 }} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Job Creation</h4>
                <p className="text-gray-600 text-sm">Strong job market driving housing demand</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <LocationOn className="text-white" sx={{ fontSize: 28 }} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Strategic Location</h4>
                <p className="text-gray-600 text-sm">Mountain West hub with excellent connectivity</p>
              </div>
              <div className="text-center">
                <div className="bg-orange-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Security className="text-white" sx={{ fontSize: 28 }} />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Market Stability</h4>
                <p className="text-gray-600 text-sm">Diversified economy provides market resilience</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Family & Culture */}
      <div className="bg-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-white mb-8">
                Family & <span className="text-orange-500">Culture</span>
              </h2>
              <p className="text-xl text-gray-300 mb-8">
                Utah offers an unparalleled quality of life with strong family values, excellent education, 
                and a vibrant cultural scene that attracts families and young professionals alike.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <School className="text-orange-500 mt-1" sx={{ fontSize: 28 }} />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Education Excellence</h3>
                    <p className="text-gray-300">Top-ranked public schools and universities. Utah consistently ranks in the top 10 states for education quality and funding.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Groups className="text-orange-500 mt-1" sx={{ fontSize: 28 }} />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Young Demographics</h3>
                    <p className="text-gray-300">Median age of 31 years, with 30% of the population under 18. The youngest state in America with a vibrant, energetic community.</p>
                  </div>
                </div>
                
                <div className="flex items-start space-x-4">
                  <Security className="text-orange-500 mt-1" sx={{ fontSize: 28 }} />
                  <div>
                    <h3 className="text-xl font-semibold text-white mb-2">Safety & Community</h3>
                    <p className="text-gray-300">Low crime rates and strong community bonds make Utah one of the safest states in America for families and businesses.</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-6">
              <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-xl text-white text-center">
                <div className="text-3xl font-bold mb-2">31</div>
                <div className="text-orange-100">Median Age</div>
                <div className="text-sm text-orange-200">Youngest in US</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl text-white text-center">
                <div className="text-3xl font-bold mb-2 text-orange-500">94%</div>
                <div className="text-gray-300">High School Grad Rate</div>
                <div className="text-sm text-gray-400">Above National Average</div>
              </div>
              
              <div className="bg-gradient-to-br from-gray-800 to-gray-900 p-6 rounded-xl text-white text-center">
                <div className="text-3xl font-bold mb-2 text-orange-500">$75K</div>
                <div className="text-gray-300">Median Income</div>
                <div className="text-sm text-gray-400">Growing Rapidly</div>
              </div>
              
              <div className="bg-gradient-to-br from-orange-600 to-orange-800 p-6 rounded-xl text-white text-center">
                <div className="text-3xl font-bold mb-2">3.1</div>
                <div className="text-orange-100">Average Family Size</div>
                <div className="text-sm text-orange-200">Family-Focused</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action */}
      <div className="bg-gradient-to-r from-orange-600 to-orange-800 py-20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-white mb-8">
            Ready to Invest in Utah's Future?
          </h2>
          <p className="text-xl text-orange-100 mb-12">
            Join thousands of investors who have discovered Utah's incredible potential. 
            From real estate to business opportunities, Utah offers unmatched returns and quality of life.
          </p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-3">Real Estate Portfolio</h3>
              <p className="text-orange-100 text-sm mb-4">Diversify with SFH, townhomes, and land development opportunities</p>
              <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Explore Properties
              </button>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-3">Business Investment</h3>
              <p className="text-orange-100 text-sm mb-4">Take advantage of Utah's business-friendly environment and tech boom</p>
              <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Learn More
              </button>
            </div>
            
            <div className="bg-white/10 p-6 rounded-lg">
              <h3 className="text-xl font-bold text-white mb-3">Olympic Opportunities</h3>
              <p className="text-orange-100 text-sm mb-4">Position yourself for the 2034 Olympics infrastructure boom</p>
              <button className="bg-white text-orange-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Get Started
              </button>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-orange-600 px-8 py-4 rounded-lg text-lg font-bold hover:bg-gray-100 transition-all duration-300 transform hover:scale-105">
              Schedule Consultation
            </button>
            <button className="border-2 border-white text-white hover:bg-white hover:text-orange-600 px-8 py-4 rounded-lg text-lg font-bold transition-all duration-300">
              Download Investment Guide
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUtah;