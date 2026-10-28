export type TipoItem = 'tecnologia' | 'disciplina';

export interface Categoria {
  id: string;
  nombre: string;
  descripcion: string | null;
  tipo: 'tecnologia' | 'disciplina' | 'general';
  created_at?: string;
}

export interface Tecnologia {
  id: string;
  nombre: string;
  descripcion: string;
  ejemplos: string | null;
  ventajas: string | null;
  desafios: string | null;
  categoria_id: string;
  tipo: TipoItem;
  created_at?: string;
  updated_at?: string;
  categorias?: Categoria | null;
}

export interface GlosarioTermino {
  id: string;
  termino: string;
  definicion: string;
  categoria: string;
  ejemplo?: string;
  created_at?: string;
}

export interface FormTecnologiaInput {
  nombre: string;
  descripcion: string;
  categoria_id: string;
  tipo: TipoItem;
  ejemplos: string;
  ventajas: string;
  desafios: string;
}

