import React, { useState } from 'react';
import { TrendingUp, Home, Groups, School, Landscape, SportsScore, Business, AttachMoney, Construction, FamilyRestroom } from '@mui/icons-material';

const WhyUtah: React.FC = () => {
  const [activeSection, setActiveSection] = useState('overview');

  const sections = [
    { id: 'overview', label: 'Overview', icon: <TrendingUp /> },
    { id: 'olympics', label: '2034 Olympics', icon: <SportsScore /> },
    { id: 'tech', label: 'Tech Hub', icon: <Business /> },
    { id: 'growth', label: 'Future Growth', icon: <Construction /> },
    { id: 'family', label: 'Family & Culture', icon: <FamilyRestroom /> },
    { id: 'real-estate', label: 'Real Estate Investment', icon: <Home /> },
    { id: 'demographics', label: 'Demographics', icon: <Groups /> },
    { id: 'education', label: 'Education', icon: <School /> },
  ];

  const investmentTypes = [
    {
      type: 'Land Investment',
      roi: '15-25%',
      benefits: [
        'Limited supply with high demand',
        'Strategic location near growing tech corridors',
        'Zoning flexibility for future development',
        'Tax advantages and lower holding costs'
      ]
    },
    {
      type: 'Single Family Homes',
      roi: '12-18%',
      benefits: [
        'Strong rental demand from growing workforce',
        'Appreciation averaging 8.2% annually',
        'Family-friendly neighborhoods',
        'Excellent school districts driving demand'
      ]
    },
    {
      type: 'Townhomes',
      roi: '10-15%',
      benefits: [
        'Perfect for young professionals',
        'Lower maintenance costs',
        'High demand in urban areas',
        'Attractive to millennials and Gen Z'
      ]
    }
  ];

  const techCompanies = [
    { name: 'Adobe', employees: '2,000+', investment: '$90M expansion' },
    { name: 'Qualtrics', employees: '4,500+', investment: 'SAP acquisition $8B' },
    { name: 'Pluralsight', employees: '2,000+', investment: 'Tech education leader' },
    { name: 'Domo', employees: '1,000+', investment: 'Business intelligence' },
    { name: 'Vivint', employees: '10,000+', investment: 'Smart home leader' },
    { name: 'Goldman Sachs', employees: '6,000+', investment: '$2.5B campus' },
  ];

  const growthMetrics = [
    { metric: 'Population Growth', value: '18.4%', period: '2010-2020', rank: '#1 in US' },
    { metric: 'Job Growth', value: '3.4%', period: 'Annual', rank: '#3 in US' },
    { metric: 'GDP Growth', value: '4.3%', period: 'Annual', rank: '#2 in US' },
    { metric: 'Tech Job Growth', value: '5.8%', period: 'Annual', rank: '#1 in US' },
    { metric: 'Median Age', value: '31.2', period: 'Years', rank: 'Youngest in US' },
    { metric: 'Business Startups', value: '16.2%', period: 'Growth Rate', rank: '#2 in US' },
  ];

  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-orange-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            Why <span className="text-orange-500">Utah?</span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl">
            The Beehive State is America's fastest-growing economy, youngest population, 
            and most business-friendly environment. Discover why Utah is your next investment destination.
          </p>
          
          {/* Key Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">#1</div>
              <div className="text-white mt-2">Economic Outlook</div>
              <div className="text-gray-400 text-sm">Rich States, Poor States 2023</div>
            </div>
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">31.2</div>
              <div className="text-white mt-2">Median Age</div>
              <div className="text-gray-400 text-sm">Youngest State in America</div>
            </div>
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">2034</div>
              <div className="text-white mt-2">Winter Olympics</div>
              <div className="text-gray-400 text-sm">$4B+ Economic Impact</div>
            </div>
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">18.4%</div>
              <div className="text-white mt-2">Population Growth</div>
              <div className="text-gray-400 text-sm">Fastest in the Nation</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="sticky top-0 z-50 bg-gray-900 border-b border-orange-500">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex overflow-x-auto space-x-8 py-4">
            {sections.map((section) => (
              <button
                key={section.id}
                onClick={() => setActiveSection(section.id)}
                className={`flex items-center space-x-2 px-4 py-2 rounded-lg whitespace-nowrap transition-all ${
                  activeSection === section.id
                    ? 'bg-orange-500 text-white'
                    : 'text-gray-400 hover:text-orange-400 hover:bg-gray-800'
                }`}
              >
                {section.icon}
                <span className="font-medium">{section.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Overview Section */}
        {activeSection === 'overview' && (
          <div className="space-y-12">
            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h2 className="text-4xl font-bold text-white mb-6">
                  Utah: The <span className="text-orange-500">Startup State</span>
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-6">
                  Utah has emerged as America's economic powerhouse, combining unprecedented growth, 
                  innovation, and quality of life. With the youngest population in the nation, 
                  a thriving tech ecosystem dubbed "Silicon Slopes," and the upcoming 2034 Winter Olympics, 
                  Utah represents the future of American prosperity.
                </p>
                <p className="text-gray-300 text-lg leading-relaxed">
                  The state's pro-business policies, including low taxes, minimal regulation, and 
                  strategic investments in infrastructure and education, have created an environment 
                  where businesses and families thrive together.
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <h3 className="text-2xl font-bold text-orange-400 mb-6">Growth Metrics</h3>
                <div className="space-y-4">
                  {growthMetrics.map((item, index) => (
                    <div key={index} className="flex justify-between items-center border-b border-gray-800 pb-3">
                      <div>
                        <div className="text-white font-medium">{item.metric}</div>
                        <div className="text-gray-500 text-sm">{item.period}</div>
                      </div>
                      <div className="text-right">
                        <div className="text-2xl font-bold text-orange-400">{item.value}</div>
                        <div className="text-gray-500 text-sm">{item.rank}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Olympics Section */}
        {activeSection === 'olympics' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                2034 Winter Olympics: <span className="text-orange-500">A Decade of Growth</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Utah's selection to host the 2034 Winter Olympics marks a transformative moment, 
                bringing billions in infrastructure investment and global attention.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <div className="text-5xl font-bold text-orange-400 mb-4">$4B+</div>
                <h3 className="text-xl font-bold text-white mb-3">Economic Impact</h3>
                <p className="text-gray-400">
                  Direct economic impact expected from the games, with ripple effects lasting decades.
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <div className="text-5xl font-bold text-orange-400 mb-4">35,000</div>
                <h3 className="text-xl font-bold text-white mb-3">Jobs Created</h3>
                <p className="text-gray-400">
                  New employment opportunities in construction, hospitality, and services.
                </p>
              </div>
              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <div className="text-5xl font-bold text-orange-400 mb-4">$2.5B</div>
                <h3 className="text-xl font-bold text-white mb-3">Infrastructure</h3>
                <p className="text-gray-400">
                  Investment in transportation, venues, and urban development projects.
                </p>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900 to-gray-900 rounded-xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Olympic Legacy Benefits</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-3">▸</span>
                    Enhanced global reputation and tourism growth
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-3">▸</span>
                    Accelerated transit and infrastructure development
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-3">▸</span>
                    Increased property values near Olympic venues
                  </li>
                </ul>
                <ul className="space-y-3 text-gray-300">
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-3">▸</span>
                    Long-term sports and recreation facility improvements
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-3">▸</span>
                    Attraction of international businesses and investment
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 mr-3">▸</span>
                    Sustainable development practices and green initiatives
                  </li>
                </ul>
              </div>
            </div>
          </div>
        )}

        {/* Tech Hub Section */}
        {activeSection === 'tech' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                Silicon Slopes: <span className="text-orange-500">America's Tech Frontier</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Utah's tech sector has exploded, earning the nickname "Silicon Slopes" and attracting 
                billions in venture capital and major tech giants.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="text-3xl font-bold text-orange-400 mb-6">Tech Ecosystem Stats</h3>
                <div className="space-y-4">
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Venture Capital Investment</span>
                      <span className="text-2xl font-bold text-orange-400">$7.8B</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">2022 Total</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Tech Companies</span>
                      <span className="text-2xl font-bold text-orange-400">7,500+</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">And growing 5.8% annually</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Tech Employment</span>
                      <span className="text-2xl font-bold text-orange-400">140,000+</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">9.5% of total workforce</div>
                  </div>
                  <div className="bg-gray-900 rounded-lg p-6 border border-gray-800">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-400">Average Tech Salary</span>
                      <span className="text-2xl font-bold text-orange-400">$96,370</span>
                    </div>
                    <div className="text-sm text-gray-500 mt-1">84% above state median</div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-3xl font-bold text-orange-400 mb-6">Major Tech Presence</h3>
                <div className="space-y-3">
                  {techCompanies.map((company, index) => (
                    <div key={index} className="bg-gray-900 rounded-lg p-4 border border-gray-800 hover:border-orange-500 transition-colors">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="text-xl font-bold text-white">{company.name}</h4>
                          <p className="text-gray-400 text-sm mt-1">{company.investment}</p>
                        </div>
                        <div className="text-orange-400 font-medium">{company.employees}</div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-orange-900 rounded-xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Why Tech Companies Choose Utah</h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div>
                  <h4 className="text-orange-400 font-bold mb-3">Talent Pipeline</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• 8 universities producing tech graduates</li>
                    <li>• Youngest workforce in America</li>
                    <li>• Multilingual population (130+ languages)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-orange-400 font-bold mb-3">Business Climate</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Flat 4.85% income tax</li>
                    <li>• No tax on Social Security</li>
                    <li>• Business-friendly regulations</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-orange-400 font-bold mb-3">Infrastructure</h4>
                  <ul className="space-y-2 text-gray-300 text-sm">
                    <li>• Google Fiber throughout metro</li>
                    <li>• International airport hub</li>
                    <li>• Point the Point tech campus</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Growth Section */}
        {activeSection === 'growth' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                Future Growth: <span className="text-orange-500">The Next Decade</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Utah's trajectory points to sustained growth through 2035 and beyond, 
                driven by demographic advantages and strategic investments.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <h3 className="text-2xl font-bold text-orange-400 mb-6">Population Projections</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">2024 Population</span>
                    <span className="text-xl font-bold text-white">3.5M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">2030 Projection</span>
                    <span className="text-xl font-bold text-white">4.0M</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">2035 Projection</span>
                    <span className="text-xl font-bold text-white">4.5M</span>
                  </div>
                  <div className="mt-6 p-4 bg-orange-900 bg-opacity-30 rounded-lg">
                    <div className="text-3xl font-bold text-orange-400">+1M</div>
                    <div className="text-gray-300">New residents by 2035</div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <h3 className="text-2xl font-bold text-orange-400 mb-6">Economic Forecast</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">GDP Growth Rate</span>
                    <span className="text-xl font-bold text-white">4.3% Annual</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Job Creation</span>
                    <span className="text-xl font-bold text-white">50K+ Annual</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-300">Wage Growth</span>
                    <span className="text-xl font-bold text-white">5.2% Annual</span>
                  </div>
                  <div className="mt-6 p-4 bg-orange-900 bg-opacity-30 rounded-lg">
                    <div className="text-3xl font-bold text-orange-400">$300B</div>
                    <div className="text-gray-300">Projected 2035 GDP</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900 to-gray-900 rounded-xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Major Development Projects</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-xl font-bold text-white">The Point ($20B)</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      600-acre tech campus in Draper with 40M sq ft of development
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-xl font-bold text-white">Inland Port ($50B)</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      16,000-acre logistics hub connecting global markets
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-xl font-bold text-white">FrontRunner Expansion ($2B)</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Double-tracking commuter rail from Ogden to Provo
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-xl font-bold text-white">Airport Rebuild ($4.5B)</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Complete reconstruction of SLC International Airport
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-xl font-bold text-white">Silicon Slopes ($10B)</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Continued tech campus development in Lehi/Draper
                    </p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-xl font-bold text-white">Olympic Village ($1.5B)</h4>
                    <p className="text-gray-400 text-sm mt-1">
                      Mixed-use development for 2034 Winter Olympics
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Family & Culture Section */}
        {activeSection === 'family' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                Family First: <span className="text-orange-500">Utah's Cultural Advantage</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Utah's unique culture emphasizes family, education, and community, 
                creating an ideal environment for raising children and building lasting wealth.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <div className="text-5xl mb-4">👨‍👩‍👧‍👦</div>
                <h3 className="text-2xl font-bold text-orange-400 mb-3">Family Demographics</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Largest household size: 3.08 persons</li>
                  <li>• Highest birth rate in the nation</li>
                  <li>• 80% of adults are married</li>
                  <li>• Lowest divorce rate: 15.4%</li>
                </ul>
              </div>

              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <div className="text-5xl mb-4">🎓</div>
                <h3 className="text-2xl font-bold text-orange-400 mb-3">Youth & Education</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• Median age: 31.2 years</li>
                  <li>• 30% of population under 18</li>
                  <li>• 92% high school graduation rate</li>
                  <li>• 34% have bachelor's degree+</li>
                </ul>
              </div>

              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <div className="text-5xl mb-4">🏔️</div>
                <h3 className="text-2xl font-bold text-orange-400 mb-3">Quality of Life</h3>
                <ul className="space-y-2 text-gray-300">
                  <li>• 5 National Parks</li>
                  <li>• 14 ski resorts within 1 hour</li>
                  <li>• 300+ days of sunshine</li>
                  <li>• Lowest crime rate in the West</li>
                </ul>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-orange-900 rounded-xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Cultural Values Driving Economic Success</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-orange-400 mb-4">Work Ethic & Innovation</h4>
                  <p className="text-gray-300 mb-4">
                    Utah's culture emphasizes hard work, self-reliance, and entrepreneurship. 
                    The state has the highest rate of business startups per capita and the most 
                    patents per capita in the US.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• 16.2% annual startup growth rate</li>
                    <li>• 3.8 patents per 1,000 residents</li>
                    <li>• 68% labor force participation</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orange-400 mb-4">Community & Stability</h4>
                  <p className="text-gray-300 mb-4">
                    Strong community ties and volunteerism create social capital that translates 
                    into economic advantages. Utah leads the nation in charitable giving and 
                    volunteer hours per capita.
                  </p>
                  <ul className="space-y-2 text-gray-400 text-sm">
                    <li>• 51% volunteer rate (#1 in US)</li>
                    <li>• 6.6% of income to charity (#1 in US)</li>
                    <li>• Highest social capital index score</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Real Estate Investment Section */}
        {activeSection === 'real-estate' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                Real Estate: <span className="text-orange-500">Your Investment Opportunity</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Utah's real estate market offers exceptional returns driven by population growth, 
                economic expansion, and limited land supply.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-12">
              {investmentTypes.map((type, index) => (
                <div key={index} className="bg-gray-900 rounded-xl p-8 border border-orange-500 hover:shadow-2xl hover:shadow-orange-500/20 transition-shadow">
                  <h3 className="text-2xl font-bold text-orange-400 mb-2">{type.type}</h3>
                  <div className="text-4xl font-bold text-white mb-4">{type.roi}</div>
                  <div className="text-gray-400 mb-6">Annual ROI</div>
                  <ul className="space-y-3">
                    {type.benefits.map((benefit, idx) => (
                      <li key={idx} className="flex items-start text-gray-300">
                        <span className="text-orange-400 mr-2">✓</span>
                        <span className="text-sm">{benefit}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>

            <div className="bg-gradient-to-r from-orange-900 to-gray-900 rounded-xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Market Performance Metrics</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400">8.2%</div>
                  <div className="text-white mt-2">Annual Appreciation</div>
                  <div className="text-gray-400 text-sm">5-year average</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400">14 days</div>
                  <div className="text-white mt-2">Average DOM</div>
                  <div className="text-gray-400 text-sm">Days on market</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400">$525K</div>
                  <div className="text-white mt-2">Median Home Price</div>
                  <div className="text-gray-400 text-sm">Salt Lake County</div>
                </div>
                <div className="text-center">
                  <div className="text-4xl font-bold text-orange-400">2.1%</div>
                  <div className="text-white mt-2">Vacancy Rate</div>
                  <div className="text-gray-400 text-sm">Lowest in decade</div>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-orange-400 mb-6">Why Invest in Utah Real Estate?</h3>
                <ul className="space-y-4">
                  <li className="flex items-start">
                    <span className="text-orange-400 text-2xl mr-3">1</span>
                    <div>
                      <h4 className="text-white font-bold">Supply Constraints</h4>
                      <p className="text-gray-400 text-sm mt-1">
                        Limited developable land due to mountains and federal ownership creates scarcity
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 text-2xl mr-3">2</span>
                    <div>
                      <h4 className="text-white font-bold">Population Surge</h4>
                      <p className="text-gray-400 text-sm mt-1">
                        90,000+ new residents annually driving consistent demand
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 text-2xl mr-3">3</span>
                    <div>
                      <h4 className="text-white font-bold">Economic Diversity</h4>
                      <p className="text-gray-400 text-sm mt-1">
                        Tech, finance, healthcare, and tourism provide stability
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start">
                    <span className="text-orange-400 text-2xl mr-3">4</span>
                    <div>
                      <h4 className="text-white font-bold">Olympic Catalyst</h4>
                      <p className="text-gray-400 text-sm mt-1">
                        2034 Games will accelerate appreciation and development
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
                <h3 className="text-2xl font-bold text-orange-400 mb-6">Hot Investment Zones</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-white font-bold">Silicon Slopes (Lehi/Draper)</h4>
                    <p className="text-gray-400 text-sm">Tech hub with 12% annual appreciation</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-white font-bold">Park City</h4>
                    <p className="text-gray-400 text-sm">Olympic venue with luxury market growth</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-white font-bold">Daybreak (South Jordan)</h4>
                    <p className="text-gray-400 text-sm">Master-planned community, high demand</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-white font-bold">Vineyard</h4>
                    <p className="text-gray-400 text-sm">Fastest-growing city, affordable entry</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-white font-bold">Herriman</h4>
                    <p className="text-gray-400 text-sm">Family-focused, new construction boom</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Demographics Section */}
        {activeSection === 'demographics' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                Demographics: <span className="text-orange-500">America's Youngest State</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Utah's demographic advantage ensures decades of economic growth with the youngest, 
                most educated workforce in America.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              <div className="bg-gray-900 rounded-xl p-6 border border-orange-500">
                <h3 className="text-lg font-bold text-orange-400 mb-4">Age Distribution</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">0-18 years</span>
                    <span className="text-white font-bold">30%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">19-35 years</span>
                    <span className="text-white font-bold">28%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">36-55 years</span>
                    <span className="text-white font-bold">26%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">56+ years</span>
                    <span className="text-white font-bold">16%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-orange-500">
                <h3 className="text-lg font-bold text-orange-400 mb-4">Workforce Stats</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Participation</span>
                    <span className="text-white font-bold">68%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Unemployment</span>
                    <span className="text-white font-bold">2.9%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Remote Work</span>
                    <span className="text-white font-bold">24%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Gig Economy</span>
                    <span className="text-white font-bold">18%</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-orange-500">
                <h3 className="text-lg font-bold text-orange-400 mb-4">Diversity</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Languages</span>
                    <span className="text-white font-bold">130+</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Foreign Born</span>
                    <span className="text-white font-bold">8.5%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Bilingual</span>
                    <span className="text-white font-bold">16%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Int'l Students</span>
                    <span className="text-white font-bold">12K+</span>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-6 border border-orange-500">
                <h3 className="text-lg font-bold text-orange-400 mb-4">Income</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-gray-400">Median HH</span>
                    <span className="text-white font-bold">$86,833</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Per Capita</span>
                    <span className="text-white font-bold">$37,023</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Poverty Rate</span>
                    <span className="text-white font-bold">8.6%</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-400">Millionaires</span>
                    <span className="text-white font-bold">6.8%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-gray-900 to-orange-900 rounded-xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Demographic Advantages for Investors</h3>
              <div className="grid md:grid-cols-3 gap-8">
                <div>
                  <div className="text-5xl mb-4">📈</div>
                  <h4 className="text-xl font-bold text-orange-400 mb-3">Growing Workforce</h4>
                  <p className="text-gray-300">
                    50,000+ young adults enter the workforce annually, creating sustained 
                    demand for housing and services.
                  </p>
                </div>
                <div>
                  <div className="text-5xl mb-4">🏠</div>
                  <h4 className="text-xl font-bold text-orange-400 mb-3">Household Formation</h4>
                  <p className="text-gray-300">
                    25,000+ new households formed each year, with millennials and Gen Z 
                    driving homeownership demand.
                  </p>
                </div>
                <div>
                  <div className="text-5xl mb-4">💰</div>
                  <h4 className="text-xl font-bold text-orange-400 mb-3">Rising Incomes</h4>
                  <p className="text-gray-300">
                    5.2% annual wage growth outpaces inflation, increasing purchasing 
                    power and investment capacity.
                  </p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Education Section */}
        {activeSection === 'education' && (
          <div className="space-y-12">
            <div className="text-center mb-12">
              <h2 className="text-5xl font-bold text-white mb-6">
                Education: <span className="text-orange-500">Fueling Innovation</span>
              </h2>
              <p className="text-xl text-gray-300 max-w-3xl mx-auto">
                Utah's commitment to education creates a skilled workforce that attracts 
                businesses and drives economic growth.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <h3 className="text-2xl font-bold text-orange-400 mb-6">University System</h3>
                <div className="space-y-4">
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-white font-bold">University of Utah</h4>
                    <p className="text-gray-400 text-sm">33,000 students • Research I university</p>
                    <p className="text-gray-500 text-xs mt-1">#1 in tech commercialization</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-white font-bold">Brigham Young University</h4>
                    <p className="text-gray-400 text-sm">35,000 students • Top entrepreneurship</p>
                    <p className="text-gray-500 text-xs mt-1">#1 in accounting, #3 in animation</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-white font-bold">Utah State University</h4>
                    <p className="text-gray-400 text-sm">28,000 students • Space Grant institution</p>
                    <p className="text-gray-500 text-xs mt-1">Leading aerospace research</p>
                  </div>
                  <div className="border-l-4 border-orange-500 pl-4">
                    <h4 className="text-white font-bold">Utah Valley University</h4>
                    <p className="text-gray-400 text-sm">43,000 students • Largest enrollment</p>
                    <p className="text-gray-500 text-xs mt-1">Focus on applied technology</p>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-xl p-8 border border-orange-500">
                <h3 className="text-2xl font-bold text-orange-400 mb-6">Education Metrics</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">K-12 Graduation Rate</span>
                    <span className="text-2xl font-bold text-orange-400">92%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">College Enrollment</span>
                    <span className="text-2xl font-bold text-orange-400">65%</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">STEM Graduates</span>
                    <span className="text-2xl font-bold text-orange-400">18K/yr</span>
                  </div>
                  <div className="flex justify-between items-center p-4 bg-gray-800 rounded-lg">
                    <span className="text-gray-300">Advanced Degrees</span>
                    <span className="text-2xl font-bold text-orange-400">13%</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-orange-900 to-gray-900 rounded-xl p-8">
              <h3 className="text-3xl font-bold text-white mb-6">Workforce Development Initiatives</h3>
              <div className="grid md:grid-cols-2 gap-8">
                <div>
                  <h4 className="text-xl font-bold text-orange-400 mb-4">Tech Pathway Programs</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Silicon Slopes Tech Summit: 25,000+ attendees</li>
                    <li>• Coding bootcamps: 2,000+ graduates annually</li>
                    <li>• University tech programs aligned with industry</li>
                    <li>• K-12 computer science requirement</li>
                  </ul>
                </div>
                <div>
                  <h4 className="text-xl font-bold text-orange-400 mb-4">Industry Partnerships</h4>
                  <ul className="space-y-2 text-gray-300">
                    <li>• Adobe-BYU Creative Center</li>
                    <li>• Goldman Sachs-U of U Finance Lab</li>
                    <li>• Northrop Grumman-USU Space Dynamics</li>
                    <li>• Tech company internship programs</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Invest in Utah's Future?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join thousands of investors who are capitalizing on Utah's unprecedented growth. 
            Whether you're interested in land, single-family homes, or townhomes, 
            the time to invest is now.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors">
              Schedule Investment Consultation
            </button>
            <button className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-4 rounded-lg text-lg font-bold transition-colors">
              Download Investment Guide
            </button>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-400">$7.8B</div>
              <div className="text-gray-400 text-sm mt-1">VC Investment 2022</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">50K+</div>
              <div className="text-gray-400 text-sm mt-1">Jobs Created Annually</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">2034</div>
              <div className="text-gray-400 text-sm mt-1">Winter Olympics Host</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">#1</div>
              <div className="text-gray-400 text-sm mt-1">Economic Outlook</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WhyUtah;