# 🎓 Proyecto Integrador: Tecnologías de la Información & Bases de Datos 1

Portal educativo interactivo, moderno y full-stack desarrollado para las materias **Tecnología de la Información** y **Bases de Datos 1**. Permite a cualquier persona comprender los fundamentos de las TI, las tecnologías que las integran, sus disciplinas profesionales asociadas y consultar o almacenar registros en tiempo real en una base de datos relacional **PostgreSQL** alojada en **Supabase**, con despliegue en **Vercel**.

---

## 🚀 Arquitectura y Tecnologías Utilizadas

- **Frontend:** React 18, TypeScript, Tailwind CSS, Lucide Icons.
- **Herramienta de Construcción:** Vite 5.
- **Base de Datos Relacional:** PostgreSQL 15+ en Supabase.
- **Control de Acceso y Seguridad:** Row Level Security (RLS) en PostgreSQL.
- **Control de Versiones:** Git (rama `main`).
- **Despliegue y Hosting:** Vercel (con reescritura de rutas SPA en `vercel.json`).

---

## 🏛️ Modelo y Diseño de Base de Datos (PostgreSQL en Supabase)

El esquema relacional fue modelado con rigor académico, aplicando claves primarias (`UUID`), integridad referencial mediante claves foráneas con eliminación en cascada (`ON DELETE CASCADE`), restricciones de chequeo (`CHECK`), índices de rendimiento y un trigger procedimental en PL/pgSQL para mantener actualizada la marca temporal `updated_at`.

### 1. Tabla: `categorias`
Representa las áreas de conocimiento que agrupan tecnologías y disciplinas.
- `id` (UUID, PK, Default `gen_random_uuid()`): Identificador único.
- `nombre` (TEXT, NOT NULL, UNIQUE): Nombre de la categoría.
- `descripcion` (TEXT): Descripción conceptual del área.
- `tipo` (TEXT, CHECK: `'tecnologia'`, `'disciplina'`, `'general'`).
- `created_at` (TIMESTAMPTZ, Default `now()`).

### 2. Tabla: `tecnologias`
Almacena las tecnologías y disciplinas educativas.
- `id` (UUID, PK, Default `gen_random_uuid()`).
- `nombre` (TEXT, NOT NULL).
- `descripcion` (TEXT, NOT NULL).
- `ejemplos` (TEXT): Casos de uso y ejemplos de aplicación real.
- `ventajas` (TEXT): Beneficios y fortalezas técnicas.
- `desafios` (TEXT): Retos, complejidad o riesgos asociados.
- `categoria_id` (UUID, FK que referencia a `categorias(id)` con `ON DELETE CASCADE`).
- `tipo` (TEXT, CHECK: `'tecnologia'`, `'disciplina'`).
- `created_at` (TIMESTAMPTZ, Default `now()`).
- `updated_at` (TIMESTAMPTZ, Default `now()`, automatizado con trigger).

### 3. Tabla: `glosario`
Términos fundamentales de TI para consulta rápida.
- `id` (UUID, PK, Default `gen_random_uuid()`).
- `termino` (TEXT, NOT NULL, UNIQUE).
- `definicion` (TEXT, NOT NULL).
- `categoria` (TEXT).
- `ejemplo` (TEXT).
- `created_at` (TIMESTAMPTZ, Default `now()`).

### Diagrama de Relación

```text
categorias (1) ───────────< (N) tecnologias
[id]                            [categoria_id]
```

### 🔒 Políticas de Seguridad (Row Level Security - RLS)
- **Lectura Pública (`SELECT`):** Habilitada para todas las tablas (`USING (true)`), permitiendo a cualquier estudiante o visitante explorar el contenido.
- **Inserción Pública Controlada (`INSERT`):** Habilitada con validación de longitud de texto y claves foráneas obligatorias (`CHECK (length(trim(nombre)) > 0 AND length(trim(descripcion)) > 0 AND categoria_id IS NOT NULL)`).
- **Modificación y Eliminación (`UPDATE` / `DELETE`):** Restringidas para evitar alteraciones no deseadas por parte de terceros no autenticados.

---

## 🛠️ Guía Paso a Paso para Conectar Supabase

Si aún no has creado tu proyecto en Supabase, sigue estos sencillos pasos:

1. **Crear Proyecto en Supabase:**
   - Ingresa a [supabase.com](https://supabase.com) e inicia sesión (puedes usar tu cuenta de GitHub).
   - Haz clic en **New Project**, asígnale un nombre (ej. `proyecto-ti-bd1`) y una contraseña segura para la base de datos.
   - Selecciona la región más cercana (ej. `South America (São Paulo)`).

2. **Ejecutar el Script SQL de Migración:**
   - En el panel de Supabase, ve a la sección **SQL Editor** (icono de terminal en el menú lateral izquierdo).
   - Abre el archivo `supabase/migrations/001_initial_schema.sql` de este proyecto.
   - Copia todo su contenido, pégalo en el editor SQL de Supabase y presiona **RUN**.
   - ¡Listo! Se habrán creado las tablas, índices, políticas RLS y los datos iniciales con todas las tecnologías y disciplinas requeridas.

3. **Configurar las Credenciales en Local:**
   - En Supabase, ve a **Project Settings** (icono de engranaje) > **API**.
   - Copia la **Project URL** y la clave **anon public key**.
   - En la raíz de este proyecto crea un archivo `.env` (puedes basarte en `.env.example`):
     ```env
     VITE_SUPABASE_URL=https://tu-proyecto.supabase.co
     VITE_SUPABASE_ANON_KEY=tu-anon-public-key
     ```
   - Reinicia el servidor local (`npm run dev`). La aplicación detectará automáticamente la base de datos y el banner superior cambiará a verde indicando **"PostgreSQL Conectado"**.

---

## 💻 Ejecución en Entorno Local

```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo con Hot Reload
npm run dev

# Compilar para producción (TypeScript check + Vite bundle)
npm run build

# Previsualizar el bundle de producción localmente
npm run preview
```

---

## 🌐 Publicación en Vercel

1. **Subir a GitHub:**
   ```bash
   git add .
   git commit -m "feat: proyecto integrador listo para despliegue"
   git remote add origin https://github.com/TU_USUARIO/TU_REPOSITORIO.git
   git push -u origin main
   ```

2. **Desplegar en Vercel:**
   - Entra a [vercel.com](https://vercel.com) e inicia sesión con GitHub.
   - Haz clic en **Add New...** > **Project**.
   - Selecciona tu repositorio recién subido.
   - En el panel de configuración:
     - **Framework Preset:** Vite (se detecta automáticamente).
     - **Build Command:** `npm run build`
     - **Output Directory:** `dist`
   - En la sección **Environment Variables**, añade:
     - `VITE_SUPABASE_URL`: *(la URL de tu proyecto Supabase)*
     - `VITE_SUPABASE_ANON_KEY`: *(la clave anon de Supabase)*
   - Haz clic en **Deploy**. En menos de 1 minuto tendrás tu enlace público `https://tu-proyecto.vercel.app` funcionando con conexión real a Supabase.

---

## 📋 Lista de Verificación para la Demostración ante la Profesora

Durante la presentación del trabajo integrador, podrás exhibir:

1. **Estructura y Normalización en Supabase:**
   - Muestra en el Table Editor de Supabase la tabla `categorias` y la tabla `tecnologias`.
   - Explica la clave foránea `categoria_id` y cómo asegura la relación 1:N.
2. **Consultas Relacionales en Vivo:**
   - Muestra el Catálogo interactivo y explica cómo la consulta SELECT recupera tanto los campos de `tecnologias` como el nombre de su categoría asociada (`categorias.nombre`).
3. **Filtros y Búsqueda Dinámica:**
   - Utiliza el buscador en tiempo real y los filtros por categoría y tipo ("Tecnologías" vs "Disciplinas").
4. **Inserción de un Nuevo Registro:**
   - Abre el formulario "Agregar", completa los campos y selecciona una categoría relacional.
   - Al presionar "Insertar en Supabase", verifica que aparece inmediatamente en el catálogo.
5. **Persistencia Real Comprobada:**
   - Recarga la página por completo (`F5`) y demuestra que el registro sigue existiendo.
   - Abre el panel de Supabase y muestra la nueva fila en la tabla de la base de datos.
6. **Políticas de Seguridad RLS:**
   - Muestra el archivo `001_initial_schema.sql` y explica cómo Row Level Security protege la base de datos contra borrados no autorizados.
