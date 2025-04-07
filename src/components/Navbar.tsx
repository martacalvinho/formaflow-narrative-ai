
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Menu, X, ExternalLink } from 'lucide-react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(prev => !prev);
  };

  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-100">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="font-semibold text-xl flex items-center">
            <span className="text-formaflow-purple">Forma</span>
            <span>Flow</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link to="#features" className="text-formaflow-graphite hover:text-formaflow-purple transition-colors">
              Features
            </Link>
            <Link to="#how-it-works" className="text-formaflow-graphite hover:text-formaflow-purple transition-colors">
              How It Works
            </Link>
            <Link to="/demo" className="text-formaflow-graphite hover:text-formaflow-purple transition-colors font-medium">
              Demo
            </Link>
          </nav>

          {/* Desktop Call-to-Action */}
          <div className="hidden md:flex items-center space-x-4">
            <Button className="btn-secondary group" asChild>
              <Link to="/demo">
                Try Demo
                <ExternalLink className="ml-2 w-4 h-4" />
              </Link>
            </Button>
            <Button className="btn-primary group">
              Join Waitlist
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="md:hidden text-formaflow-graphite"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100">
          <div className="container max-w-7xl mx-auto px-4 py-4 space-y-4">
            <nav className="flex flex-col space-y-4">
              <Link 
                to="#features" 
                className="text-formaflow-graphite py-2 hover:text-formaflow-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Features
              </Link>
              <Link 
                to="#how-it-works" 
                className="text-formaflow-graphite py-2 hover:text-formaflow-purple transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                How It Works
              </Link>
              <Link 
                to="/demo" 
                className="text-formaflow-graphite py-2 hover:text-formaflow-purple transition-colors font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Demo
              </Link>
            </nav>
            
            <div className="flex flex-col space-y-3">
              <Button className="btn-secondary group w-full" asChild>
                <Link to="/demo">
                  Try Demo
                  <ExternalLink className="ml-2 w-4 h-4" />
                </Link>
              </Button>
              <Button className="btn-primary group w-full">
                Join Waitlist
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
