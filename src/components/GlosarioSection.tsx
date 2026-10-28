import React, { useState, useEffect } from 'react';
import { Search, BookA, Database } from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { GlosarioTermino } from '../types/database';

export const GlosarioSection: React.FC = () => {
  const [terminos, setTerminos] = useState<GlosarioTermino[]>([]);
  const [query, setQuery] = useState('');
  const [loadedFromDb, setLoadedFromDb] = useState(false);

  // Glosario académico base de respaldo con definiciones canónicas
  const defaultTerminos: GlosarioTermino[] = [
    {
      id: 'g-1',
      termino: 'Servidor',
      categoria: 'Infraestructura',
      definicion: 'Sistema informático (hardware y software) diseñado para procesar solicitudes y entregar datos a otras computadoras conectadas denominadas clientes.',
      ejemplo: 'Un servidor web Nginx despachando páginas HTML o un servidor PostgreSQL respondiendo consultas SQL.'
    },
    {
      id: 'g-2',
      termino: 'Cliente',
      categoria: 'Infraestructura',
      definicion: 'Dispositivo o aplicación frontend que inicia una petición de servicio o recurso a un servidor centralizado.',
      ejemplo: 'Tu navegador web solicitando el archivo de la página o una app bancaria en el celular.'
    },
    {
      id: 'g-3',
      termino: 'Hardware',
      categoria: 'Arquitectura',
      definicion: 'Componentes físicos, electrónicos y electromecánicos tangibles de una computadora o dispositivo.',
      ejemplo: 'Placa madre, microprocesador, tarjetas gráficas, memoria RAM y discos de estado sólido (SSD).'
    },
    {
      id: 'g-4',
      termino: 'Software',
      categoria: 'Lógica Computacional',
      definicion: 'Conjunto intangible de instrucciones, programas, reglas y documentación que posibilitan la ejecución de tareas específicas.',
      ejemplo: 'El sistema operativo Linux, compiladores, navegadores web y videojuegos.'
    },
    {
      id: 'g-5',
      termino: 'Algoritmo',
      categoria: 'Ciencias de la Computación',
      definicion: 'Secuencia ordenada, finita y determinista de pasos lógicos e inequívocos que resuelven un problema o ejecutan un cómputo.',
      ejemplo: 'Algoritmo Quicksort para ordenar listas o Dijkstra para hallar la ruta más corta en un mapa GPS.'
    },
    {
      id: 'g-6',
      termino: 'Base de Datos (Database)',
      categoria: 'Gestión de Datos',
      definicion: 'Colección organizada y estructurada de información electrónica gestionada por un SGBD para garantizar atomicidad y consistencia.',
      ejemplo: 'PostgreSQL, Supabase, MySQL o Oracle organizando tablas con claves foráneas.'
    },
    {
      id: 'g-7',
      termino: 'Nube (Cloud Computing)',
      categoria: 'Infraestructura Elástica',
      definicion: 'Modelo de acceso ubicuo y bajo demanda a un fondo común de recursos informáticos compartidos a través de Internet.',
      ejemplo: 'Almacenar datos en Amazon S3, desplegar frontend en Vercel o gestionar BD en Supabase.'
    },
    {
      id: 'g-8',
      termino: 'Red Informática (Network)',
      categoria: 'Comunicaciones',
      definicion: 'Conjunto de dispositivos de computación interconectados por enlaces físicos o inalámbricos para compartir datos y periféricos.',
      ejemplo: 'La red global Internet o la red de área local (LAN) de una universidad.'
    },
    {
      id: 'g-9',
      termino: 'API (Application Programming Interface)',
      categoria: 'Desarrollo de Software',
      definicion: 'Conjunto estandarizado de definiciones, rutas y protocolos que permiten que dos aplicaciones se comuniquen entre sí.',
      ejemplo: 'La API de Supabase permitiendo a este sitio React consultar y guardar filas en PostgreSQL.'
    },
    {
      id: 'g-10',
      termino: 'Inteligencia Artificial (IA)',
      categoria: 'Cómputo Avanzado',
      definicion: 'Rama interdisciplinaria que modela sistemas informáticos capaces de realizar tareas complejas asociadas al pensamiento humano.',
      ejemplo: 'Modelos de lenguaje multimodal, visión por computadora y robótica adaptativa.'
    },
    {
      id: 'g-11',
      termino: 'Ciberseguridad',
      categoria: 'Protección y Resiliencia',
      definicion: 'Práctica de proteger sistemas, servidores, dispositivos móviles, redes y datos contra ataques digitales maliciosos.',
      ejemplo: 'Cifrado SSL/TLS, firewalls, políticas Zero Trust y autenticación multifactor.'
    }
  ];

  useEffect(() => {
    const fetchGlosarioFromSupabase = async () => {
      if (!isSupabaseConfigured()) {
        setTerminos(defaultTerminos);
        return;
      }

      try {
        const { data, error } = await supabase
          .from('glosario')
          .select('*')
          .order('termino');

        if (!error && data && data.length > 0) {
          setTerminos(data as GlosarioTermino[]);
          setLoadedFromDb(true);
        } else {
          setTerminos(defaultTerminos);
        }
      } catch (err) {
        console.error('Error al cargar glosario desde Supabase:', err);
        setTerminos(defaultTerminos);
      }
    };

    fetchGlosarioFromSupabase();
  }, []);

  const filteredTerminos = terminos.filter(t => 
    t.termino.toLowerCase().includes(query.toLowerCase()) ||
    t.definicion.toLowerCase().includes(query.toLowerCase()) ||
    t.categoria.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <section id="glosario" className="py-16 md:py-24 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-2">
              <BookA className="w-3.5 h-3.5" />
              <span>Vocabulario Académico</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Glosario Terminológico de TI
            </h2>
            <p className="mt-1 text-sm sm:text-base text-slate-600 max-w-2xl">
              Conceptos esenciales que todo estudiante y profesional de sistemas debe dominar con precisión conceptual.
            </p>
          </div>

          <div className="flex items-center gap-2">
            <span className={`text-xs px-2.5 py-1 rounded-full border font-medium flex items-center gap-1.5 ${
              loadedFromDb 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                : 'bg-slate-100 text-slate-600 border-slate-200'
            }`}>
              <Database className="w-3.5 h-3.5" />
              <span>{loadedFromDb ? 'Sincronizado con Supabase' : 'Glosario Académico Base'}</span>
            </span>
          </div>
        </div>

        {/* Buscador de términos */}
        <div className="mt-8 max-w-md">
          <div className="relative">
            <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Buscar término en el glosario..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
            />
          </div>
        </div>

        {/* Lista de términos */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredTerminos.map((item) => (
            <div 
              key={item.id}
              className="p-6 rounded-2xl bg-slate-50 border border-slate-200 hover:border-blue-300 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between gap-2 mb-2">
                  <h3 className="text-lg font-bold text-slate-900">
                    {item.termino}
                  </h3>
                  <span className="text-[10px] font-semibold uppercase px-2 py-0.5 rounded bg-white text-slate-600 border border-slate-200">
                    {item.categoria}
                  </span>
                </div>
                <p className="mt-2 text-xs sm:text-sm text-slate-600 leading-relaxed">
                  {item.definicion}
                </p>
              </div>

              {item.ejemplo && (
                <div className="mt-4 pt-3 border-t border-slate-200 text-xs bg-white/70 p-2.5 rounded-xl text-slate-700">
                  <span className="font-semibold text-blue-700 block mb-0.5">Ejemplo ilustrativo:</span>
                  <span>{item.ejemplo}</span>
                </div>
              )}
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};
