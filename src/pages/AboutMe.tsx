import React from "react";
import { Person, Code, Home, TrendingUp, School, Business, LocationOn, Star } from '@mui/icons-material';

const AboutMe: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-orange-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            About <span className="text-orange-500">Me</span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl">
            Software engineer turned real estate innovator—discover how technology and 
            property management converge to create the future of real estate.
          </p>
          
          {/* Key Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">10+</div>
              <div className="text-white mt-2">Years in Tech</div>
              <div className="text-gray-400 text-sm">Full Stack Expert</div>
            </div>
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">5+</div>
              <div className="text-white mt-2">Years in Utah</div>
              <div className="text-gray-400 text-sm">Local Market Expert</div>
            </div>
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">100+</div>
              <div className="text-white mt-2">Projects Built</div>
              <div className="text-gray-400 text-sm">Web & Mobile Apps</div>
            </div>
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">24/7</div>
              <div className="text-white mt-2">Support Available</div>
              <div className="text-gray-400 text-sm">Always Here for You</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Content */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <Person className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">Who I Am</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Hi, I'm <strong className="text-orange-400">Pranay Reddy Aleti</strong>—but most people just call me Reddy.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I wear many hats: <strong className="text-orange-400">software engineer, real estate professional, investor, and entrepreneur.</strong> 
                My journey started in the world of technology, where I earned my <strong className="text-orange-400">Master's degree in the U.S.</strong> 
                and built a career as a <strong className="text-orange-400">full stack developer</strong>, specializing in React and modern web applications.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I've spent years solving complex problems, designing systems, and delivering products that make people's lives easier. 
                But beyond code, I've always been driven by a passion for <strong className="text-orange-400">real estate</strong>—the one asset 
                that combines lifestyle, financial growth, and long-term security.
              </p>
            </div>

            {/* Vision Section */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <TrendingUp className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">My Vision</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Real estate should be <strong className="text-orange-400">transparent, efficient, and stress-free.</strong> Too often, 
                owners struggle with property management, and tenants feel disconnected from the process. My mission with Ondo is to 
                <strong className="text-orange-400"> bridge that gap</strong> by using technology to create a 
                <strong className="text-orange-400"> seamless, user-friendly experience</strong>.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Think of it as property management reimagined—where data, communication, and trust are at the center. 
                We're not just managing properties; we're building relationships and creating value for everyone involved.
              </p>
            </div>

            {/* Why Work With Me */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <Star className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">Why Work With Me?</h2>
              </div>
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="text-white font-bold mb-2">Technical Expertise</h4>
                    <p className="text-gray-400 text-sm">
                      With a background in software engineering, I understand how to build scalable, secure, and reliable systems. 
                      Your properties and transactions are managed with cutting-edge solutions.
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="text-white font-bold mb-2">Real Estate Knowledge</h4>
                    <p className="text-gray-400 text-sm">
                      As a licensed real estate professional in Utah, I bring practical insight into buying, selling, 
                      renting, and managing properties in this dynamic market.
                    </p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="text-white font-bold mb-2">Investor Mindset</h4>
                    <p className="text-gray-400 text-sm">
                      I've been an active investor myself, from real estate to cryptocurrency, so I know what it's like 
                      to weigh risk, evaluate opportunities, and make decisions that impact the future.
                    </p>
                  </div>
                  <div className="bg-gray-800 rounded-lg p-4 border-l-4 border-orange-500">
                    <h4 className="text-white font-bold mb-2">Hands-On Experience</h4>
                    <p className="text-gray-400 text-sm">
                      I own and manage properties personally, so I understand both sides—the challenges owners face 
                      and the needs tenants have. This real-world experience drives everything we do.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* What Ondo Stands For */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <Home className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">What Ondo Stands For</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                The name <strong className="text-orange-400">Ondo</strong> means <em className="text-orange-400">foundation, stability, and rhythm</em>. 
                Real estate is more than just buildings—it's about creating a foundation for families, stability for investors, 
                and a rhythm that keeps life moving smoothly.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                With Ondo, I'm building a platform where property owners and tenants can connect in a way that feels modern, 
                fair, and effortless. We're creating the infrastructure for better relationships and more successful investments.
              </p>
            </div>

            {/* Personal Background */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <LocationOn className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">A Little More About Me</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                When I'm not writing code or closing real estate deals, I'm spending time with my family here in 
                <strong className="text-orange-400"> Lehi, Utah</strong>, where I've lived for the past five years. 
                I love working out, exploring new ideas, and taking risks—whether that's in business, real estate, or investments.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I believe in always <strong className="text-orange-400">thinking ahead</strong>, staying adaptable, and building for the long term. 
                Utah's growth and innovation culture perfectly aligns with my vision for the future of real estate.
              </p>
            </div>

            {/* Let's Connect */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <Business className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">Let's Connect</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Whether you're an owner looking for a smarter way to manage your property, or a tenant searching for a place 
                to call home, Ondo is built for you. This isn't just property management—it's 
                <strong className="text-orange-400"> property management redefined.</strong>
              </p>
              <p className="text-gray-300 text-lg leading-relaxed font-medium">
                Welcome to the future of real estate. Welcome to <strong className="text-orange-400">Ondo.</strong>
              </p>
            </div>
          </div>

          {/* Right Column - Key Highlights */}
          <div className="space-y-6">
            {/* Skills & Technologies */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Technical Skills</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Frontend</div>
                  <div className="text-gray-400 text-sm">React, TypeScript, Tailwind CSS</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Backend</div>
                  <div className="text-gray-400 text-sm">Node.js, Python, PostgreSQL</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Cloud & DevOps</div>
                  <div className="text-gray-400 text-sm">AWS, Docker, CI/CD</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Real Estate Tech</div>
                  <div className="text-gray-400 text-sm">CRM, Analytics, Automation</div>
                </div>
              </div>
            </div>

            {/* Education & Certifications */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Education</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Master's Degree</div>
                  <div className="text-gray-400 text-sm">Computer Science, U.S.</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Real Estate License</div>
                  <div className="text-gray-400 text-sm">Utah State Certified</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Property Management</div>
                  <div className="text-gray-400 text-sm">Professional Certification</div>
                </div>
              </div>
            </div>

            {/* Market Expertise */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Market Focus</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Primary Market</div>
                  <div className="text-gray-400 text-sm">Utah County & Salt Lake</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Property Types</div>
                  <div className="text-gray-400 text-sm">Residential & Investment</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Specialization</div>
                  <div className="text-gray-400 text-sm">Tech Corridor Properties</div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-orange-900 to-gray-900 rounded-xl p-6 border border-orange-500">
              <h3 className="text-xl font-bold text-white mb-4">Ready to Get Started?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Let's discuss how Ondo can transform your real estate experience.
              </p>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Schedule a Meeting
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience the Future?
          </h2>
          <p className="text-xl text-white mb-8 opacity-90">
            Join the revolution in property management. Whether you're an owner looking for 
            smarter solutions or a tenant seeking a better experience, Ondo is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-black hover:bg-gray-900 text-white px-8 py-4 rounded-lg text-lg font-bold transition-colors">
              Start Your Journey
            </button>
            <button className="bg-white hover:bg-gray-100 text-orange-600 px-8 py-4 rounded-lg text-lg font-bold transition-colors">
              Download Our Guide
            </button>
          </div>
        </div>
      </div>

      {/* Footer Stats */}
      <div className="bg-gray-900 py-12 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl font-bold text-orange-400">10+</div>
              <div className="text-gray-400 text-sm mt-1">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">100+</div>
              <div className="text-gray-400 text-sm mt-1">Projects Completed</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">5+</div>
              <div className="text-gray-400 text-sm mt-1">Years in Utah</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-orange-400">24/7</div>
              <div className="text-gray-400 text-sm mt-1">Support Available</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutMe;
