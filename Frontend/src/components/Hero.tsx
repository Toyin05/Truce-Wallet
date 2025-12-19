import { Button } from "@/components/ui/button";
import { Github, ArrowRight, Wallet, Repeat, CheckCircle } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative overflow-hidden bg-gradient-hero py-20 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-primary/20 via-transparent to-transparent"></div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-card/50 backdrop-blur-sm border border-border/40 text-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Now live on BlockDAG Testnet
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight font-['Space_Grotesk'] leading-tight">
            Truce Wallet — a smarter{" "}
            <span className="bg-gradient-accent bg-clip-text text-transparent">
              multi-chain wallet
            </span>{" "}
            and DEX built on BlockDAG
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Store, swap, stake, and get AI-driven trading insights — all in one secure, 
            non-custodial app. Demo-ready for BlockDAG testnet.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              className="w-full sm:w-auto text-base px-8 bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl"
              onClick={() => window.location.href = '/register'}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="outline" 
              size="lg" 
              className="w-full sm:w-auto text-base px-8 border-border/40 hover:bg-white/10 backdrop-blur"
              asChild
            >
              <a href="https://github.com/Toyin05/Truce-Wallet" target="_blank" rel="noopener noreferrer">
                <Github className="mr-2 h-5 w-5" />
                View on GitHub
              </a>
            </Button>
          </div>

          <div className="pt-12">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="group relative bg-gradient-to-br from-card via-card/80 to-card/50 p-6 rounded-xl border border-border/40 hover:border-primary/40 transition-all shadow-card hover:shadow-glow/30">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                  <span className="text-primary-foreground font-bold">1</span>
                </div>
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <Wallet className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-['Space_Grotesk'] mb-2">Connect</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Link your wallet securely with one click. Multi-chain support for seamless access.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-card via-card/80 to-card/50 p-6 rounded-xl border border-border/40 hover:border-secondary/40 transition-all shadow-card hover:shadow-glow/30">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-accent flex items-center justify-center shadow-glow">
                  <span className="text-primary-foreground font-bold">2</span>
                </div>
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-secondary/10 flex items-center justify-center">
                    <Repeat className="h-7 w-7 text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-['Space_Grotesk'] mb-2">Swap</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Trade tokens instantly with optimal rates. AI-powered insights guide your trades.
                    </p>
                  </div>
                </div>
              </div>

              <div className="group relative bg-gradient-to-br from-card via-card/80 to-card/50 p-6 rounded-xl border border-border/40 hover:border-primary/40 transition-all shadow-card hover:shadow-glow/30">
                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-gradient-primary flex items-center justify-center shadow-glow">
                  <span className="text-primary-foreground font-bold">3</span>
                </div>
                <div className="space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="h-7 w-7 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold font-['Space_Grotesk'] mb-2">Confirm</h3>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      Fast BlockDAG execution with real-time confirmation. Your trade completes in seconds.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
