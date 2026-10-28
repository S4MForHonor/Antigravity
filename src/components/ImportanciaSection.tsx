import React from 'react';
import { 
  GraduationCap, HeartPulse, Factory, ShoppingCart, 
  MessageSquare, Landmark, Film, ShieldAlert, 
  Users2, Scale, Compass
} from 'lucide-react';

export const ImportanciaSection: React.FC = () => {
  const sectores = [
    {
      titulo: 'Educación',
      icono: GraduationCap,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      ejemplo: 'Plataformas de aprendizaje virtual (Moodle, Canvas), simuladores científicos 3D y repositorios académicos abiertos accesibles desde cualquier rincón del planeta.'
    },
    {
      titulo: 'Salud y Medicina',
      icono: HeartPulse,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      ejemplo: 'Historias clínicas interoperables, telecirugía asistida por robots de mínima invasión y algoritmos de IA que detectan precozmente anomalías celulares.'
    },
    {
      titulo: 'Industria y Manufactura',
      icono: Factory,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      ejemplo: 'Industria 4.0: brazos robóticos sincronizados por IoT, gemelos digitales (digital twins) de fábricas y mantenimiento predictivo en cadenas de montaje.'
    },
    {
      titulo: 'Comercio y Finanzas',
      icono: ShoppingCart,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      ejemplo: 'Billeteras virtuales, transferencias bancarias instantáneas, logística automatizada y plataformas de e-commerce con recomendaciones personalizadas.'
    },
    {
      titulo: 'Comunicación Humana',
      icono: MessageSquare,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      ejemplo: 'Videoconferencias en alta definición con traducción en tiempo real, redes de colaboración abierta y mensajería cifrada de extremo a extremo.'
    },
    {
      titulo: 'Administración Pública y Ciudadanía',
      icono: Landmark,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      ejemplo: 'Gobierno digital: tramitación de DNI y pasaportes en línea, votación electrónica auditada, portales de transparencia y pago de tributos sin filas.'
    },
    {
      titulo: 'Entretenimiento y Cultura',
      icono: Film,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      ejemplo: 'Servicios de streaming global (música y cine), videojuegos multijugador con renderizado en la nube y museos digitalizados en realidad virtual.'
    }
  ];

  const dilemas = [
    {
      titulo: 'Privacidad de Datos Personales',
      desc: 'El modelo económico de la red recopila huellas digitales masivas. El desafío radica en cómo garantizar que la información sensible no sea comercializada ni vigilada sin consentimiento explícito.',
      icono: ShieldAlert,
      tag: 'Regulación GDPR / Ley 25.326'
    },
    {
      titulo: 'Ciberseguridad y Ataques a Infraestructura',
      desc: 'Al depender de sistemas informáticos para hospitales, represas y redes eléctricas, una brecha de seguridad digital puede acarrear consecuencias físicas devastadoras.',
      icono: Scale,
      tag: 'Seguridad Crítica'
    },
    {
      titulo: 'Brecha Digital y Desigualdad',
      desc: 'Quienes carecen de conectividad o dispositivos quedan marginados de empleos de calidad, educación universitaria y trámites básicos, profundizando la asimetría social.',
      icono: Users2,
      tag: 'Acceso Equitativo'
    },
    {
      titulo: 'Uso Responsable y Bienestar Digital',
      desc: 'Prevenir la adicción algorítmica, combatir la desinformación masiva (fake news con IA) y fomentar el pensamiento crítico sobre el contenido consumido.',
      icono: Compass,
      tag: 'Ética y Conciencia'
    }
  ];

  return (
    <section id="importancia" className="py-16 md:py-24 bg-slate-50 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Impacto Social, Económico y Ético
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Importancia de las TI en el Mundo Moderno
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Las TI no son un fin en sí mismas, sino el habilitador primordial que sostiene la vida económica, el bienestar médico y las libertades del ciudadano contemporáneo.
          </p>
        </div>

        {/* Sectores de Aplicación */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {sectores.map((sec, idx) => {
            const Icon = sec.icono;
            return (
              <div 
                key={idx}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition flex flex-col justify-between"
              >
                <div>
                  <div className={`w-11 h-11 rounded-xl flex items-center justify-center border mb-4 ${sec.color}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="text-base font-bold text-slate-900 mb-2">
                    {sec.titulo}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {sec.ejemplo}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Sección de Retos Éticos y Brecha Digital */}
        <div className="mt-16 bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
          <div className="max-w-3xl mb-8">
            <h3 className="text-2xl font-bold text-slate-900">
              Dilemas, Retos y Responsabilidad Tecnológica
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Junto con las enormes ventajas, las TI presentan desafíos cruciales que futuros profesionales del software deben comprender y legislar con ética.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {dilemas.map((dil, idx) => {
              const Icon = dil.icono;
              return (
                <div key={idx} className="p-5 rounded-2xl bg-slate-50 border border-slate-200">
                  <div className="flex items-center justify-between gap-2 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className="p-2 bg-blue-100 rounded-lg text-blue-700">
                        <Icon className="w-4 h-4" />
                      </div>
                      <h4 className="font-bold text-sm sm:text-base text-slate-900">
                        {dil.titulo}
                      </h4>
                    </div>
                    <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                      {dil.tag}
                    </span>
                  </div>
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {dil.desc}
                  </p>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
