import React, { useState, useEffect } from 'react';
import { 
  PlusCircle, CheckCircle2, AlertTriangle, 
  Send, X, Info
} from 'lucide-react';
import { supabase, isSupabaseConfigured } from '../lib/supabase';
import { Categoria, FormTecnologiaInput } from '../types/database';

interface Props {
  onItemAdded: () => void;
  isOpenModal?: boolean;
  onCloseModal?: () => void;
}

export const FormularioAgregar: React.FC<Props> = ({ onItemAdded, isOpenModal = false, onCloseModal }) => {
  const [formData, setFormData] = useState<FormTecnologiaInput>({
    nombre: '',
    descripcion: '',
    categoria_id: '',
    tipo: 'tecnologia',
    ejemplos: '',
    ventajas: '',
    desafios: '',
  });

  const [categorias, setCategorias] = useState<Categoria[]>([]);
  const [loadingCats, setLoadingCats] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [successMsg, setSuccessMsg] = useState<string | null>(null);

  // Cargar categorías disponibles desde Supabase
  useEffect(() => {
    const fetchCats = async () => {
      if (!isSupabaseConfigured()) return;
      setLoadingCats(true);
      try {
        const { data, error } = await supabase
          .from('categorias')
          .select('*')
          .order('nombre');

        if (!error && data) {
          setCategorias(data as Categoria[]);
          if (data.length > 0 && !formData.categoria_id) {
            setFormData(prev => ({ ...prev, categoria_id: data[0].id }));
          }
        }
      } catch (err) {
        console.error('Error al obtener categorías:', err);
      } finally {
        setLoadingCats(false);
      }
    };

    fetchCats();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setFormError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setFormError(null);
    setSuccessMsg(null);

    // Validación de cliente
    if (!formData.nombre.trim()) {
      setFormError('El nombre del elemento es obligatorio.');
      return;
    }
    if (!formData.descripcion.trim()) {
      setFormError('La descripción educativa es obligatoria.');
      return;
    }
    if (!formData.categoria_id) {
      setFormError('Debes seleccionar una categoría válida.');
      return;
    }

    if (!isSupabaseConfigured()) {
      setFormError('Supabase no está configurado en el archivo .env. No se puede insertar sin conexión a la base de datos.');
      return;
    }

    setSubmitting(true);

    try {
      // Inserción real en PostgreSQL a través de Supabase
      const { error } = await supabase
        .from('tecnologias')
        .insert([
          {
            nombre: formData.nombre.trim(),
            descripcion: formData.descripcion.trim(),
            categoria_id: formData.categoria_id,
            tipo: formData.tipo,
            ejemplos: formData.ejemplos.trim() || null,
            ventajas: formData.ventajas.trim() || null,
            desafios: formData.desafios.trim() || null,
          }
        ])
        .select();

      if (error) {
        console.error('Error al insertar en Supabase:', error);
        setFormError(`Error de Supabase (${error.code}): ${error.message}`);
      } else {
        setSuccessMsg(`¡Registro "${formData.nombre}" guardado con éxito en PostgreSQL (Supabase)!`);
        // Reset del formulario manteniendo la categoría seleccionada
        setFormData({
          nombre: '',
          descripcion: '',
          categoria_id: formData.categoria_id,
          tipo: formData.tipo,
          ejemplos: '',
          ventajas: '',
          desafios: '',
        });

        // Notificar al componente padre para refrescar el catálogo
        onItemAdded();
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : String(err);
      setFormError(`Error de comunicación con el servidor: ${msg}`);
    } finally {
      setSubmitting(false);
    }
  };

  const formContent = (
    <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-10 shadow-sm">
      <div className="flex items-center justify-between pb-6 border-b border-slate-200">
        <div>
          <div className="inline-flex items-center gap-2 text-xs uppercase font-bold tracking-widest text-indigo-600 bg-indigo-50 px-3 py-1 rounded-full border border-indigo-200 mb-2">
            <PlusCircle className="w-3.5 h-3.5" />
            <span>Formulario Académico Funcional</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            Incorporar Tecnología o Disciplina
          </h2>
          <p className="mt-1 text-xs sm:text-sm text-slate-600">
            Los datos enviados mediante este formulario se persisten directamente en la tabla <code className="font-mono bg-slate-100 px-1 py-0.5 rounded text-blue-700">tecnologias</code> de Supabase.
          </p>
        </div>

        {isOpenModal && onCloseModal && (
          <button 
            onClick={onCloseModal}
            className="p-2 text-slate-400 hover:text-slate-700 rounded-xl hover:bg-slate-100 transition"
          >
            <X className="w-6 h-6" />
          </button>
        )}
      </div>

      {formError && (
        <div className="mt-6 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-900 flex items-start gap-3 text-xs sm:text-sm">
          <AlertTriangle className="w-5 h-5 text-rose-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">No se pudo guardar el registro:</p>
            <p className="mt-0.5 text-rose-800">{formError}</p>
          </div>
        </div>
      )}

      {successMsg && (
        <div className="mt-6 p-4 rounded-xl bg-emerald-50 border border-emerald-200 text-emerald-900 flex items-start gap-3 text-xs sm:text-sm animate-fadeIn">
          <CheckCircle2 className="w-5 h-5 text-emerald-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-bold">Operación completada:</p>
            <p className="mt-0.5 text-emerald-800">{successMsg}</p>
            <p className="text-[11px] text-emerald-700 mt-1">El nuevo registro ya es visible en el catálogo y continuará almacenado tras recargar.</p>
          </div>
        </div>
      )}

      <form onSubmit={handleSubmit} className="mt-6 space-y-6">
        
        {/* Selector de Tipo (Tecnología vs Disciplina) */}
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
            Tipo de Registro *
          </label>
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, tipo: 'tecnologia' }))}
              className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition text-left flex items-center gap-2.5 ${
                formData.tipo === 'tecnologia'
                  ? 'border-blue-600 bg-blue-50/80 text-blue-900 ring-2 ring-blue-600/20'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full border-2 ${formData.tipo === 'tecnologia' ? 'border-blue-600 bg-blue-600' : 'border-slate-400'}`} />
              <div>
                <p className="font-bold">Tecnología</p>
                <p className="text-[11px] text-slate-500 font-normal">Herramienta técnica o software</p>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setFormData(prev => ({ ...prev, tipo: 'disciplina' }))}
              className={`p-3.5 rounded-xl border text-xs sm:text-sm font-semibold transition text-left flex items-center gap-2.5 ${
                formData.tipo === 'disciplina'
                  ? 'border-purple-600 bg-purple-50/80 text-purple-900 ring-2 ring-purple-600/20'
                  : 'border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className={`w-3.5 h-3.5 rounded-full border-2 ${formData.tipo === 'disciplina' ? 'border-purple-600 bg-purple-600' : 'border-slate-400'}`} />
              <div>
                <p className="font-bold">Disciplina</p>
                <p className="text-[11px] text-slate-500 font-normal">Campo profesional o saber</p>
              </div>
            </button>
          </div>
        </div>

        {/* Nombre y Categoría */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="nombre" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Nombre *
            </label>
            <input
              id="nombre"
              name="nombre"
              type="text"
              required
              placeholder="Ej. Kubernetes, GraphQL, Bioinformática..."
              value={formData.nombre}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
            />
          </div>

          <div>
            <label htmlFor="categoria_id" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Categoría Relacional (Clave Foránea) *
            </label>
            <select
              id="categoria_id"
              name="categoria_id"
              required
              value={formData.categoria_id}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm bg-white"
            >
              {categorias.length === 0 ? (
                <option value="">{loadingCats ? 'Cargando categorías...' : 'Sin categorías disponibles'}</option>
              ) : (
                categorias.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.nombre} ({cat.tipo})
                  </option>
                ))
              )}
            </select>
          </div>
        </div>

        {/* Descripción */}
        <div>
          <label htmlFor="descripcion" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Descripción Educativa *
          </label>
          <textarea
            id="descripcion"
            name="descripcion"
            required
            rows={3}
            placeholder="Explica qué es, cuál es su propósito y cómo funciona de forma clara para estudiantes..."
            value={formData.descripcion}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
          />
        </div>

        {/* Ejemplos de aplicación */}
        <div>
          <label htmlFor="ejemplos" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
            Ejemplos de Aplicación y Casos de Uso
          </label>
          <textarea
            id="ejemplos"
            name="ejemplos"
            rows={2}
            placeholder="Ejemplos prácticos, productos representativos o aplicaciones cotidianas..."
            value={formData.ejemplos}
            onChange={handleChange}
            className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600/20 focus:border-blue-600 text-sm"
          />
        </div>

        {/* Ventajas y Desafíos */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label htmlFor="ventajas" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Ventajas Principales
            </label>
            <textarea
              id="ventajas"
              name="ventajas"
              rows={2}
              placeholder="Beneficios, eficiencia, seguridad, escalabilidad..."
              value={formData.ventajas}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-600/20 focus:border-emerald-600 text-sm"
            />
          </div>

          <div>
            <label htmlFor="desafios" className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
              Desafíos, Retos o Riesgos
            </label>
            <textarea
              id="desafios"
              name="desafios"
              rows={2}
              placeholder="Curva de aprendizaje, costos, vulnerabilidades, obsolescencia..."
              value={formData.desafios}
              onChange={handleChange}
              className="w-full px-4 py-2.5 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-rose-600/20 focus:border-rose-600 text-sm"
            />
          </div>
        </div>

        {/* Botón de envío */}
        <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-1.5 text-xs text-slate-500">
            <Info className="w-4 h-4 text-slate-400" />
            <span>Se ejecutará una instrucción SQL INSERT en la base de datos Supabase.</span>
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-semibold text-sm shadow-md shadow-blue-500/25 transition disabled:opacity-50 flex items-center gap-2"
          >
            {submitting ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                <span>Guardando en PostgreSQL...</span>
              </>
            ) : (
              <>
                <Send className="w-4 h-4" />
                <span>Insertar en Supabase</span>
              </>
            )}
          </button>
        </div>

      </form>
    </div>
  );

  if (isOpenModal) {
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-fadeIn">
        <div className="max-w-3xl w-full max-h-[92vh] overflow-y-auto">
          {formContent}
        </div>
      </div>
    );
  }

  return (
    <section id="agregar" className="py-16 md:py-24 bg-white text-slate-800 border-b border-slate-200">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {formContent}
      </div>
    </section>
  );
};
