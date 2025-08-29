import React from "react";

const AboutMe: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto bg-white shadow-md rounded-lg p-8">
        <h1 className="text-4xl font-bold mb-6">About Me</h1>
        <p className="mb-4">
          Hi, I’m <strong>Pranay Reddy Aleti</strong>—but most people just call me Reddy.
        </p>

        <p className="mb-4">
          I wear many hats: <strong>software engineer, real estate professional, investor, and entrepreneur.</strong> My journey started in the world of technology, where I earned my <strong>Master’s degree in the U.S.</strong> and built a career as a <strong>full stack developer</strong>, specializing in React and modern web applications. I’ve spent years solving complex problems, designing systems, and delivering products that make people’s lives easier.
        </p>

        <p className="mb-4">
          But beyond code, I’ve always been driven by a passion for <strong>real estate</strong>—the one asset that combines lifestyle, financial growth, and long-term security. Over time, I realized that my skill set in technology could perfectly merge with my love for real estate. That’s how <strong>Ondo Real Estate</strong> was born—a modern approach to property management, designed for both <strong>owners and tenants</strong>.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">My Vision</h2>
        <p className="mb-4">
          Real estate should be <strong>transparent, efficient, and stress-free.</strong> Too often, owners struggle with property management, and tenants feel disconnected from the process. My mission with Ondo is to <strong>bridge that gap</strong> by using technology to create a <strong>seamless, user-friendly experience</strong>. Think of it as property management reimagined—where data, communication, and trust are at the center.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Why Work With Me?</h2>
        <ul className="list-disc list-inside space-y-2 mb-4">
          <li>
            <strong>Technical Expertise</strong> – With a background in software engineering, I understand how to build scalable, secure, and reliable systems. That means your properties and transactions are managed with cutting-edge solutions.
          </li>
          <li>
            <strong>Real Estate Knowledge</strong> – As a licensed real estate professional in Utah, I bring practical insight into buying, selling, renting, and managing properties.
          </li>
          <li>
            <strong>Investor Mindset</strong> – I’ve been an active investor myself, from real estate to cryptocurrency, so I know what it’s like to weigh risk, evaluate opportunities, and make decisions that impact the future.
          </li>
          <li>
            <strong>Hands-On Experience</strong> – I own and manage properties personally, so I understand both sides—the challenges owners face and the needs tenants have.
          </li>
        </ul>

        <h2 className="text-2xl font-semibold mt-8 mb-4">What Ondo Stands For</h2>
        <p className="mb-4">
          The name <strong>Ondo</strong> means <em>foundation, stability, and rhythm</em>. Real estate is more than just buildings—it’s about creating a foundation for families, stability for investors, and a rhythm that keeps life moving smoothly. With Ondo, I’m building a platform where property owners and tenants can connect in a way that feels modern, fair, and effortless.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">A Little More About Me</h2>
        <p className="mb-4">
          When I’m not writing code or closing real estate deals, I’m spending time with my family here in <strong>Lehi, Utah</strong>, where I’ve lived for the past five years. I love working out, exploring new ideas, and taking risks—whether that’s in business, real estate, or investments. I believe in always <strong>thinking ahead</strong>, staying adaptable, and building for the long term.
        </p>

        <h2 className="text-2xl font-semibold mt-8 mb-4">Let’s Connect</h2>
        <p className="mb-4">
          Whether you’re an owner looking for a smarter way to manage your property, or a tenant searching for a place to call home, Ondo is built for you. This isn’t just property management—it’s <strong>property management redefined.</strong>
        </p>

        <p className="font-medium">
          Welcome to the future of real estate. Welcome to <strong>Ondo.</strong>
        </p>
      </div>
    </div>
  );
};

export default AboutMe;