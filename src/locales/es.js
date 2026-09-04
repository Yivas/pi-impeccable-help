export const es = {
  "title": "Impeccable · Ayuda local",
  "description": "Explorar comandos de Impeccable sin enviar mensajes al modelo",
  "search": "Buscar: ",
  "placeholder": "comando o qué quieres mejorar",
  "available": "Skill cargada · preparar no ejecuta",
  "unavailable": "Skill no cargada · solo consulta",
  "baseline": "Referencia: Impeccable 4.2.0 · comprueba tu versión",
  "listKeys": "{up}/{down} elegir · {enter} detalle · {tab} ES/EN · {escape} cerrar",
  "detailKeys": "{up}/{down} desplazar · {left} volver · {enter} preparar · {escape} cerrar",
  "resize": "Amplía el terminal para leer la ayuda.",
  "noResults": "Sin coincidencias. Borra parte de la búsqueda.",
  "when": "Cuándo usarlo",
  "avoid": "Cuándo no",
  "effect": "Efecto al ejecutarlo",
  "example": "Ejemplo que se preparará",
  "natural": "También puedes pedirlo así",
  "naturalPrefix": "Usa Impeccable para: ",
  "scope": "Antes de enviar: concreta pantalla, objetivo y qué conservar.",
  "safety": "Consultar esta ayuda no llama al modelo. Enviar el comando de la skill sí inicia trabajo del agente.",
  "confirmTitle": "¿Reemplazar el borrador?",
  "confirmBody": "Ya hay texto en el editor. Preparar este comando lo reemplazará; no se enviará. Cancela para conservarlo.",
  "changed": "El borrador cambió mientras confirmabas. Se ha conservado; vuelve a preparar el comando.",
  "missing": "Impeccable no está cargado en esta sesión. Instala la skill por separado y recarga Pi.",
  "tuiOnly": "Esta ayuda necesita el terminal interactivo de Pi.",
  "effects": {
    "review": "Diagnóstico. El ejemplo pide no modificar archivos; las herramientas auxiliares requieren su propio alcance.",
    "plan": "Planifica y puede escribir documentos; no es una implementación automática.",
    "docs": "Crea o actualiza documentación del producto o diseño.",
    "refactor": "Modifica componentes o tokens; requiere pruebas de regresión.",
    "edit": "Modifica la interfaz; comprueba render, estados y comportamiento.",
    "live": "Puede arrancar herramientas y modificar fuente. Trabaja con recuperación y valida interacciones.",
    "alias": "Alias obsoleto; es preferible describir una petición de UI nueva."
  },
  "commands": {
    "critique": {
      "label": "Entender qué falla en el diseño",
      "when": "Cuando una pantalla resulta confusa o genérica y aún no sabes qué corregir.",
      "avoid": "No lo uses como permiso para rediseñar ni como garantía de accesibilidad.",
      "example": "Revisa la pantalla actual sin modificar archivos. Prioriza problemas observables y respeta el diseño aprobado."
    },
    "audit": {
      "label": "Revisar accesibilidad y calidad técnica",
      "when": "Para comprobar estados, responsive, rendimiento y accesibilidad de una implementación.",
      "avoid": "No sustituye pruebas reales ni certifica conformidad.",
      "example": "Audita la pantalla actual sin modificar archivos. Separa lo comprobado de lo pendiente de prueba."
    },
    "shape": {
      "label": "Decidir estructura y flujo",
      "when": "Antes de implementar una pantalla o cambiar su navegación y jerarquía.",
      "avoid": "No repitas decisiones de un diseño que ya está aprobado.",
      "example": "Planifica el flujo de la pantalla indicada antes de escribir código. Conserva los requisitos aprobados."
    },
    "init": {
      "label": "Preparar contexto de producto",
      "when": "Cuando faltan usuarios, objetivos y restricciones compartidos.",
      "avoid": "No lo repitas por rutina ni sustituyas contexto fiable ya existente.",
      "example": "Prepara el contexto del producto reutilizando la documentación existente. Pregunta por las decisiones que falten."
    },
    "document": {
      "label": "Registrar el sistema visual",
      "when": "Para documentar en DESIGN.md un estilo existente que merece conservarse.",
      "avoid": "No conviertas defectos accidentales en reglas ni sobrescribas una fuente aprobada.",
      "example": "Documenta el sistema visual existente. Distingue patrones deliberados de inconsistencias."
    },
    "extract": {
      "label": "Reutilizar componentes y tokens",
      "when": "Cuando hay duplicaciones reales que dificultan mantener un mismo diseño.",
      "avoid": "No es solo documentación ni justifica una biblioteca especulativa.",
      "example": "Extrae los patrones repetidos del alcance indicado sin cambiar apariencia ni comportamiento."
    },
    "polish": {
      "label": "Dar acabado final",
      "when": "Cuando estructura y comportamiento ya funcionan y quedan detalles visibles.",
      "avoid": "No intentes solucionar un flujo incorrecto con retoques.",
      "example": "Pule espaciado y tipografía de la pantalla indicada. Conserva estructura y comportamiento."
    },
    "layout": {
      "label": "Ordenar distribución y espaciado",
      "when": "Para corregir alineación, densidad, ritmo y jerarquía de las regiones.",
      "avoid": "No inventes paneles ni acciones para llenar espacio.",
      "example": "Mejora la distribución del alcance indicado conservando contenido, controles y orden de trabajo."
    },
    "typeset": {
      "label": "Mejorar tipografía y legibilidad",
      "when": "Cuando tamaños, pesos o longitud de línea dificultan leer y distinguir niveles.",
      "avoid": "No cambies fuentes aprobadas sin una razón y autorización.",
      "example": "Mejora jerarquía tipográfica y legibilidad conservando la identidad existente."
    },
    "clarify": {
      "label": "Aclarar textos y etiquetas",
      "when": "Cuando instrucciones, errores o nombres de acciones provocan dudas.",
      "avoid": "No cambies hechos ni inventes promesas del producto.",
      "example": "Aclara las etiquetas y mensajes indicados sin cambiar su significado ni las capacidades del producto."
    },
    "distill": {
      "label": "Reducir complejidad visual",
      "when": "Cuando decoración o contenido secundario ocultan la tarea principal.",
      "avoid": "No elimines información o controles necesarios.",
      "example": "Simplifica la pantalla indicada conservando las funciones e información necesarias."
    },
    "harden": {
      "label": "Cubrir errores y casos límite",
      "when": "Para mejorar recuperación, traducciones, textos largos y estados reales.",
      "avoid": "No es una auditoría de seguridad completa ni autoriza cambios de backend.",
      "example": "Refuerza los estados de error y casos límite del alcance indicado; conserva contratos y prueba el comportamiento."
    },
    "onboard": {
      "label": "Orientar el primer uso",
      "when": "Para primeros pasos y estados vacíos que deben enseñar cómo empezar.",
      "avoid": "No añadas un tutorial si una instrucción contextual basta.",
      "example": "Mejora el primer uso del flujo indicado sin inventar datos ni funciones."
    },
    "adapt": {
      "label": "Adaptar a pantallas y dispositivos",
      "when": "Cuando la interfaz debe servir en tamaños o modos de entrada definidos.",
      "avoid": "No prometas soporte para dispositivos que no puedas validar.",
      "example": "Adapta la pantalla a los tamaños acordados y comprueba contenido, foco y controles."
    },
    "optimize": {
      "label": "Resolver rendimiento de la UI",
      "when": "Cuando hay lentitud medible y puedes identificar el recorrido afectado.",
      "avoid": "No optimices a ciegas ni añadas cachés por suposición.",
      "example": "Diagnostica el recorrido lento indicado, mide y aplica la corrección mínima verificable."
    },
    "bolder": {
      "label": "Dar más presencia visual",
      "when": "Cuando se ha pedido una expresión más marcada y la identidad lo permite.",
      "avoid": "No sustituye al diagnóstico ni autoriza cambiar una dirección aprobada.",
      "example": "Refuerza la expresión visual del alcance indicado sin cambiar contenido ni comportamiento."
    },
    "quieter": {
      "label": "Reducir intensidad visual",
      "when": "Cuando color, contraste o decoración compiten por la atención.",
      "avoid": "No borres foco, contraste accesible ni estados importantes.",
      "example": "Reduce el ruido visual conservando jerarquía, foco y señales de estado."
    },
    "colorize": {
      "label": "Usar color con intención",
      "when": "Cuando el color puede distinguir información o reforzar la identidad.",
      "avoid": "No comuniques estados solo por color ni impongas otra paleta.",
      "example": "Mejora el uso funcional del color respetando la paleta y el contraste."
    },
    "animate": {
      "label": "Añadir movimiento útil",
      "when": "Para explicar transiciones, causalidad o respuesta a una acción.",
      "avoid": "No añadas animación decorativa ni ignores movimiento reducido.",
      "example": "Añade movimiento solo donde aclare la interacción y respeta movimiento reducido."
    },
    "delight": {
      "label": "Añadir personalidad",
      "when": "Cuando detalles propios pueden mejorar la experiencia sin distraer.",
      "avoid": "No añadas bromas en errores sensibles ni decoración sin función.",
      "example": "Propón detalles de personalidad dentro del sistema visual sin distraer de la tarea."
    },
    "overdrive": {
      "label": "Explorar una expresión ambiciosa",
      "when": "Cuando el brief pide explícitamente una experiencia visual excepcional.",
      "avoid": "No es el valor predeterminado para herramientas operativas ni ayuda técnica.",
      "example": "Explora una dirección visual ambiciosa para el alcance acordado sin sacrificar accesibilidad ni rendimiento."
    },
    "live": {
      "label": "Comparar variantes en navegador",
      "when": "Para explorar alternativas sobre una superficie acotada y recuperable.",
      "avoid": "No aceptes clones visuales sin comprobar IDs, eventos y estado.",
      "example": "Explora variantes del componente indicado en un entorno aislado. Conserva comportamiento y comprueba el diff antes de aceptar."
    },
    "craft": {
      "label": "Alias antiguo de trabajo nuevo",
      "when": "Solo para reconocer instrucciones antiguas; hoy basta una petición de UI nueva.",
      "avoid": "No es un paso adicional obligatorio del proceso.",
      "example": "Diseña la superficie indicada desde el brief aprobado, sin inventar capacidades."
    }
  }
};
