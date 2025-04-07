
import React from 'react';
import { X, Check } from 'lucide-react';

interface ComparisonItemProps {
  text: string;
  positive?: boolean;
  delay: number;
}

const ComparisonItem: React.FC<ComparisonItemProps> = ({ text, positive = false, delay }) => {
  return (
    <div 
      className="flex items-center gap-3 animate-fade-in"
      style={{ animationDelay: `${delay}s` }}
    >
      <div className={`flex-shrink-0 w-6 h-6 rounded-full flex items-center justify-center
        ${positive ? "bg-green-100 text-green-600" : "bg-red-100 text-red-500"}`}
      >
        {positive ? <Check size={14} /> : <X size={14} />}
      </div>
      <p className="text-lg">{text}</p>
    </div>
  );
};

const ProblemSolution = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-gray-50">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-12 md:gap-24 items-center">
          {/* Before FormaFlow */}
          <div className="bg-white p-8 rounded-2xl shadow-sm border border-gray-100">
            <h3 className="text-2xl font-semibold mb-6 text-formaflow-graphite">
              Before FormaFlow
            </h3>
            
            <div className="space-y-5">
              <ComparisonItem
                text="Marketing firm doesn't understand your drawings"
                delay={0.1}
              />
              <ComparisonItem
                text="You waste time writing captions"
                delay={0.2}
              />
              <ComparisonItem
                text="Feed feels inconsistent"
                delay={0.3}
              />
            </div>
          </div>

          {/* With FormaFlow */}
          <div className="bg-gradient-to-br from-formaflow-purple/10 to-formaflow-purple-light/5 p-8 rounded-2xl shadow-sm border border-formaflow-purple/10">
            <h3 className="text-2xl font-semibold mb-6 text-formaflow-purple">
              With FormaFlow
            </h3>
            
            <div className="space-y-5">
              <ComparisonItem
                text="AI trained on your work, voice & tools"
                positive
                delay={0.4}
              />
              <ComparisonItem
                text="Visual storytelling that makes sense"
                positive
                delay={0.5}
              />
              <ComparisonItem
                text="One upload = weeks of content"
                positive
                delay={0.6}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemSolution;
