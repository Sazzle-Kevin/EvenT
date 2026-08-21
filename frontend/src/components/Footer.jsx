import { Link } from "react-router";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-20">
      {/* SVG Filter für Liquid Glass Effekt */}
      <svg aria-hidden="true" className="absolute inset-0 h-0 w-0">
        <filter
          colorInterpolationFilters="sRGB"
          id="liquid-glass-filter-footer"
          x="-50%"
          y="-50%"
          width="200%"
          height="200%"
        >
          <feTurbulence
            baseFrequency="0.05 0.05"
            numOctaves="1"
            result="turbulence"
            seed="3"
            type="fractalNoise"
          />
          <feGaussianBlur
            in="turbulence"
            result="blurredNoise"
            stdDeviation="2"
          />
          <feDisplacementMap
            in="SourceGraphic"
            in2="blurredNoise"
            result="displaced"
            scale="30"
            xChannelSelector="R"
            yChannelSelector="B"
          />
          <feGaussianBlur in="displaced" result="finalBlur" stdDeviation="4" />
          <feComposite in="finalBlur" in2="finalBlur" operator="over" />
        </filter>
      </svg>

      {/* Semi-transparenter Container über Video */}
      <div
        className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 bg-white/5 dark:bg-black/20 backdrop-blur-md border-t border-[#636367]/10"
        style={{
          backdropFilter: "url(#liquid-glass-filter-footer)",
        }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center">
          <div className="text-sm text-[#636367]/70">
            © {currentYear} EvenTime. All rights reserved.
          </div>
          <div className="flex space-x-6 mt-4 sm:mt-0">
            <Link
              to="/"
              className="text-sm text-[#636367]/70 hover:text-[#8A9A76] transition-colors"
            >
              Home
            </Link>
            <Link
              to="/signin"
              className="text-sm text-[#636367]/70 hover:text-[#8A9A76] transition-colors"
            >
              Sign In
            </Link>
            <Link
              to="/signup"
              className="text-sm text-[#636367]/70 hover:text-[#8A9A76] transition-colors"
            >
              Sign Up
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
