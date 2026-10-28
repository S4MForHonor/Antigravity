import React, { useState, useEffect } from 'react';
import { 
  Search, Filter, Database, RefreshCw, AlertCircle, 
  CheckCircle2, ChevronRight, X, Sparkles
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Tecnologia, Categoria, TipoItem } from '../types/database';

interface Props {
  refreshTrigger: number;
  onOpenAddModal: () => void;
}

export const CatalogoInteractivo: React.FC<Props> = ({ refreshTrigger, onOpenAddModal }) => {
  const [items, setItems] = useState<Tecnologia[]>([]);
  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Filtros
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedTipo, setSelectedTipo] = useState<'todos' | TipoItem>('todos');
  const [selectedCategoria, setSelectedCategoria] = useState<string>('todas');

  // Modal de detalles
  const [detailItem, setDetailItem] = useState<Tecnologia | null>(null);

  const fetchCategorias = async () => {
    if (!isSupabaseConfigured()) return;
    try {
      const { data, error } = await supabase
        .from('categorias')
        .select('*')
        .order('nombre');

      if (!error && data) {
        setCategorias(data as Categoria[]);
      }
    } catch (err) {
      console.error('Error al cargar categorías:', err);
    }
  };

  const fetchTecnologias = async () => {
    setLoading(true);
    setErrorMsg(null);

    if (!isSupabaseConfigured()) {
      setLoading(false);
      setErrorMsg('Supabase no está configurado. Por favor, crea tu archivo .env con las credenciales de tu proyecto.');
      return;
    }

    try {
      // Consulta relacional con JOIN a la tabla 'categorias'
      const { data, error } = await supabase
        .from('tecnologias')
        .select(`
          id,
          nombre,
          descripcion,
          ejemplos,
          ventajas,
          desafios,
          categoria_id,
          tipo,
          created_at,
          updated_at,
          categorias (
            id,
            nombre,
            descripcion,
            tipo
          )
        `)
        .order('nombre', { ascending: true });

      if (error) {
        console.error('Error de Supabase:', error);
        setErrorMsg(`Error al consultar la base de datos (${error.code}): ${error.message}`);
      } else {
        setItems((data as unknown as Tecnologia[]) || []);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setErrorMsg(`Error de conexión con la red de Supabase: ${msg}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategorias();
    fetchTecnologias();
  }, [refreshTrigger]);

  // Filtrado en el cliente de los datos recuperados de Supabase
  const filteredItems = items.filter((item) => {
    const matchesQuery = 
      item.nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.descripcion.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (item.ejemplos && item.ejemplos.toLowerCase().includes(searchQuery.toLowerCase()));

    const matchesTipo = selectedTipo === 'todos' || item.tipo === selectedTipo;
    const matchesCat = selectedCategoria === 'todas' || item.categoria_id === selectedCategoria;

    return matchesQuery && matchesTipo && matchesCat;
  });

  return (
    <section id="catalogo" className="py-16 md:py-24 bg-slate-100 text-slate-800 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Encabezado de la sección */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-slate-200">
          <div>
            <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-blue-600 bg-blue-50 px-3 py-1 rounded-full border border-blue-200 mb-3">
              <Database className="w-3.5 h-3.5" />
              <span>Base de Datos Relacional PostgreSQL</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
              Catálogo Interactivo en Vivo
            </h2>
            <p className="mt-2 text-sm sm:text-base text-slate-600 max-w-2xl">
              Todos los registros que observas a continuación se consultan en tiempo real desde Supabase mediante claves foráneas (<code className="font-mono text-xs bg-slate-200 px-1 py-0.5 rounded">categoria_id</code>).
            </p>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => { fetchCategorias(); fetchTecnologias(); }}
              className="p-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-700 border border-slate-200 shadow-sm transition flex items-center gap-2 text-xs font-semibold"
              title="Recargar desde Supabase"
            >
              <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin text-blue-600' : ''}`} />
              <span className="hidden sm:inline">Actualizar</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs sm:text-sm font-semibold shadow-md shadow-blue-600/20 transition flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4" />
              <span>Nuevo Registro</span>
            </button>
          </div>
        </div>

        {/* Barra de Filtros y Búsqueda */}
        <div className="mt-8 bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm space-y-4">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Buscador */}
            <div className="relative flex-1">
              <Search className="w-5 h-5 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
              <input
                type="text"
                placeholder="Buscar por nombre, descripción o palabra clave..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filtro por Categoría */}
            <div className="w-full md:w-64">
              <select
                value={selectedCategoria}
                onChange={(e) => setSelectedCategoria(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm bg-white"
              >
                <option value="todas">Todas las categorías ({categorias.length})</option>
                {categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Selector de Tipo (Pills) */}
          <div className="flex flex-wrap items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-500 font-semibold mr-2 flex items-center gap-1">
              <Filter className="w-3.5 h-3.5" />
              Tipo de elemento:
            </span>
            <button
              onClick={() => setSelectedTipo('todos')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedTipo === 'todos'
                  ? 'bg-blue-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Todos ({items.length})
            </button>
            <button
              onClick={() => setSelectedTipo('tecnologia')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedTipo === 'tecnologia'
                  ? 'bg-indigo-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Tecnologías ({items.filter(i => i.tipo === 'tecnologia').length})
            </button>
            <button
              onClick={() => setSelectedTipo('disciplina')}
              className={`px-3 py-1.5 rounded-lg font-medium transition ${
                selectedTipo === 'disciplina'
                  ? 'bg-purple-600 text-white font-semibold shadow-sm'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              Disciplinas ({items.filter(i => i.tipo === 'disciplina').length})
            </button>
          </div>
        </div>

        {/* Estados de Carga y Error */}
        {loading && (
          <div className="py-20 text-center">
            <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
            <p className="text-sm font-semibold text-slate-700">Cargando registros desde PostgreSQL en Supabase...</p>
            <p className="text-xs text-slate-500 mt-1">Ejecutando SELECT con JOIN sobre las tablas 'tecnologias' y 'categorias'</p>
          </div>
        )}

        {errorMsg && !loading && (
          <div className="mt-8 p-6 rounded-2xl bg-amber-50 border border-amber-300 text-amber-950">
            <div className="flex items-start gap-3">
              <AlertCircle className="w-6 h-6 text-amber-600 flex-shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-base text-amber-900">Aviso sobre la conexión con Supabase</h4>
                <p className="text-sm text-amber-800 mt-1">{errorMsg}</p>
                <div className="mt-4 flex flex-wrap gap-3">
                  <button
                    onClick={fetchTecnologias}
                    className="px-4 py-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white text-xs font-semibold shadow-sm"
                  >
                    Reintentar Consulta
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Resultados del Catálogo */}
        {!loading && !errorMsg && (
          <>
            {filteredItems.length === 0 ? (
              <div className="mt-8 py-16 px-4 text-center bg-white rounded-2xl border border-slate-200">
                <Database className="w-12 h-12 text-slate-300 mx-auto mb-3" />
                <h4 className="text-lg font-bold text-slate-800">No se encontraron registros coincidentes</h4>
                <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
                  Prueba cambiando los términos de búsqueda o los filtros seleccionados, o añade un nuevo registro a Supabase.
                </p>
                <button
                  onClick={() => { setSearchQuery(''); setSelectedTipo('todos'); setSelectedCategoria('todas'); }}
                  className="mt-4 px-4 py-2 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-xl text-xs font-semibold"
                >
                  Limpiar Filtros
                </button>
              </div>
            ) : (
              <div className="mt-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredItems.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => setDetailItem(item)}
                    className="group cursor-pointer bg-white rounded-2xl border border-slate-200 hover:border-blue-400 p-6 shadow-sm hover:shadow-lg transition-all duration-200 flex flex-col justify-between"
                  >
                    <div>
                      {/* Cabecera de la tarjeta */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
                          item.tipo === 'tecnologia'
                            ? 'bg-blue-50 text-blue-700 border-blue-200'
                            : 'bg-purple-50 text-purple-700 border-purple-200'
                        }`}>
                          {item.tipo === 'tecnologia' ? 'Tecnología' : 'Disciplina'}
                        </span>

                        <span className="text-[11px] font-medium text-slate-500 truncate max-w-[150px] bg-slate-100 px-2 py-0.5 rounded">
                          {item.categorias?.nombre || 'Categoría general'}
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                        {item.nombre}
                      </h3>

                      <p className="mt-2 text-xs sm:text-sm text-slate-600 line-clamp-3 leading-relaxed">
                        {item.descripcion}
                      </p>
                    </div>

                    <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-blue-600 font-semibold group-hover:text-blue-700">
                      <span>Ver detalles completos</span>
                      <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}

        {/* Modal de Detalle de Registro de Supabase */}
        {detailItem && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
            <div className="bg-white rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl border border-slate-200 max-h-[90vh] overflow-y-auto">
              
              <div className="flex items-start justify-between gap-4 mb-4">
                <div>
                  <div className="flex items-center gap-2 mb-1.5">
                    <span className={`text-xs font-bold uppercase px-2.5 py-0.5 rounded-full border ${
                      detailItem.tipo === 'tecnologia'
                        ? 'bg-blue-50 text-blue-700 border-blue-200'
                        : 'bg-purple-50 text-purple-700 border-purple-200'
                    }`}>
                      {detailItem.tipo === 'tecnologia' ? 'Tecnología' : 'Disciplina'}
                    </span>
                    <span className="text-xs font-medium text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                      {detailItem.categorias?.nombre || 'Categoría general'}
                    </span>
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900">{detailItem.nombre}</h3>
                </div>

                <button
                  onClick={() => setDetailItem(null)}
                  className="p-2 rounded-xl text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Contenido detallado */}
              <div className="space-y-4 text-sm text-slate-700 mt-4">
                <div>
                  <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">
                    Descripción Integral
                  </h4>
                  <p className="bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                    {detailItem.descripcion}
                  </p>
                </div>

                {detailItem.ejemplos && (
                  <div>
                    <h4 className="font-semibold text-slate-900 text-xs uppercase tracking-wider text-slate-500 mb-1">
                      Ejemplos de Aplicación y Casos de Uso
                    </h4>
                    <p className="bg-slate-50 p-3 rounded-xl border border-slate-100 leading-relaxed">
                      {detailItem.ejemplos}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {detailItem.ventajas && (
                    <div className="bg-emerald-50/80 border border-emerald-200 p-3.5 rounded-xl">
                      <h4 className="font-bold text-emerald-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                        Ventajas Principales
                      </h4>
                      <p className="text-xs text-emerald-950 leading-relaxed">
                        {detailItem.ventajas}
                      </p>
                    </div>
                  )}

                  {detailItem.desafios && (
                    <div className="bg-rose-50/80 border border-rose-200 p-3.5 rounded-xl">
                      <h4 className="font-bold text-rose-900 text-xs uppercase tracking-wider mb-1 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4 text-rose-600" />
                        Desafíos y Complejidad
                      </h4>
                      <p className="text-xs text-rose-950 leading-relaxed">
                        {detailItem.desafios}
                      </p>
                    </div>
                  )}
                </div>

                {/* Datos técnicos relacionales */}
                <div className="mt-6 pt-4 border-t border-slate-200 text-[11px] text-slate-500 font-mono space-y-1">
                  <p><strong>UUID:</strong> {detailItem.id}</p>
                  <p><strong>FK categoria_id:</strong> {detailItem.categoria_id}</p>
                  {detailItem.created_at && (
                    <p><strong>Fecha de registro:</strong> {new Date(detailItem.created_at).toLocaleString()}</p>
                  )}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-slate-100 flex justify-end">
                <button
                  onClick={() => setDetailItem(null)}
                  className="px-5 py-2.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-xl shadow-md transition"
                >
                  Cerrar Ventana
                </button>
              </div>

            </div>
          </div>
        )}

      </div>
    </section>
  );
};
