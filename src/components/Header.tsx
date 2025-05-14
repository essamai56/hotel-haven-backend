
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Hotel, Home } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-sm py-4">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <Hotel className="h-6 w-6 text-primary" />
          <span className="text-xl font-bold">Hotel Haven</span>
        </Link>
        
        <nav>
          <ul className="flex items-center space-x-4">
            <li>
              <Link to="/">
                <Button variant="ghost">
                  <Home className="mr-2 h-4 w-4" />
                  Início
                </Button>
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default Header;
