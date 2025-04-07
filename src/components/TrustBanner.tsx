
import React from 'react';
import { 
  ImageIcon, 
  Building2, 
  Instagram, 
  Layers, 
  Gitlab, 
  PencilRuler
} from 'lucide-react';

const TrustBanner = () => {
  const partners = [
    { name: 'ArchDaily', icon: <Building2 className="w-6 h-6" /> },
    { name: 'Dezeen', icon: <PencilRuler className="w-6 h-6" /> },
    { name: 'Instagram', icon: <Instagram className="w-6 h-6" /> },
    { name: 'Revit', icon: <Layers className="w-6 h-6" /> },
    { name: 'Rhino', icon: <Gitlab className="w-6 h-6" /> },
    { name: 'Photography', icon: <ImageIcon className="w-6 h-6" /> }
  ];
  
  return (
    <section className="py-12 md:py-16 border-y border-gray-200">
      <div className="container max-w-7xl mx-auto px-4">
        <p className="text-center text-formaflow-muted-text mb-8">
          Built for studios that build the future.
        </p>
        
        <div className="flex flex-wrap justify-center gap-x-12 gap-y-6">
          {partners.map((partner) => (
            <div 
              key={partner.name} 
              className="flex items-center gap-2 text-gray-400 hover:text-gray-600 transition-colors"
            >
              {partner.icon}
              <span className="font-medium">{partner.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TrustBanner;
