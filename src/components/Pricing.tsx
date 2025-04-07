
import React from 'react';
import { Check } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface PricingTierProps {
  name: string;
  price: string;
  description: string;
  features: string[];
  recommended?: boolean;
  delay: number;
}

const PricingTier: React.FC<PricingTierProps> = ({ 
  name, 
  price, 
  description, 
  features, 
  recommended = false,
  delay 
}) => {
  return (
    <div 
      className={`rounded-2xl p-6 border animate-fade-in ${
        recommended 
          ? 'border-formaflow-purple bg-formaflow-purple/5 shadow-lg' 
          : 'border-gray-200 bg-white'
      }`}
      style={{ animationDelay: `${delay}s` }}
    >
      {recommended && (
        <div className="w-full text-center text-sm py-1 px-3 rounded-full bg-formaflow-purple text-white mb-4 font-medium">
          Most Popular
        </div>
      )}
      
      <h3 className="text-xl font-semibold">{name}</h3>
      <div className="mt-4 mb-2">
        <span className="text-3xl font-bold">{price}</span>
        {price !== 'Custom' && <span className="text-formaflow-muted-text">/month</span>}
      </div>
      <p className="text-formaflow-muted-text mb-6">{description}</p>
      
      <ul className="space-y-3 mb-8">
        {features.map((feature, index) => (
          <li key={index} className="flex items-start gap-2">
            <Check className="w-5 h-5 text-formaflow-purple mt-0.5 flex-shrink-0" />
            <span>{feature}</span>
          </li>
        ))}
      </ul>
      
      <Button className={recommended ? "btn-primary w-full" : "btn-secondary w-full"}>
        Join Waitlist
      </Button>
    </div>
  );
};

const Pricing = () => {
  const plans = [
    {
      name: "Starter",
      price: "€19",
      description: "Perfect for small studios and independents",
      features: [
        "Up to 3 projects",
        "Basic content planning",
        "Weekly post suggestions",
        "Manual publishing"
      ]
    },
    {
      name: "Pro",
      price: "€39",
      description: "Ideal for growing architecture studios",
      features: [
        "Unlimited projects",
        "Instagram & competitor analysis",
        "Auto-generated captions & hashtags",
        "Content calendar integration",
        "Priority support"
      ],
      recommended: true
    },
    {
      name: "Enterprise",
      price: "Custom",
      description: "For established firms managing multiple channels",
      features: [
        "All Pro features",
        "Multi-channel content strategy",
        "Brand voice customization",
        "Client presentation materials",
        "Dedicated account manager",
        "Custom integrations"
      ]
    }
  ];
  
  return (
    <section id="pricing" className="section-container">
      <div className="text-center mb-16">
        <p className="text-formaflow-purple font-medium mb-2">PRICING</p>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-formaflow-muted-text max-w-2xl mx-auto">
          Plans that scale with your studio's needs, with no hidden fees.
        </p>
      </div>
      
      <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan, index) => (
          <PricingTier
            key={index}
            name={plan.name}
            price={plan.price}
            description={plan.description}
            features={plan.features}
            recommended={plan.recommended}
            delay={0.1 + index * 0.1}
          />
        ))}
      </div>
    </section>
  );
};

export default Pricing;
