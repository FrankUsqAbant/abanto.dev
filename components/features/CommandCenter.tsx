
import React, { useState, useEffect } from 'react';
import { View } from '../../types';

interface CommandCenterProps {
  isOpen: boolean;
  onClose: () => void;
  onNavigate: (view: string) => void;
}

const CommandCenter: React.FC<CommandCenterProps> = ({ isOpen, onClose, onNavigate }) => {
  const [search, setSearch] = useState('');

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!isOpen) return null;

  const items = [
    { id: 'home', icon: 'fa-house', label: 'Inicio', cat: 'Navegación' },
    { id: 'aprende', icon: 'fa-graduation-cap', label: 'Aprende: tablas periódicas de web, IA y agentes', cat: 'Aprende' },
    { id: 'about', icon: 'fa-user', label: 'Sobre mí', cat: 'Información' }
  ].filter(i => 
    i.label.toLowerCase().includes(search.toLowerCase()) ||
    i.cat.toLowerCase().includes(search.toLowerCase()) ||
    i.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="fixed inset-0 z-[100] flex items-start justify-center pt-32 px-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose}></div>
      
      <div className="relative w-full max-w-2xl bg-[#0a0a0a] border border-white/10 rounded-3xl shadow-2xl overflow-hidden animate-fade-in">
        <div className="p-6 border-b border-white/5 flex items-center gap-4">
          <i className="fas fa-search text-neutral-600"></i>
          <input 
            autoFocus
            type="text" 
            placeholder="¿A dónde quieres ir? (Ej. HTML, Python, Ejercicios...)" 
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-transparent border-none text-white focus:outline-none text-lg font-medium placeholder:text-neutral-700"
          />
        </div>

        <div className="p-4 max-h-[400px] overflow-y-auto">
          <div className="space-y-1">
            {items.length > 0 ? (
              items.map(item => (
                <button
                  key={item.id}
                  onClick={() => onNavigate(item.id)}
                  className="w-full flex items-center justify-between p-4 rounded-2xl hover:bg-white/5 group transition-all text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-neutral-900 border border-white/5 flex items-center justify-center text-neutral-500 group-hover:text-blue-500 group-hover:border-blue-500/50 transition-all">
                      <i className={`fas ${item.icon}`}></i>
                    </div>
                    <div>
                      <span className="font-bold text-neutral-300 group-hover:text-white block">{item.label}</span>
                      <span className="text-[9px] font-black text-neutral-600 uppercase tracking-widest">{item.cat}</span>
                    </div>
                  </div>
                  <i className="fas fa-chevron-right text-[10px] text-neutral-700 group-hover:translate-x-1 transition-all"></i>
                </button>
              ))
            ) : (
              <div className="p-8 text-center text-neutral-600 text-sm">
                No se encontraron resultados para &quot;{search}&quot;
              </div>
            )}
          </div>
        </div>

        <div className="p-4 bg-black/40 border-t border-white/5 flex justify-between items-center">
          <div className="flex gap-4">
            <div className="flex items-center gap-1.5 text-[9px] text-neutral-600 font-bold uppercase tracking-widest">
              <span className="px-1.5 py-0.5 bg-neutral-900 border border-white/10 rounded">ESC</span> Cerrar
            </div>
          </div>
          <span className="text-[9px] font-black text-blue-500/50 uppercase tracking-widest italic">Nexus Search Engine</span>
        </div>
      </div>
    </div>
  );
};


export default CommandCenter;
