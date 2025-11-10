const ProblemSolution = () => {
  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Problem */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-destructive/10 text-destructive text-sm font-medium">
              The problem
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk']">
              Crypto complexity holding users back
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Crypto is powerful but confusing. Users juggle wallets, exchanges, and scattered data. 
              New token projects need tools to launch fair tokenomics and preserve trust. 
              The barrier to entry remains too high.
            </p>
          </div>

          {/* Solution */}
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              The solution
            </div>
            <h2 className="text-3xl md:text-4xl font-bold font-['Space_Grotesk']">
              All-in-one wallet with AI insights
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Truce Wallet combines a multi-chain non-custodial wallet, an in-app DEX, staking, 
              presale support, and AI insights. It's built on BlockDAG for speed and reliability, 
              giving users one simple interface for everything crypto.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
