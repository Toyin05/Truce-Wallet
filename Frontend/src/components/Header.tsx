import { Button } from "@/components/ui/button";
import { Menu, Github, Rocket } from "lucide-react";
import { useState } from "react";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-2">
            <div className="flex flex-col">
              <span className="text-xl font-bold tracking-tight font-['Space_Grotesk']">
                Truce Wallet
              </span>
              <span className="text-xs text-muted-foreground">Built on BlockDAG</span>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-3">
            <Button variant="default" size="default" asChild className="font-medium">
              <a href="https://github.com/Toyin05/Truce-Wallet" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub Repo
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="default" 
              className="font-medium"
              onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }}
            >
              <Rocket className="mr-2 h-4 w-4" />
              See Features
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 hover:bg-accent rounded-lg transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            <Menu className="h-6 w-6" />
          </button>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 space-y-2 border-t border-border/40">
            <Button variant="default" size="default" asChild className="w-full font-medium">
              <a href="https://github.com/Toyin05/Truce-Wallet" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-4 w-4" />
                GitHub Repo
              </a>
            </Button>
            <Button 
              variant="outline" 
              size="default" 
              className="w-full font-medium"
              onClick={() => {
                const featuresSection = document.getElementById('features');
                featuresSection?.scrollIntoView({ behavior: 'smooth', block: 'start' });
                setIsMenuOpen(false);
              }}
            >
              <Rocket className="mr-2 h-4 w-4" />
              See Features
            </Button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
