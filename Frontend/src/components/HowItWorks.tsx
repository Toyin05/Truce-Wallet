import { Wallet, ArrowRight, Brain, CheckCircle } from "lucide-react";

const HowItWorks = () => {
  const steps = [
    {
      icon: Wallet,
      title: "Connect wallet",
      description: "Link your existing wallet or create a new one"
    },
    {
      icon: ArrowRight,
      title: "Select action",
      description: "Choose swap, staking, or presale participation"
    },
    {
      icon: Brain,
      title: "Get AI insight",
      description: "Review predictions and confirm your transaction"
    },
    {
      icon: CheckCircle,
      title: "Transaction on BlockDAG",
      description: "Fast, secure execution with testnet explorer tracking"
    }
  ];

  return (
    <section className="py-20 md:py-32">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk']">
              How it works
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Simple four-step process from connection to transaction
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="text-center space-y-4">
                  <div className="relative inline-flex">
                    <div className="absolute inset-0 bg-gradient-primary rounded-full blur-xl opacity-50"></div>
                    <div className="relative w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto shadow-glow">
                      <step.icon className="h-8 w-8 text-primary-foreground" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="text-sm font-medium text-primary">Step {index + 1}</div>
                    <h3 className="text-xl font-semibold font-['Space_Grotesk']">
                      {step.title}
                    </h3>
                    <p className="text-muted-foreground text-sm">
                      {step.description}
                    </p>
                  </div>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute top-8 left-[calc(50%+2rem)] w-[calc(100%-4rem)] h-0.5 bg-gradient-to-r from-primary/50 to-transparent"></div>
                )}
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
