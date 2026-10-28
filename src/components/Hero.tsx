import React from 'react';
import { ArrowRight, Database, Cpu, ShieldCheck, Network, Layers } from 'lucide-react';

interface Props {
  onExplore: (section: string) => void;
}

export const Hero: React.FC<Props> = ({ onExplore }) => {
  const quickCards = [
    {
      title: 'Infraestructura y Redes',
      desc: 'Hardware de procesamiento, telecomunicaciones y centros de datos que sustentan la red global.',
      icon: Network,
      color: 'from-blue-600 to-cyan-500',
      action: 'tecnologias'
    },
    {
      title: 'Bases de Datos Relacionales',
      desc: 'Sistemas PostgreSQL y modelos que estructuran, consultan y garantizan la integridad de la información.',
      icon: Database,
      color: 'from-indigo-600 to-blue-500',
      action: 'catalogo'
    },
    {
      title: 'Cloud & Ciberseguridad',
      desc: 'Servicios de cómputo elástico y protocolos criptográficos para proteger los activos digitales.',
      icon: ShieldCheck,
      color: 'from-violet-600 to-indigo-500',
      action: 'tecnologias'
    },
    {
      title: 'Disciplinas Profesionales',
      desc: 'Desarrollo de software, ingeniería, ciencia de datos, arquitectura cloud y gestión de sistemas.',
      icon: Layers,
      color: 'from-purple-600 to-pink-500',
      action: 'disciplinas'
    }
  ];

  return (
    <section id="inicio" className="relative overflow-hidden pt-10 pb-16 md:pt-16 md:pb-24 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white">
      {/* Elementos visuales de fondo */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#3b82f6_1px,transparent_1px)] [background-size:24px_24px] pointer-events-none"></div>
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-blue-600/20 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center max-w-4xl mx-auto">
          {/* Badge académico */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-400/30 text-blue-300 text-xs sm:text-sm font-medium mb-6">
            <Cpu className="w-4 h-4 text-blue-400" />
            <span>Proyecto Integrador · Tecnología de la Información & Bases de Datos 1</span>
          </div>

          {/* Título Principal Requerido */}
          <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
            Tecnologías de la Información:{' '}
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent">
              el mundo digital que nos conecta
            </span>
          </h1>

          {/* Introducción */}
          <p className="mt-6 text-base sm:text-xl text-slate-300 leading-relaxed font-light max-w-3xl mx-auto">
            Descubre qué son las TI, cuáles son las tecnologías clave que las integran, qué disciplinas profesionales las impulsan y cómo modelamos su conocimiento mediante una base de datos relacional PostgreSQL en Supabase.
          </p>

          {/* Botones de acción rápida */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={() => onExplore('catalogo')}
              className="px-6 py-3.5 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition transform hover:-translate-y-0.5 flex items-center gap-2 text-sm sm:text-base"
            >
              <Database className="w-5 h-5" />
              <span>Explorar Catálogo en Supabase</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <button
              onClick={() => onExplore('que-son')}
              className="px-6 py-3.5 rounded-xl bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 border border-slate-700 font-semibold transition text-sm sm:text-base flex items-center gap-2"
            >
              <span>Aprender qué son las TI</span>
            </button>

            <button
              onClick={() => onExplore('agregar')}
              className="px-6 py-3.5 rounded-xl bg-purple-600/20 hover:bg-purple-600/30 text-purple-200 border border-purple-500/30 font-semibold transition text-sm sm:text-base flex items-center gap-2"
            >
              <span>Agregar Nuevo Registro</span>
            </button>
          </div>
        </div>

        {/* Tarjetas de áreas principales */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {quickCards.map((card, idx) => {
            const Icon = card.icon;
            return (
              <div
                key={idx}
                onClick={() => onExplore(card.action)}
                className="group cursor-pointer p-6 rounded-2xl bg-slate-800/50 hover:bg-slate-800/80 border border-slate-700/60 hover:border-blue-500/50 transition-all duration-300 transform hover:-translate-y-1 shadow-md hover:shadow-xl"
              >
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.color} flex items-center justify-center text-white mb-4 shadow-md group-hover:scale-110 transition-transform`}>
                  <Icon className="w-6 h-6" />
                </div>
                <h3 className="text-lg font-bold text-white group-hover:text-blue-300 transition-colors">
                  {card.title}
                </h3>
                <p className="mt-2 text-xs sm:text-sm text-slate-300 leading-relaxed">
                  {card.desc}
                </p>
                <div className="mt-4 flex items-center text-xs font-semibold text-blue-400 group-hover:text-blue-300">
                  <span>Conocer más</span>
                  <ArrowRight className="w-3.5 h-3.5 ml-1 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Resumen de impacto de las TI en la sociedad */}
        <div className="mt-12 p-6 rounded-2xl bg-gradient-to-r from-blue-950/60 via-slate-900/60 to-purple-950/60 border border-blue-500/20 text-slate-300 text-xs sm:text-sm text-center max-w-4xl mx-auto">
          <p className="leading-relaxed">
            <strong className="text-white">Importancia transformadora:</strong> Las Tecnologías de la Información no son únicamente herramientas electrónicas; constituyen el tejido nervioso de la sociedad del siglo XXI. Hacen posible desde diagnósticos médicos de precisión y teletrabajo internacional hasta la preservación de la memoria cultural y la automatización productiva.
          </p>
        </div>
      </div>
    </section>
  );
};
