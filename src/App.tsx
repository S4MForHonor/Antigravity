import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { QueSonLasTI } from './components/QueSonLasTI';
import { TecnologiasSection } from './components/TecnologiasSection';
import { DisciplinasSection } from './components/DisciplinasSection';
import { CatalogoInteractivo } from './components/CatalogoInteractivo';
import { FormularioAgregar } from './components/FormularioAgregar';
import { ImportanciaSection } from './components/ImportanciaSection';
import { GlosarioSection } from './components/GlosarioSection';
import { BibliografiaSection } from './components/BibliografiaSection';
import { Footer } from './components/Footer';
import { checkSupabaseConnection } from './lib/supabase';

export const App: React.FC = () => {
  const [activeSection, setActiveSection] = useState('inicio');
  const [isDbConnected, setIsDbConnected] = useState(false);
  const [refreshTrigger, setRefreshTrigger] = useState(0);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const checkConnection = async () => {
    const diag = await checkSupabaseConnection();
    setIsDbConnected(diag.status === 'connected');
  };

  useEffect(() => {
    checkConnection();
  }, []);

  const handleItemAdded = () => {
    // Incrementa el trigger para refrescar automáticamente el catálogo
    setRefreshTrigger(prev => prev + 1);
    setIsAddModalOpen(false);
  };

  const handleNavigate = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col font-sans">
      {/* Banner de diagnóstico en vivo de la conexión con Supabase */}
    

      {/* Barra de navegación superior fija */}
      <Navbar 
        activeSection={activeSection} 
        setActiveSection={handleNavigate} 
        isDbConnected={isDbConnected}
      />

      {/* Contenido Principal */}
      <main className="flex-1">
        {/* Sección A: Inicio / Hero */}
        <Hero onExplore={handleNavigate} />

        {/* Sección B: ¿Qué son las TI? */}
        <QueSonLasTI />

        {/* Sección C: Tecnologías que integran las TI */}
        <TecnologiasSection />

        {/* Sección D: Disciplinas que forman parte de las TI */}
        <DisciplinasSection />

        {/* Sección E: Catálogo interactivo conectado a Supabase */}
        <CatalogoInteractivo 
          refreshTrigger={refreshTrigger}
          onOpenAddModal={() => setIsAddModalOpen(true)}
        />

        {/* Sección F: Formulario funcional de inserción */}
        <FormularioAgregar 
          onItemAdded={handleItemAdded} 
        />

        {/* Sección G: Importancia de las TI y dilemas éticos */}
        <ImportanciaSection />

        {/* Sección H: Glosario de términos técnicos */}
        <GlosarioSection />

        {/* Sección I: Fuentes bibliográficas oficiales */}
        <BibliografiaSection />
      </main>

      {/* Modal flotante de inserción rápida */}
      {isAddModalOpen && (
        <FormularioAgregar
          isOpenModal={true}
          onCloseModal={() => setIsAddModalOpen(false)}
          onItemAdded={handleItemAdded}
        />
      )}

      {/* Pie de página con resumen para la cátedra */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
};

export default App;

