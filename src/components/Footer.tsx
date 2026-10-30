import React from 'react';
import { Cpu } from 'lucide-react';

interface Props {
  onNavigate: (sectionId: string) => void;
}

export const Footer: React.FC<Props> = ({ onNavigate }) => {
  return (
    <footer className="bg-slate-950 text-slate-400 text-xs border-t border-slate-800 pt-12 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-10 border-b border-slate-800">
          
          {/* Columna 1: Presentación académica */}
          <div className="md:col-span-2 space-y-3">
            <div className="mb-5">
           <p className="text-blue-400 font-bold text-sm tracking-wide">
           IESET y FP
           </p>
           <p className="text-slate-400 text-xs leading-relaxed mt-1">
            Instituto de Educación Superior - Educación Técnica y Formación Profesional
           </p>
            </div>
            <div className="flex items-center gap-2 text-white font-bold text-base">
              <div className="w-7 h-7 rounded-lg bg-blue-600 flex items-center justify-center">
                <Cpu className="w-4 h-4 text-white" />
              </div>
              <span>Proyecto Integrador: Tecnologías de la Información</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Aplicación educativa integral diseñada para las cátedras <strong>Tecnología de la Información</strong> y <strong>Bases de Datos 1</strong>. Demuestra la conexión real entre una interfaz moderna y un motor de base de datos relacional PostgreSQL con políticas RLS e integridad referencial.
            </p>
            <div className="flex flex-wrap gap-2 pt-2">
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-blue-400 font-mono">
                PostgreSQL 15+
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-emerald-400 font-mono">
                Supabase
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-indigo-400 font-mono">
                React 18 & TypeScript
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-purple-400 font-mono">
                Tailwind CSS
              </span>
              <span className="px-2 py-0.5 rounded bg-slate-900 border border-slate-800 text-[11px] text-cyan-400 font-mono">
                Vercel Ready
              </span>
            </div>
          </div>

          {/* Columna 2: Navegación Rápida */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Navegación del Portal</h4>
            <ul className="space-y-2">
              <li>
                <button onClick={() => onNavigate('inicio')} className="hover:text-white transition">
                  Inicio
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('que-son')} className="hover:text-white transition">
                  ¿Qué son las TI?
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('tecnologias')} className="hover:text-white transition">
                  Tecnologías Integradoras
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('disciplinas')} className="hover:text-white transition">
                  Disciplinas Profesionales
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('catalogo')} className="hover:text-white transition">
                  Catálogo DB en Supabase
                </button>
              </li>
              <li>
                <button onClick={() => onNavigate('agregar')} className="hover:text-white transition">
                  Formulario de Inserción
                </button>
              </li>
            </ul>
          </div>

          {/* Columna 3: Puntos de Demostración para la Cátedra */}
          <div>
            <h4 className="text-white font-semibold text-sm mb-3">Puntos de Evaluación</h4>
            <ul className="space-y-2 text-[11px] text-slate-400">
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Modelo relacional con claves 1:N (categorias ↔ tecnologias).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Consultas SELECT con JOIN real a Supabase.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Formulario con validación e INSERT persistente.</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Políticas de seguridad Row Level Security (RLS).</span>
              </li>
              <li className="flex items-start gap-1.5">
                <span className="text-emerald-500 font-bold">✓</span>
                <span>Migración SQL versionada en el repositorio.</span>
              </li>
            </ul>
          </div>

        </div>

        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-slate-500 text-xs">
          <p>
            © {new Date().getFullYear()} Portal Educativo TI & BD 1. Diseñado para fines pedagógicos e integradores.
          </p>
          <div className="flex items-center gap-4">
            <button onClick={() => onNavigate('fuentes')} className="hover:text-slate-300 transition">
              Fuentes Bibliográficas
            </button>
            <span>•</span>
            <button onClick={() => onNavigate('glosario')} className="hover:text-slate-300 transition">
              Glosario Técnico
            </button>
          </div>
        </div>

      </div>
    </footer>
  );
};
