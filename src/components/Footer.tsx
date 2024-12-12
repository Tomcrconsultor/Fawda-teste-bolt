import { Facebook, Instagram, MapPin, Phone, Mail, Clock } from 'lucide-react';
import Link from 'next/link';
import DynamicDiv from './DynamicDiv';

export default function Footer() {
  return (
    <footer className="bg-emerald-900 text-white">
      <DynamicDiv className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <DynamicDiv className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Sobre */}
          <DynamicDiv>
            <h3 className="text-lg font-semibold mb-4">Sobre Nós</h3>
            <p className="text-emerald-100 text-sm">
              Trazemos para você o verdadeiro sabor da culinária síria, 
              com receitas tradicionais e ingredientes frescos selecionados.
            </p>
          </DynamicDiv>

          {/* Contato */}
          <DynamicDiv>
            <h3 className="text-lg font-semibold mb-4">Contato</h3>
            <ul className="space-y-3 text-emerald-100">
              <li className="flex items-center gap-2">
                <Phone className="h-4 w-4" />
                <span>(11) 99999-9999</span>
              </li>
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:contato@saboresdosiria.com.br" className="hover:text-white transition-colors">
                  contato@saboresdosiria.com.br
                </a>
              </li>
              <li className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <address className="not-italic">
                  Rua das Oliveiras, 123 - São Paulo, SP
                </address>
              </li>
            </ul>
          </DynamicDiv>

          {/* Horário de Funcionamento */}
          <DynamicDiv>
            <h3 className="text-lg font-semibold mb-4">Horário de Funcionamento</h3>
            <ul className="space-y-2 text-emerald-100">
              <li className="flex items-center gap-2">
                <Clock className="h-4 w-4" />
                <DynamicDiv>
                  <p>Segunda a Sexta: 11h às 22h</p>
                  <p>Sábado e Domingo: 11h às 23h</p>
                </DynamicDiv>
              </li>
            </ul>
          </DynamicDiv>

          {/* Redes Sociais */}
          <DynamicDiv>
            <h3 className="text-lg font-semibold mb-4">Redes Sociais</h3>
            <DynamicDiv className="flex space-x-4">
              <a 
                href="https://instagram.com/saboresdosiria" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-300 transition-colors"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a 
                href="https://facebook.com/saboresdosiria" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-emerald-300 transition-colors"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </DynamicDiv>
          </DynamicDiv>
        </DynamicDiv>

        {/* Links Úteis */}
        <DynamicDiv className="mt-8 pt-8 border-t border-emerald-800">
          <nav className="flex flex-wrap justify-center gap-6 text-sm text-emerald-100">
            <Link href="/about" className="hover:text-white transition-colors">
              Sobre Nós
            </Link>
            <Link href="/privacy" className="hover:text-white transition-colors">
              Política de Privacidade
            </Link>
            <Link href="/terms" className="hover:text-white transition-colors">
              Termos de Uso
            </Link>
            <Link href="/faq" className="hover:text-white transition-colors">
              FAQ
            </Link>
          </nav>
        </DynamicDiv>

        {/* Copyright */}
        <DynamicDiv className="mt-8 text-center text-sm text-emerald-100">
          <p>© {new Date().getFullYear()} Sabores da Síria. Todos os direitos reservados.</p>
        </DynamicDiv>
      </DynamicDiv>
    </footer>
  );
} 