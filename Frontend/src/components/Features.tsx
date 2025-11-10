import { Wallet, Repeat, Brain, Lock, Coins, Rocket } from "lucide-react";

const Features = () => {
  const features = [
    {
      icon: Wallet,
      title: "Multi-chain wallet",
      description: "Ethereum, Polygon, Arbitrum, BlockDAG support in one interface"
    },
    {
      icon: Repeat,
      title: "Built-in DEX",
      description: "Token swaps in one click with PancakeSwap-like UI"
    },
    {
      icon: Brain,
      title: "AI Insights",
      description: "Price prediction & trade suggestions powered by ML models"
    },
    {
      icon: Coins,
      title: "Staking & rewards",
      description: "Flexible and fixed staking options with competitive APYs"
    },
    {
      icon: Rocket,
      title: "Presale portal",
      description: "Fan/club token presales with simple ERC20 contracts"
    },
    {
      icon: Lock,
      title: "Security first",
      description: "Non-custodial, biometric auth, hardware wallet support"
    }
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk']">
              Everything you need in one wallet
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Comprehensive features designed for both crypto newcomers and power users
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature, index) => (
              <div 
                key={index}
                className="group p-6 rounded-xl border border-border/40 bg-card/50 backdrop-blur-sm hover:shadow-card transition-all hover:border-primary/40"
              >
                <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center mb-4 group-hover:shadow-glow transition-all">
                  <feature.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold font-['Space_Grotesk'] mb-2">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
