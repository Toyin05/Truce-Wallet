import { Button } from "@/components/ui/button";
import { Menu, Wallet } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navItems = [
    { name: 'Home', href: '#home' },
    { name: 'About', href: '#about' },
    { name: 'Features', href: '#features' },
    { name: 'Architecture', href: '#architecture' },
    { name: 'Why BlockDAG', href: '#why-blockdag' },
    { name: 'How It Works', href: '#how-it-works' },
    { name: 'Roadmap', href: '#roadmap' },
    { name: 'Docs', href: '#docs' },
    { name: 'Contact', href: '#contact' },
  ];

  const scrollToSection = (href: string) => {
    const section = document.querySelector(href);
    section?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setIsMenuOpen(false);
  };

  return (
    <header className="sticky top-0 z-50 w-full">
      <div className="absolute inset-0 bg-background/80 backdrop-blur-xl border-b border-white/10 shadow-lg"></div>
      <div className="relative container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg">
              <Wallet className="w-4 h-4 text-white" />
            </div>
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-['Space_Grotesk']">
                Truce-Wallet
              </span>
              <span className="text-xs text-muted-foreground">Built on BlockDAG</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center gap-1">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-all duration-200 cursor-pointer hover:underline hover:underline-offset-4"
              >
                {item.name}
              </button>
            ))}
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Button 
              size="default" 
              className="font-medium bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => window.location.href = '/register'}
            >
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 hover:bg-white/10 rounded-lg transition-colors cursor-pointer"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="lg:hidden py-4 space-y-2 border-t border-white/10">
            {navItems.map((item) => (
              <button
                key={item.name}
                onClick={() => scrollToSection(item.href)}
                className="block w-full text-left px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-white/5 rounded-lg transition-colors cursor-pointer"
              >
                {item.name}
              </button>
            ))}
            <div className="pt-2">
              <Button 
                size="default" 
                className="w-full font-medium bg-gradient-to-r from-blue-500 to-purple-600"
                onClick={() => {
                  window.location.href = '/register';
                  setIsMenuOpen(false);
                }}
              >
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;

