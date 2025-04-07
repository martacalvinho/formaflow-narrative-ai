
import React, { useState } from 'react';
import { ArrowRight, ExternalLink } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface TimelineItem {
  phase: string;
  description: string;
  active: boolean;
}

const HeroSection = () => {
  const [timelineItems, setTimelineItems] = useState<TimelineItem[]>([
    { phase: 'Concept', description: 'Initial sketches & vision', active: true },
    { phase: 'Sketch', description: 'Design development', active: false },
    { phase: 'Drawing', description: 'Technical documentation', active: false },
    { phase: 'Build', description: 'Construction progress', active: false },
    { phase: 'Final Photo', description: 'Project completion', active: false }
  ]);

  // Animation effect for timeline
  React.useEffect(() => {
    const interval = setInterval(() => {
      setTimelineItems(items => {
        const activeIndex = items.findIndex(item => item.active);
        const nextIndex = (activeIndex + 1) % items.length;
        
        return items.map((item, i) => ({
          ...item,
          active: i === nextIndex
        }));
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <section className="pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-8 items-center">
          <div className="space-y-8 animate-fade-in" style={{ animationDelay: '0.1s' }}>
            <div>
              <h1 className="mb-6 text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-formaflow-graphite leading-tight">
                Marketing That Understands <span className="text-formaflow-purple">Architecture.</span>
              </h1>
              <p className="text-lg md:text-xl text-formaflow-graphite-light leading-relaxed">
                Upload your work by project and phase. Let AI turn your design journey into a compelling narrative.
              </p>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="btn-primary group">
                Join the Waitlist
                <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
              </Button>
              <Button className="btn-secondary group">
                See Demo
                <ExternalLink className="ml-2 w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="relative animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <div className="glass-purple p-6 rounded-2xl">
              <div className="bg-white/80 backdrop-blur-lg rounded-xl p-6 shadow-sm">
                <h3 className="text-formaflow-graphite font-medium mb-4">Project Timeline</h3>
                
                <div className="space-y-6">
                  {timelineItems.map((item, index) => (
                    <div key={item.phase} className="relative">
                      <div className="flex items-center space-x-2">
                        {/* Timeline connector */}
                        {index < timelineItems.length - 1 && (
                          <div className="absolute top-5 left-3.5 h-full w-0.5 bg-gray-200" />
                        )}
                        
                        {/* Timeline node */}
                        <div 
                          className={`w-7 h-7 rounded-full z-10 flex items-center justify-center border-2 ${
                            item.active 
                              ? "border-formaflow-purple bg-formaflow-purple-light/30" 
                              : "border-gray-300 bg-white"
                          }`}
                        >
                          {item.active && (
                            <div className="w-2 h-2 rounded-full bg-formaflow-purple animate-pulse-light" />
                          )}
                        </div>
                        
                        {/* Content */}
                        <div className={`transition-opacity duration-300 ${item.active ? "opacity-100" : "opacity-60"}`}>
                          <h4 className="font-medium text-formaflow-graphite">{item.phase}</h4>
                          <p className="text-sm text-formaflow-muted-text">{item.description}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Background decoration */}
            <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] bg-gradient-to-br from-formaflow-purple-light/10 to-formaflow-purple/5 rounded-full blur-3xl" />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
