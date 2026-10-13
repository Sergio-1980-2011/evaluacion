// Genera el Programa de la rotación y la Guía docente en formato Word.
// Uso: node generar_documentos.js   (escribe en la carpeta superior)
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel,
  AlignmentType, WidthType, ShadingType, LevelFormat, PageOrientation, Footer,
  PageNumber, BorderStyle, PageBreak,
} = require("docx");

const D = JSON.parse(fs.readFileSync(path.join(__dirname, "contenido.json"), "utf8"));
const C = D.curso;
const SALIDA = path.join(__dirname, "..");

const AZUL = "1F4E79";
const AZUL_CLARO = "DDEBF7";
const GRIS = "F2F2F2";
const ANCHO_V = 9360;   // carta vertical, márgenes 1"
const ANCHO_H = 12960;  // carta horizontal, márgenes 1"
const borde = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };
const bordes = { top: borde, bottom: borde, left: borde, right: borde };

// ---------------------------------------------------------------- utilidades
const t = (text, o = {}) => new TextRun({ text, ...o });
const p = (text, o = {}) =>
  new Paragraph({ children: Array.isArray(text) ? text : [t(text, o.run || {})], spacing: { after: 120 }, ...o.par });
const h1 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_1, children: [t(text)] });
const h2 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [t(text)] });
const h3 = (text) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [t(text)] });
const bullet = (text, nivel = 0) =>
  new Paragraph({ numbering: { reference: "vinetas", level: nivel }, spacing: { after: 60 },
    children: Array.isArray(text) ? text : [t(text)] });
const num = (text, ref = "numeros") =>
  new Paragraph({ numbering: { reference: ref, level: 0 }, spacing: { after: 60 }, children: [t(text)] });
const negrita = (a, b) => [t(a, { bold: true }), t(b)];
const salto = () => new Paragraph({ children: [new PageBreak()] });

function celda(contenido, ancho, o = {}) {
  const parrafos = (Array.isArray(contenido) ? contenido : [contenido]).map((c) =>
    c instanceof Paragraph ? c
      : new Paragraph({ alignment: o.centro ? AlignmentType.CENTER : AlignmentType.LEFT,
          children: [t(String(c), { bold: o.bold, color: o.color, size: o.size || 18 })] }));
  return new TableCell({
    width: { size: ancho, type: WidthType.DXA },
    borders: bordes,
    shading: o.fondo ? { fill: o.fondo, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: o.size ? 30 : 60, bottom: o.size ? 30 : 60, left: 100, right: 100 },
    columnSpan: o.span,
    children: parrafos,
  });
}

function tabla(filas, anchos, o = {}) {
  const total = anchos.reduce((a, b) => a + b, 0);
  const rows = filas.map((fila, i) => {
    const esCab = o.cabecera !== false && i === 0;
    return new TableRow({
      tableHeader: esCab,
      children: fila.map((v, j) =>
        celda(v, anchos[j], {
          bold: esCab || (o.primeraNegrita && j === 0),
          color: esCab ? "FFFFFF" : undefined,
          fondo: esCab ? AZUL : (o.primeraNegrita && j === 0 ? AZUL_CLARO : undefined),
          centro: o.centrar && o.centrar.includes(j),
          size: o.size,
        })),
    });
  });
  return new Table({ width: { size: total, type: WidthType.DXA }, columnWidths: anchos, rows });
}

const estilos = {
  default: { document: { run: { font: "Arial", size: 21 } } },
  paragraphStyles: [
    { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 28, bold: true, color: AZUL, font: "Arial" },
      paragraph: { spacing: { before: 300, after: 160 }, outlineLevel: 0 } },
    { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 24, bold: true, color: AZUL, font: "Arial" },
      paragraph: { spacing: { before: 220, after: 120 }, outlineLevel: 1 } },
    { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
      run: { size: 21, bold: true, color: "404040", font: "Arial" },
      paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } },
  ],
};
const numeracion = {
  config: [
    { reference: "vinetas", levels: [
      { level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 540, hanging: 270 } } } },
      { level: 1, format: LevelFormat.BULLET, text: "–", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 1080, hanging: 270 } } } } ] },
    ...["numeros", "numeros2", "numeros3"].map((reference) => ({ reference, levels: [
      { level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
        style: { paragraph: { indent: { left: 540, hanging: 300 } } } } ] })),
  ],
};
const pie = (texto) => ({
  default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER,
    children: [t(`${texto} · página `, { size: 16, color: "808080" }),
      new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "808080" })] })] }),
});
const vertical = { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } };
const horizontal = { page: { size: { width: 12240, height: 15840, orientation: PageOrientation.LANDSCAPE },
  margin: { top: 1080, bottom: 1080, left: 1440, right: 1440 } } };

function portada(titulo, subtitulo) {
  return [
    new Paragraph({ spacing: { before: 1800, after: 200 }, alignment: AlignmentType.CENTER,
      children: [t(titulo, { size: 40, bold: true, color: AZUL })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 400 },
      children: [t(subtitulo, { size: 24, color: "404040" })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
      border: { top: { style: BorderStyle.SINGLE, size: 8, color: AZUL, space: 8 } },
      children: [t("Servicio de Kinesiología – Área de Rehabilitación", { size: 22 })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [t("Noviembre 2026", { size: 22 })] }),
  ];
}

// Rúbrica imprimible: criterio | 4 | 3 | 2 | 1 | Puntaje
function rubrica(pauta) {
  const anchos = [2300, 2420, 2420, 2420, 2420, 980];
  const filas = [["Criterio (peso)", "4 · Excelente", "3 · Bueno", "2 · Suficiente", "1 · Insuficiente", "Puntaje (0–4)"]];
  pauta.forEach((c, i) => filas.push([`${i + 1}. ${c.criterio} (${Math.round(c.peso * 100)} %)`, c.d4, c.d3, c.d2, c.d1, ""]));
  return tabla(filas, anchos, { primeraNegrita: true, centrar: [5], size: 15 });
}
function cuadroNota() {
  return tabla([
    ["% de logro = Σ (peso × puntaje / 4)", "", "Nota (escala 1–7, exigencia 60 %)", ""],
    ["Evaluador", "", "Firma", ""],
    ["Residente", "", "Fecha", ""],
  ], [3800, 2680, 3800, 2680], { cabecera: false, primeraNegrita: true });
}

// ================================================================ PROGRAMA
function programa() {
  const cuerpo = [];
  cuerpo.push(...portada(C.titulo, C.subtitulo), salto());

  cuerpo.push(h1("I. Identificación"));
  cuerpo.push(tabla(C.identificacion.map(([a, b]) => [a, b]), [3200, 6160], { cabecera: false, primeraNegrita: true }));

  cuerpo.push(h1("II. Descripción de la rotación"));
  C.descripcion.forEach((x) => cuerpo.push(p(x)));

  cuerpo.push(h1("III. Resultado de aprendizaje general"));
  cuerpo.push(p(C.resultado_general, { run: { bold: true } }));

  cuerpo.push(h1("IV. Resultados de aprendizaje específicos"));
  cuerpo.push(p("Al término de la rotación, el residente:"));
  C.resultados_especificos.forEach((x) => cuerpo.push(num(x)));

  cuerpo.push(h1("V. Contenidos"));
  C.unidades.forEach((u) => {
    cuerpo.push(h3(u.nombre));
    u.contenidos.forEach((x) => cuerpo.push(bullet(x)));
  });

  cuerpo.push(h1("VI. Metodología general del curso"));
  cuerpo.push(h2("Actividad clínica supervisada"), p(C.actividad_clinica));
  cuerpo.push(h2("Seminarios"), p(C.seminarios_metodologia));
  cuerpo.push(h2("Estudio personal"), p(C.estudio_personal));
  cuerpo.push(h2("Bitácora"), p(C.bitacora_texto), p("La bitácora debe responder:"));
  C.bitacora.forEach((x) => cuerpo.push(bullet(x)));
  cuerpo.push(h2("Feedback"), p(C.feedback_texto));

  cuerpo.push(h1("VII. Seminarios"));
  cuerpo.push(tabla([["N°", "Fecha", "Tema", "Origen"],
    ...C.seminarios.map((s) => [String(s.n), s.fecha, s.titulo, s.origen])],
  [600, 1900, 5260, 1600], { centrar: [0] }));
  C.seminarios.forEach((s) => {
    cuerpo.push(h3(`Seminario ${s.n}: ${s.titulo}`));
    if (s.justificacion) cuerpo.push(p([t("Por qué se sugiere: ", { bold: true, italics: true }), t(s.justificacion, { italics: true })]));
    s.contenidos.forEach((x) => cuerpo.push(bullet(x)));
  });
  cuerpo.push(h3("Temas alternativos (si se desea reemplazar alguno)"));
  C.seminarios_alternativos.forEach((x) => cuerpo.push(bullet(x)));

  cuerpo.push(h1("VIII. Cronograma"));
  cuerpo.push(tabla([["Semana", "Ejes temáticos", "Actividad clínica", "Seminario", "Otras actividades"],
    ...C.cronograma.map((c) => [c.semana, c.tema, c.clinica, c.seminario, c.otros])],
  [1500, 1700, 3060, 1600, 1500]));

  cuerpo.push(h1("IX. Sistema de evaluación"));
  cuerpo.push(p("La evaluación formativa se realizará a través de feedback estructurado del desempeño mostrado por el residente, con la finalidad de orientar mejoras en su práctica profesional y su puesta en marcha a la luz de la mejora continua. El feedback de mitad de rotación utiliza la Pauta de Evaluación Global sin calificación."));
  cuerpo.push(p("La evaluación final de esta rotación se realizará al término de ésta y en base a:"));
  cuerpo.push(tabla([["Instrumento", "Momento", "Ponderación"],
    ["Seminarios: Pauta de presentación oral (Anexo 1). Nota = promedio de los 4 seminarios.", "Cada viernes", "50 %"],
    ["Desempeño: Pauta de evaluación global (Anexo 2).", "Lunes 30 de noviembre", "50 %"]],
  [5560, 2300, 1500], { centrar: [2] }));
  cuerpo.push(p(""));
  cuerpo.push(p("Cálculo de la nota: cada criterio se puntúa de 0 a 4. El porcentaje de logro es la suma ponderada de los puntajes dividida por 4. La nota se calcula con escala de 1,0 a 7,0 y un 60 % de exigencia para la nota 4,0, redondeada a un decimal. La planilla Excel adjunta realiza los cálculos automáticamente."));
  cuerpo.push(p("La nota final de la rotación se calificará con una escala de 1 a 7. Para aprobar se deben cumplir las siguientes condiciones:", { run: { bold: true } }));
  ["Asistencia mínima de 90 % (de 21 días programados, se permite un máximo de 2 inasistencias).",
    "Obtener nota final de la rotación 5,0 o superior.",
    "Obtener nota 5,0 o superior en el área de Seminarios."].forEach((x) => cuerpo.push(num(x, "numeros2")));

  cuerpo.push(h1("X. Recursos de aprendizaje"));
  cuerpo.push(h2("Bibliografía básica (obligatoria)"));
  D.bibliografia_basica.forEach((x) => cuerpo.push(num(x, "numeros3")));
  cuerpo.push(h2("Bibliografía complementaria"));
  D.bibliografia_complementaria.forEach((x) => cuerpo.push(bullet(x)));
  cuerpo.push(h2("Recursos en línea"));
  ["ERAS Society – guías por tipo de cirugía: erassociety.org",
    "Prehab Cancer Pathway / Macmillan «Prehabilitation for people with cancer» (guía de principios y práctica).",
    "Calculadoras: ARISCAT, Clinical Frailty Scale, DASI, ecuaciones de referencia del TM6M."].forEach((x) => cuerpo.push(bullet(x)));

  // ---- anexos (horizontal)
  const anexos = [];
  anexos.push(h1("Anexo 1. Pauta de presentación oral (Seminarios)"));
  anexos.push(tabla([["Residente", "", "Seminario N° / tema", "", "Fecha", ""]],
    [1500, 3000, 1900, 3560, 1000, 2000], { cabecera: false }));
  anexos.push(p(""));
  anexos.push(rubrica(D.pauta_seminario));
  anexos.push(p("0 = No logrado / ausente.", { run: { italics: true, size: 18 } }));
  anexos.push(cuadroNota());
  anexos.push(p("Comentarios / feedback:", { run: { bold: true }, par: { spacing: { before: 200 } } }));
  anexos.push(p("______________________________________________________________________________________________________"));
  anexos.push(p("______________________________________________________________________________________________________"));

  anexos.push(salto(), h1("Anexo 2. Pauta de evaluación global de desempeño"));
  anexos.push(tabla([["Residente", "", "Instancia", "☐ Mitad de rotación (formativa)    ☐ Final (sumativa)", "Fecha", ""]],
    [1500, 2600, 1300, 4560, 1000, 2000], { cabecera: false }));
  anexos.push(p(""));
  anexos.push(rubrica(D.pauta_global));
  anexos.push(p("0 = No logrado / ausente.", { run: { italics: true, size: 18 } }));
  anexos.push(cuadroNota());

  const fb = [];
  fb.push(h1("Anexo 3. Formato de bitácora reflexiva semanal (Canvas)"));
  fb.push(tabla([["Semana N°", "", "Fecha", ""]], [2000, 2680, 2000, 2680], { cabecera: false, primeraNegrita: true }));
  fb.push(p(""));
  fb.push(tabla([
    ["Pregunta", "Orientación para el residente"],
    ["1. ¿Qué aprendí?", "Describa 2 o 3 aprendizajes concretos de la semana (un concepto, una herramienta, una habilidad) y en qué paciente o situación los aprendió."],
    ["2. ¿Qué cambió mi forma de evaluar a un paciente?", "Compare cómo evaluaba antes la capacidad funcional o el riesgo y cómo lo haría ahora. ¿Qué dato nuevo incorpora a su evaluación preanestésica?"],
    ["3. ¿Qué haría distinto ahora?", "Identifique una decisión o conducta que modificaría en su práctica anestésica (preoperatorio, intraoperatorio o postoperatorio) y por qué."],
    ["Pregunta pendiente (opcional)", "Una pregunta que surgió de los casos y que buscará en la literatura."],
  ], [3000, 6360], { primeraNegrita: true }));
  fb.push(p("Extensión sugerida: 300 a 500 palabras. Entrega: domingo antes de las 23:59 h.", { run: { italics: true } }));

  fb.push(h1("Anexo 4. Pauta de feedback estructurado"));
  fb.push(tabla([["Residente", "", "Instancia", ""], ["Evaluador", "", "Fecha", ""]],
    [1700, 2980, 1700, 2980], { cabecera: false, primeraNegrita: true }));
  fb.push(p(""));
  fb.push(tabla([
    ["Etapa", "Pregunta guía", "Registro"],
    ["1. Autoevaluación", "¿Cómo crees que te ha ido? ¿Qué has logrado y qué te ha costado?", ""],
    ["2. Fortalezas", "Conductas concretas observadas que debe mantener (ser específico).", ""],
    ["3. Aspectos a mejorar", "1 o 2 conductas concretas, observables y modificables.", ""],
    ["4. Plan de acción", "¿Qué harás distinto? ¿Cómo y cuándo lo verificaremos?", ""],
    ["5. Cierre", "El residente resume lo conversado y los compromisos.", ""],
  ], [2000, 3500, 3860], { primeraNegrita: true }));
  fb.push(p(""));
  fb.push(p("Firma evaluador: ____________________     Firma residente: ____________________"));

  return new Document({
    creator: "Docente guía", title: "Programa Rotación Prehabilitación", styles: estilos, numbering: numeracion,
    sections: [
      { properties: vertical, footers: pie("Programa – Rotación de Prehabilitación Quirúrgica"), children: cuerpo },
      { properties: horizontal, footers: pie("Programa – Anexos 1 y 2"), children: anexos },
      { properties: vertical, footers: pie("Programa – Anexos 3 y 4"), children: fb },
    ],
  });
}

// ================================================================ GUÍA DOCENTE
const TEMAS = [
  {
    titulo: "1. Concepto de prehabilitación",
    objetivo: "Que el residente entienda la prehabilitación como una intervención multimodal que aumenta la reserva fisiológica antes de la cirugía, y la diferencie de ERAS y de la rehabilitación postoperatoria.",
    claves: [
      "Definición: proceso entre el diagnóstico y la cirugía que busca mejorar la capacidad funcional para tolerar el estrés quirúrgico y acelerar la recuperación.",
      "Modelo de trayectoria funcional: la cirugía provoca una caída de la capacidad funcional; quien parte con más reserva cae menos y recupera antes su nivel basal.",
      "Componentes del programa multimodal: (1) ejercicio aeróbico + fuerza ± entrenamiento muscular inspiratorio; (2) nutrición: aporte proteico ≥ 1,2–1,5 g/kg/día y corrección de la desnutrición; (3) apoyo psicológico: manejo de la ansiedad y adherencia; (4) cesación de tabaco y alcohol (idealmente ≥ 4 semanas); (5) optimización médica: anemia, diabetes, comorbilidades.",
      "Ventana de tiempo: habitualmente 4 a 6 semanas. En cirugía oncológica se aprovecha el intervalo diagnóstico–cirugía o el período de neoadyuvancia, sin retrasar el tratamiento.",
      "ERAS optimiza el perioperatorio; la prehabilitación prepara al paciente antes. Son complementarias (Gillis, Br J Anaesth 2022).",
      "Evidencia: Barberan-Garcia 2018 (pacientes de alto riesgo, cirugía abdominal mayor) y Molenaar 2023 (PREHAB, cáncer colorrectal) mostraron menos complicaciones; Carli 2020 (pacientes frágiles, cáncer colorrectal) no mostró diferencias en complicaciones a 30 días entre prehabilitación y rehabilitación postoperatoria. Discutir por qué: adherencia, selección de pacientes e intensidad del programa.",
    ],
    perla: "La consulta preanestésica es el momento ideal para detectar al paciente de baja reserva y derivarlo a prehabilitación: el anestesiólogo puede ser quien active el programa.",
    practica: "Revisar con el kinesiólogo el flujo de derivación del servicio: quién deriva, con qué criterios y en qué plazos. Elaborar una lista de criterios de derivación.",
    preguntas: [
      "¿Qué pacientes se benefician más de la prehabilitación y cuáles probablemente no?",
      "¿Cuál es el tiempo mínimo útil de prehabilitación? ¿Se justifica postergar una cirugía oncológica para prehabilitar?",
    ],
  },
  {
    titulo: "2. Evaluación funcional",
    objetivo: "Que el residente pase de una valoración subjetiva («¿cómo se siente?») a una evaluación funcional objetiva, reproducible y útil para estimar el riesgo y prescribir ejercicio.",
    claves: [
      "Estudio METS (Wijeysundera, Lancet 2018): la estimación subjetiva del anestesiólogo identifica mal a los pacientes con baja capacidad funcional. El DASI se asoció de forma independiente con muerte o infarto a 30 días.",
      "METs: 1 MET = 3,5 mL O2/kg/min. Una capacidad < 4 METs (no poder subir 2 pisos de escalera) indica baja capacidad funcional.",
      "DASI: 12 preguntas, puntaje 0–58,2; VO2 estimado = 0,43 × DASI + 9,6 mL/kg/min. Un DASI ≤ 34 se ha propuesto como umbral para identificar a pacientes de mayor riesgo.",
      "TM6M (ATS 2002): pasillo de 30 m, frases de estímulo estandarizadas; registrar SpO2, FC, disnea y fatiga (Borg) antes y después. Interpretar en relación con el valor predicho (ecuaciones chilenas de Osses 2010 o de Enright-Sherrill 1998). La diferencia mínima clínicamente importante es de alrededor de 25–33 m (Holland 2014).",
      "Fuerza y desempeño físico: dinamometría de prensión (protocolo estandarizado, Roberts 2011); sentarse y pararse 5 veces (> 15 s = baja fuerza) o 30 segundos; SPPB (≤ 8 = bajo desempeño); velocidad de marcha (≤ 0,8 m/s = bajo desempeño); Timed Up and Go.",
      "Fuerza muscular respiratoria: PImax / PEmax, útil para dosificar el entrenamiento muscular inspiratorio.",
    ],
    perla: "Una buena evaluación funcional cumple dos funciones: estratificar el riesgo y servir como línea base para prescribir y medir el efecto de la prehabilitación. Siempre repetir la misma prueba al final del programa.",
    practica: "Aplicar con supervisión DASI, TM6M, dinamometría y SPPB a un mínimo de 5 pacientes por semana y registrarlos en la ficha de evaluación funcional (Anexo A).",
    preguntas: [
      "¿Qué aporta el TM6M que no aporta la pregunta «¿puede subir dos pisos?»?",
      "Si el paciente no puede caminar por dolor o claudicación, ¿qué alternativas de evaluación existen?",
    ],
  },
  {
    titulo: "3. Capacidad aeróbica y CPET",
    objetivo: "Que el residente interprete las variables principales de una prueba de esfuerzo cardiopulmonar (CPET) y las use para estratificar el riesgo y prescribir el ejercicio aeróbico.",
    claves: [
      "Variables principales (Levett, Br J Anaesth 2018): VO2 pico, VO2 en el umbral anaeróbico (UA), equivalente ventilatorio de CO2 (VE/VCO2) en el UA, respuesta de FC y presión arterial, ECG.",
      "Umbrales de riesgo clásicos en cirugía abdominal mayor: UA < 11 mL/kg/min (Older 1999), VO2 pico bajo (aprox. < 15 mL/kg/min) y VE/VCO2 > 34 se asocian a mayor morbimortalidad. Los umbrales varían según la cirugía y la cohorte.",
      "Resección pulmonar (ACCP, Brunelli 2013): VO2 máx < 10 mL/kg/min o < 35 % del predicho = alto riesgo; > 20 mL/kg/min o > 75 % = bajo riesgo. La prueba de escalera o el shuttle walk test sirven como tamizaje.",
      "Prescripción aeróbica (FITT): frecuencia de 3 a 5 días/semana; intensidad moderada (Borg 12–14/20, o 40–60 % de la FC de reserva) o interválica de alta intensidad (HIIT) calculada sobre la carga del CPET; 20–40 minutos; caminata, bicicleta o cicloergómetro.",
      "HIIT: logra mejorías de VO2 en pocas semanas, por lo que resulta útil cuando la ventana preoperatoria es corta (Barberan-Garcia 2018).",
    ],
    perla: "La CPET no sólo da un número: permite conversar con el paciente y el cirujano sobre el riesgo, decidir el destino postoperatorio (sala vs. unidad de paciente crítico) e individualizar el entrenamiento.",
    practica: "Interpretar al menos 3 informes de CPET con el tutor. Calcular con el kinesiólogo la intensidad de entrenamiento (FC objetivo o carga en watts) de un paciente real.",
    preguntas: [
      "Paciente con UA de 9 mL/kg/min programado para una gastrectomía: ¿qué cambia en su plan anestésico y en su destino postoperatorio?",
      "¿Qué hacer cuando no hay CPET disponible?",
    ],
  },
  {
    titulo: "4. Importancia del ejercicio de fuerza",
    objetivo: "Que el residente reconozca la pérdida muscular perioperatoria como un determinante de los resultados y fundamente la prescripción del ejercicio de fuerza.",
    claves: [
      "La cirugía, el reposo, la inflamación y el tratamiento oncológico producen una pérdida rápida de masa y fuerza muscular, especialmente en adultos mayores.",
      "La baja fuerza muscular se asocia a más complicaciones, estadías más largas, pérdida de independencia e institucionalización.",
      "Prescripción (Fragala 2019, NSCA): 2–3 sesiones/semana; 6–10 ejercicios de grandes grupos musculares (énfasis en extremidades inferiores: sentarse-pararse, sentadillas asistidas, step); 1–3 series de 8–12 repeticiones; intensidad moderada (esfuerzo percibido de 5–7/10 o aprox. 60–80 % de 1RM), con progresión.",
      "Sinergia con la nutrición: el estímulo de fuerza requiere aporte proteico adecuado (≥ 1,2–1,5 g/kg/día, idealmente proteína de suero cerca del ejercicio).",
      "Medir para progresar: dinamometría, sentarse-pararse en 30 s y SPPB al inicio y al final.",
    ],
    perla: "La fuerza de las extremidades inferiores predice la capacidad de levantarse de la cama y deambular el día 1: es la base de la movilización precoz.",
    practica: "Participar en 2 sesiones de ejercicio supervisado de fuerza y diseñar con el kinesiólogo una rutina domiciliaria con bandas elásticas para un paciente.",
    preguntas: [
      "¿Por qué un programa sólo aeróbico puede ser insuficiente en el adulto mayor sarcopénico?",
      "¿Qué precauciones de ejercicio de fuerza considera en el paciente cardiópata o con metástasis óseas?",
    ],
  },
  {
    titulo: "5. Rehabilitación respiratoria",
    objetivo: "Que el residente estime el riesgo de complicaciones pulmonares postoperatorias (CPP) e indique estrategias de rehabilitación respiratoria pre y postoperatorias.",
    claves: [
      "Las CPP (atelectasia, neumonía, insuficiencia respiratoria, broncoespasmo) son la principal causa de morbilidad en cirugía torácica y abdominal alta.",
      "ARISCAT (Canet 2010): edad, SpO2 preoperatoria, infección respiratoria en el último mes, anemia (Hb ≤ 10 g/dL), incisión abdominal alta o intratorácica, duración de la cirugía y cirugía de urgencia. Riesgo bajo < 26, intermedio 26–44, alto ≥ 45 puntos.",
      "Entrenamiento muscular inspiratorio (IMT) preoperatorio: reduce la atelectasia y la neumonía postoperatorias en cirugía cardiaca y abdominal mayor (Cochrane, Katsura 2015). Se inicia habitualmente con una carga cercana al 30 % de la PImax, con progresión, durante al menos 2 semanas.",
      "Educación preoperatoria: una sesión de kinesiología preoperatoria (educación y entrenamiento en ejercicios respiratorios) redujo a la mitad las CPP en cirugía abdominal alta (LIPPSMAck POP, Boden 2018).",
      "Postoperatorio: ejercicios de expansión pulmonar, inspirometría incentiva, tos asistida con protección de la herida, posición semisentada y, sobre todo, movilización precoz.",
      "Factores anestésicos modificables: ventilación protectora, reversión completa del bloqueo neuromuscular, analgesia que permita toser y respirar profundo (regional cuando esté indicada).",
    ],
    perla: "El mejor «ejercicio respiratorio» del postoperatorio es sacar al paciente de la cama; una buena analgesia es la condición para lograrlo.",
    practica: "Calcular el ARISCAT de todos los pacientes evaluados; medir la PImax y supervisar una sesión de IMT; acompañar la primera sesión de kinesiterapia respiratoria postoperatoria.",
    preguntas: [
      "¿Qué factores del ARISCAT son modificables por el anestesiólogo?",
      "¿Cómo influye el tipo de analgesia en la función respiratoria tras una toracotomía o una laparotomía supraumbilical?",
    ],
  },
  {
    titulo: "6. Fragilidad",
    objetivo: "Que el residente identifique la fragilidad y la sarcopenia con instrumentos validados y comprenda sus implicancias en la toma de decisiones perioperatorias.",
    claves: [
      "Fragilidad: síndrome de disminución de la reserva y de la resistencia a los estresores. Entre el 30 y el 50 % de los adultos mayores que van a cirugía mayor son frágiles, con más del doble de riesgo de morbilidad, mortalidad y discapacidad (McIsaac 2020).",
      "Clinical Frailty Scale (Rockwood 2005): escala de 1 a 9; ≥ 5 = frágil. Es la más factible en la consulta preanestésica.",
      "Fenotipo de Fried (2001): pérdida de peso no intencionada, agotamiento, baja actividad física, marcha lenta y prensión débil. 3 o más criterios = frágil; 1–2 = prefrágil.",
      "Sarcopenia según EWGSOP2 (Cruz-Jentoft 2019): baja fuerza (prensión < 27 kg en hombres y < 16 kg en mujeres, o sentarse-pararse 5 veces > 15 s) + baja masa muscular; es severa si además hay bajo desempeño (velocidad de marcha ≤ 0,8 m/s, SPPB ≤ 8, TUG ≥ 20 s).",
      "En el paciente hepático: sarcopenia muy frecuente; el Liver Frailty Index (prensión, sentarse-pararse, equilibrio) es útil en pacientes cirróticos.",
      "Intervención: prehabilitación multimodal, revisión de fármacos, evaluación cognitiva y del riesgo de delirio, nutrición, apoyo social y planificación del alta. Toma de decisiones compartida y metas de cuidado.",
    ],
    perla: "La fragilidad cambia la conversación preoperatoria: además del riesgo de muerte, hay que hablar del riesgo de perder independencia.",
    practica: "Aplicar la CFS y los criterios EWGSOP2 a todos los pacientes ≥ 65 años evaluados; comparar la clasificación con la impresión clínica inicial.",
    preguntas: [
      "¿La fragilidad es reversible? ¿Qué componentes pueden modificarse en 4 semanas?",
      "¿Cómo cambia el manejo anestésico en un paciente frágil (dosis, profundidad anestésica, prevención del delirio)?",
    ],
  },
  {
    titulo: "7. Movilización precoz",
    objetivo: "Que el residente comprenda la movilización precoz como un objetivo compartido del equipo y reconozca cómo las decisiones anestésicas la facilitan o la impiden.",
    claves: [
      "El reposo en cama produce pérdida muscular, resistencia a la insulina, atelectasia, tromboembolismo y delirio. La movilización precoz es un componente central de ERAS.",
      "Objetivos habituales: sedestación o bipedestación el día de la cirugía y deambulación progresiva desde el día 1, según el tipo de cirugía.",
      "Criterios de seguridad: estabilidad hemodinámica sin aumento de drogas vasoactivas, SpO2 adecuada con el soporte disponible, ausencia de sangrado activo, paciente colaborador y dolor controlado.",
      "Barreras frecuentes: dolor, náuseas y vómitos, hipotensión ortostática, bloqueo motor, exceso de catéteres, drenajes y sondas, sobrecarga de fluidos y sedación.",
      "Rol del anestesiólogo: analgesia multimodal ahorradora de opioides, técnicas regionales que no bloqueen la función motora, profilaxis de NVPO, manejo de fluidos orientado a objetivos y retiro precoz de dispositivos.",
    ],
    perla: "Al planificar la analgesia hay que preguntarse: ¿permite que este paciente se siente y camine mañana?",
    practica: "Hacer seguimiento de pacientes prehabilitados en el postoperatorio (días 0–3), registrar el día y la distancia de la primera deambulación y las barreras encontradas.",
    preguntas: [
      "¿Qué técnica analgésica elegiría en una hepatectomía abierta para favorecer la movilización?",
      "¿Cuándo está contraindicado movilizar a un paciente postoperado?",
    ],
  },
  {
    titulo: "8. Rol del kinesiólogo en medicina perioperatoria",
    objetivo: "Que el residente conozca las competencias del kinesiólogo y las integre en la planificación perioperatoria mediante una comunicación efectiva.",
    claves: [
      "Competencias: evaluación funcional y respiratoria, prescripción y supervisión del ejercicio, entrenamiento muscular inspiratorio, kinesiterapia respiratoria, movilización precoz, educación del paciente y continuidad de la rehabilitación tras el alta.",
      "El kinesiólogo es quien más tiempo pasa con el paciente durante la prehabilitación: detecta adherencia, síntomas y cambios clínicos.",
      "Comunicación: derivación con la pregunta clínica explícita, fecha de la cirugía, restricciones y objetivos; uso de un registro común de la evaluación funcional.",
      "Trabajo interdisciplinario: anestesiólogo, cirujano, kinesiólogo, nutricionista, psicólogo y enfermería, con reuniones breves de caso.",
    ],
    perla: "Una buena derivación a kinesiología incluye: diagnóstico y cirugía planificada, fecha probable, riesgo estimado, restricciones (cardiacas, ortopédicas, oncológicas) y objetivo concreto.",
    practica: "Presentar 1 caso semanal en la reunión con el equipo de kinesiología, con la propuesta de plan conjunto.",
    preguntas: [
      "¿Qué información del intraoperatorio es útil para el kinesiólogo que moviliza al paciente al día siguiente?",
    ],
  },
];

const CASOS = [
  {
    area: "Cirugía de tórax",
    caso: "Hombre de 68 años, exfumador (40 paquetes/año), EPOC moderada, con un nódulo pulmonar de 3 cm en el lóbulo inferior derecho. Se planifica una lobectomía por videotoracoscopía en 5 semanas. VEF1 58 % del predicho, DLCO 52 %.",
    preguntas: ["Calcule el VEF1 y la DLCO postoperatorios predichos. ¿Necesita una prueba de ejercicio? ¿Cuál?",
      "Si el VO2 máx es de 13 mL/kg/min, ¿cómo lo interpreta?",
      "Diseñe con el kinesiólogo un programa de prehabilitación de 4 semanas (aeróbico, fuerza, IMT, cesación tabáquica)."],
  },
  {
    area: "Cirugía cardiaca",
    caso: "Mujer de 74 años, diabética, con enfermedad coronaria de tres vasos y fracción de eyección de 45 %. Cirugía de revascularización electiva en 4 semanas. Refiere cansancio al caminar una cuadra. Clinical Frailty Scale 5.",
    preguntas: ["¿Qué pruebas funcionales son seguras en esta paciente? ¿Cuáles evitaría?",
      "¿Qué rol tiene el IMT preoperatorio en cirugía cardiaca?",
      "¿Cómo integraría la fragilidad en la conversación con la paciente y el equipo quirúrgico?"],
  },
  {
    area: "Cirugía hepática",
    caso: "Hombre de 61 años con metástasis hepáticas de un cáncer colorrectal, en quimioterapia neoadyuvante. Hepatectomía mayor programada en 6 semanas. Pérdida de 6 kg en 3 meses, prensión de 24 kg.",
    preguntas: ["¿Cumple criterios de sarcopenia? ¿Qué otros datos necesita?",
      "¿Cómo aprovecharía el período de quimioterapia para prehabilitar?",
      "Considerando la analgesia y los fluidos, ¿qué plan anestésico favorece la movilización precoz?"],
  },
  {
    area: "Cirugía gástrica",
    caso: "Mujer de 70 años con adenocarcinoma gástrico. Gastrectomía total en 4 semanas. Albúmina 3,1 g/dL, TM6M de 320 m (62 % del predicho), SPPB 7.",
    preguntas: ["Interprete el TM6M y el SPPB. ¿Qué riesgo tiene esta paciente?",
      "¿Qué componente del programa multimodal priorizaría y por qué?",
      "Calcule su ARISCAT considerando una cirugía de 4 horas por vía abierta."],
  },
  {
    area: "Cirugía oncológica colorrectal",
    caso: "Hombre de 79 años, vive solo, con cáncer de colon sigmoides. Colectomía laparoscópica en 5 semanas. DASI 22, Clinical Frailty Scale 4, sentarse-pararse 5 veces en 17 s.",
    preguntas: ["Estime su VO2 a partir del DASI. ¿Qué indica?",
      "¿Qué nos dicen los estudios de Carli 2020 y Molenaar 2023 sobre la prehabilitación en un paciente como este?",
      "Planifique la movilización y el alta segura considerando su red de apoyo."],
  },
];

function guia() {
  const cuerpo = [];
  cuerpo.push(...portada("Guía docente: Prehabilitación Quirúrgica",
    "Contenidos clave, actividades prácticas y casos para la rotación del residente de Anestesiología"), salto());

  cuerpo.push(h1("Cómo usar esta guía"));
  cuerpo.push(p("Esta guía acompaña al Programa de la rotación. Para cada tema del programa se presentan el objetivo docente, los conceptos clave que el residente debe dominar (con valores de referencia y bibliografía), una «perla» para la práctica anestésica, la actividad práctica sugerida en el servicio y preguntas para la discusión. Al final se incluyen cinco casos clínicos, uno por cada área quirúrgica, y una ficha de evaluación funcional para la actividad clínica diaria."));
  cuerpo.push(p("Los puntos de corte que se presentan son orientativos: deben interpretarse en el contexto clínico de cada paciente y según los protocolos locales.", { run: { italics: true } }));

  TEMAS.forEach((tm) => {
    cuerpo.push(h1(tm.titulo));
    cuerpo.push(p(negrita("Objetivo docente: ", tm.objetivo)));
    cuerpo.push(h3("Conceptos clave"));
    tm.claves.forEach((x) => cuerpo.push(bullet(x)));
    cuerpo.push(tabla([[[new Paragraph({ children: [t("Perla para el anestesiólogo: ", { bold: true, color: AZUL }), t(tm.perla)] })]]],
      [ANCHO_V], { cabecera: false }));
    cuerpo.push(h3("Actividad práctica en la rotación"));
    cuerpo.push(p(tm.practica));
    cuerpo.push(h3("Preguntas para la discusión"));
    tm.preguntas.forEach((x) => cuerpo.push(bullet(x)));
  });

  cuerpo.push(h1("Resumen de herramientas de evaluación"));
  cuerpo.push(tabla([
    ["Dominio", "Herramienta", "Valor orientativo de alerta", "Referencia"],
    ["Capacidad funcional autorreportada", "METs / DASI", "< 4 METs; DASI ≤ 34", "Wijeysundera 2018; Hlatky 1989"],
    ["Capacidad aeróbica (campo)", "TM6M", "Bajo el valor predicho; cambio mínimo importante ≈ 25–33 m", "ATS 2002; Osses 2010; Holland 2014"],
    ["Capacidad aeróbica (laboratorio)", "CPET", "UA < 11 mL/kg/min; VE/VCO2 > 34; en resección pulmonar VO2 máx < 10 mL/kg/min", "Levett 2018; Brunelli 2013"],
    ["Fuerza", "Dinamometría de prensión", "< 27 kg (H) / < 16 kg (M)", "EWGSOP2 2019"],
    ["Fuerza de extremidades inferiores", "Sentarse-pararse 5 veces", "> 15 s", "EWGSOP2 2019"],
    ["Desempeño físico", "SPPB / velocidad de marcha / TUG", "SPPB ≤ 8; ≤ 0,8 m/s; TUG ≥ 20 s", "Guralnik 1994; EWGSOP2 2019"],
    ["Fragilidad", "Clinical Frailty Scale / Fried", "CFS ≥ 5; Fried ≥ 3 criterios", "Rockwood 2005; Fried 2001"],
    ["Riesgo pulmonar", "ARISCAT", "Intermedio 26–44; alto ≥ 45", "Canet 2010"],
    ["Músculos respiratorios", "PImax / PEmax", "Bajo el valor predicho para edad y sexo", "—"],
  ], [2100, 2000, 3060, 2200]));

  cuerpo.push(h1("Casos clínicos para discusión"));
  cuerpo.push(p("Sugerencia de uso: un caso por sesión de discusión, idealmente reemplazando los datos por los de un paciente real de la rotación."));
  CASOS.forEach((cs, i) => {
    cuerpo.push(h2(`Caso ${i + 1}. ${cs.area}`));
    cuerpo.push(p(cs.caso));
    cs.preguntas.forEach((x) => cuerpo.push(bullet(x)));
  });

  cuerpo.push(salto(), h1("Anexo A. Ficha de evaluación funcional preoperatoria"));
  const fila = (a, b = "") => [a, b];
  cuerpo.push(tabla([
    ["Dato", "Registro"],
    fila("Nombre / edad / sexo"), fila("Diagnóstico y cirugía planificada"), fila("Fecha probable de cirugía / semanas disponibles"),
    fila("Comorbilidades relevantes / ASA"), fila("Tabaco / alcohol"), fila("Hemoglobina / albúmina / IMC / pérdida de peso"),
    fila("METs estimados / DASI (VO2 estimado)"), fila("TM6M: distancia (m) / % predicho / SpO2 mín / Borg final"),
    fila("CPET (si disponible): VO2 pico / UA / VE/VCO2"), fila("Prensión (kg) / sentarse-pararse 5 veces (s) o 30 s (rep.)"),
    fila("SPPB / velocidad de marcha / TUG"), fila("PImax / PEmax"), fila("Clinical Frailty Scale / criterios de Fried"),
    fila("ARISCAT"), fila("Síntesis del riesgo"),
    fila("Plan de prehabilitación (ejercicio, IMT, nutrición, psicológico, tabaco, anemia)"),
    fila("Implicancias para el plan anestésico y el destino postoperatorio"),
    fila("Evaluación final pre-cirugía (repetir pruebas)"),
  ], [4200, 5160], { primeraNegrita: true }));

  return new Document({
    creator: "Docente guía", title: "Guía docente Prehabilitación", styles: estilos, numbering: numeracion,
    sections: [{ properties: vertical, footers: pie("Guía docente – Prehabilitación Quirúrgica"), children: cuerpo }],
  });
}

(async () => {
  for (const [doc, nombre] of [[programa(), "Programa_Rotacion_Prehabilitacion.docx"], [guia(), "Guia_Docente_Prehabilitacion.docx"]]) {
    fs.writeFileSync(path.join(SALIDA, nombre), await Packer.toBuffer(doc));
    console.log("OK", nombre);
  }
})();
