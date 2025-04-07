
import React from 'react';
import { 
  Brain, 
  FolderKanban, 
  Instagram, 
  Pencil, 
  Calendar, 
  GitBranchPlus 
} from 'lucide-react';

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  delay: number;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ icon, title, description, delay }) => {
  return (
    <div 
      className="feature-card animate-fade-in" 
      style={{ animationDelay: `${delay}s` }}
    >
      <div className="card-icon">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-formaflow-muted-text">{description}</p>
    </div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      icon: <Brain />,
      title: "AI That Gets Your Process",
      description: "Automatically understands where your content fits: design vs build, concept vs completion."
    },
    {
      icon: <FolderKanban />,
      title: "Smart Project Folders",
      description: "Upload assets to a timeline that mirrors your design phases."
    },
    {
      icon: <Instagram />,
      title: "Instagram & Competitor Analysis",
      description: "We study what works and align your content to industry trends."
    },
    {
      icon: <Pencil />,
      title: "Content Strategy, On Autopilot",
      description: "AI creates post flows: stories, captions, carousels, and image selections."
    },
    {
      icon: <Calendar />,
      title: "Built-in Editorial Rhythm",
      description: "Showcase concepts on Monday, final photos on Friday — all scheduled."
    },
    {
      icon: <GitBranchPlus />,
      title: "Threaded Narrative Builder",
      description: "Generate full posts, weekly themes, and construction walkthroughs."
    }
  ];
  
  return (
    <section id="features" className="section-container">
      <div className="text-center mb-16">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          From Files to Feeds — Without the Back-and-Forth
        </h2>
        <p className="text-formaflow-muted-text max-w-3xl mx-auto">
          FormaFlow transforms your architectural process into compelling content without disrupting your workflow.
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {features.map((feature, index) => (
          <FeatureCard
            key={index}
            icon={feature.icon}
            title={feature.title}
            description={feature.description}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
