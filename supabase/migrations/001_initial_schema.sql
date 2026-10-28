-- ==============================================================================
-- PROYECTO INTEGRADOR: TECNOLOGÍAS DE LA INFORMACIÓN Y BASES DE DATOS 1
-- MIGRACIÓN 001: Esquema Relacional, Restricciones, RLS y Datos Semilla
-- ==============================================================================

-- 1. Habilitar extensión para generación de UUIDs (generalmente activa por defecto en Supabase)
CREATE EXTENSION IF NOT EXISTS "pgcrypto";

-- 2. TABLA: categorias
-- Representa las áreas temáticas que agrupan tanto tecnologías como disciplinas.
CREATE TABLE IF NOT EXISTS public.categorias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL UNIQUE,
    descripcion TEXT,
    tipo TEXT NOT NULL DEFAULT 'tecnologia' CHECK (tipo IN ('tecnologia', 'disciplina', 'general')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 3. TABLA: tecnologias
-- Almacena las tecnologías y disciplinas educativas con sus relaciones y atributos detallados.
CREATE TABLE IF NOT EXISTS public.tecnologias (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    nombre TEXT NOT NULL,
    descripcion TEXT NOT NULL,
    ejemplos TEXT,
    ventajas TEXT,
    desafios TEXT,
    categoria_id UUID NOT NULL REFERENCES public.categorias(id) ON DELETE CASCADE,
    tipo TEXT NOT NULL DEFAULT 'tecnologia' CHECK (tipo IN ('tecnologia', 'disciplina')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now()),
    updated_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 4. TABLA: glosario
-- Almacena términos clave de TI para consulta educativa.
CREATE TABLE IF NOT EXISTS public.glosario (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    termino TEXT NOT NULL UNIQUE,
    definicion TEXT NOT NULL,
    categoria TEXT NOT NULL DEFAULT 'General',
    ejemplo TEXT,
    created_at TIMESTAMPTZ NOT NULL DEFAULT timezone('utc'::text, now())
);

-- 5. ÍNDICES DE RENDIMIENTO PARA CONSULTAS Y CLAVES FORÁNEAS
CREATE INDEX IF NOT EXISTS idx_tecnologias_categoria_id ON public.tecnologias(categoria_id);
CREATE INDEX IF NOT EXISTS idx_tecnologias_tipo ON public.tecnologias(tipo);
CREATE INDEX IF NOT EXISTS idx_tecnologias_nombre ON public.tecnologias(nombre);
CREATE INDEX IF NOT EXISTS idx_categorias_tipo ON public.categorias(tipo);
CREATE INDEX IF NOT EXISTS idx_glosario_termino ON public.glosario(termino);

-- 6. FUNCIÓN Y TRIGGER PARA AUTOMATIZAR updated_at
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = timezone('utc'::text, now());
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS trg_tecnologias_updated_at ON public.tecnologias;
CREATE TRIGGER trg_tecnologias_updated_at
    BEFORE UPDATE ON public.tecnologias
    FOR EACH ROW
    EXECUTE FUNCTION public.handle_updated_at();

-- 7. SEGURIDAD: ROW LEVEL SECURITY (RLS)
ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tecnologias ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.glosario ENABLE ROW LEVEL SECURITY;

-- Políticas de lectura pública (cualquier usuario puede consultar el contenido educativo)
DROP POLICY IF EXISTS "Lectura publica categorias" ON public.categorias;
CREATE POLICY "Lectura publica categorias"
    ON public.categorias FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Lectura publica tecnologias" ON public.tecnologias;
CREATE POLICY "Lectura publica tecnologias"
    ON public.tecnologias FOR SELECT
    USING (true);

DROP POLICY IF EXISTS "Lectura publica glosario" ON public.glosario;
CREATE POLICY "Lectura publica glosario"
    ON public.glosario FOR SELECT
    USING (true);

-- Políticas de inserción pública controlada (para el formulario de carga académica)
DROP POLICY IF EXISTS "Insercion publica tecnologias" ON public.tecnologias;
CREATE POLICY "Insercion publica tecnologias"
    ON public.tecnologias FOR INSERT
    WITH CHECK (
        length(trim(nombre)) > 0 AND
        length(trim(descripcion)) > 0 AND
        categoria_id IS NOT NULL
    );

DROP POLICY IF EXISTS "Insercion publica categorias" ON public.categorias;
CREATE POLICY "Insercion publica categorias"
    ON public.categorias FOR INSERT
    WITH CHECK (
        length(trim(nombre)) > 0
    );

-- 8. DATOS SEMILLA (CATEGORÍAS)
INSERT INTO public.categorias (id, nombre, descripcion, tipo) VALUES
    ('c1111111-1111-1111-1111-111111111101', 'Hardware y Computación Física', 'Componentes físicos, circuitos, microprocesadores y dispositivos tangibles.', 'tecnologia'),
    ('c1111111-1111-1111-1111-111111111102', 'Software y Sistemas de Base', 'Programas, sistemas operativos y plataformas de ejecución digital.', 'tecnologia'),
    ('c1111111-1111-1111-1111-111111111103', 'Redes y Telecomunicaciones', 'Infraestructura de interconexión, protocolos y transmisión de datos.', 'tecnologia'),
    ('c1111111-1111-1111-1111-111111111104', 'Bases de Datos y Almacenamiento', 'Sistemas para modelar, almacenar, consultar y proteger datos estructurados y no estructurados.', 'tecnologia'),
    ('c1111111-1111-1111-1111-111111111105', 'Cloud Computing y Virtualización', 'Servicios de cómputo elástico, servidores virtuales y modelos como servicio (XaaS).', 'tecnologia'),
    ('c1111111-1111-1111-1111-111111111106', 'Ciberseguridad y Resiliencia', 'Mecanismos de cifrado, autenticación, prevención y respuesta ante ciberataques.', 'tecnologia'),
    ('c1111111-1111-1111-1111-111111111107', 'Inteligencia Artificial y Analítica', 'Algoritmos de aprendizaje automático, redes neuronales y procesamiento inteligente.', 'tecnologia'),
    ('c1111111-1111-1111-1111-111111111108', 'Internet de las Cosas (IoT)', 'Dispositivos inteligentes conectados que recopilan y procesan datos del entorno físico.', 'tecnologia'),
    ('c1111111-1111-1111-1111-111111111109', 'Desarrollo de Software y Aplicaciones', 'Construcción de soluciones digitales web, móviles y empresariales.', 'disciplina'),
    ('c1111111-1111-1111-1111-111111111110', 'Gestión, Datos y Arquitectura de TI', 'Disciplinas profesionales enfocadas en el gobierno de datos, proyectos y sistemas.', 'disciplina')
ON CONFLICT (nombre) DO UPDATE SET
    descripcion = EXCLUDED.descripcion,
    tipo = EXCLUDED.tipo;

-- 9. DATOS SEMILLA (TECNOLOGÍAS QUE INTEGRAN LAS TI)
INSERT INTO public.tecnologias (nombre, descripcion, ejemplos, ventajas, desafios, categoria_id, tipo) VALUES
    (
        'Hardware',
        'Conjunto de componentes físicos y electrónicos que componen los sistemas informáticos, permitiendo la entrada, procesamiento, almacenamiento y salida de datos.',
        'Servidores en rack, procesadores multinúcleo (CPU, GPU, TPU), memorias RAM DDR5, discos SSD NVMe, sensores.',
        'Capacidad de cómputo escalable, alta velocidad de procesamiento, persistencia física de información.',
        'Obsolescencia tecnológica, consumo energético, generación de calor y costos de mantenimiento físico.',
        'c1111111-1111-1111-1111-111111111101',
        'tecnologia'
    ),
    (
        'Software',
        'Colección de instrucciones lógicas, programas y rutinas que indican al hardware cómo ejecutar tareas específicas.',
        'Suites ofimáticas, motores de base de datos, navegadores web, software ERP (SAP, Odoo).',
        'Automatización de procesos repetitivos, flexibilidad para adaptarse a múltiples propósitos y actualización constante.',
        'Complejidad en el ciclo de vida, vulnerabilidades de código (bugs) y costos de licenciamiento.',
        'c1111111-1111-1111-1111-111111111102',
        'tecnologia'
    ),
    (
        'Sistemas Operativos',
        'Software de sistema que administra los recursos de hardware del equipo y provee servicios esenciales para las aplicaciones.',
        'GNU/Linux (Ubuntu, Debian, Red Hat), Microsoft Windows 11 / Windows Server, macOS, Android, iOS.',
        'Gestión abstracta y segura de memoria, procesador y periféricos; soporte multitarea y multiusuario.',
        'Fragmentación de versiones, dependencia de controladores (drivers) y requerimientos crecientes de hardware.',
        'c1111111-1111-1111-1111-111111111102',
        'tecnologia'
    ),
    (
        'Redes y Telecomunicaciones',
        'Infraestructura de hardware y protocolos de comunicación que permite a los dispositivos informáticos intercambiar datos a distancia.',
        'Protocolos TCP/IP, fibra óptica submarina, redes celulares 5G, Wi-Fi 6/7, routers empresariales y conmutadores (switches).',
        'Comunicación instantánea global, trabajo remoto colaborativo y acceso descentralizado a recursos.',
        'Latencia en enlaces transcontinentales, congestión de tráfico y exposición a interceptaciones.',
        'c1111111-1111-1111-1111-111111111103',
        'tecnologia'
    ),
    (
        'Bases de Datos',
        'Sistemas de software especializados en organizar, almacenar, consultar y garantizar la integridad de colecciones de datos.',
        'PostgreSQL, Supabase, MySQL, Oracle DB, Microsoft SQL Server, MongoDB, Redis.',
        'Consistencia de datos (propiedades ACID), consultas avanzadas vía SQL, integridad referencial y concurrencia multiusuario.',
        'Diseño de normalización complejo, optimización de índices a gran escala y políticas estrictas de respaldo.',
        'c1111111-1111-1111-1111-111111111104',
        'tecnologia'
    ),
    (
        'Computación en la Nube (Cloud Computing)',
        'Entrega bajo demanda de servicios de tecnología (cómputo, almacenamiento, redes y bases de datos) a través de Internet con pago por uso.',
        'Amazon Web Services (AWS), Google Cloud Platform (GCP), Microsoft Azure, Vercel, Supabase.',
        'Elasticidad inmediata sin inversión inicial de capital en hardware (CapEx vs OpEx), alta disponibilidad mundial.',
        'Dependencia de la conectividad a Internet, riesgo de encadenamiento con el proveedor (vendor lock-in) y control de costos imprevistos.',
        'c1111111-1111-1111-1111-111111111105',
        'tecnologia'
    ),
    (
        'Ciberseguridad',
        'Conjunto de prácticas, tecnologías y procesos diseñados para proteger redes, dispositivos, programas y datos contra ataques, daños o acceso no autorizado.',
        'Cifrado de extremo a extremo (AES-256), cortafuegos (Firewalls), autenticación multifactor (MFA), sistemas de detección de intrusiones (IDS/IPS).',
        'Preservación de la confidencialidad, integridad y disponibilidad (Tríada CIA) de la información sensible.',
        'Amenazas dinámicas en constante evolución (ransomware, phishing con IA) y el factor del error humano.',
        'c1111111-1111-1111-1111-111111111106',
        'tecnologia'
    ),
    (
        'Inteligencia Artificial',
        'Capacidad de máquinas o sistemas de software para simular procesos de inteligencia humana como el aprendizaje, razonamiento y autorreflexión.',
        'Modelos de lenguaje (LLMs), visión por computadora para diagnóstico médico, algoritmos de recomendación predictiva.',
        'Aceleración del análisis masivo de datos, automatización cognitiva avanzada y generación de soluciones creativas.',
        'Riesgo de sesgos algorítmicos, alucinaciones en modelos generativos, consumo energético e implicaciones éticas y laborales.',
        'c1111111-1111-1111-1111-111111111107',
        'tecnologia'
    ),
    (
        'Internet de las Cosas (IoT)',
        'Red interconectada de objetos cotidianos e industriales equipados con sensores, software y conectividad para recopilar e intercambiar datos.',
        'Medidores inteligentes de energía, domótica residencial, marcapasos conectados, sensores agrícolas de humedad y telemetría industrial.',
        'Monitoreo ambiental e industrial en tiempo real, mantenimiento predictivo y eficiencia de recursos.',
        'Vulnerabilidades por hardware de bajo costo sin parches de seguridad y proliferación masiva de datos no estructurados.',
        'c1111111-1111-1111-1111-111111111108',
        'tecnologia'
    ),
    (
        'Virtualización',
        'Tecnología que permite crear múltiples entornos simulados o recursos dedicados a partir de un único sistema de hardware físico.',
        'Hipervisores KVM, VMware ESXi, contenedores Docker, orquestación de Kubernetes.',
        'Optimización radical del uso de procesador y memoria, aislamiento de entornos y facilidad de clonación.',
        'Sobrecarga de gestión de clústeres y necesidad de monitoreo continuo de cuellos de botella en I/O.',
        'c1111111-1111-1111-1111-111111111105',
        'tecnologia'
    ),
    (
        'Desarrollo Web y Aplicaciones',
        'Tecnologías y arquitecturas de software orientadas a diseñar interfaces interactivas y servicios accesibles mediante navegadores y smartphones.',
        'React, TypeScript, Node.js, Next.js, APIs RESTful, GraphQL, Progressive Web Apps (PWA).',
        'Distribución universal sin instalación física obligatoria, actualización en tiempo real y rica experiencia de usuario.',
        'Compatibilidad entre navegadores dispares, gestión del rendimiento en dispositivos modestos y seguridad en el frontend.',
        'c1111111-1111-1111-1111-111111111109',
        'tecnologia'
    ),
    (
        'Sistemas de Información (SI)',
        'Conjunto integrado de personas, tecnologías, procesos y datos orientados a recopilar, procesar y distribuir información estratégica en organizaciones.',
        'Sistemas de Gestión Hospitalaria (HIS), Sistemas de Información Geográfica (GIS), plataformas bancarias de core transaccional.',
        'Toma de decisiones fundamentada en métricas precisas, coherencia operativa e integración departamental.',
        'Resistencia al cambio organizacional, curvas prolongadas de adopción y costos elevados de integración de sistemas legados.',
        'c1111111-1111-1111-1111-111111111110',
        'tecnologia'
    )
ON CONFLICT DO NOTHING;

-- 10. DATOS SEMILLA (DISCIPLINAS QUE FORMAN PARTE DE LAS TI)
INSERT INTO public.tecnologias (nombre, descripcion, ejemplos, ventajas, desafios, categoria_id, tipo) VALUES
    (
        'Desarrollo de Software',
        'Disciplina técnica centrada en codificar, depurar y mantener programas informáticos siguiendo especificaciones funcionales.',
        'Programación en Python, JavaScript, Java, Go; desarrollo de componentes UI y microservicios.',
        'Capacidad de transformar ideas en herramientas digitales funcionales con gran demanda en el mercado global.',
        'Deuda técnica acumulada por plazos exigentes y necesidad de aprendizaje autodidacta permanente.',
        'c1111111-1111-1111-1111-111111111109',
        'disciplina'
    ),
    (
        'Ingeniería de Software',
        'Aplicación sistemática, disciplinada y cuantificable de principios de ingeniería al desarrollo, operación y mantenimiento de software.',
        'Diseño de arquitectura de microservicios, integración continua (CI/CD), patrones de diseño GOF, pruebas automatizadas.',
        'Mayor confiabilidad, mantenibilidad a largo plazo y reducción sustancial de fallos en producción.',
        'Equilibrio entre rigor metodológico y velocidad de entrega requerida por el negocio.',
        'c1111111-1111-1111-1111-111111111109',
        'disciplina'
    ),
    (
        'Ciencia de Datos (Data Science)',
        'Campo interdisciplinario que utiliza métodos científicos, procesos y algoritmos para extraer conocimiento de datos estructurados y desestructurados.',
        'Análisis predictivo de abandono de clientes, modelado epidemiológico, detección de fraudes financieros.',
        'Descubrimiento de patrones ocultos que orientan decisiones de negocio basadas en evidencia estadística.',
        'Calidad deficiente de datos de origen (limpieza de datos) y comunicación clara de resultados a directivos no técnicos.',
        'c1111111-1111-1111-1111-111111111107',
        'disciplina'
    ),
    (
        'Administración de Bases de Datos (DBA)',
        'Disciplina responsable de garantizar el rendimiento, la integridad, la disponibilidad y la seguridad de los repositorios de datos organizacionales.',
        'Ajuste fino de consultas complejas (query tuning), diseño de planes de contingencia ante desastres, particionamiento de tablas.',
        'Protección del activo más valioso de la organización (los datos) con tiempos de respuesta óptimos.',
        'Presión extrema ante caídas de servicio (downtime) y administración de crecimientos masivos de información (Big Data).',
        'c1111111-1111-1111-1111-111111111104',
        'disciplina'
    ),
    (
        'Redes y Comunicaciones',
        'Especialidad encargada de planificar, configurar y supervisar la infraestructura de telecomunicaciones y enlaces de datos.',
        'Configuración de VLANs, enrutamiento BGP, implementación de VPNs empresariales seguras, monitoreo con Wireshark.',
        'Conectividad fluida, robusta y tolerante a fallos para todas las operaciones organizacionales.',
        'Complejidad creciente con arquitecturas híbridas y resolución de fallas intermitentes difíciles de reproducir.',
        'c1111111-1111-1111-1111-111111111103',
        'disciplina'
    ),
    (
        'Ciberseguridad y Auditoría Informática',
        'Área dedicada a evaluar vulnerabilidades, diseñar defensas perimetrales y responder a incidentes de seguridad digital.',
        'Pruebas de penetración éticas (pentesting), análisis forense post-ataque, auditorías de cumplimiento ISO 27001.',
        'Mitigación proactiva de riesgos legales, económicos y de reputación ante filtraciones de datos.',
        'Escasez mundial de talento especializado y el principio de que el atacante solo necesita encontrar un fallo, mientras la defensa debe cubrirlos todos.',
        'c1111111-1111-1111-1111-111111111106',
        'disciplina'
    ),
    (
        'Administración de Sistemas (SysAdmin)',
        'Gestión operativa de servidores físicos y virtuales, sistemas operativos, cuentas de usuario y políticas de almacenamiento.',
        'Automatización con scripts Bash/PowerShell, parches de seguridad en servidores Linux/Windows, configuración de directorios activos (Active Directory).',
        'Estabilidad continua y disponibilidad de los recursos informáticos base de la empresa.',
        'Trabajo frecuente fuera de horario de oficina para ventanas de mantenimiento y carga de trabajo reactiva.',
        'c1111111-1111-1111-1111-111111111102',
        'disciplina'
    ),
    (
        'Cloud Computing y DevOps',
        'Cultura y práctica que unifica el desarrollo de software y las operaciones de sistemas utilizando automatización en la nube.',
        'Infraestructura como Código (Terraform), pipelines de GitLab CI / GitHub Actions, contenedores Kubernetes.',
        'Entregas de software ultrarrápidas, reproducibilidad total de entornos y resiliencia automatizada.',
        'Curva de aprendizaje empinada por la enorme cantidad de herramientas y monitoreo de costos cloud.',
        'c1111111-1111-1111-1111-111111111105',
        'disciplina'
    ),
    (
        'Inteligencia Artificial y Machine Learning',
        'Especialidad centrada en diseñar, entrenar y desplegar modelos algorítmicos capaces de generalizar y aprender a partir de datos.',
        'Entrenamiento de redes convolucionales, ajuste fino de transformadores (fine-tuning), desarrollo con PyTorch y TensorFlow.',
        'Creación de productos y servicios con capacidades predictivas y de razonamiento antes imposibles.',
        'Altos requerimientos computacionales (GPUs costosas) y necesidad de supervisión humana para evitar discriminaciones algorítmicas.',
        'c1111111-1111-1111-1111-111111111107',
        'disciplina'
    ),
    (
        'Soporte Técnico y Mesa de Ayuda',
        'Disciplina de asistencia técnica primaria para resolver incidencias de hardware, software y red de usuarios finales.',
        'Atención mediante tickets ITIL, configuración de estaciones de trabajo, diagnóstico de periféricos.',
        'Resolución rápida de trabas cotidianas del personal y contacto humano directo con la realidad del usuario.',
        'Alta rotación de personal y gestión de expectativas o frustraciones de usuarios no familiarizados con la tecnología.',
        'c1111111-1111-1111-1111-111111111110',
        'disciplina'
    ),
    (
        'Gestión de Proyectos Tecnológicos (Tech PM)',
        'Liderazgo metodológico para planificar, coordinar y entregar proyectos de TI en tiempo, alcance y presupuesto previstos.',
        'Marcos ágiles Scrum, Kanban, gestión de riesgos, estimaciones de historias de usuario en Jira.',
        'Alineación entre las necesidades estratégicas de la empresa y los esfuerzos del equipo técnico.',
        'Negociación de plazos frente a imprevistos técnicos y gestión de dependencias interdepartamentales.',
        'c1111111-1111-1111-1111-111111111110',
        'disciplina'
    ),
    (
        'Análisis de Sistemas',
        'Disciplina enfocada en estudiar los procesos de negocio de una organización para definir requisitos y diseñar soluciones de software adecuadas.',
        'Modelado BPMN, casos de uso UML, diagramas entidad-relación, especificación de requerimientos de software (SRS).',
        'Garantiza que el software construido resuelva verdaderos problemas de negocio antes de gastar recursos en programar.',
        'Ambigüedad en la comunicación con clientes y cambios frecuentes en las prioridades del negocio.',
        'c1111111-1111-1111-1111-111111111110',
        'disciplina'
    )
ON CONFLICT DO NOTHING;

-- 11. DATOS SEMILLA (GLOSARIO TÉCNICO EDUCATIVO)
INSERT INTO public.glosario (termino, definicion, categoria, ejemplo) VALUES
    ('Servidor', 'Computadora o programa que provee servicios, datos o recursos a otros equipos denominados clientes a través de una red.', 'Infraestructura', 'Un servidor web que entrega las páginas HTML al navegador.'),
    ('Cliente', 'Dispositivo o aplicación que solicita y consume recursos o servicios proporcionados por un servidor.', 'Infraestructura', 'El navegador Google Chrome solicitando una página web.'),
    ('Hardware', 'Componentes físicos y tangibles de un sistema informático, desde microchips hasta periféricos externos.', 'Arquitectura', 'La placa madre, memoria RAM y tarjeta gráfica.'),
    ('Software', 'Conjunto de programas, procedimientos, reglas y documentación asociada a la operación de un sistema informático.', 'Programación', 'El sistema operativo Linux o un procesador de textos.'),
    ('Algoritmo', 'Secuencia ordenada y finita de instrucciones precisas y no ambiguas que permiten resolver un problema determinado.', 'Ciencia de la Computación', 'El algoritmo de Dijkstra para encontrar la ruta más corta en una red.'),
    ('Base de Datos', 'Conjunto estructurado y persistente de datos pertenecientes a un mismo contexto, gestionado por un SGBD para su consulta y actualización.', 'Datos', 'Una base de datos PostgreSQL que almacena los registros de alumnos.'),
    ('Computación en la Nube', 'Modelo de entrega de recursos informáticos compartidos bajo demanda a través de Internet con pago por uso.', 'Infraestructura', 'Almacenar archivos en Google Drive o ejecutar código en Vercel.'),
    ('Red Informática', 'Conjunto de nodos interconectados mediante enlaces físicos o inalámbricos para compartir información y recursos.', 'Comunicaciones', 'La red de área local (LAN) de un laboratorio universitario.'),
    ('API (Application Programming Interface)', 'Conjunto de definiciones, protocolos y reglas que permite a dos componentes de software comunicarse e intercambiar datos.', 'Desarrollo', 'Una API meteorológica que proporciona el pronóstico a una app móvil.'),
    ('Inteligencia Artificial (IA)', 'Campo de la informática que crea algoritmos capaces de realizar tareas complejas que requieren razonamiento o percepción humana.', 'Inteligencia Artificial', 'Un modelo de visión que detecta anomalías en radiografías médicas.'),
    ('Ciberseguridad', 'Conjunto de tecnologías, procesos y prácticas orientadas a defender sistemas, redes y datos de ataques o accesos no autorizados.', 'Seguridad', 'El cifrado de contraseñas con funciones hash seguras (bcrypt).')
ON CONFLICT (termino) DO NOTHING;

