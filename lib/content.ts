export const company = {
  name: "Grupo DLC",
  legalName: "Grupo DLC",
  tagline: "Construimos hogares, rentabilidad y patrimonio",
  secondaryTagline: "Construyendo el sueño de miles de familias",
  city: "Chiclayo",
  region: "Lambayeque",
  country: "Perú",
  address: "Av. Antenor Orrego N° 101",
  addressFull: "Av. Antenor Orrego N° 101, Chiclayo, Perú",
  email: "Gerenciacomercial.dlc@gmail.com",
  phoneDisplay: "+51 983 771 968",
  phoneE164: "+51983771968",
  whatsappNumber: "51983771968",
  whatsappMessage:
    "Hola, vengo de la web de Grupo DLC y quiero información sobre los lotes de Finca Algarrobo.",
  social: {
    facebook: "https://www.facebook.com/share/1AXrKU3aNR/",
    instagram: "https://www.instagram.com/grupo.dlc.pe",
  },
} as const;

type GeoPoint = { latitude: number; longitude: number };

export const localSeo: {
  officeGeo: GeoPoint | null;
  projectGeo: GeoPoint | null;
  priceRange: string | null;
  openingHours: {
    days: readonly string[];
    opens: string;
    closes: string;
  };
} = {
  officeGeo: { latitude: -6.785285467835872, longitude: -79.83614267116401 },
  projectGeo: null,
  priceRange: null,
  openingHours: {
    days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "09:00",
    closes: "18:00",
  },
};

export const whatsappQuickQuestions = [
  {
    id: "general",
    label: "Información sobre Finca Algarrobo",
    description: "Conocer el proyecto, áreas comunes y lotes de 500 m²",
    message: company.whatsappMessage,
  },
  {
    id: "pricing",
    label: "Precios y formas de pago",
    description: "Consultar valores y opciones de pago disponibles",
    message:
      "Hola, quiero conocer precios y formas de pago de los lotes en Finca Algarrobo.",
  },
  {
    id: "visit",
    label: "Agendar una visita",
    description: "Coordinar visita al condominio u oficina en Chiclayo",
    message:
      "Hola, me gustaría agendar una visita a Finca Algarrobo. ¿Qué días tienen disponibles?",
  },
  {
    id: "available",
    label: "Lotes disponibles",
    description: "Saber qué lotes quedan en venta",
    message:
      "Hola, quiero saber qué lotes están disponibles actualmente en Finca Algarrobo.",
  },
  {
    id: "legal",
    label: "Documentación y proceso de compra",
    description: "Habilitación, papeles y pasos para comprar",
    message:
      "Hola, tengo consultas sobre la documentación y el proceso de compra de un lote en Finca Algarrobo.",
  },
] as const;

export function buildWhatsAppUrl(message: string) {
  return `https://wa.me/${company.whatsappNumber}?text=${encodeURIComponent(message.trim())}`;
}

export const whatsappUrl = buildWhatsAppUrl(company.whatsappMessage);

export const whatsappLeadBubble = {
  title: "Asesores Grupo DLC",
  project: "Finca Algarrobo",
  typingLabel: "escribiendo...",
  message:
    "¿Tienes dudas sobre Finca Algarrobo? Un asesor de Grupo DLC está listo para ayudarte con lotes, precios y visitas. 👋",
  cta: "Hablar con un asesor",
} as const;

export const whatsappLeadAvatars = [
  { src: "/brand/dlc-isotipo.png", alt: "Grupo DLC" },
  {
    src: "/projects/algarrobo/thumbs/hito-ingreso.jpg",
    alt: "Ingreso a Finca Algarrobo",
  },
  {
    src: "/projects/algarrobo/thumbs/zona-hamacas.jpg",
    alt: "Familias en Finca Algarrobo",
  },
] as const;

export const about = {
  eyebrow: "Sobre nosotros",
  title: "Una desarrolladora inmobiliaria diferente",
  stories: [
    {
      title: "Nuestros orígenes",
      description:
        "Grupo DLC nace en 2020, en medio de una etapa que nos llevó a transformar desafíos en oportunidades. Iniciamos desarrollando proyectos inmobiliarios en Cajamarca y, con los años, evolucionamos desde lotizaciones y habilitaciones urbanas hacia proyectos multifamiliares, campestres y residenciales.",
    },
    {
      title: "Dónde estamos hoy",
      description:
        "Hoy desarrollamos y participamos en proyectos en Cajamarca, Chiclayo y Piura, buscando identificar ubicaciones con potencial y convertirlas en oportunidades inmobiliarias que generen valor, patrimonio, rentabilidad y calidad de vida.",
    },
    {
      title: "Nuestra visión",
      description:
        "Nuestra visión es consolidarnos como una desarrolladora inmobiliaria diferente, liderando el mercado del norte del país y creciendo con proyectos residenciales y multifamiliares en ubicaciones estratégicas de las principales ciudades del Perú.",
    },
  ],
} as const;

export const stats = [
  {
    value: "+250",
    label: "Familias beneficiadas",
    description:
      "Familias chiclayanas que ya construyen su patrimonio con nosotros.",
  },
  {
    value: "+250",
    label: "Lotes vendidos",
    description: "Lotes para casa de campo colocados en la región Lambayeque.",
  },
  {
    value: "500 m²",
    label: "Por lote",
    description:
      "Fuimos de los primeros en ofrecer lotes de casa de campo de 500 m² en Chiclayo.",
  },
] as const;

/** Logotipos de proyectos ya desarrollados por Grupo DLC, con sus medidas reales. */
export const completedProjects = [
  {
    name: "La Alameda",
    type: "Departamentos",
    logo: "/brand/projects/la-alameda.png",
    width: 560,
    height: 93,
  },
  {
    name: "El Golf",
    type: "Condominio",
    logo: "/brand/projects/el-golf.png",
    width: 288,
    height: 240,
  },
  {
    name: "Monte Verde",
    type: "Residencial",
    logo: "/brand/projects/monte-verde.png",
    width: 547,
    height: 240,
  },
  {
    name: "San José",
    type: "Residencial",
    logo: "/brand/projects/san-jose.png",
    width: 358,
    height: 240,
  },
  {
    name: "Valle Hermoso",
    type: "Casa de campo",
    logo: "/brand/projects/valle-hermoso.png",
    width: 560,
    height: 159,
  },
  {
    name: "Villa Paraíso",
    type: "Residencial",
    logo: "/brand/projects/villa-paraiso.png",
    width: 309,
    height: 240,
  },
  {
    name: "Finca Campoora",
    type: "Condominio ecológico",
    logo: "/brand/projects/finca-campoora.png",
    width: 560,
    height: 184,
  },
  {
    name: "Finca Sevilla",
    type: "Casa de campo",
    logo: "/brand/projects/finca-sevilla.png",
    width: 255,
    height: 240,
  },
] as const;

/** Beneficios explícitos del proyecto — solo hechos ya comunicados por la marca. */
export const purchaseIncludes = [
  {
    title: "500 m² por lote",
    description:
      "Uno de los primeros formatos de casa de campo de esta superficie en Chiclayo.",
  },
  {
    title: "Áreas comunes ejecutadas",
    description:
      "Parque con pileta, zonas deportivas, gimnasio al aire libre, hamacas y alameda arborizada.",
  },
  {
    title: "Ingreso controlado",
    description: "Acceso con caseta de control y portón al condominio.",
  },
  {
    title: "Respaldo legal y comercial",
    description:
      "Habilitación, documentación y acompañamiento durante todo el proceso de compra.",
  },
  {
    title: "Venta directa",
    description: "Compras directamente con Grupo DLC, sin intermediarios.",
  },
  {
    title: "Atención en Chiclayo",
    description: `Oficina en ${company.address} y contacto directo por WhatsApp con un asesor.`,
  },
] as const;

/** Usos del lote según el posicionamiento comercial existente (sin prometer rentas ni precios). */
export const lotUses = [
  {
    title: "Casa de campo",
    description:
      "Construye el espacio de descanso de tu familia a minutos de la ciudad.",
  },
  {
    title: "Alquiler vacacional",
    description:
      "Aprovecha un terreno en condominio campestre con áreas comunes ya hechas.",
  },
  {
    title: "Reventa con plusvalía",
    description:
      "Invierte en un formato pionero de 500 m² en la región Lambayeque.",
  },
] as const;

/** Pasos del proceso — flujo comercial genérico, sin plazos ni montos inventados. */
export const buyingProcess = [
  {
    title: "Consulta",
    description:
      "Escríbenos por WhatsApp, formulario web o visita nuestra oficina en Chiclayo.",
  },
  {
    title: "Información y visita",
    description:
      "Te orientamos sobre lotes disponibles, formas de pago y coordinamos conocer el proyecto.",
  },
  {
    title: "Asesoría en la compra",
    description:
      "Acompañamiento legal y comercial durante la documentación y el cierre.",
  },
  {
    title: "Tu lote en Finca Algarrobo",
    description:
      "Cierras la compra con venta directa y empiezas a construir patrimonio.",
  },
] as const;

export type Amenity = {
  title: string;
  description: string;
  image: string;
};

export const project = {
  slug: "finca-algarrobo",
  name: "Finca Algarrobo",
  status: "En venta",
  headline: "Lotes de casa de campo de 500 m² en Chiclayo",
  summary:
    "Un condominio campestre pensado para familias que buscan aire libre, seguridad y una inversión que crece. Áreas comunes ejecutadas, ingreso controlado y alameda arborizada.",
  logo: "/brand/algarrobo-horizontal.png",
  cover: "/projects/algarrobo/vista-aerea.png",
  highlights: [
    { label: "Área por lote", value: "500 m²" },
    { label: "Modalidad", value: "Venta directa" },
    { label: "Ubicación", value: "Chiclayo, Lambayeque" },
  ],
  amenities: [
    {
      title: "Parque central con pileta",
      description: "Corazón del condominio con pileta ornamental y caminería.",
      image: "/projects/algarrobo/pileta.png",
    },
    {
      title: "Juegos infantiles",
      description: "Zona de juegos con piso seguro y sombra natural.",
      image: "/projects/algarrobo/juegos-infantiles.png",
    },
    {
      title: "Cancha de fútbol",
      description: "Losa deportiva cercada para partidos de la comunidad.",
      image: "/projects/algarrobo/cancha-futbol.png",
    },
    {
      title: "Losa de básquet",
      description: "Cancha multiuso iluminada para uso nocturno.",
      image: "/projects/algarrobo/losa-basquet.png",
    },
    {
      title: "Gimnasio al aire libre",
      description: "Estaciones de ejercicio integradas al área verde.",
      image: "/projects/algarrobo/gimnasio-aire-libre.png",
    },
    {
      title: "Zona de hamacas",
      description: "Espacio de descanso bajo algarrobos y árboles nativos.",
      image: "/projects/algarrobo/zona-hamacas.png",
    },
    {
      title: "Alameda arborizada",
      description: "Vías internas con arborización y veredas peatonales.",
      image: "/projects/algarrobo/alameda.png",
    },
  ] satisfies Amenity[],
} as const;

export const hero = {
  eyebrow: `${project.name} · ${company.city}`,
  titleAccent: "casa de campo",
  subtitle:
    "Lotes de 500 m² con áreas comunes, ingreso controlado y más de 250 familias que ya construyen.",
  video: "/projects/algarrobo/videorender.mp4",
  poster: "/projects/algarrobo/hito-ingreso.png",
  imageAlt: "Recorrido virtual del condominio campestre Finca Algarrobo en Chiclayo",
} as const;

export type GalleryItem = {
  src: string;
  alt: string;
  caption: string;
};

export const gallery: GalleryItem[] = [
  {
    src: "/projects/algarrobo/vista-aerea.png",
    alt: "Vista aérea del condominio Finca Algarrobo con lotes y áreas verdes",
    caption: "Vista aérea del proyecto",
  },
  {
    src: "/projects/algarrobo/ingreso-control.png",
    alt: "Ingreso principal de Finca Algarrobo con caseta de control y portón",
    caption: "Ingreso con control",
  },
  {
    src: "/projects/algarrobo/hito-ingreso.png",
    alt: "Hito de ingreso con el nombre Finca Algarrobo rodeado de jardines",
    caption: "Hito de bienvenida",
  },
  {
    src: "/projects/algarrobo/parque-aereo.png",
    alt: "Vista aérea del parque central con pileta y juegos",
    caption: "Parque central",
  },
  {
    src: "/projects/algarrobo/pileta.png",
    alt: "Pileta ornamental del parque central con bancas y caminería",
    caption: "Pileta ornamental",
  },
  {
    src: "/projects/algarrobo/juegos-infantiles.png",
    alt: "Zona de juegos infantiles con resbaladera y estructuras de escalada",
    caption: "Juegos infantiles",
  },
  {
    src: "/projects/algarrobo/cancha-futbol.png",
    alt: "Cancha de fútbol cercada vista desde arriba",
    caption: "Cancha de fútbol",
  },
  {
    src: "/projects/algarrobo/losa-basquet.png",
    alt: "Losa deportiva de básquet con postes de iluminación",
    caption: "Losa de básquet",
  },
  {
    src: "/projects/algarrobo/gimnasio-aire-libre.png",
    alt: "Estaciones de gimnasio al aire libre entre árboles",
    caption: "Gimnasio al aire libre",
  },
  {
    src: "/projects/algarrobo/zona-hamacas.png",
    alt: "Zona de hamacas bajo algarrobos con personas descansando",
    caption: "Zona de hamacas",
  },
  {
    src: "/projects/algarrobo/alameda.png",
    alt: "Alameda interna arborizada con veredas y vehículos",
    caption: "Alameda arborizada",
  },
];

export const mapEmbedUrl = `https://www.google.com/maps?q=${encodeURIComponent(
  company.addressFull
)}&output=embed`;

export const mapLinkUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
  company.addressFull
)}`;
