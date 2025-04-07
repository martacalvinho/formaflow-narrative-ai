
import React from 'react';
import { Instagram, Twitter, Linkedin, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-gray-200 py-12">
      <div className="container max-w-7xl mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8">
          <div className="md:col-span-2">
            <div className="mb-4 text-xl font-bold bg-gradient-to-r from-formaflow-purple to-formaflow-purple-light bg-clip-text text-transparent">
              FormaFlow
            </div>
            <p className="text-formaflow-muted-text max-w-md">
              FormaFlow helps architecture studios transform project files into engaging content narratives, powered by AI.
            </p>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Navigation</h4>
            <ul className="space-y-2">
              <li><a href="#features" className="text-formaflow-muted-text hover:text-formaflow-purple transition-colors">Features</a></li>
              <li><a href="#how-it-works" className="text-formaflow-muted-text hover:text-formaflow-purple transition-colors">How it Works</a></li>
              <li><a href="#pricing" className="text-formaflow-muted-text hover:text-formaflow-purple transition-colors">Pricing</a></li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-semibold mb-4">Connect</h4>
            <div className="flex space-x-4">
              <a href="#" className="text-formaflow-muted-text hover:text-formaflow-purple transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-formaflow-muted-text hover:text-formaflow-purple transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-formaflow-muted-text hover:text-formaflow-purple transition-colors">
                <Linkedin size={20} />
              </a>
              <a href="#" className="text-formaflow-muted-text hover:text-formaflow-purple transition-colors">
                <Mail size={20} />
              </a>
            </div>
          </div>
        </div>
        
        <div className="border-t border-gray-200 mt-12 pt-6 flex flex-col md:flex-row justify-between items-center">
          <p className="text-formaflow-muted-text text-sm">
            © {new Date().getFullYear()} FormaFlow. All rights reserved.
          </p>
          
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-formaflow-muted-text text-sm hover:text-formaflow-purple transition-colors">Privacy Policy</a>
            <a href="#" className="text-formaflow-muted-text text-sm hover:text-formaflow-purple transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
