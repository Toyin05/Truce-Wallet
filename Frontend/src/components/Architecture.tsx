import architectureDiagram from "@/assets/architecture-diagram.jpg";

const Architecture = () => {
  return (
    <section className="py-20 md:py-32 bg-card/30">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk']">
              System Architecture
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Built on modern web3 infrastructure for scalability and security
            </p>
          </div>

          <div className="bg-gradient-to-br from-card via-card/80 to-card/50 p-4 md:p-8 rounded-2xl border border-border/40 shadow-card">
            <div className="relative overflow-hidden rounded-xl bg-background/50">
              <img 
                src={architectureDiagram} 
                alt="Truce Wallet System Architecture Diagram showing Frontend (React + Tailwind), Web3 Integration (Ethers.js), Smart Contracts (Solidity on BlockDAG), Backend (Node.js + APIs), AI Engine, and MongoDB database"
                className="w-full h-auto"
              />
            </div>
            
            <div className="mt-6 p-6 bg-muted/20 rounded-xl border border-border/40">
              <p className="text-sm text-muted-foreground leading-relaxed">
                <span className="font-semibold text-foreground">React frontend</span> → 
                <span className="font-semibold text-foreground"> Ethers.js</span> → 
                <span className="font-semibold text-foreground"> Smart Contracts (Solidity)</span> → 
                <span className="font-semibold text-foreground"> BlockDAG testnet</span> → 
                <span className="font-semibold text-foreground"> AI service</span> for predictive insights
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Architecture;