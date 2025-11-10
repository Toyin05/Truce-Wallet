import { Shield, Zap, Code } from "lucide-react";

const WhyBlockDAG = () => {
  return (
    <section className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-12">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              Why BlockDAG
            </div>
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk']">
              Built for speed, security, and scale
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Truce Wallet targets BlockDAG because of its high throughput and PoW security. 
              Building on BlockDAG lets us demo real testnet flows, fast swaps, and reliable contract testing.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 pt-8">
            <div className="space-y-4 p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Zap className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-['Space_Grotesk']">Fast finality</h3>
              <p className="text-muted-foreground">
                Near-instant transaction confirmation for seamless trading
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Shield className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-['Space_Grotesk']">PoW security</h3>
              <p className="text-muted-foreground">
                Battle-tested Proof of Work consensus for maximum security
              </p>
            </div>

            <div className="space-y-4 p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all">
              <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                <Code className="h-6 w-6 text-primary" />
              </div>
              <h3 className="text-xl font-semibold font-['Space_Grotesk']">Developer-friendly</h3>
              <p className="text-muted-foreground">
                Comprehensive testnet tools and documentation
              </p>
            </div>
          </div>

          <div className="flex flex-wrap justify-center gap-4 pt-8">
            <a 
              href="https://docs.blockdagnetwork.io/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline text-sm"
            >
              BlockDAG Docs
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="https://ide.awakening.bdagscan.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline text-sm"
            >
              Testnet IDE
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="https://awakening.bdagscan.com/" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline text-sm"
            >
              Explorer
            </a>
            <span className="text-muted-foreground">•</span>
            <a 
              href="https://awakening.bdagscan.com/faucet" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-primary hover:text-primary/80 underline text-sm"
            >
              Faucet
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyBlockDAG;
