import React from "react";
import { Person, Business, Lightbulb, TrendingUp, Handshake, Rocket } from '@mui/icons-material';

const FoundersLetter: React.FC = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Hero Section with Gradient */}
      <div className="relative bg-gradient-to-br from-black via-gray-900 to-orange-900">
        <div className="absolute inset-0 bg-black opacity-50"></div>
        <div className="relative max-w-7xl mx-auto px-4 py-24">
          <h1 className="text-6xl md:text-7xl font-bold text-white mb-6">
            A Letter From the <span className="text-orange-500">Founder</span>
          </h1>
          <p className="text-2xl text-gray-300 max-w-3xl">
            From software engineering to real estate innovation—discover the story behind 
            Ondo Real Estate and our mission to revolutionize property management.
          </p>
          
          {/* Key Stats Banner */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">10+</div>
              <div className="text-white mt-2">Years in Tech</div>
              <div className="text-gray-400 text-sm">Full Stack Development</div>
            </div>
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">5+</div>
              <div className="text-white mt-2">Years in Utah</div>
              <div className="text-gray-400 text-sm">Local Market Expert</div>
            </div>
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">100%</div>
              <div className="text-white mt-2">Client Focused</div>
              <div className="text-gray-400 text-sm">Personal Touch</div>
            </div>
            <div className="bg-orange-500 bg-opacity-20 backdrop-blur-lg rounded-lg p-6 border border-orange-500">
              <div className="text-4xl font-bold text-orange-400">24/7</div>
              <div className="text-white mt-2">Tech Platform</div>
              <div className="text-gray-400 text-sm">Always Available</div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Left Column - Main Letter */}
          <div className="lg:col-span-2 space-y-8">
            {/* Introduction */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <Person className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">Meet the Founder</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Hi, I'm <strong className="text-orange-400">Pranay Reddy Aleti</strong>—but you can call me Reddy.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                When I first came to the U.S. to pursue my <strong className="text-orange-400">Master's degree in computer science</strong>, 
                I thought my life would stay rooted in software engineering. I've spent over a decade building applications, 
                solving problems, and writing code that powers businesses. But somewhere along the way, I realized something 
                important: while I love technology, what truly excites me is <strong className="text-orange-400">real estate</strong>—because 
                real estate is about people, growth, and legacy.
              </p>
            </div>

            {/* Journey Section */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <TrendingUp className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">The Journey</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                As an immigrant, homeowner, and now a <strong className="text-orange-400">real estate professional in Utah</strong>, 
                I know firsthand how much real estate impacts people's lives. It's not just about transactions; 
                it's about finding stability, building wealth, and creating opportunities. That belief is what 
                led me to start <strong className="text-orange-400">Ondo Real Estate</strong>.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                My background in <strong className="text-orange-400">technology and full stack development</strong> has given me 
                unique insights into how to solve the complex challenges that property owners and tenants face every day.
              </p>
            </div>

            {/* Why Ondo Section */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <Lightbulb className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">Why Ondo?</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                "Ondo" means <em className="text-orange-400">foundation and rhythm.</em> To me, real estate is exactly that—the 
                foundation for families and the rhythm that keeps communities thriving. I created Ondo because I saw a gap: 
                property management was stuck in the past, weighed down by inefficiency, poor communication, and outdated systems.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Owners were frustrated. Tenants were frustrated. And with my background in <strong className="text-orange-400">technology</strong>, 
                I knew there was a better way.
              </p>
            </div>

            {/* Mission Section */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <Rocket className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">Our Mission</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                Ondo isn't just another property management company—it's a <strong className="text-orange-400">modern platform built on trust, 
                transparency, and technology.</strong> My goal is simple: make property ownership stress-free, and make 
                renting a home feel fair and effortless.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                I want owners to feel confident that their investments are taken care of, and tenants to feel like 
                they're more than just a number in a system. We're building the future of property management, 
                one relationship at a time.
              </p>
            </div>

            {/* Personal Note */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <Handshake className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">A Personal Note</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                I'm not building Ondo from a distance—I live this. I own and manage rental property myself, so I understand 
                the real challenges on both sides. I've also taken risks, whether in <strong className="text-orange-400">real estate, 
                technology, or investing in the future of cryptocurrency.</strong>
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Risk has taught me resilience, and resilience is what drives me to build something bigger than just another business. 
                At the end of the day, Ondo is about <strong className="text-orange-400">creating long-term value</strong>—for owners, 
                for tenants, and for the communities we serve.
              </p>
            </div>

            {/* Looking Ahead */}
            <div className="bg-gray-900 rounded-xl p-8 border border-gray-800">
              <div className="flex items-center mb-6">
                <Business className="text-orange-400 text-3xl mr-4" />
                <h2 className="text-3xl font-bold text-white">Looking Ahead</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-4">
                I believe the future of real estate lies in combining <strong className="text-orange-400">human connection</strong> with 
                <strong className="text-orange-400"> technology.</strong> That's what Ondo stands for. And if you're reading this, 
                I'd love for you to be part of that journey—whether you're an owner looking for smarter management, 
                a tenant searching for a great home, or a partner who believes in innovation.
              </p>
              <p className="text-gray-300 text-lg leading-relaxed">
                Thank you for being here. The future is bright, and this is just the beginning.
              </p>
            </div>

            {/* Signature */}
            <div className="bg-gradient-to-r from-orange-900 to-gray-900 rounded-xl p-8 border border-orange-500">
              <p className="text-gray-300 text-lg mb-4">
                Sincerely,
              </p>
              <div className="text-2xl font-bold text-white mb-2">
                Pranay Reddy Aleti
              </div>
              <div className="text-orange-400 font-semibold">
                Founder, Ondo Real Estate
              </div>
            </div>
          </div>

          {/* Right Column - Key Highlights */}
          <div className="space-y-6">
            {/* Core Values */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Core Values</h3>
              <div className="space-y-3">
                <div className="flex items-center">
                  <span className="text-orange-400 mr-3">✓</span>
                  <span className="text-gray-300">Innovation First</span>
                </div>
                <div className="flex items-center">
                  <span className="text-orange-400 mr-3">✓</span>
                  <span className="text-gray-300">Client Success</span>
                </div>
                <div className="flex items-center">
                  <span className="text-orange-400 mr-3">✓</span>
                  <span className="text-gray-300">Transparency</span>
                </div>
                <div className="flex items-center">
                  <span className="text-orange-400 mr-3">✓</span>
                  <span className="text-gray-300">Community Focus</span>
                </div>
              </div>
            </div>

            {/* Expertise Areas */}
            <div className="bg-gray-900 rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-orange-400 mb-4">Expertise</h3>
              <div className="space-y-3">
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Full Stack Development</div>
                  <div className="text-gray-400 text-sm">React, Node.js, Modern Web Apps</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Real Estate Investment</div>
                  <div className="text-gray-400 text-sm">Utah Market Specialist</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Property Management</div>
                  <div className="text-gray-400 text-sm">Owner & Tenant Relations</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-3">
                  <div className="text-white font-semibold">Technology Integration</div>
                  <div className="text-gray-400 text-sm">AI & Automation Solutions</div>
                </div>
              </div>
            </div>

            {/* Contact Info */}
            <div className="bg-gradient-to-r from-orange-900 to-gray-900 rounded-xl p-6 border border-orange-500">
              <h3 className="text-xl font-bold text-white mb-4">Let's Connect</h3>
              <p className="text-gray-300 text-sm mb-4">
                Ready to experience the future of property management?
              </p>
              <button className="w-full bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-lg font-semibold transition-colors">
                Schedule a Consultation
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="bg-gradient-to-r from-orange-500 to-orange-600 py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Experience Ondo?
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
              Learn More About Ondo
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoundersLetter;
