import Header from "@/components/Header";
import Hero from "@/components/Hero";
import ProblemSolution from "@/components/ProblemSolution";
import WhyBlockDAG from "@/components/WhyBlockDAG";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import Architecture from "@/components/Architecture";
import MassAdoption from "@/components/MassAdoption";
import Footer from "@/components/Footer";

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
      <Footer />
    </div>
  );
};

export default Index;
