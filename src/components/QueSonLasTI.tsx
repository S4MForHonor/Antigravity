import React from 'react';
import { 
  HardDrive, Cpu, Radio, Shield, GraduationCap, 
  Building2, HeartPulse, Home, CheckCircle2
} from 'lucide-react';

export const QueSonLasTI: React.FC = () => {
  const pilares = [
    {
      titulo: '1. Almacenar Información',
      desc: 'Guardar datos de forma persistente y estructurada para que no se pierdan al apagar un equipo y puedan consultarse cuando se necesiten.',
      ejemplo: 'Una base de datos de un hospital que guarda historiales clínicos durante décadas.',
      icon: HardDrive,
      color: 'bg-blue-500/10 text-blue-600 border-blue-200'
    },
    {
      titulo: '2. Procesar Información',
      desc: 'Transformar datos sin procesar (números, fechas, textos) en conocimiento útil mediante cálculos, algoritmos y reglas lógicas.',
      ejemplo: 'El procesador calculando promedios de notas escolares o detectando patrones de gastos en una app bancaria.',
      icon: Cpu,
      color: 'bg-indigo-500/10 text-indigo-600 border-indigo-200'
    },
    {
      titulo: '3. Transmitir Información',
      desc: 'Enviar paquetes de datos de un emisor a uno o más receptores a través de medios guiados (fibra óptica) o inalámbricos (antenas Wi-Fi y 5G).',
      ejemplo: 'Enviar un mensaje por WhatsApp o transmitir una clase universitaria en vivo.',
      icon: Radio,
      color: 'bg-cyan-500/10 text-cyan-600 border-cyan-200'
    },
    {
      titulo: '4. Proteger Información',
      desc: 'Garantizar que solo las personas autorizadas lean o modifiquen los datos, evitando accesos ilícitos, robos o pérdidas.',
      ejemplo: 'Cifrado de claves bancarias y copias de seguridad automáticas ante ciberataques.',
      icon: Shield,
      color: 'bg-purple-500/10 text-purple-600 border-purple-200'
    }
  ];

  const aplicaciones = [
    {
      area: 'Educación',
      icono: GraduationCap,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      puntos: [
        'Campus virtuales y plataformas de e-learning accesibles desde cualquier lugar.',
        'Bibliotecas digitales globales con millones de libros y artículos científicos.',
        'Sistemas de gestión académica y seguimiento del rendimiento estudiantil.'
      ]
    },
    {
      area: 'Empresas y Trabajo',
      icono: Building2,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      puntos: [
        'Sistemas ERP y CRM para gestionar inventarios, ventas y clientes en tiempo real.',
        'Herramientas de teletrabajo colaborativo y comunicación internacional.',
        'Comercio electrónico (e-commerce) y pasarelas de pago digitales seguras.'
      ]
    },
    {
      area: 'Salud y Medicina',
      icono: HeartPulse,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      puntos: [
        'Historia clínica digital unificada y recetas electrónicas interoperables.',
        'Telemedicina para atender pacientes en zonas rurales o de difícil acceso.',
        'Equipos de tomografía y diagnóstico por imágenes asistidos por software computacional.'
      ]
    },
    {
      area: 'Vida Cotidiana',
      icono: Home,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      puntos: [
        'Smartphones con GPS que guían nuestro transporte diario en segundos.',
        'Banca móvil para transferir dinero, pagar servicios y evitar largas filas.',
        'Streaming de entretenimiento, domótica en hogares y redes sociales.'
      ]
    }
  ];

  return (
    <section id="que-son" className="py-16 md:py-24 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Fundamentos de la Computación
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            ¿Qué son las Tecnologías de la Información (TI)?
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Las <strong>Tecnologías de la Información</strong> abarcan el conjunto de recursos, herramientas, dispositivos físicos, programas lógicos y redes de telecomunicaciones utilizados para administrar los datos en la sociedad moderna.
          </p>
        </div>

        {/* Definición conceptual y para qué sirven */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-slate-50 p-6 sm:p-10 rounded-3xl border border-slate-200">
          <div>
            <h3 className="text-xl sm:text-2xl font-bold text-slate-900">
              ¿Para qué sirven y qué resuelven?
            </h3>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              En la antigüedad, registrar una venta o enviar una carta tomaba días, semanas o meses, con un alto riesgo de deterioro físico. Las TI resuelven ese desafío convirtiendo el conocimiento analógico en pulsos electrónicos y bits binarios.
            </p>
            <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed">
              Su propósito fundamental es <strong>facilitar la toma de decisiones</strong>, automatizar procesos rutinarios y permitir que los seres humanos colaboren a nivel planetario de forma instantánea y confiable.
            </p>

            <div className="mt-6 space-y-2.5">
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span><strong>Reducción de tiempos:</strong> Minutos en lugar de semanas.</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span><strong>Escalabilidad:</strong> Procesar millones de transacciones a la vez.</span>
              </div>
              <div className="flex items-center gap-2.5 text-sm text-slate-700">
                <CheckCircle2 className="w-5 h-5 text-blue-600 flex-shrink-0" />
                <span><strong>Accesibilidad universal:</strong> Información en la nube 24/7.</span>
              </div>
            </div>
          </div>

          <div className="bg-gradient-to-br from-slate-900 to-blue-950 p-6 sm:p-8 rounded-2xl text-white shadow-xl">
            <h4 className="text-lg font-bold text-blue-300 flex items-center gap-2">
              <Cpu className="w-5 h-5" />
              La Tríada Clásica de los Sistemas TI
            </h4>
            <div className="mt-4 space-y-4 text-xs sm:text-sm text-slate-200">
              <div className="border-l-2 border-blue-500 pl-3">
                <p className="font-semibold text-white">1. Hardware (El cuerpo):</p>
                <p className="text-slate-300 mt-0.5">Componentes electrónicos tangibles (placas, chips, cables, pantallas).</p>
              </div>
              <div className="border-l-2 border-indigo-500 pl-3">
                <p className="font-semibold text-white">2. Software (La mente):</p>
                <p className="text-slate-300 mt-0.5">Sistemas operativos, bases de datos y algoritmos que ejecutan el propósito.</p>
              </div>
              <div className="border-l-2 border-purple-500 pl-3">
                <p className="font-semibold text-white">3. Redes y Personas (El vínculo):</p>
                <p className="text-slate-300 mt-0.5">Telecomunicaciones y los usuarios que cargan, analizan y aplican la información.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Los 4 Pilares del ciclo de la información */}
        <div className="mt-16">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900">
              Las Cuatro Operaciones Esenciales de las TI
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Cualquier sistema de información digital ejecuta estas cuatro funciones cardinales sobre los datos:
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pilares.map((p, idx) => {
              const Icon = p.icon;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 hover:border-blue-300 shadow-sm hover:shadow-md transition">
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center border mb-4 ${p.color}`}>
                    <Icon className="w-6 h-6" />
                  </div>
                  <h4 className="text-base font-bold text-slate-900">{p.titulo}</h4>
                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {p.desc}
                  </p>
                  <div className="mt-4 pt-3 border-t border-slate-100 text-xs bg-slate-50 p-2.5 rounded-lg text-slate-700">
                    <span className="font-semibold text-blue-700">Ejemplo cotidiano:</span> {p.ejemplo}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Aplicaciones en la sociedad */}
        <div className="mt-20">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h3 className="text-2xl font-bold text-slate-900">
              Impacto de las TI en Diferentes Ámbitos
            </h3>
            <p className="text-sm text-slate-600 mt-2">
              Cómo las TI transforman nuestras actividades cotidianas, profesionales y de bienestar.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {aplicaciones.map((app, idx) => {
              const Icon = app.icono;
              return (
                <div key={idx} className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between">
                  <div>
                    <div className={`w-10 h-10 rounded-lg flex items-center justify-center border mb-4 ${app.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <h4 className="text-base font-bold text-slate-900 mb-3">{app.area}</h4>
                    <ul className="space-y-2 text-xs sm:text-sm text-slate-600">
                      {app.puntos.map((punto, pIdx) => (
                        <li key={pIdx} className="flex items-start gap-2">
                          <span className="text-blue-500 font-bold">•</span>
                          <span>{punto}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
};
