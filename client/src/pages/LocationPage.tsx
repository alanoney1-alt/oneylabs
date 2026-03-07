import { useParams } from "wouter";
import { Link } from "wouter";
import { ArrowRight, CheckCircle2, MapPin } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const LOCATIONS: Record<string, { name: string; description: string; zip: string; nearby: string[] }> = {
  "lake-nona": {
    name: "Lake Nona",
    description: "Lake Nona is a master-planned community in Southeast Orlando known for its Medical City, innovation hub, and rapidly growing business ecosystem. As the home base of Oney Labs, we have deep roots in this community and understand the unique needs of Lake Nona businesses.",
    zip: "32827",
    nearby: ["Narcoossee", "Boggy Creek", "Moss Park"],
  },
  "kissimmee": {
    name: "Kissimmee",
    description: "Kissimmee is a vibrant city in Osceola County with a thriving tourism and hospitality industry. Local businesses here compete fiercely for visibility, making AI search optimization essential for standing out in this competitive market.",
    zip: "34741",
    nearby: ["St. Cloud", "Poinciana", "Celebration"],
  },
  "dr-phillips": {
    name: "Dr. Phillips",
    description: "Dr. Phillips is an upscale community in Southwest Orlando known for Restaurant Row and a high concentration of professional services. Businesses here serve affluent clientele who increasingly use AI assistants to find local services.",
    zip: "32819",
    nearby: ["Sand Lake", "Bay Hill", "Windermere"],
  },
  "winter-park": {
    name: "Winter Park",
    description: "Winter Park is one of Central Florida's most prestigious communities, known for Park Avenue shopping, Rollins College, and a strong local business scene. AI search visibility is critical for businesses competing in this high-value market.",
    zip: "32789",
    nearby: ["Maitland", "Eatonville", "Casselberry"],
  },
  "celebration": {
    name: "Celebration",
    description: "Celebration is a master-planned community near Walt Disney World with a charming downtown area and growing business district. Local service providers here benefit enormously from AI search visibility given the area's tech-savvy residents.",
    zip: "34747",
    nearby: ["Kissimmee", "Champions Gate", "Davenport"],
  },
  "hunters-creek": {
    name: "Hunters Creek",
    description: "Hunters Creek is a large residential community in South Orlando with a strong demand for home services, healthcare, and professional services. Businesses serving this area need AI visibility to capture the growing number of residents using ChatGPT for local recommendations.",
    zip: "32837",
    nearby: ["Meadow Woods", "Southchase", "Buena Ventura Lakes"],
  },
  "windermere": {
    name: "Windermere",
    description: "Windermere is an affluent lakeside community in West Orange County, home to luxury estates and high-net-worth residents. Service providers targeting Windermere clients need premium AI search visibility to reach this discerning market.",
    zip: "34786",
    nearby: ["Gotha", "Ocoee", "Winter Garden"],
  },
  "st-cloud": {
    name: "St. Cloud",
    description: "St. Cloud is a rapidly growing city in Osceola County with a mix of established businesses and new developments. As the population booms, AI search visibility becomes essential for local businesses to capture new residents searching for services.",
    zip: "34769",
    nearby: ["Kissimmee", "Narcoossee", "Harmony"],
  },
  "winter-garden": {
    name: "Winter Garden",
    description: "Winter Garden is one of the fastest-growing communities in West Orange County, centered around its charming downtown and the West Orange Trail. Local businesses here are competing for visibility among a rapidly expanding, tech-savvy population.",
    zip: "34787",
    nearby: ["Windermere", "Oakland", "Clermont"],
  },
  "altamonte-springs": {
    name: "Altamonte Springs",
    description: "Altamonte Springs is a dynamic city in Seminole County with a strong commercial corridor along SR 436. Businesses here serve a diverse population and benefit from AI search optimization to stand out in this competitive suburban market.",
    zip: "32701",
    nearby: ["Longwood", "Casselberry", "Maitland"],
  },
};

const SERVICES = [
  "AI Search Visibility",
  "AI Business Consulting",
  "Custom AI Tool Development",
  "AI Automation",
  "AI Workshops & Training",
  "Google Business Profile Optimization",
  "Directory Listing Management",
  "Schema Markup Implementation",
  "Answer-Engine Content Creation",
  "AI Search Audit",
];

export default function LocationPage() {
  const params = useParams<{ slug: string }>();
  const location = LOCATIONS[params.slug || ""];

  if (!location) {
    return (
      <div className="min-h-screen bg-[#111111]">
        <Navbar />
        <div className="container py-32 text-center">
          <h1 className="font-display text-4xl text-white mb-4">Location Not Found</h1>
          <Link href="/"><button className="btn-lime">Back to Home</button></Link>
        </div>
        <Footer />
      </div>
    );
  }

  const otherLocations = Object.entries(LOCATIONS).filter(([slug]) => slug !== params.slug).slice(0, 6);

  return (
    <div className="min-h-screen bg-[#111111]">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-20 bg-gradient-to-b from-[#0D0D0D] to-[#111111]">
        <div className="container">
          <div className="max-w-3xl">
            <div className="flex items-center gap-2 mb-4">
              <MapPin size={14} className="text-lime" />
              <span className="font-mono-data text-lime text-xs tracking-widest uppercase">{location.name}, FL {location.zip}</span>
            </div>
            <h1 className="font-display text-[clamp(2.5rem,6vw,5rem)] text-white leading-none mb-6">
              AI CONSULTING IN<br />
              <span className="text-lime">{location.name.toUpperCase()}</span>
            </h1>
            <p className="font-body text-white/60 text-lg leading-relaxed mb-8">
              {location.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/book">
                <button className="btn-lime text-base px-8 py-4">
                  Book Free AI Audit <ArrowRight size={18} />
                </button>
              </Link>
              <Link href="/visibility-checker">
                <button className="btn-outline-lime text-base px-8 py-4">
                  Check Your AI Visibility
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Services for this location */}
      <section className="py-20 bg-[#0D0D0D]">
        <div className="container">
          <h2 className="font-display text-[clamp(2rem,4vw,3rem)] text-white leading-none mb-10">
            AI SERVICES FOR <span className="text-lime">{location.name.toUpperCase()}</span> BUSINESSES
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {SERVICES.map((svc) => (
              <div key={svc} className="flex items-start gap-3 p-4 bg-[#1A1A1A] border border-white/10 rounded-lg">
                <CheckCircle2 size={16} className="text-lime mt-0.5 shrink-0" />
                <div>
                  <p className="font-heading font-700 text-white text-sm">{svc}</p>
                  <p className="text-white/40 text-xs">Available for {location.name} businesses</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Nearby areas */}
      <section className="py-20 bg-[#111111]">
        <div className="container">
          <h2 className="font-display text-[clamp(1.5rem,3vw,2.5rem)] text-white leading-none mb-6">
            ALSO SERVING <span className="text-lime">NEARBY AREAS</span>
          </h2>
          <div className="flex flex-wrap gap-3 mb-10">
            {location.nearby.map((area) => (
              <span key={area} className="font-heading text-sm font-500 text-white/50 border border-white/10 rounded-full px-4 py-2">
                {area}, FL
              </span>
            ))}
          </div>

          <h3 className="font-heading font-700 text-white text-lg mb-4">Other Locations We Serve</h3>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {otherLocations.map(([slug, loc]) => (
              <Link key={slug} href={`/ai-consulting/${slug}`}>
                <div className="p-3 bg-[#1A1A1A] border border-white/10 rounded-lg hover:border-lime/30 transition-all cursor-pointer">
                  <p className="font-heading font-600 text-white text-sm">{loc.name}</p>
                  <p className="text-white/40 text-xs">AI Consulting · {loc.zip}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-lime py-16">
        <div className="container text-center">
          <h2 className="font-display text-[clamp(2rem,5vw,4rem)] text-black leading-none mb-4">
            READY TO DOMINATE AI SEARCH<br />IN {location.name.toUpperCase()}?
          </h2>
          <p className="font-body text-black/70 text-lg max-w-xl mx-auto mb-8">
            Book a free 30-minute AI audit. I'll show you exactly where your {location.name} business stands in ChatGPT, Perplexity, and Claude.
          </p>
          <Link href="/book">
            <button className="bg-black text-lime font-heading font-700 text-base uppercase tracking-wide px-10 py-4 rounded hover:bg-black/80 transition-all flex items-center gap-2 mx-auto">
              Book Free AI Audit <ArrowRight size={18} />
            </button>
          </Link>
        </div>
      </section>

      {/* Schema markup */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: "Oney Labs",
            description: `AI consulting services for businesses in ${location.name}, FL`,
            url: `https://www.oneylabs.ai/ai-consulting/${params.slug}`,
            telephone: "+18503199550",
            email: "alan@oneylabs.ai",
            areaServed: {
              "@type": "City",
              name: location.name,
              containedInPlace: { "@type": "State", name: "Florida" },
            },
            address: {
              "@type": "PostalAddress",
              addressLocality: location.name,
              addressRegion: "FL",
              postalCode: location.zip,
              addressCountry: "US",
            },
          }),
        }}
      />

      <Footer />
    </div>
  );
}
