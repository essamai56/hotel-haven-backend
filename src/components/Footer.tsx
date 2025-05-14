
import React from 'react';
import { Link } from 'react-router-dom';
import { ExternalLink, Mail, Phone, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold text-white mb-4">Hotel Haven</h3>
            <p className="mb-4">Encontre o hotel perfeito para sua estadia. Compare preços, veja avaliações e faça sua reserva com facilidade.</p>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Links Úteis</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="hover:text-white transition-colors">Página Inicial</Link>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Termos de Uso</a>
              </li>
              <li>
                <a href="#" className="hover:text-white transition-colors">Política de Privacidade</a>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="text-lg font-semibold text-white mb-4">Contato</h4>
            <ul className="space-y-2">
              <li className="flex items-center">
                <Mail className="h-4 w-4 mr-2" />
                <a href="mailto:contato@hotelhaven.com" className="hover:text-white transition-colors">contato@hotelhaven.com</a>
              </li>
              <li className="flex items-center">
                <Phone className="h-4 w-4 mr-2" />
                <a href="tel:+5511987654321" className="hover:text-white transition-colors">(11) 98765-4321</a>
              </li>
              <li className="flex items-start">
                <MapPin className="h-4 w-4 mr-2 mt-1" />
                <span>Av. Paulista, 1000, São Paulo - SP, Brasil</span>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-gray-700 mt-8 pt-8 text-center">
          <p>&copy; {new Date().getFullYear()} Hotel Haven. Todos os direitos reservados.</p>
          <p className="text-sm mt-2 text-gray-500">Desenvolvido com React, TypeScript e Tailwind CSS</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
