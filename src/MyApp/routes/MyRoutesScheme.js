export const institucionalRoutes = {
  label: "Institucional",
  labelDisable: false,
  children: [
    {
      name: "Institucional",
      active: true,
      icon: "computer-mouse",
      children: [
        {
          name: "Autoridades",
          to: "/institucional/autoridades",
          exact: true,
          active: true,
        },
        {
          name: "Personal del colegio por áreas",
          to: "/institucional/personal",
          exact: true,
          active: true,
        },
      ],
    },
  ],
};

export const matriculadosRoutes = {
  label: "Matriculados",
  labelDisable: false,
  children: [
    {
      name: "Matriculados",
      active: true,
      icon: "computer-mouse",
      children: [
        {
          name: "Capacitación",
          to: "/matriculados/capacitacion",
          exact: true,
          active: true,
        },
      ],
    },
  ],
};

export const settingsRoutes = {
  label: "Configuración",
  labelDisable: false,
  children: [
    {
      name: "Configuración",
      active: true,
      icon: "cog",
      children: [
        {
          name: "Mi Inmobiliaria",
          to: "/inmobiliaria/ver/:id",
          exact: true,
          active: true,
        },
        {
          name: "Mis Usuarios",
          to: "/usuarios/listar",
          exact: true,
          active: true,
        },
        {
          name: "Mis Permisos",
          to: "/roles/listar",
          exact: true,
          active: true,
        },
        {
          name: "Mis Notificaciones",
          to: "/notificaciones/listar",
          exact: true,
          active: true,
        },
      ],
    },
  ],
};

export const helpRoutes = {
  label: "Ayuda",
  labelDisable: false,
  children: [
    {
      name: "Ayuda",
      active: true,
      icon: "info-circle",
      children: [
        {
          name: "Tutoriales",
          to: "/ayuda/tutoriales",
          exact: true,
          active: true,
        },
        {
          name: "Faqs",
          to: "/ayuda/faqs",
          exact: true,
          active: true,
        },
      ],
    },
  ],
};

export const serviciosRoutes = {
  label: "Servicios",
  labelDisable: false,
  children: [
    {
      name: "Servicios",
      active: true,
      icon: "computer-mouse",
      children: [
        {
          name: "Listado",
          to: "/servicios/listado",
          exact: true,
          active: true,
        },
        {
          name: "Observatorio estadístico del sector inmobiliario",
          to: "/servicios/observatorio-estadistico",
          exact: true,
          active: false,
        },
        {
          name: "Calculadora de actualización de alquiler",
          to: "/servicios/calculadora",
          exact: true,
          active: true,
        },
        {
          name: "Consultas de RENAPER",
          to: "/servicios/renaper",
          exact: true,
          active: true,
        },
        {
          name: "Revista CUCICBA",
          to: "/servicios/revista-cucicba",
          exact: true,
          active: true,
        },
        {
          name: "Requisitos de matriculación",
          to: "/servicios/matriculacion",
          exact: true,
          active: true,
        },
        {
          name: "Preguntas frecuentes",
          to: "/servicios/preguntas-frecuentes",
          exact: true,
          active: true,
        },
        {
          name: "Biblioteca digital",
          to: "/servicios/biblioteca-digital",
          exact: true,
          active: true,
        },
        {
          name: "Listado de inmobiliarias ilegales",
          to: "/servicios/ilegales",
          exact: true,
          active: true,
        },
        {
          name: "Listado de inmobiliarias ilegales con causa penal",
          to: "/servicios/ilegales-penal",
          exact: true,
          active: true,
        },
        {
          name: "Sanciones del tribunal",
          to: "/servicios/sanciones",
          exact: true,
          active: true,
        },
        {
          name: "Listado de infractores",
          to: "/servicios/infractores",
          exact: true,
          active: true,
        },
        {
          name: "Denuncias",
          to: "/servicios/denuncias",
          exact: true,
          active: true,
        },
      ],
    },
  ],
};

export const cucicbaRoutes = {
  label: "CUCICBA",
  labelDisable: false,
  children: [
    {
      name: "CUCICBA",
      active: true,
      icon: "lock",
      children: [
        {
          name: "Panel Principal",
          to: "/cucicba/panel",
          exact: true,
          active: true,
        },
        {
          name: "Propiedades",
          to: "/cucicba/propiedades",
          exact: true,
          active: true,
        },
        {
          name: "Usuarios",
          to: "/cucicba/usuarios",
          exact: true,
          active: true,
        },
        {
          name: "Inmobiliarias",
          to: "/cucicba/inmobiliarias",
          exact: true,
          active: true,
        },
        {
          name: "Reportes",
          to: "/cucicba/reportes",
          exact: true,
          active: true,
        },
      ],
    },
  ],
};

export const webmasterRoutes = {
  label: "Webmaster",
  labelDisable: false,
  children: [
    {
      name: "Development",
      active: true,
      icon: "code",
      children: [
        {
          name: "Log",
          to: "/dev/logs",
          exact: true,
          active: true,
        },
        {
          name: "Acciones",
          to: "/dev/actions",
          exact: true,
          active: true,
        },
      ],
    },
  ],
};

export default [institucionalRoutes, matriculadosRoutes, serviciosRoutes];
