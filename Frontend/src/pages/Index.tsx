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
import { ArrowRight } from "lucide-react";

const Index = () => {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <WhyBlockDAG />
        <Features />
        <HowItWorks />
        <Architecture />
        <MassAdoption />
      </main>
      
      {/* Bottom CTA */}
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
