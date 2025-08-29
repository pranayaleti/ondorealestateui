import { Link } from "react-router-dom";

export default function WhyUtah2() {
  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-20">
          <div className="text-center">
            <p className="inline-block rounded-full border border-orange-500/40 bg-orange-500/10 px-4 py-1 text-sm tracking-wide text-orange-400">The Startup State</p>
            <h1 className="mt-6 text-4xl md:text-6xl font-extrabold">
              Why Utah
            </h1>
            <p className="mt-4 text-lg text-zinc-300 max-w-3xl mx-auto">
              Utah blends resilient economics, a booming tech scene, and a family-first culture. Here’s a concise guide to why investors choose Utah—and where the strongest opportunities are next.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a href="#economy" className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-orange-300 hover:bg-orange-500/20">Economy</a>
              <a href="#olympics" className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-orange-300 hover:bg-orange-500/20">2034 Olympics</a>
              <a href="#tech" className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-orange-300 hover:bg-orange-500/20">Tech & Innovation</a>
              <a href="#families" className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-orange-300 hover:bg-orange-500/20">Families & Youth</a>
              <a href="#realestate" className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-orange-300 hover:bg-orange-500/20">Real Estate</a>
              <a href="#sources" className="rounded-lg border border-orange-500/40 bg-orange-500/10 px-4 py-2 text-orange-300 hover:bg-orange-500/20">Sources</a>
            </div>
          </div>
        </div>
      </section>

      {/* Economy & Future Growth */}
      <section id="economy" className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold">Economic strength and future growth</h2>
          <p className="mt-4 text-zinc-300 max-w-3xl">
            Utah’s pro‑business climate, diverse industry base, and young workforce keep it among the nation’s most resilient economies. Independent rankings regularly place Utah near the top for economic outlook and job growth, with major private and public investments planned across the next decade.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-orange-300">Outlook</p>
              <h3 className="mt-2 text-xl font-semibold">Consistently top-ranked</h3>
              <p className="mt-2 text-zinc-300">Utah is frequently cited for best‑in‑class economic outlook, low unemployment, and strong population inflows.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-orange-300">Investment</p>
              <h3 className="mt-2 text-xl font-semibold">Billions committed</h3>
              <p className="mt-2 text-zinc-300">Large‑scale districts, transit, and water/electric projects are accelerating development along the Wasatch Front.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-orange-300">Talent</p>
              <h3 className="mt-2 text-xl font-semibold">Deep, young labor pool</h3>
              <p className="mt-2 text-zinc-300">Universities and in‑migration supply a steady pipeline for tech, aerospace/defense, life sciences, and finance.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Olympics */}
      <section id="olympics" className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold">Olympic momentum: 2034 Winter Games</h2>
          <p className="mt-4 text-zinc-300 max-w-3xl">
            Salt Lake City–Utah is slated to host the 2034 Olympic and Paralympic Winter Games. The state’s world‑class 2002 venues, proven logistics, and strong winter‑sports ecosystem translate to significant travel, media, and infrastructure activity leading up to—and long after—the Games.
          </p>
          <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-zinc-200">
            <li className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">Long runway for demand: multi‑year upgrades, test events, and global audience visibility</li>
            <li className="rounded-lg border border-zinc-800 bg-zinc-900 p-4">Sustained legacy use: Utah’s Olympic facilities host top events annually, anchoring tourism</li>
          </ul>
        </div>
      </section>

      {/* Tech */}
      <section id="tech" className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold">Tech and innovation: Silicon Slopes</h2>
          <p className="mt-4 text-zinc-300 max-w-3xl">
            The Wasatch Front’s “Silicon Slopes” is a nationally recognized tech cluster. Software, fintech, cloud, and defense technology anchor thousands of high‑wage jobs, with employment growth outpacing national averages and a maturing venture ecosystem.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-semibold">Enterprise anchors</h3>
              <p className="mt-2 text-zinc-300">Major platforms and data‑center footprints increase local supplier and housing demand.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-semibold">Startup density</h3>
              <p className="mt-2 text-zinc-300">Founders benefit from university research, affordable talent, and exit‑proven operators.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-semibold">STEM pipeline</h3>
              <p className="mt-2 text-zinc-300">Record university enrollments and in‑migration supply scarce skills for AI, cyber, and aerospace.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Families & Youth */}
      <section id="families" className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold">Family‑first culture and the nation’s youngest population</h2>
          <p className="mt-4 text-zinc-300 max-w-3xl">
            Utah’s communities are built around families, education, safety, and outdoor access. With one of the youngest median ages in the country and strong social mobility, the state offers a stable, values‑driven environment that attracts long‑term residents and employers alike.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-semibold">Quality of life</h3>
              <p className="mt-2 text-zinc-300">Four‑season recreation, national parks, and short commutes make retention easy for families and teams.</p>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <h3 className="text-lg font-semibold">Education focus</h3>
              <p className="mt-2 text-zinc-300">Top universities and workforce programs align with employer needs in tech, life sciences, and defense.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Real Estate */}
      <section id="realestate" className="border-t border-zinc-800 bg-zinc-950">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-3xl font-bold">Where to invest: land, single‑family homes, townhomes</h2>
          <p className="mt-4 text-zinc-300 max-w-3xl">
            A durable demand story—population growth, job inflows, and limited developable corridors—supports long‑term real‑estate fundamentals across the Wasatch Front and key growth counties.
          </p>
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-orange-300">Land</p>
              <h3 className="mt-1 text-xl font-semibold">Control tomorrow’s supply</h3>
              <ul className="mt-3 list-disc pl-5 text-zinc-300 space-y-2">
                <li>Secure sites near transit, tech corridors, and future districts</li>
                <li>Entitle/phase to capture step‑ups as infrastructure delivers</li>
                <li>Diversify with mixed‑use or build‑to‑rent strategies</li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-orange-300">Single‑family homes</p>
              <h3 className="mt-1 text-xl font-semibold">Own the family preference</h3>
              <ul className="mt-3 list-disc pl-5 text-zinc-300 space-y-2">
                <li>Consistent demand from young households and in‑migrants</li>
                <li>Favorable stay length and maintenance profile vs. dense multifamily</li>
                <li>Attractive exit optionality (retail sale or portfolio)</li>
              </ul>
            </div>
            <div className="rounded-xl border border-zinc-800 bg-zinc-900 p-6">
              <p className="text-sm text-orange-300">Townhomes</p>
              <h3 className="mt-1 text-xl font-semibold">Attainable urban living</h3>
              <ul className="mt-3 list-disc pl-5 text-zinc-300 space-y-2">
                <li>Bridges affordability gap for first‑time buyers and renters</li>
                <li>Efficient land use near employment centers</li>
                <li>Strong rent‑to‑price ratios in select submarkets</li>
              </ul>
            </div>
          </div>

          <div className="mt-10 flex flex-wrap gap-4">
            <Link to="/calculators/affordability" className="rounded-lg bg-orange-600 px-6 py-3 font-medium text-white hover:bg-orange-500">Run affordability</Link>
            <Link to="/calculators/mortgage-payment" className="rounded-lg border border-orange-500/50 bg-transparent px-6 py-3 font-medium text-orange-300 hover:bg-orange-500/10">Estimate payment</Link>
          </div>
        </div>
      </section>

      {/* Sources */}
      <section id="sources" className="border-t border-zinc-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <h2 className="text-2xl font-semibold">Sources and further reading</h2>
          <ul className="mt-6 space-y-3 text-orange-300">
            <li><a className="hover:underline" href="https://olympics.com/ioc/news/salt-lake-city-utah-elected-to-host-2034-olympic-winter-games" target="_blank" rel="noreferrer">IOC/Olympics: Salt Lake City–Utah elected to host the 2034 Winter Games</a></li>
            <li><a className="hover:underline" href="https://gardner.utah.edu/news/utahs-tech-industry-employment-increases-at-more-than-twice-the-national-rate/" target="_blank" rel="noreferrer">Kem C. Gardner Institute: Utah tech employment growth</a></li>
            <li><a className="hover:underline" href="https://business.utah.gov/why-utah/" target="_blank" rel="noreferrer">Utah Governor’s Office of Economic Opportunity: Why Utah</a></li>
            <li><a className="hover:underline" href="https://www.utahrising.com/opportunities-challenges/" target="_blank" rel="noreferrer">Utah Rising: Major projects and 2034 Olympics outlook</a></li>
            <li><a className="hover:underline" href="https://www.axios.com/local/salt-lake-city" target="_blank" rel="noreferrer">Axios Salt Lake City: economic and housing trend coverage</a></li>
          </ul>
          <p className="mt-6 text-xs text-zinc-500">External links are provided for convenience; figures and projections are subject to revision by their respective sources.</p>
        </div>
      </section>
    </div>
  );
}

