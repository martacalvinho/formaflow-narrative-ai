
import React from 'react';
import { ArrowRight } from 'lucide-react';

interface StepProps {
  number: number;
  title: string;
  description: string;
  delay: number;
}

const Step: React.FC<StepProps> = ({ number, title, description, delay }) => {
  return (
    <div 
      className="relative flex items-start gap-5 animate-fade-in" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="flex-shrink-0 w-10 h-10 rounded-full bg-formaflow-purple flex items-center justify-center text-white font-semibold">
        {number}
      </div>
      
      <div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="text-formaflow-muted-text">{description}</p>
      </div>
      
      {number < 5 && (
        <div className="absolute left-5 top-14 h-10 w-px bg-gray-200 hidden md:block"></div>
      )}
    </div>
  );
};

const HowItWorks = () => {
  const steps = [
    {
      title: "Upload your project files by phase",
      description: "Sort your project files into our phase-based system: Concept, Inspiration, Sketches, Design Drawings, Technical Drawings, Construction Photos, and Final Photography."
    },
    {
      title: "Link your Instagram (and add 1–2 competitors)",
      description: "Connect your Instagram account so our AI can analyze your current style and content. Add competitors for benchmarking and trend analysis."
    },
    {
      title: "AI builds your content timeline",
      description: "Our AI processes your files and analyzes them in context, creating a cohesive narrative that spans your entire project process."
    },
    {
      title: "Review, approve, or auto-post content",
      description: "Preview AI-generated content plans, make adjustments if needed, and schedule posts or enable auto-posting for hands-off content management."
    },
    {
      title: "Watch your feed stay consistent — even mid-project",
      description: "Enjoy a consistently updated, professionally curated online presence that showcases your work's journey and maintains audience engagement throughout projects."
    }
  ];
  
  return (
    <section id="how-it-works" className="section-container bg-gray-50 rounded-3xl mx-4 sm:mx-8">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          How It Works
        </h2>
        <p className="text-formaflow-muted-text max-w-3xl mx-auto">
          Turn your design process into marketing content in five simple steps.
        </p>
      </div>
      
      <div className="max-w-3xl mx-auto space-y-10">
        {steps.map((step, index) => (
          <Step
            key={index}
            number={index + 1}
            title={step.title}
            description={step.description}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default HowItWorks;
