import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import WhyBlockDAG from "@/components/WhyBlockDAG";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Architecture from "@/components/Architecture";
import MassAdoption from "@/components/MassAdoption";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <WhyBlockDAG />
        <Features />
        
        {/* YouTube Video Demo Section */}
        <section className="py-16 sm:py-20 lg:py-24 bg-gradient-to-b from-background to-muted/20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6 mb-12">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight">
                See Truce Wallet in Action
              </h2>
              <p className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto">
                Watch how Truce Wallet revolutionizes crypto management with BlockDAG technology, 
                AI-powered insights, and seamless DeFi integration.
              </p>
            </div>
            
            {/* Responsive YouTube Video Container */}
            <div className="relative max-w-5xl mx-auto">
              <div className="relative w-full" style={{ paddingBottom: '56.25%' /* 16:9 aspect ratio */ }}>
                <div className="absolute inset-0 rounded-xl overflow-hidden shadow-2xl bg-muted/50">
                  <iframe
                    className="w-full h-full"
                    src="https://www.youtube.com/embed/CHU-4UAGeZo?si=P7nZmJHh1lLTs508&rel=0&modestbranding=1&showinfo=0"
                    title="Truce Wallet Demo - Revolutionizing Crypto Management"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  ></iframe>
                </div>
              </div>
              
              {/* Video Description */}
              <div className="mt-6 text-center">
                <p className="text-sm text-muted-foreground max-w-2xl mx-auto">
                  📹 <strong>Demo Duration:</strong> 3-4 minutes • Learn about features, security, and the future of crypto wallets
                </p>
              </div>
            </div>
            
            {/* Call to Action */}
            <div className="text-center mt-12">
              <Button 
                size="lg"
                className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl text-base px-8"
                onClick={() => window.location.href = '/register'}
              >
                Start Your Crypto Journey
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </div>
          </div>
        </section>
        
        <HowItWorks />
        <Architecture />
        <MassAdoption />
      </main>
      
      {/* Persistent Bottom CTA */}
      <section className="py-16 bg-gradient-to-r from-blue-500/10 via-purple-600/10 to-blue-500/10 border-y border-white/10">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-3xl mx-auto space-y-6">
            <h2 className="text-3xl md:text-4xl font-bold">
              Ready to transform your crypto experience?
            </h2>
            <p className="text-lg text-muted-foreground">
              Join thousands of users already managing their crypto smarter with Truce Wallet. 
              Experience the power of BlockDAG technology today.
            </p>
            <Button 
              size="lg"
              className="bg-gradient-to-r from-blue-500 to-purple-600 hover:opacity-90 transition-all duration-200 shadow-lg hover:shadow-xl text-base px-8"
              onClick={() => window.location.href = '/register'}
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Index;
