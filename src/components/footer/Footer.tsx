import { Discord, Github, Twitter } from '@/components/icons'

export default function Footer() {
  const year = new Date().getFullYear();
  
  return (
    <footer className="relative bg-black border-t border-zinc-800">
      {/* Subtle professional background */}
      <div className="absolute inset-0 bg-gradient-to-b from-zinc-900/20 to-transparent"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row flex-wrap items-start lg:items-center justify-between gap-8 py-8 lg:py-10">
          
          {/* Company Info */}
          <div className="space-y-2">
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
              <span className="text-sm text-zinc-400">Built by</span>
              <span className="text-xl font-bold text-white">RootstockLabs</span>
            </div>
            <p className="text-xs text-zinc-500">
              Copyright © {year} Rootstock Labs. All rights reserved.
            </p>
          </div>

          {/* Navigation Links */}
          <nav className="flex flex-col sm:flex-row gap-4 sm:gap-8">
            <a
              href="https://rootstock.io/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              About RootstockLabs
            </a>
            <a
              href="https://rootstock.io/contact/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Help & Support
            </a>
            <a
              href="https://dev.rootstock.io/"
              target="_blank"
              rel="noreferrer noopener"
              className="text-sm text-zinc-400 hover:text-white transition-colors duration-200"
            >
              Documentation
            </a>
          </nav>

          {/* Social Links */}
          <div className="flex items-center gap-4">
            <a
              href="https://twitter.com/rootstock_io"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200"
              aria-label="Follow us on Twitter"
            >
              <Twitter className="w-5 h-5" />
            </a>
            <a
              href="https://github.com/rsksmart"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200"
              aria-label="View our GitHub"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://discord.com/invite/rootstock"
              target="_blank"
              rel="noreferrer noopener"
              className="p-2 text-zinc-400 hover:text-white hover:bg-zinc-800 rounded-lg transition-all duration-200"
              aria-label="Join our Discord"
            >
              <Discord className="w-5 h-5" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-zinc-800 py-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-xs text-zinc-500">
            <div className="flex items-center gap-4">
              <a href="#" className="hover:text-zinc-400 transition-colors duration-200">Privacy Policy</a>
              <span>•</span>
              <a href="#" className="hover:text-zinc-400 transition-colors duration-200">Terms of Service</a>
              <span>•</span>
              <a href="#" className="hover:text-zinc-400 transition-colors duration-200">Cookie Policy</a>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span>All systems operational</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}