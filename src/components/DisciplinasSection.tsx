import React from 'react';
import { 
  Code, Wrench, BarChart3, Database, Network, ShieldCheck, 
  Terminal, Infinity, BrainCircuit, Headphones, Briefcase, 
  Search, HelpCircle
} from 'lucide-react';

export const DisciplinasSection: React.FC = () => {
  const disciplinas = [
    {
      nombre: 'Desarrollo de Software',
      campo: 'Construcción y Programación',
      icono: Code,
      color: 'text-blue-600 bg-blue-50 border-blue-200',
      rol: 'Desarrollador / Programador (Frontend, Backend, Mobile)',
      descripcion: 'Diseño e implementación de código fuente para crear aplicaciones, utilidades y servicios computacionales basados en requerimientos.',
      competencias: 'Python, JavaScript, TypeScript, Java, C#, lógica de algoritmos, estructuras de datos, control de versiones Git.'
    },
    {
      nombre: 'Ingeniería de Software',
      campo: 'Arquitectura y Metodología',
      icono: Wrench,
      color: 'text-indigo-600 bg-indigo-50 border-indigo-200',
      rol: 'Ingeniero de Software / Arquitecto de Software',
      descripcion: 'Aplicación sistemática de principios de ingeniería al ciclo de vida completo del software (diseño, calidad, arquitectura, escalabilidad y mantenimiento).',
      competencias: 'Patrones de diseño (GOF), microservicios, testing automatizado, estimación de deuda técnica, métricas de calidad de código.'
    },
    {
      nombre: 'Ciencia de Datos (Data Science)',
      campo: 'Analítica y Modelado',
      icono: BarChart3,
      color: 'text-emerald-600 bg-emerald-50 border-emerald-200',
      rol: 'Científico de Datos / Analista de Datos',
      descripcion: 'Extracción de conocimiento accionable y patrones predictivos a partir de grandes volúmenes de datos utilizando matemáticas y estadística.',
      competencias: 'Python (Pandas, NumPy, Scikit-learn), R, SQL analítico, visualización de datos, inferencia estadística.'
    },
    {
      nombre: 'Administración de Bases de Datos (DBA)',
      campo: 'Gobierno y Persistencia de Datos',
      icono: Database,
      color: 'text-cyan-600 bg-cyan-50 border-cyan-200',
      rol: 'Administrador de Bases de Datos (DBA)',
      descripcion: 'Garantía del rendimiento, integridad, disponibilidad continua, respaldos y seguridad de los motores de bases de datos empresariales.',
      competencias: 'PostgreSQL, Oracle, SQL Server, modelado relacional y normalización, planes de ejecución, tuning de índices, replicación.'
    },
    {
      nombre: 'Redes y Comunicaciones',
      campo: 'Infraestructura de Conectividad',
      icono: Network,
      color: 'text-sky-600 bg-sky-50 border-sky-200',
      rol: 'Ingeniero de Redes / Especialista de Telecomunicaciones',
      descripcion: 'Planificación, despliegue y supervisión de las redes locales (LAN), metropolitanas (MAN) y extendidas (WAN) que enlazan sistemas a nivel mundial.',
      competencias: 'Protocolos de enrutamiento (OSPF, BGP), subnetting IPv4/IPv6, configuración de switches/routers Cisco, VPNs, Wi-Fi 6.'
    },
    {
      nombre: 'Ciberseguridad y Seguridad de la Información',
      campo: 'Defensa y Gestión de Riesgos',
      icono: ShieldCheck,
      color: 'text-rose-600 bg-rose-50 border-rose-200',
      rol: 'Analista de Seguridad / Hacker Ético / CISO',
      descripcion: 'Auditoría de vulnerabilidades, respuesta ante incidentes, diseño de defensas perimetrales y cumplimiento normativo de protección de datos.',
      competencias: 'Pruebas de penetración (Pentesting), criptografía, estándares ISO 27001, análisis forense digital, concientización corporativa.'
    },
    {
      nombre: 'Administración de Sistemas (SysAdmin)',
      campo: 'Soporte de Plataformas y Servidores',
      icono: Terminal,
      color: 'text-amber-600 bg-amber-50 border-amber-200',
      rol: 'Administrador de Sistemas Linux/Windows',
      descripcion: 'Configuración, aprovisionamiento y mantenimiento de los sistemas operativos que ejecutan los servicios críticos de una empresa.',
      competencias: 'Bash scripting, PowerShell, Active Directory, gestión de permisos POSIX, parches del kernel, monitorización con Prometheus.'
    },
    {
      nombre: 'Computación en la Nube y DevOps',
      campo: 'Automatización y Entrega Continua',
      icono: Infinity,
      color: 'text-violet-600 bg-violet-50 border-violet-200',
      rol: 'DevOps Engineer / Cloud Architect / SRE',
      descripcion: 'Integración fluida entre desarrollo y operaciones mediante automatización de infraestructura, contenedores y pipelines de entrega continua.',
      competencias: 'Docker, Kubernetes, Terraform (IaC), AWS/Azure/GCP, pipelines CI/CD (GitHub Actions, GitLab CI), observabilidad.'
    },
    {
      nombre: 'Inteligencia Artificial y Machine Learning',
      campo: 'Modelos Cognitivos y Aprendizaje',
      icono: BrainCircuit,
      color: 'text-purple-600 bg-purple-50 border-purple-200',
      rol: 'Ingeniero de Machine Learning / Investigador de IA',
      descripcion: 'Investigación, desarrollo y puesta en producción de algoritmos de redes neuronales y modelos de aprendizaje profundo.',
      competencias: 'PyTorch, TensorFlow, procesamiento de lenguaje natural (NLP), visión por computadora, fine-tuning de modelos generativos.'
    },
    {
      nombre: 'Soporte Técnico y Mesa de Ayuda',
      campo: 'Atención al Usuario e Incidencias',
      icono: Headphones,
      color: 'text-teal-600 bg-teal-50 border-teal-200',
      rol: 'Técnico de Help Desk / Soporte de TI',
      descripcion: 'Diagnóstico y resolución rápida de problemas operativos con computadoras, software de oficina y periféricos para mantener la productividad.',
      competencias: 'Metodología ITIL, diagnóstico de hardware, configuración de clientes de correo, clonación de discos, paciencia y empatía.'
    },
    {
      nombre: 'Gestión de Proyectos Tecnológicos (Tech PM)',
      campo: 'Liderazgo y Gestión Ágil',
      icono: Briefcase,
      color: 'text-orange-600 bg-orange-50 border-orange-200',
      rol: 'Product Owner / Scrum Master / Project Manager TI',
      descripcion: 'Planificación, coordinación del equipo multidisciplinario, gestión de presupuestos y aseguramiento de entregas a tiempo.',
      competencias: 'Scrum, Kanban, Jira, gestión de riesgos, negociación de alcances, comunicación efectiva entre perfiles técnicos y de negocio.'
    },
    {
      nombre: 'Análisis de Sistemas',
      campo: 'Requerimientos y Procesos de Negocio',
      icono: Search,
      color: 'text-blue-700 bg-blue-50 border-blue-200',
      rol: 'Analista Funcional / Analista de Sistemas',
      descripcion: 'Estudio detallado de los procesos empresariales para diseñar la estructura de los sistemas antes de iniciar la programación del código.',
      competencias: 'Diagramas UML, modelado de procesos BPMN, especificación de requerimientos (SRS), entrevistas con usuarios y validación funcional.'
    }
  ];

  return (
    <section id="disciplinas" className="py-16 md:py-24 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="text-center max-w-3xl mx-auto">
          <span className="text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200">
            Perfiles y Campos del Saber
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 mt-4 tracking-tight">
            Disciplinas que Forman Parte de las TI
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
            Detrás de cada pantalla y cada base de datos existe un ecosistema de profesionales especializados. Descubre las principales disciplinas técnicas y de gestión.
          </p>
        </div>

        {/* Cuadro Pedagógico: Diferencia entre Tecnologías y Disciplinas */}
        <div className="mt-12 bg-gradient-to-r from-blue-900 to-indigo-950 text-white p-6 sm:p-8 rounded-3xl shadow-xl">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 bg-blue-500/20 rounded-lg text-blue-300 border border-blue-400/30">
              <HelpCircle className="w-5 h-5" />
            </div>
            <h3 className="text-lg sm:text-xl font-bold">
              Distinción Académica Clave: ¿Tecnología o Disciplina?
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-sm text-slate-200">
            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-blue-300 text-base mb-1">
                Tecnología = La Herramienta
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Es el medio técnico, dispositivo físico, lenguaje o software concreto que se utiliza. Por ejemplo: <em>PostgreSQL, una antena Wi-Fi 6, un microprocesador Intel Core o un cable de fibra óptica</em>.
              </p>
            </div>

            <div className="bg-white/10 p-4 rounded-xl border border-white/10">
              <h4 className="font-bold text-indigo-300 text-base mb-1">
                Disciplina = El Área de Conocimiento y Trabajo
              </h4>
              <p className="text-slate-300 leading-relaxed">
                Es la profesión, metodología y cuerpo teórico que estudia cómo usar las herramientas para resolver necesidades humanas. Por ejemplo: <em>Administración de Bases de Datos, Ciberseguridad o Ingeniería de Software</em>.
              </p>
            </div>
          </div>

          <p className="mt-4 text-xs text-blue-200/90 italic">
            * <strong>Nota de solapamiento:</strong> En el mundo real, los límites entre disciplinas son dinámicos y permeables. Un ingeniero DevOps necesita conocimientos de Desarrollo y de SysAdmin, mientras que un DBA suele dominar análisis de datos y seguridad.
          </p>
        </div>

        {/* Rejilla de Disciplinas */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {disciplinas.map((disc, idx) => {
            const Icon = disc.icono;
            return (
              <div 
                key={idx}
                className="bg-slate-50 hover:bg-white rounded-2xl border border-slate-200 hover:border-blue-300 p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className={`w-11 h-11 rounded-xl flex items-center justify-center border ${disc.color}`}>
                      <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                      {disc.campo}
                    </span>
                  </div>

                  <h3 className="text-base font-bold text-slate-900">
                    {disc.nombre}
                  </h3>

                  <p className="text-xs font-semibold text-blue-700 mt-1">
                    {disc.rol}
                  </p>

                  <p className="mt-2.5 text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {disc.descripcion}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-slate-200 text-xs">
                  <span className="font-semibold text-slate-900 block mb-1">Habilidades y tecnologías asociadas:</span>
                  <span className="text-slate-600 font-mono text-[11px]">{disc.competencias}</span>
                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
