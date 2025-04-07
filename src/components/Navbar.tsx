
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header 
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300", 
        isScrolled ? "py-3 bg-white/80 backdrop-blur-md shadow-sm" : "py-5"
      )}
    >
      <div className="container max-w-7xl mx-auto px-4 flex items-center justify-between">
        <a href="/" className="flex items-center">
          <span className="text-xl font-bold bg-gradient-to-r from-formaflow-purple to-formaflow-purple-light bg-clip-text text-transparent">
            FormaFlow
          </span>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          <a href="#features" className="text-formaflow-graphite hover:text-formaflow-purple transition-colors">
            Features
          </a>
          <a href="#how-it-works" className="text-formaflow-graphite hover:text-formaflow-purple transition-colors">
            How it Works
          </a>
          <a href="#pricing" className="text-formaflow-graphite hover:text-formaflow-purple transition-colors">
            Pricing
          </a>
          <Button className="btn-primary">Join Waitlist</Button>
        </nav>

        {/* Mobile Menu Button */}
        <button className="md:hidden" onClick={toggleMenu} aria-label="Toggle menu">
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden absolute top-full left-0 right-0 bg-white/95 backdrop-blur-lg shadow-lg">
          <div className="container max-w-7xl mx-auto px-4 py-4 flex flex-col space-y-4">
            <a 
              href="#features" 
              className="py-2 text-formaflow-graphite hover:text-formaflow-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Features
            </a>
            <a 
              href="#how-it-works" 
              className="py-2 text-formaflow-graphite hover:text-formaflow-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              How it Works
            </a>
            <a 
              href="#pricing" 
              className="py-2 text-formaflow-graphite hover:text-formaflow-purple transition-colors"
              onClick={() => setIsMenuOpen(false)}
            >
              Pricing
            </a>
            <Button 
              className="btn-primary w-full mt-4"
              onClick={() => setIsMenuOpen(false)}
            >
              Join Waitlist
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
