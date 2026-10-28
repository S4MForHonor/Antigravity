import React, { useState } from 'react';
import { 
  Cpu, Code2, Monitor, Network, Database, Cloud, 
  ShieldAlert, Bot, Wifi, Box, Globe2, Layers3, 
  ChevronDown, ChevronUp, Check, AlertCircle
} from 'lucide-react';

export const TecnologiasSection: React.FC = () => {
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const tecnologias = [
    {
      id: 'hard',
      nombre: 'Hardware',
      categoria: 'Infraestructura Física',
      icon: Cpu,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      descripcion: 'Componentes físicos y electrónicos que componen los sistemas informáticos, permitiendo la entrada, cómputo, almacenamiento y salida de datos.',
      ejemplos: 'Servidores de centros de datos, procesadores multinúcleo (CPU, GPU, NPU), memoria RAM DDR5, discos SSD NVMe PCIe 4.0.',
      ventajas: 'Potencia de cálculo masiva, almacenamiento de alta velocidad, fiabilidad operativa.',
      desafios: 'Costo elevado de adquisición, rápida obsolescencia, consumo de energía y disipación térmica.'
    },
    {
      id: 'soft',
      nombre: 'Software',
      categoria: 'Lógica Computacional',
      icon: Code2,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      descripcion: 'Conjunto de programas, instrucciones estructuradas y algoritmos que permiten al hardware realizar tareas útiles y productivas.',
      ejemplos: 'Suites ofimáticas (Microsoft 365), navegadores modernos, plataformas de diseño CAD, sistemas ERP como SAP o Odoo.',
      ventajas: 'Automatización de procesos repetitivos, flexibilidad para adaptarse a cualquier industria.',
      desafios: 'Complejidad en el mantenimiento de código legado, bugs, vulnerabilidades de seguridad.'
    },
    {
      id: 'os',
      nombre: 'Sistemas Operativos',
      categoria: 'Software de Sistema',
      icon: Monitor,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      descripcion: 'Software base que administra y arbitra los recursos físicos de la máquina, brindando una interfaz y entorno de ejecución seguro a las aplicaciones.',
      ejemplos: 'Distribuciones GNU/Linux (Ubuntu Server, Red Hat, Debian), Microsoft Windows 11/Server, macOS, Android, iOS.',
      ventajas: 'Gestión eficiente de procesos y memoria, soporte multitarea, control granular de usuarios y permisos.',
      desafios: 'Compatibilidad entre diferentes arquitecturas de CPU (x86 vs ARM), necesidad constante de parches.'
    },
    {
      id: 'redes',
      nombre: 'Redes y Telecomunicaciones',
      categoria: 'Comunicaciones',
      icon: Network,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      descripcion: 'Conjunto de equipos de interconexión y protocolos estandarizados que hacen posible el intercambio de paquetes de datos a escala global.',
      ejemplos: 'Modelo TCP/IP, cables transoceánicos de fibra óptica, redes celulares 5G, conmutadores gestionados (switches) y routers BGP.',
      ventajas: 'Comunicación instantánea en tiempo real, descentralización de recursos y trabajo remoto.',
      desafios: 'Atenuación de señal, latencia en enlaces de larga distancia, congestión y vulnerabilidad a escuchas no autorizadas.'
    },
    {
      id: 'db',
      nombre: 'Bases de Datos',
      categoria: 'Gestión de Datos',
      icon: Database,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      descripcion: 'Sistemas de software dedicados a modelar, almacenar, organizar, indexar y recuperar información de manera consistente y eficiente.',
      ejemplos: 'PostgreSQL, Supabase, MySQL, Oracle Database, Microsoft SQL Server, Redis, MongoDB.',
      ventajas: 'Cumplimiento de propiedades ACID (Atomicidad, Consistencia, Aislamiento, Durabilidad), consultas complejas con SQL, integridad referencial.',
      desafios: 'Complejidad en el diseño de normalización, optimización de índices ante millones de registros y planes de contingencia.'
    },
    {
      id: 'cloud',
      nombre: 'Computación en la Nube (Cloud Computing)',
      categoria: 'Infraestructura como Servicio',
      icon: Cloud,
      color: 'text-violet-600 bg-violet-50 border-violet-200',
      descripcion: 'Provisión elástica bajo demanda de recursos informáticos (servidores, bases de datos, almacenamiento) a través de Internet con esquema de pago por uso.',
      ejemplos: 'Amazon Web Services (AWS), Google Cloud Platform (GCP), Microsoft Azure, Vercel, Supabase.',
      ventajas: 'Escalabilidad inmediata sin inversión inicial de hardware físico (CapEx a OpEx), alta disponibilidad mundial.',
      desafios: 'Dependencia absoluta de la conexión de red, riesgo de bloqueo por proveedor (vendor lock-in), costos imprevistos por sobreconsumo.'
    },
    {
      id: 'sec',
      nombre: 'Ciberseguridad',
      categoria: 'Protección y Resiliencia',
      icon: ShieldAlert,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      descripcion: 'Conjunto de métodos, herramientas criptográficas y políticas para defender redes, dispositivos y datos contra accesos no autorizados o ataques maliciosos.',
      ejemplos: 'Cifrado simétrico y asimétrico (AES-256, RSA), firewalls de nueva generación (NGFW), autenticación multifactor (MFA), Zero Trust.',
      ventajas: 'Preservación de la confidencialidad, integridad y disponibilidad (Tríada CIA) del activo más valioso de las organizaciones.',
      desafios: 'Sofisticación continua de ciberdelincuentes (ransomware asistido por IA), ingeniería social y descuidos del usuario final.'
    },
    {
      id: 'ai',
      nombre: 'Inteligencia Artificial',
      categoria: 'Cómputo Avanzado',
      icon: Bot,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      descripcion: 'Desarrollo de algoritmos y modelos matemáticos capaces de simular habilidades cognitivas como la deducción, el aprendizaje automático y el reconocimiento de patrones.',
      ejemplos: 'Modelos de lenguaje masivo (LLMs), visión artificial para tomografías médicas, sistemas de conducción autónoma y analítica predictiva.',
      ventajas: 'Aceleración drástica de la investigación científica, procesamiento de Big Data en segundos, automatización inteligente.',
      desafios: 'Sesgos en los datos de entrenamiento, riesgo de alucinaciones conceptuales, consumo energético desmedido e impacto ético-laboral.'
    },
    {
      id: 'iot',
      nombre: 'Internet de las Cosas (IoT)',
      categoria: 'Sistemas Embebidos',
      icon: Wifi,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      descripcion: 'Interconexión digital de objetos físicos cotidianos e industriales mediante sensores, microcontroladores y software que recopila información del ambiente.',
      ejemplos: 'Medidores eléctricos inteligentes, sensores agrícolas de humedad y salinidad, marcapasos conectados, domótica hogareña.',
      ventajas: 'Monitoreo ambiental e industrial continuo y en tiempo real, optimización de energía y mantenimiento predictivo de maquinaria.',
      desafios: 'Dispositivos económicos con baja seguridad que son usados en ataques DDoS masivos, interoperabilidad entre marcas distintas.'
    },
    {
      id: 'virt',
      nombre: 'Virtualización',
      categoria: 'Arquitectura de Sistemas',
      icon: Box,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      descripcion: 'Técnica tecnológica que permite abstraer los recursos físicos de una computadora para ejecutar múltiples entornos operativos o contenedores aislados.',
      ejemplos: 'Hipervisores KVM y VMware ESXi, contenedores Docker, orquestador de clústeres Kubernetes.',
      ventajas: 'Aprovechamiento al 80%+ de la capacidad del procesador físico (antes 15%), facilidad de clonar y recuperar servidores en segundos.',
      desafios: 'Consumo de memoria de hipervisores y necesidad de especialistas capacitados en orquestación de clústeres.'
    },
    {
      id: 'web',
      nombre: 'Desarrollo Web y Aplicaciones',
      categoria: 'Ingeniería de Software',
      icon: Globe2,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      descripcion: 'Metodologías y marcos tecnológicos para construir interfaces interactivas y sistemas accesibles universalmente desde navegadores y dispositivos móviles.',
      ejemplos: 'React, TypeScript, Node.js, Next.js, APIs RESTful, GraphQL, Progressive Web Apps (PWAs).',
      ventajas: 'Acceso universal multiplataforma sin descargas complejas, actualización instantánea en el servidor para todos los usuarios a la vez.',
      desafios: 'Fragmentación de navegadores y pantallas, optimización de rendimiento en celulares modestos y seguridad de cliente (XSS, CSRF).'
    },
    {
      id: 'si',
      nombre: 'Sistemas de Información (SI)',
      categoria: 'Gestión Estratégica',
      icon: Layers3,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      descripcion: 'Articulación holística de tecnología, procesos corporativos, datos y personas para orientar la estrategia operativa y el control organizacional.',
      ejemplos: 'Sistemas de Historia Clínica Digital (HIS), Sistemas de Información Geográfica (GIS), plataformas bancarias de core transaccional.',
      ventajas: 'Toma de decisiones fundamentada en métricas precisas, coherencia operativa y eliminación de duplicidad de tareas.',
      desafios: 'Resistencia humana al cambio en instituciones, costos elevados de migración de sistemas heredados de décadas atrás.'
    }
  ];

  const toggleExpand = (id: string) => {
    setExpandedId(expandedId === id ? null : id);
  };

  return (
    <section id="tecnologias" className="py-16 md:py-24 bg-slate-50 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200">
            Ecosistema Tecnológico
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Tecnologías que Integran las TI
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Las TI no son una única herramienta solitaria, sino una sinfonía de componentes de hardware, software, redes y datos que trabajan juntos de manera armónica.
          </p>
        </div>

        {/* Rejilla de Tecnologías */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {tecnologias.map((tec) => {
            const Icon = tec.icon;
            const isExpanded = expandedId === tec.id;

            return (
              <div
                key={tec.id}
                className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center border ${tec.color}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200">
                      {tec.categoria}
                    </span>
                  </div>

                  <h3 className="text-lg font-bold text-slate-900">
                    {tec.nombre}
                  </h3>

                  <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {tec.descripcion}
                  </p>

                  <div className="mt-4 p-3 rounded-xl bg-slate-50 border border-slate-100 text-xs text-slate-700">
                    <strong className="text-slate-900 block mb-1">Ejemplos de aplicación:</strong>
                    <span>{tec.ejemplos}</span>
                  </div>

                  {/* Bloque expandible con Ventajas y Desafíos */}
                  {isExpanded && (
                    <div className="mt-4 pt-4 border-t border-slate-100 space-y-3 text-xs animate-fadeIn">
                      <div className="bg-emerald-50/80 border border-emerald-200/80 p-3 rounded-lg text-emerald-900">
                        <p className="font-bold flex items-center gap-1.5 mb-1 text-emerald-800">
                          <Check className="w-4 h-4 text-emerald-600" />
                          Ventajas Clave:
                        </p>
                        <p className="text-emerald-950 leading-relaxed">{tec.ventajas}</p>
                      </div>

                      <div className="bg-rose-50/80 border border-rose-200/80 p-3 rounded-lg text-rose-900">
                        <p className="font-bold flex items-center gap-1.5 mb-1 text-rose-800">
                          <AlertCircle className="w-4 h-4 text-rose-600" />
                          Desafíos y Riesgos:
                        </p>
                        <p className="text-rose-950 leading-relaxed">{tec.desafios}</p>
                      </div>
                    </div>
                  )}
                </div>

                <button
                  onClick={() => toggleExpand(tec.id)}
                  className="mt-5 w-full py-2 px-3 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium text-xs transition flex items-center justify-center gap-1.5"
                >
                  <span>{isExpanded ? 'Ocultar análisis técnico' : 'Ver ventajas y desafíos'}</span>
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
