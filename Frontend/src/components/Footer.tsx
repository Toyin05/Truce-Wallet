import { Github, MessageCircle, Send } from "lucide-react";

const Footer = () => {
  return (
    <footer className="border-t border-border/40 bg-card/30 backdrop-blur-sm">
      <div className="container mx-auto px-4 py-12">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div className="space-y-4">
            <h3 className="text-xl font-bold font-['Space_Grotesk']">Truce Wallet</h3>
            <p className="text-sm text-muted-foreground">
              AI-powered multi-chain wallet and DEX built on BlockDAG
            </p>
            <div className="flex gap-3">
              <a 
                href="https://github.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="#" 
                className="w-10 h-10 rounded-lg bg-muted hover:bg-primary hover:text-primary-foreground transition-colors flex items-center justify-center"
              >
                <Send className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Product */}
          <div className="space-y-4">
            <h4 className="font-semibold font-['Space_Grotesk']">Product</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="#features" className="text-muted-foreground hover:text-primary transition-colors">
                  Features
                </a>
              </li>
              <li>
                <a href="#roadmap" className="text-muted-foreground hover:text-primary transition-colors">
                  Roadmap
                </a>
              </li>
              <li>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  GitHub Repository
                </a>
              </li>
            </ul>
          </div>

          {/* BlockDAG Ecosystem */}
          <div className="space-y-4">
            <h4 className="font-semibold font-['Space_Grotesk']">BlockDAG Ecosystem</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://docs.blockdagnetwork.io/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Documentation
                </a>
              </li>
              <li>
                <a href="https://ide.awakening.bdagscan.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Testnet IDE
                </a>
              </li>
              <li>
                <a href="https://awakening.bdagscan.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Block Explorer
                </a>
              </li>
              <li>
                <a href="https://awakening.bdagscan.com/faucet" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Testnet Faucet
                </a>
              </li>
              <li>
                <a href="https://wizard.awakening.bdagscan.com/" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  Contract Wizard
                </a>
              </li>
            </ul>
          </div>

          {/* Learn More */}
          <div className="space-y-4">
            <h4 className="font-semibold font-['Space_Grotesk']">Learn More</h4>
            <ul className="space-y-2 text-sm">
              <li>
                <a href="https://blockdag.network/blockdag-new-whitepaper-r1.pdf" target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-primary transition-colors">
                  BlockDAG Whitepaper
                </a>
              </li>
              <li>
                <a href="#why-blockdag" className="text-muted-foreground hover:text-primary transition-colors">
                  Why BlockDAG
                </a>
              </li>
              <li>
                <a href="#how-it-works" className="text-muted-foreground hover:text-primary transition-colors">
                  How It Works
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-border/40">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-muted-foreground text-center md:text-left">
              © 2025 Truce Wallet. MIT License. Crypto involves risk. This demo is for educational purposes. Always DYOR.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-xs text-muted-foreground">Built on</span>
              <span className="px-2 py-1 rounded bg-primary/10 text-primary text-xs font-medium">
                BlockDAG
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
