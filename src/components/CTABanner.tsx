
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const CTABanner = () => {
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email) {
      toast({
        title: "Please enter your email",
        variant: "destructive"
      });
      return;
    }
    
    setIsSubmitting(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Thank you for joining the waitlist!",
        description: "We'll be in touch soon.",
      });
      setEmail('');
      setIsSubmitting(false);
    }, 1000);
  };

  return (
    <section className="py-20 bg-gradient-to-r from-formaflow-purple-dark to-formaflow-purple text-white">
      <div className="container max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Spend more time designing. Let AI handle the storytelling.
        </h2>
        <p className="text-white/80 max-w-2xl mx-auto mb-8">
          Be among the first to transform your architectural process into compelling content with FormaFlow.
        </p>
        
        <form 
          onSubmit={handleSubmit}
          className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
        >
          <Input
            type="email"
            placeholder="Enter your email"
            className="bg-white/10 border-white/20 text-white placeholder:text-white/50 focus-visible:ring-white"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Button 
            className="bg-white text-formaflow-purple hover:bg-white/90 transition-colors"
            disabled={isSubmitting}
          >
            Join the Waitlist
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>
      </div>
    </section>
  );
};

export default CTABanner;
