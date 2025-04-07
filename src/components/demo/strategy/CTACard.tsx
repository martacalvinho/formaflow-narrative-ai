
import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';

interface CTACardProps {
  onJoinWaitlist: () => void;
}

const CTACard: React.FC<CTACardProps> = ({ onJoinWaitlist }) => {
  return (
    <Card className="bg-gradient-to-br from-formaflow-purple to-formaflow-purple-light text-white">
      <CardContent className="p-8">
        <div className="text-center max-w-2xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Ready to Transform Your Studio's Content Strategy?
          </h2>
          <p className="mb-8 text-white/90">
            FormaFlow helps architecture studios create consistent, compelling content from their existing workflow. Join our waitlist for early access.
          </p>
          <Button 
            onClick={onJoinWaitlist}
            className="bg-white text-formaflow-purple hover:bg-white/90 transition-colors text-lg px-8 py-6"
          >
            Join the Waitlist
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CTACard;
