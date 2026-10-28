import React, { useState, useEffect } from 'react';
import { Database, AlertTriangle, CheckCircle2, Copy, Check, ExternalLink, HelpCircle } from 'lucide-react';
import { checkSupabaseConnection, SupabaseDiagnostic } from '../lib/supabase';

interface Props {
  onRefreshNeeded?: () => void;
}

export const DatabaseStatusBanner: React.FC<Props> = ({ onRefreshNeeded }) => {
  const [diagnostic, setDiagnostic] = useState<SupabaseDiagnostic | null>(null);
  const [loading, setLoading] = useState(true);
  const [copied, setCopied] = useState(false);
  const [showSqlGuide, setShowSqlGuide] = useState(false);

  const runCheck = async () => {
    setLoading(true);
    const res = await checkSupabaseConnection();
    setDiagnostic(res);
    setLoading(false);
  };

  useEffect(() => {
    runCheck();
  }, []);

  const copyEnvSample = () => {
    const text = `VITE_SUPABASE_URL=https://tu-proyecto.supabase.co\nVITE_SUPABASE_ANON_KEY=tu-anon-key-aqui`;
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (loading) {
    return (
      <div className="bg-slate-100 border-b border-slate-200 text-xs text-slate-600 py-1.5 px-4 text-center flex items-center justify-center gap-2">
        <div className="w-2.5 h-2.5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
        <span>Comprobando conexión con Supabase PostgreSQL...</span>
      </div>
    );
  }

  if (diagnostic?.status === 'connected') {
    return (
      <div className="bg-emerald-50 border-b border-emerald-200 text-xs text-emerald-800 py-1.5 px-4 flex items-center justify-between">
        <div className="flex items-center gap-2 max-w-7xl mx-auto w-full">
          <CheckCircle2 className="w-4 h-4 text-emerald-600 flex-shrink-0" />
          <span className="font-medium">Base de Datos PostgreSQL Conectada:</span>
          <span>Tablas relacionales activas en Supabase con Row Level Security (RLS).</span>
          <button 
            onClick={() => { runCheck(); onRefreshNeeded?.(); }}
            className="ml-auto text-emerald-700 hover:text-emerald-900 underline font-medium"
          >
            Reverificar
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-amber-50 border-b border-amber-300 text-amber-900 px-4 py-3 text-xs md:text-sm">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
        <div className="flex items-start gap-3">
          <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <p className="font-semibold text-amber-950 flex items-center gap-1.5">
              <span>Estado de Supabase:</span>
              <span className="px-2 py-0.5 rounded text-xs font-mono bg-amber-200 text-amber-900">
                {diagnostic?.status === 'not_configured' ? 'Credenciales pendientes' : diagnostic?.status}
              </span>
            </p>
            <p className="text-amber-800 mt-0.5">
              {diagnostic?.message}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2 self-end md:self-center">
          <button
            onClick={() => setShowSqlGuide(!showSqlGuide)}
            className="px-3 py-1.5 rounded-lg bg-amber-200 hover:bg-amber-300 text-amber-900 font-medium transition flex items-center gap-1.5"
          >
            <HelpCircle className="w-4 h-4" />
            <span>Guía de Conexión</span>
          </button>
          <button
            onClick={() => { runCheck(); onRefreshNeeded?.(); }}
            className="px-3 py-1.5 rounded-lg bg-amber-600 hover:bg-amber-700 text-white font-medium transition flex items-center gap-1.5 shadow-sm"
          >
            <span>Reintentar</span>
          </button>
        </div>
      </div>

      {showSqlGuide && (
        <div className="mt-4 pt-3 border-t border-amber-200 text-xs bg-amber-100/60 p-4 rounded-lg text-amber-950">
          <h4 className="font-bold text-sm mb-2 flex items-center gap-1.5 text-blue-950">
            <Database className="w-4 h-4 text-blue-600" />
            Pasos para conectar tu base de datos en Supabase:
          </h4>
          <ol className="list-decimal pl-5 space-y-1.5 mb-3">
            <li>
              Crea un proyecto gratuito en <a href="https://supabase.com" target="_blank" rel="noreferrer" className="text-blue-700 underline font-semibold inline-flex items-center gap-0.5">supabase.com <ExternalLink className="w-3 h-3" /></a>
            </li>
            <li>
              Ve a <strong>Project Settings &gt; API</strong> y copia la <strong>Project URL</strong> y la <strong>anon public key</strong>.
            </li>
            <li>
              Crea un archivo llamado <code className="bg-white px-1.5 py-0.5 rounded border border-amber-300 font-mono">.env</code> en la raíz del proyecto y añade tus claves:
            </li>
          </ol>
          <div className="relative bg-slate-900 text-slate-100 p-3 rounded font-mono text-xs my-2">
            <p>VITE_SUPABASE_URL=https://tu-proyecto.supabase.co</p>
            <p>VITE_SUPABASE_ANON_KEY=tu-clave-anon-aqui</p>
            <button
              onClick={copyEnvSample}
              className="absolute top-2 right-2 px-2 py-1 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 text-xs flex items-center gap-1"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copiado' : 'Copiar formato'}</span>
            </button>
          </div>
          <p className="mt-2 text-slate-700">
            4. En Supabase, abre el <strong>SQL Editor</strong>, pega y ejecuta el contenido del archivo <code className="font-mono bg-white px-1 py-0.5 rounded border border-amber-300">supabase/migrations/001_initial_schema.sql</code> que ya generamos para ti. ¡Luego haz clic en Reintentar!
          </p>
        </div>
      )}
    </div>
  );
};
