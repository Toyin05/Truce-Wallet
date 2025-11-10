import { Users, Shield, BookOpen, Target, TrendingUp } from "lucide-react";

const MassAdoption = () => {
  const stats = [
    { 
      label: "Global Crypto Adoption", 
      value: "420M", 
      subtext: "users worldwide",
      context: "Just 6% of the global population—huge growth potential ahead"
    },
    { 
      label: "Education Investment", 
      value: "$3.2B", 
      subtext: "spent annually",
      context: "Massive resources dedicated to making crypto accessible"
    },
    { 
      label: "Onboarding Timeline", 
      value: "47 days", 
      subtext: "average wait",
      context: "From signup to first DeFi transaction—far too long for mass adoption"
    },
    { 
      label: "User Retention Challenge", 
      value: "58%", 
      subtext: "drop within 90 days",
      context: "Complexity drives away more than half of new users"
    }
  ];

  const solutions = [
    {
      icon: Target,
      title: "Lightning-Fast Onboarding",
      description: "Skip the confusion. One unified app supports multiple chains with a guided 3-minute setup. No technical jargon, no scattered wallets—just seamless access to everything crypto.",
      highlight: "3-minute setup",
      color: "primary"
    },
    {
      icon: Shield,
      title: "Smart Risk Protection",
      description: "Trade with confidence using AI-powered alerts that flag suspicious transactions before you confirm. Your keys, your control—always non-custodial, always secure.",
      highlight: "AI-powered safety",
      color: "secondary"
    },
    {
      icon: BookOpen,
      title: "Learn While You Earn",
      description: "No need to pause for tutorials. Our built-in education hub delivers contextual lessons as you trade, stake, and swap—turning every action into a learning opportunity.",
      highlight: "Contextual education",
      color: "primary"
    },
    {
      icon: Users,
      title: "One App, Complete Experience",
      description: "Stop juggling five different apps. Truce Wallet unifies wallets, DEX, staking, and insights in one beautiful interface—keeping users engaged and coming back.",
      highlight: "Unified platform",
      color: "secondary"
    }
  ];

  return (
    <section className="py-20 md:py-32 bg-gradient-to-b from-background via-card/20 to-background">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="text-center space-y-4 mb-16">
            <h2 className="text-3xl md:text-5xl font-bold font-['Space_Grotesk']">
              Reaching The Next Billion
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              How Truce Wallet accelerates mass crypto adoption
            </p>
          </div>

          {/* Today's Reality */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold font-['Space_Grotesk'] mb-8 text-center">
              Today's Reality
            </h3>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-card via-card/90 to-card/70 p-6 rounded-xl border border-border/40 hover:border-primary/30 transition-all shadow-card hover:shadow-lg overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-primary opacity-5 rounded-full blur-2xl group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative space-y-3">
                    <div className="text-4xl font-bold bg-gradient-accent bg-clip-text text-transparent mb-2 font-['Space_Grotesk']">
                      {stat.value}
                    </div>
                    <div className="text-sm font-semibold text-foreground">{stat.label}</div>
                    <div className="text-xs text-primary font-medium">{stat.subtext}</div>
                    <div className="text-xs text-muted-foreground leading-relaxed pt-2 border-t border-border/30">
                      {stat.context}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* The Truce Wallet Effect */}
          <div className="mb-16">
            <h3 className="text-2xl font-semibold font-['Space_Grotesk'] mb-8 text-center">
              The Truce Wallet Effect
            </h3>
            <div className="grid md:grid-cols-2 gap-8">
              {solutions.map((solution, index) => (
                <div 
                  key={index}
                  className="group relative bg-gradient-to-br from-card via-card/90 to-card/70 p-8 rounded-2xl border border-border/40 hover:border-primary/50 transition-all shadow-card hover:shadow-glow/30 overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-primary opacity-0 group-hover:opacity-5 transition-opacity"></div>
                  <div className="relative space-y-4">
                    <div className="flex items-start justify-between gap-4">
                      <div className={`w-14 h-14 rounded-xl ${solution.color === 'primary' ? 'bg-gradient-primary' : 'bg-gradient-accent'} flex items-center justify-center shadow-glow/50 flex-shrink-0`}>
                        <solution.icon className="h-7 w-7 text-primary-foreground" />
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-semibold">
                        {solution.highlight}
                      </span>
                    </div>
                    <h4 className="text-2xl font-bold font-['Space_Grotesk']">
                      {solution.title}
                    </h4>
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {solution.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Market Projection */}
          <div className="relative group">
            <div className="absolute inset-0 bg-gradient-primary opacity-10 rounded-3xl blur-3xl group-hover:opacity-15 transition-opacity"></div>
            <div className="relative bg-gradient-to-br from-primary/15 via-card/80 to-secondary/15 p-10 md:p-14 rounded-3xl border-2 border-primary/30 shadow-glow/30 hover:shadow-glow/50 transition-all overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-accent opacity-5 rounded-full blur-3xl"></div>
              <div className="relative space-y-6">
                <div className="flex items-start gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-accent flex items-center justify-center flex-shrink-0 shadow-glow">
                    <TrendingUp className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-3xl font-bold font-['Space_Grotesk'] mb-2 bg-gradient-accent bg-clip-text text-transparent">
                      The Opportunity Ahead
                    </h3>
                    <p className="text-muted-foreground">
                      Positioning for exponential growth
                    </p>
                  </div>
                </div>
                <div className="space-y-4 text-lg leading-relaxed">
                  <p className="text-foreground/90">
                    The next wave of crypto adoption will bring{" "}
                    <span className="font-bold text-primary text-xl">100M+ new users</span>{" "}
                    into the ecosystem. If Truce Wallet captures just{" "}
                    <span className="font-bold text-secondary text-xl">1% of this growth</span>, 
                    we're looking at:
                  </p>
                  <div className="grid md:grid-cols-3 gap-4 py-4">
                    <div className="bg-card/50 backdrop-blur-sm p-5 rounded-xl border border-primary/20">
                      <div className="text-3xl font-bold text-primary font-['Space_Grotesk']">1M+</div>
                      <div className="text-sm text-muted-foreground mt-1">Active Wallets</div>
                    </div>
                    <div className="bg-card/50 backdrop-blur-sm p-5 rounded-xl border border-secondary/20">
                      <div className="text-3xl font-bold text-secondary font-['Space_Grotesk']">$B+</div>
                      <div className="text-sm text-muted-foreground mt-1">Assets Under Management</div>
                    </div>
                    <div className="bg-card/50 backdrop-blur-sm p-5 rounded-xl border border-primary/20">
                      <div className="text-3xl font-bold text-primary font-['Space_Grotesk']">BlockDAG</div>
                      <div className="text-sm text-muted-foreground mt-1">Powered Infrastructure</div>
                    </div>
                  </div>
                  <p className="text-foreground/80 text-base italic border-l-4 border-primary/40 pl-4">
                    Every simplified onboarding, every prevented mistake, every educational moment—
                    that's how we turn curious newcomers into confident crypto users.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MassAdoption;