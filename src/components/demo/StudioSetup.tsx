
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { ArrowRight, Building2, Upload } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { saveStudioData, getDemoPin } from '@/services/supabase-service';

interface StudioSetupProps {
  onComplete: (data: {
    name: string;
    website: string;
    style: string;
    logo: File | null;
  }) => void;
  demoPin?: string;
}

const StudioSetup: React.FC<StudioSetupProps> = ({ onComplete, demoPin }) => {
  const [studioName, setStudioName] = useState('');
  const [website, setWebsite] = useState('');
  const [style, setStyle] = useState('minimalist');
  const [customStyle, setCustomStyle] = useState('');
  const [logo, setLogo] = useState<File | null>(null);
  const [logoPreview, setLogoPreview] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [currentDemoPin, setCurrentDemoPin] = useState(demoPin || '');
  const { toast } = useToast();

  // Get or initialize demo PIN
  useEffect(() => {
    if (!currentDemoPin) {
      const pin = getDemoPin();
      setCurrentDemoPin(pin);
      console.log(`Studio setup using demo PIN: ${pin}`);
    }
  }, [currentDemoPin]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setLogo(file);
      setLogoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!studioName) {
      toast({
        title: "Studio name required",
        description: "Please enter your studio name to continue",
        variant: "destructive"
      });
      return;
    }

    // If "other" is selected, use the custom style value
    const finalStyle = style === 'other' ? customStyle : style;
    
    setIsSaving(true);
    
    try {
      // Save to Supabase
      await saveStudioData({
        name: studioName,
        website,
        style: finalStyle,
        logo
      });
      
      toast({
        title: "Studio saved",
        description: "Your studio information has been saved",
      });
      
      onComplete({
        name: studioName,
        website,
        style: finalStyle,
        logo
      });
    } catch (error: any) {
      console.error("Error saving studio:", error);
      toast({
        title: "Error",
        description: "Failed to save studio: " + error.message,
        variant: "destructive"
      });
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <div className="glass-card p-8 rounded-2xl">
        <div className="flex items-center gap-3 mb-6">
          <Building2 className="w-8 h-8 text-formaflow-purple" />
          <h2 className="text-2xl font-bold">Set Up Your Studio</h2>
        </div>
        
        {currentDemoPin && (
          <div className="mb-6 p-3 bg-formaflow-purple/10 rounded-lg">
            <p className="text-sm">
              Demo session PIN: <span className="font-bold">{currentDemoPin}</span>
            </p>
          </div>
        )}
        
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
            <RadioGroup value={style} onValueChange={setStyle} className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-2">
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

              <div className="flex flex-col items-center space-y-2">
                <div className={`border-2 p-4 rounded-lg cursor-pointer transition ${style === 'other' ? 'border-formaflow-purple bg-formaflow-purple/10' : 'border-gray-200'}`}>
                  <Label htmlFor="other" className="cursor-pointer flex flex-col items-center">
                    <RadioGroupItem id="other" value="other" className="sr-only" />
                    <span className="text-sm font-medium">Other</span>
                  </Label>
                </div>
              </div>
            </RadioGroup>

            {style === 'other' && (
              <div className="mt-4">
                <Label htmlFor="customStyle">Specify your style</Label>
                <Input 
                  id="customStyle" 
                  value={customStyle}
                  onChange={(e) => setCustomStyle(e.target.value)}
                  placeholder="e.g., Scandinavian Modern" 
                  className="mt-2"
                />
              </div>
            )}
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
          
          <Button 
            type="submit" 
            className="btn-primary w-full mt-8"
            disabled={isSaving}
          >
            {isSaving ? "Saving..." : "Continue to Project Upload"}
            {!isSaving && <ArrowRight className="ml-2 w-4 h-4" />}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default StudioSetup;
