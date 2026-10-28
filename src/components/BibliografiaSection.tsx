import React from 'react';
import { ExternalLink, Globe } from 'lucide-react';

export const BibliografiaSection: React.FC = () => {
  const fuentes = [
    {
      titulo: 'IEEE Computer Society - Educational Resources & Computing Body of Knowledge',
      organizacion: 'Institute of Electrical and Electronics Engineers (IEEE)',
      descripcion: 'Estándares internacionales de ingeniería de software, arquitectura de computadoras y currículos universitarios de referencia.',
      url: 'https://www.computer.org',
      tipo: 'Organismo Internacional'
    },
    {
      titulo: 'ACM Computing Curricula & Educational Guidelines',
      organizacion: 'Association for Computing Machinery (ACM)',
      descripcion: 'Guías curriculares globales para carreras universitarias en Ciencias de la Computación, Sistemas de Información e Ingeniería de Software.',
      url: 'https://www.acm.org',
      tipo: 'Sociedad Científica'
    },
    {
      titulo: 'NIST Special Publication 800-145: The NIST Definition of Cloud Computing',
      organizacion: 'National Institute of Standards and Technology (NIST)',
      descripcion: 'La definición canónica de referencia mundial sobre los modelos de servicio y despliegue de la computación en la nube.',
      url: 'https://csrc.nist.gov/publications/detail/sp/800-145/final',
      tipo: 'Estándar Oficial'
    },
    {
      titulo: 'Documentación Oficial del Sistema Gestor PostgreSQL',
      organizacion: 'PostgreSQL Global Development Group',
      descripcion: 'Manual exhaustivo sobre el estándar SQL, integridad relacional, concurrencia MVCC, diseño de índices y transacciones ACID.',
      url: 'https://www.postgresql.org/docs/',
      tipo: 'Documentación Técnica'
    },
    {
      titulo: 'W3C Web Standards & Architecture',
      organizacion: 'World Wide Web Consortium (W3C)',
      descripcion: 'Especificaciones abiertas de protocolos web, accesibilidad (WCAG), HTML5, CSS y arquitecturas cliente-servidor.',
      url: 'https://www.w3.org',
      tipo: 'Estándar Web'
    },
    {
      titulo: 'Recomendación sobre la Ética de la Inteligencia Artificial',
      organizacion: 'UNESCO (Organización de las Naciones Unidas)',
      descripcion: 'Marco normativo internacional adoptado por 193 estados sobre privacidad, derechos humanos, transparencia y uso responsable de las TIC.',
      url: 'https://www.unesco.org/es/artificial-intelligence/recommendation-ethics',
      tipo: 'Marco Ético Global'
    }
  ];

  return (
    <section id="fuentes" className="py-16 md:py-24 bg-slate-50 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Rigor y Fuentes Primarias
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Fuentes Bibliográficas y Referencias
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            El contenido de este portal educativo se sustenta en documentación técnica oficial y directrices de los organismos internacionales líderes en computación.
          </p>
        </div>

        {/* Rejilla de Referencias */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fuentes.map((f, idx) => (
            <div 
              key={idx}
              className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-3">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded bg-blue-50 text-blue-700 border border-blue-200">
                    {f.tipo}
                  </span>
                  <Globe className="w-4 h-4 text-slate-400" />
                </div>

                <h3 className="text-base font-bold text-slate-900 leading-snug">
                  {f.titulo}
                </h3>

                <p className="text-xs font-semibold text-slate-700 mt-1">
                  {f.organizacion}
                </p>

                <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {f.descripcion}
                </p>
              </div>

              <div className="mt-5 pt-3 border-t border-slate-100">
                <a
                  href={f.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-800 transition"
                >
                  <span>Consultar fuente oficial</span>
                  <ExternalLink className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
