import React from 'react';
import { Link } from 'react-router-dom';
import { 
  TrendingUp, 
  Business, 
  School, 
  FamilyRestroom, 
  SportsSoccer, 
  LocationOn, 
  Home, 
  Apartment,
  Landscape,
  Star
} from '@mui/icons-material';

const WhyUtah: React.FC = () => {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation Bar */}
      <nav className="bg-black shadow-lg border-b-2 border-orange-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo/Brand */}
            <div className="flex-shrink-0">
              <Link to="/" className="text-2xl font-bold text-orange-500 hover:text-orange-400">
                Ondo Real Estate
              </Link>
            </div>

            {/* Navigation Links */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <Link to="/" className="text-white hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium">
                  Home
                </Link>
                <Link to="/why-utah" className="text-orange-500 border-b-2 border-orange-500 px-3 py-2 rounded-md text-sm font-medium">
                  Why Utah
                </Link>
                <Link to="/calculators" className="text-white hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium">
                  Calculators
                </Link>
                <Link to="/about" className="text-white hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium">
                  About
                </Link>
              </div>
            </div>

            {/* User Actions */}
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-white hover:text-orange-400 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-500 hover:bg-orange-600 text-black px-4 py-2 rounded-md text-sm font-medium font-semibold"
              >
                Sign Up
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative bg-gradient-to-r from-black via-gray-900 to-black py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            <span className="text-white">WHY</span>
            <span className="text-orange-500"> UTAH?</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto">
            Discover why Utah is the premier destination for real estate investment, 
            business growth, and family living in the American West
          </p>
          <div className="flex justify-center">
            <div className="w-16 h-16 border-4 border-orange-500 rounded-full flex items-center justify-center">
              <div className="w-8 h-8 bg-orange-500 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Stats Section */}
      <div className="bg-orange-500 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-black mb-2">#1</div>
              <div className="text-black font-semibold">Best State for Business</div>
              <div className="text-black text-sm">Forbes 2023</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">2.3%</div>
              <div className="text-black font-semibold">Population Growth</div>
              <div className="text-black text-sm">Annually</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">2034</div>
              <div className="text-black font-semibold">Olympics Return</div>
              <div className="text-black text-sm">Salt Lake City</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-black mb-2">$1.2T</div>
              <div className="text-black font-semibold">GDP Growth</div>
              <div className="text-black text-sm">Projected 2030</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        
        {/* Economic & Business Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">UTAH: THE</span>
              <span className="text-orange-500"> STARTUP STATE</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              A thriving ecosystem for innovation, entrepreneurship, and economic prosperity
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-6 flex items-center">
                <Business className="mr-3 text-3xl" />
                Business & Innovation Hub
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  Utah ranks <span className="text-orange-500 font-semibold">#1 for business climate</span> and 
                  <span className="text-orange-500 font-semibold"> #2 for economic outlook</span> nationally. 
                  The state's pro-business policies, low corporate taxes, and streamlined regulations create 
                  an ideal environment for startups and established companies alike.
                </p>
                <p className="text-lg">
                  The <span className="text-orange-500 font-semibold">Silicon Slopes</span> tech corridor 
                  rivals California's Silicon Valley, home to major companies like Adobe, Qualtrics, 
                  and Ancestry.com, with over 8,000 tech companies and 100,000+ tech jobs.
                </p>
                <p className="text-lg">
                  Utah's <span className="text-orange-500 font-semibold">five targeted industries</span> 
                  include aerospace, life sciences, energy, financial services, and outdoor recreation, 
                  all experiencing unprecedented growth and investment.
                </p>
              </div>
            </div>
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl">
              <h4 className="text-2xl font-bold text-black mb-6">Key Business Advantages</h4>
              <ul className="space-y-3 text-black">
                <li className="flex items-center">
                  <Star className="mr-3 text-black" />
                  Lowest corporate tax rate in the nation (4.85%)
                </li>
                <li className="flex items-center">
                  <Star className="mr-3 text-black" />
                  Right-to-work state with skilled workforce
                </li>
                <li className="flex items-center">
                  <Star className="mr-3 text-black" />
                  Strategic location with major transportation hubs
                </li>
                <li className="flex items-center">
                  <Star className="mr-3 text-black" />
                  Strong university partnerships and R&D centers
                </li>
                <li className="flex items-center">
                  <Star className="mr-3 text-black" />
                  Access to venture capital and angel investors
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Olympics & Future Growth Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">2034 OLYMPICS &</span>
              <span className="text-orange-500"> FUTURE GROWTH</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Salt Lake City's return to the Olympic stage will transform Utah's economy and real estate market
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <div className="text-orange-500 mb-4">
                <SportsSoccer className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Olympic Infrastructure</h3>
              <p className="text-gray-300 mb-4">
                Utah's existing Olympic venues from 2002 reduce costs and provide immediate 
                infrastructure advantages. New developments will include:
              </p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Enhanced transportation systems</li>
                <li>• Modernized sports facilities</li>
                <li>• Expanded hospitality infrastructure</li>
                <li>• Improved urban development</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <div className="text-orange-500 mb-4">
                <TrendingUp className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Economic Impact</h3>
              <p className="text-gray-300 mb-4">
                The 2034 Olympics will generate significant economic benefits:
              </p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• $4.5+ billion in economic activity</li>
                <li>• 35,000+ new jobs created</li>
                <li>• $1.5 billion in tax revenue</li>
                <li>• Enhanced global brand recognition</li>
              </ul>
            </div>

            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <div className="text-orange-500 mb-4">
                <LocationOn className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Real Estate Boom</h3>
              <p className="text-gray-300 mb-4">
                Olympic preparation will drive real estate development:
              </p>
              <ul className="text-gray-300 space-y-2 text-sm">
                <li>• Increased property values</li>
                <li>• New residential developments</li>
                <li>• Enhanced commercial districts</li>
                <li>• Improved public spaces</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tech Scene Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">UTAH'S</span>
              <span className="text-orange-500"> TECH REVOLUTION</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Silicon Slopes: Where innovation meets opportunity in the heart of the American West
            </p>
          </div>

          <div className="bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              <div>
                <h3 className="text-2xl font-bold text-orange-500 mb-6">Silicon Slopes Ecosystem</h3>
                <div className="space-y-4 text-gray-300">
                  <p className="text-lg">
                    Utah's tech sector has grown <span className="text-orange-500 font-semibold">400% faster</span> 
                    than the national average, with over $1 billion in venture capital invested annually.
                  </p>
                  <p className="text-lg">
                    Major tech companies choose Utah for its <span className="text-orange-500 font-semibold">quality of life</span>, 
                    <span className="text-orange-500 font-semibold"> lower costs</span>, and 
                    <span className="text-orange-500 font-semibold"> exceptional talent pool</span>.
                  </p>
                  <p className="text-lg">
                    The state's universities produce <span className="text-orange-500 font-semibold">top-tier graduates</span> 
                    in computer science, engineering, and business, creating a continuous pipeline of talent.
                  </p>
                </div>
              </div>
              <div>
                <h4 className="text-xl font-bold text-orange-500 mb-4">Major Tech Employers</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-black p-4 rounded-lg border border-gray-700">
                    <div className="text-orange-500 font-semibold">Adobe</div>
                    <div className="text-gray-400 text-sm">Lehi, UT</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg border border-gray-700">
                    <div className="text-orange-500 font-semibold">Qualtrics</div>
                    <div className="text-gray-400 text-sm">Provo, UT</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg border border-gray-700">
                    <div className="text-orange-500 font-semibold">Ancestry</div>
                    <div className="text-gray-400 text-sm">Lehi, UT</div>
                  </div>
                  <div className="bg-black p-4 rounded-lg border border-gray-700">
                    <div className="text-orange-500 font-semibold">Domo</div>
                    <div className="text-gray-400 text-sm">American Fork, UT</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Family & Culture Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">FAMILY-FRIENDLY</span>
              <span className="text-orange-500"> CULTURE</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Utah offers the perfect environment for families to thrive and grow together
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="bg-gradient-to-br from-orange-500 to-orange-600 p-8 rounded-2xl">
              <h3 className="text-2xl font-bold text-black mb-6 flex items-center">
                <FamilyRestroom className="mr-3 text-black text-3xl" />
                Family Values & Safety
              </h3>
              <div className="space-y-4 text-black">
                <p className="text-lg">
                  Utah consistently ranks among the <span className="font-semibold">safest states</span> in America, 
                  with low crime rates and strong community values.
                </p>
                <p className="text-lg">
                  The state's <span className="font-semibold">family-oriented culture</span> emphasizes 
                  education, outdoor recreation, and community involvement.
                </p>
                <p className="text-lg">
                  Utah's <span className="font-semibold">strong social networks</span> and 
                  <span className="font-semibold"> community support systems</span> make it easy 
                  for families to build lasting relationships.
                </p>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-bold text-orange-500 mb-6 flex items-center">
                <School className="mr-3 text-3xl" />
                Education Excellence
              </h3>
              <div className="space-y-4 text-gray-300">
                <p className="text-lg">
                  Utah's <span className="text-orange-500 font-semibold">K-12 education system</span> 
                  ranks in the top 10 nationally, with high graduation rates and strong academic performance.
                </p>
                <p className="text-lg">
                  The state is home to <span className="text-orange-500 font-semibold">world-class universities</span> 
                  including the University of Utah, Brigham Young University, and Utah State University.
                </p>
                <p className="text-lg">
                  Utah invests heavily in <span className="text-orange-500 font-semibold">STEM education</span> 
                  and career preparation, ensuring students are ready for the jobs of tomorrow.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Youth & Demographics Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">YOUTH &</span>
              <span className="text-orange-500"> DEMOGRAPHICS</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Utah's young, educated population drives innovation and economic growth
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <div className="text-6xl font-bold text-orange-500 mb-4">31.2</div>
              <div className="text-xl font-semibold mb-2">Median Age</div>
              <div className="text-gray-300 text-sm">Youngest state in the nation</div>
            </div>
            <div className="text-center bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <div className="text-6xl font-bold text-orange-500 mb-4">93%</div>
              <div className="text-xl font-semibold mb-2">High School Graduation</div>
              <div className="text-gray-300 text-sm">Above national average</div>
            </div>
            <div className="text-center bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <div className="text-6xl font-bold text-orange-500 mb-4">2.4</div>
              <div className="text-xl font-semibold mb-2">Fertility Rate</div>
              <div className="text-gray-300 text-sm">Highest in the nation</div>
            </div>
          </div>

          <div className="mt-12 bg-gradient-to-r from-gray-900 to-black p-8 rounded-2xl border border-gray-800">
            <h3 className="text-2xl font-bold text-orange-500 mb-6">Demographic Advantages</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Population Growth</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Fastest growing state in the Mountain West</li>
                  <li>• Young, educated workforce entering prime earning years</li>
                  <li>• Strong family formation driving housing demand</li>
                  <li>• Net migration from other states increasing</li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-white mb-4">Workforce Quality</h4>
                <ul className="text-gray-300 space-y-2">
                  <li>• Highly educated population with technical skills</li>
                  <li>• Strong work ethic and reliability</li>
                  <li>• Multilingual capabilities (Spanish, Portuguese, etc.)</li>
                  <li>• Adaptable to new technologies and industries</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Real Estate Investment Section */}
        <section className="mb-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">
              <span className="text-white">REAL ESTATE</span>
              <span className="text-orange-500"> INVESTMENT</span>
            </h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Why Utah real estate offers exceptional returns and long-term value
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-12">
            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <div className="text-orange-500 mb-4">
                <Landscape className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Land Investment</h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-sm">
                  Utah's <span className="text-orange-500 font-semibold">rapid urbanization</span> and 
                  <span className="text-orange-500 font-semibold"> population growth</span> create 
                  exceptional opportunities for land development.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• Strategic locations near major highways</li>
                  <li>• Zoning changes driving value increases</li>
                  <li>• Infrastructure improvements expanding development</li>
                  <li>• Agricultural land conversion opportunities</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <div className="text-orange-500 mb-4">
                <Home className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Single-Family Homes</h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-sm">
                  SFH investments benefit from Utah's <span className="text-orange-500 font-semibold">strong family culture</span> 
                  and <span className="text-orange-500 font-semibold">growing housing demand</span>.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• High rental demand from young families</li>
                  <li>• Strong appreciation rates (8-12% annually)</li>
                  <li>• Low vacancy rates (2-3%)</li>
                  <li>• Growing rental income potential</li>
                </ul>
              </div>
            </div>

            <div className="bg-gray-900 p-8 rounded-2xl border border-gray-800">
              <div className="text-orange-500 mb-4">
                <Apartment className="text-4xl" />
              </div>
              <h3 className="text-xl font-bold mb-4">Townhomes & Multi-Family</h3>
              <div className="space-y-3 text-gray-300">
                <p className="text-sm">
                  Multi-family properties offer <span className="text-orange-500 font-semibold">diversified income streams</span> 
                  and <span className="text-orange-500 font-semibold">lower maintenance costs</span>.
                </p>
                <ul className="text-sm space-y-1">
                  <li>• High demand from young professionals</li>
                  <li>• Lower per-unit maintenance costs</li>
                  <li>• Strong cash flow potential</li>
                  <li>• Appreciation from land value increases</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 rounded-2xl">
            <h3 className="text-2xl font-bold text-black mb-6">Investment Advantages</h3>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              <div>
                <h4 className="text-xl font-semibold text-black mb-4">Market Fundamentals</h4>
                <ul className="text-black space-y-2">
                  <li className="flex items-center">
                    <Star className="mr-3 text-black" />
                    Population growth driving demand
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-3 text-black" />
                    Limited land supply constraints
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-3 text-black" />
                    Strong job market supporting incomes
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-3 text-black" />
                    Low property tax rates
                  </li>
                </ul>
              </div>
              <div>
                <h4 className="text-xl font-semibold text-black mb-4">Growth Projections</h4>
                <ul className="text-black space-y-2">
                  <li className="flex items-center">
                    <Star className="mr-3 text-black" />
                    15-20% annual appreciation potential
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-3 text-black" />
                    8-12% rental income growth
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-3 text-black" />
                    Olympic-driven value increases
                  </li>
                  <li className="flex items-center">
                    <Star className="mr-3 text-black" />
                    Tech sector expansion benefits
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center py-20">
          <h2 className="text-4xl font-bold mb-6">
            <span className="text-white">READY TO</span>
            <span className="text-orange-500"> INVEST IN UTAH?</span>
          </h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Join thousands of successful investors who have discovered Utah's exceptional 
            opportunities for growth and prosperity.
          </p>
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-6">
            <Link
              to="/calculators/mortgage-payment"
              className="bg-orange-500 hover:bg-orange-600 text-black px-8 py-4 rounded-lg text-lg font-bold transition-colors"
            >
              Calculate Investment Returns
            </Link>
            <Link
              to="/contact"
              className="border-2 border-orange-500 text-orange-500 hover:bg-orange-500 hover:text-black px-8 py-4 rounded-lg text-lg font-bold transition-colors"
            >
              Get Expert Advice
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};

export default WhyUtah;