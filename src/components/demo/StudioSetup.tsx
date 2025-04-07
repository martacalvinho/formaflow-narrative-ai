
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Building2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface StudioSetupProps {
  onComplete: (data: {
    name: string;
    website: string;
    style: string;
    logo: File | null;
  }) => void;
}

const StudioSetup: React.FC<StudioSetupProps> = ({ onComplete }) => {
  const [studioName, setStudioName] = useState('');
  const [website, setWebsite] = useState('');
  const [style, setStyle] = useState('minimalist');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studioName) {
      toast({
        title: "Studio name required",
        description: "Please enter your studio name to continue",
        variant: "destructive"
      });
      return;
    }

    onComplete({
      name: studioName,
      website,
      style,
      logo
    });
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-8 h-8 text-formaflow-purple" />
          <h2 className="text-2xl font-bold">Set Up Your Studio</h2>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="studioName">Studio Name</Label>
            <Input 
              id="studioName" 
              value={studioName}
              onChange={(e) => setStudioName(e.target.value)}
              placeholder="e.g., Studio Noa Architects" 
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="website">Website (optional)</Label>
            <Input 
              id="website" 
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              placeholder="e.g., www.studionoaarch.com" 
            />
          </div>
          
          <div className="space-y-2">
            <Label>Studio Style</Label>
            <RadioGroup value={style} onValueChange={setStyle} className="grid grid-cols-3 gap-4 pt-2">
              <div className="flex flex-col items-center space-y-2">
                <div className={`border-2 p-4 rounded-lg cursor-pointer transition ${style === 'minimalist' ? 'border-formaflow-purple bg-formaflow-purple/10' : 'border-gray-200'}`}>
                  <Label htmlFor="minimalist" className="cursor-pointer flex flex-col items-center">
                    <RadioGroupItem id="minimalist" value="minimalist" className="sr-only" />
                    <span className="text-sm font-medium">Minimalist</span>
                  </Label>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className={`border-2 p-4 rounded-lg cursor-pointer transition ${style === 'technical' ? 'border-formaflow-purple bg-formaflow-purple/10' : 'border-gray-200'}`}>
                  <Label htmlFor="technical" className="cursor-pointer flex flex-col items-center">
                    <RadioGroupItem id="technical" value="technical" className="sr-only" />
                    <span className="text-sm font-medium">Technical</span>
                  </Label>
                </div>
              </div>
              
              <div className="flex flex-col items-center space-y-2">
                <div className={`border-2 p-4 rounded-lg cursor-pointer transition ${style === 'warm' ? 'border-formaflow-purple bg-formaflow-purple/10' : 'border-gray-200'}`}>
                  <Label htmlFor="warm" className="cursor-pointer flex flex-col items-center">
                    <RadioGroupItem id="warm" value="warm" className="sr-only" />
                    <span className="text-sm font-medium">Warm</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="logo">Studio Logo (optional)</Label>
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                {logoPreview ? (
                  <img src={logoPreview} alt="Logo preview" className="object-contain w-full h-full" />
                ) : (
                  <Building2 className="w-8 h-8 text-gray-400" />
                )}
              </div>
              
              <div className="flex-1">
                <Label 
                  htmlFor="logo-upload" 
                  className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50 transition"
                >
                  <Upload className="w-4 h-4" />
                  <span>Upload Logo</span>
                  <input 
                    type="file" 
                    id="logo-upload" 
                    accept="image/*" 
                    className="hidden" 
                    onChange={handleFileChange}
                  />
                </Label>
              </div>
            </div>
          </div>
          
          <Button type="submit" className="btn-primary w-full mt-8">
            Continue to Project Upload
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StudioSetup;
