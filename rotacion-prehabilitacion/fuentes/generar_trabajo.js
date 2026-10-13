// Genera el documento de referencia «Prehabilitación quirúrgica: marco teórico y estándar de evaluación».
// Uso: node generar_trabajo.js   (escribe ../Trabajo_Referencia_Prehabilitacion.docx)
const fs = require("fs");
const path = require("path");
const {
  Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, HeadingLevel, AlignmentType,
  WidthType, ShadingType, LevelFormat, Footer, PageNumber, BorderStyle, PageBreak,
} = require("docx");
const { ALIAS, REFS_EXTRA, CAPITULOS, RESUMEN_UMBRALES } = require("./trabajo_contenido");

const PUBMED = JSON.parse(fs.readFileSync(path.join(__dirname, "pubmed_refs.json"), "utf8"));
const SALIDA = path.join(__dirname, "..", "Trabajo_Referencia_Prehabilitacion.docx");

// ---------------------------------------------------------------- referencias (Vancouver)
const AUTORES_CORPORATIVOS = {
  "12186831": "American Thoracic Society/European Respiratory Society",
  "12524257": "American Thoracic Society; American College of Chest Physicians",
  "12091180": "ATS Committee on Proficiency Standards for Clinical Pulmonary Function Laboratories",
};
const SOBRESCRITOS = {
  "21249280": {
    autores: "Osses R, Yáñez J, Barría P, Palacios S, Dreyse J, Díaz O, et al",
    titulo: "Prueba de caminata en seis minutos en sujetos chilenos sanos de 20 a 80 años",
  },
};

function vancouver(clave) {
  if (REFS_EXTRA[clave]) return REFS_EXTRA[clave];
  const r = PUBMED[clave];
  if (!r) throw new Error(`Referencia sin metadatos: ${clave}`);
  const s = SOBRESCRITOS[clave] || {};
  let autores = s.autores || AUTORES_CORPORATIVOS[clave];
  if (!autores) {
    const a = r.authors.map((x) => x.replace(/\s+/g, " ").trim());
    autores = a.length > 6 ? `${a.slice(0, 6).join(", ")}, et al` : a.join(", ");
  }
  const titulo = (s.titulo || r.title).replace(/^\[|\]\.?$/g, "").replace(/\.$/, "");
  const c = r.cit || {};
  const vol = c.volume ? `${c.volume}${c.issue ? `(${c.issue})` : ""}` : (c.issue ? `(${c.issue})` : "");
  const pags = c.pages ? `:${c.pages}` : "";
  let txt = `${autores}. ${titulo}. ${r.journal}. ${r.year};${vol}${pags}.`;
  if (r.doi) txt += ` doi:${r.doi}.`;
  txt += ` PMID: ${clave}.`;
  return txt;
}

const orden = []; // claves en orden de primera cita
function numero(alias) {
  const clave = ALIAS[alias];
  if (!clave) throw new Error(`Alias de cita desconocido: ${alias}`);
  let i = orden.indexOf(clave);
  if (i === -1) { orden.push(clave); i = orden.length - 1; }
  return i + 1;
}
function comprimir(nums) {
  const n = [...new Set(nums)].sort((a, b) => a - b);
  const partes = [];
  for (let i = 0; i < n.length; ) {
    let j = i;
    while (j + 1 < n.length && n[j + 1] === n[j] + 1) j++;
    partes.push(j - i >= 2 ? `${n[i]}–${n[j]}` : n.slice(i, j + 1).join(","));
    i = j + 1;
  }
  return `[${partes.join(",")}]`;
}
// Convierte un texto con [[alias]] en TextRuns, con las citas en azul.
function runs(texto, o = {}) {
  const out = [];
  const re = /\s*\[\[([^\]]+)\]\]/g;
  let ultimo = 0, m;
  while ((m = re.exec(texto))) {
    if (m.index > ultimo) out.push(new TextRun({ text: texto.slice(ultimo, m.index), ...o }));
    const nums = m[1].split(",").map((s) => numero(s.trim()));
    out.push(new TextRun({ text: " " + comprimir(nums), ...o, color: "1F4E79" }));
    ultimo = re.lastIndex;
  }
  if (ultimo < texto.length) out.push(new TextRun({ text: texto.slice(ultimo), ...o }));
  return out;
}

// ---------------------------------------------------------------- estilos y utilidades
const AZUL = "1F4E79", AZUL_CLARO = "DDEBF7", VERDE_CLARO = "E2F0D9", AMARILLO_CLARO = "FFF2CC";
const ANCHO = 9360;
const borde = { style: BorderStyle.SINGLE, size: 4, color: "BFBFBF" };
const bordes = { top: borde, bottom: borde, left: borde, right: borde };

const p = (texto, o = {}) => new Paragraph({
  children: typeof texto === "string" ? runs(texto, o.run) : texto,
  spacing: { after: 120, line: 276 }, alignment: o.justificar === false ? AlignmentType.LEFT : AlignmentType.JUSTIFIED,
});
const h1 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_1, pageBreakBefore: true, children: [new TextRun(t)] });
const h2 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_2, children: [new TextRun(t)] });
const h3 = (t) => new Paragraph({ heading: HeadingLevel.HEADING_3, children: [new TextRun(t)] });
const vineta = (t, ref = "vinetas") => new Paragraph({
  numbering: { reference: ref, level: 0 }, spacing: { after: 60, line: 264 }, children: runs(t),
});
const casilla = (t) => vineta(t, "casillas");

function celda(contenido, ancho, o = {}) {
  const parrafos = (Array.isArray(contenido) ? contenido : [contenido]).map((c) =>
    c instanceof Paragraph ? c : new Paragraph({
      alignment: o.centro ? AlignmentType.CENTER : AlignmentType.LEFT,
      children: runs(String(c), { bold: o.bold, color: o.color, size: 18 }),
    }));
  return new TableCell({
    width: { size: ancho, type: WidthType.DXA }, borders: bordes,
    shading: o.fondo ? { fill: o.fondo, type: ShadingType.CLEAR, color: "auto" } : undefined,
    margins: { top: 60, bottom: 60, left: 100, right: 100 }, children: parrafos,
  });
}
function tabla(filas, anchos) {
  return new Table({
    width: { size: anchos.reduce((a, b) => a + b, 0), type: WidthType.DXA }, columnWidths: anchos,
    rows: filas.map((fila, i) => new TableRow({
      tableHeader: i === 0,
      children: fila.map((v, j) => celda(v, anchos[j], i === 0 ? { bold: true, color: "FFFFFF", fondo: AZUL } : {})),
    })),
  });
}
function recuadro(titulo, cuerpo, fondo) {
  const hijos = [new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: titulo, bold: true, color: AZUL })] })];
  (Array.isArray(cuerpo) ? cuerpo : [cuerpo]).forEach((c) => hijos.push(typeof c === "string" ? new Paragraph({ alignment: AlignmentType.JUSTIFIED, children: runs(c) }) : c));
  return new Table({
    width: { size: ANCHO, type: WidthType.DXA }, columnWidths: [ANCHO],
    rows: [new TableRow({ children: [new TableCell({
      width: { size: ANCHO, type: WidthType.DXA }, borders: bordes,
      shading: { fill: fondo, type: ShadingType.CLEAR, color: "auto" },
      margins: { top: 120, bottom: 120, left: 160, right: 160 }, children: hijos,
    })] })],
  });
}
const espacio = () => new Paragraph({ spacing: { after: 60 }, children: [] });

// ---------------------------------------------------------------- documento
const cuerpo = [];

// Portada
cuerpo.push(
  new Paragraph({ spacing: { before: 2200, after: 240 }, alignment: AlignmentType.CENTER,
    children: [new TextRun({ text: "Prehabilitación quirúrgica", size: 44, bold: true, color: AZUL })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 480 },
    children: [new TextRun({ text: "Marco teórico, respuestas modelo y estándar de evaluación para la rotación del residente de Anestesiología", size: 26, color: "404040" })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, spacing: { after: 120 },
    border: { top: { style: BorderStyle.SINGLE, size: 8, color: AZUL, space: 8 } },
    children: [new TextRun({ text: "Servicio de Kinesiología – Área de Rehabilitación", size: 22 })] }),
  new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Documento docente · Noviembre 2026", size: 22 })] }),
);

// Presentación
cuerpo.push(h1("Presentación"));
cuerpo.push(p("Este documento desarrolla en profundidad los ocho temas de la rotación de prehabilitación y define, para cada uno, el estándar de desempeño ideal que se espera del residente. Su finalidad es doble: (1) servir de material de estudio con referencias sólidas y verificadas, y (2) entregar al docente un patrón objetivo para evaluar las actividades prácticas y las respuestas a las preguntas de discusión."));
cuerpo.push(p("Cada capítulo se organiza de la misma forma:"));
[
  "Objetivo docente.",
  "Desarrollo del tema, con la evidencia que lo sustenta.",
  "Perla para el anestesiólogo.",
  "Actividad práctica en la rotación y desempeño esperado (lista de cotejo).",
  "Preguntas para la discusión, con una respuesta modelo, los elementos esenciales que debe contener la respuesta y los elementos que distinguen una respuesta excelente.",
].forEach((t) => cuerpo.push(vineta(t)));
cuerpo.push(espacio());
cuerpo.push(p("Las referencias se citan con números entre corchetes en el orden de aparición (estilo Vancouver) y se listan al final del documento con su DOI y su PMID. Todas fueron verificadas en PubMed. Los puntos de corte presentados son orientativos y deben interpretarse en el contexto clínico de cada paciente y según los protocolos locales."));
cuerpo.push(h2("Cómo calificar las respuestas a las preguntas de discusión"));
cuerpo.push(p("Se sugiere usar la misma escala de 4 niveles de las pautas de la rotación, de modo que el resultado pueda alimentar los criterios «Dominio conceptual» de la pauta de seminarios y «Estratificación del riesgo» o «Planificación de la prehabilitación» de la pauta de evaluación global:"));
cuerpo.push(tabla([
  ["Nivel", "Criterio"],
  ["4 · Excelente", "Incluye todos los elementos esenciales, al menos un elemento complementario y fundamenta con evidencia (cita al menos un estudio o guía pertinente)."],
  ["3 · Bueno", "Incluye todos los elementos esenciales, con fundamentación parcial."],
  ["2 · Suficiente", "Incluye al menos la mitad de los elementos esenciales, sin errores conceptuales relevantes."],
  ["1 · Insuficiente", "Incluye menos de la mitad de los elementos esenciales o contiene errores conceptuales relevantes."],
  ["0 · No logrado", "No responde o la respuesta es incorrecta."],
], [2000, 7360]));

// Capítulos
CAPITULOS.forEach((cap) => {
  cuerpo.push(h1(cap.titulo));
  cuerpo.push(recuadro("Objetivo docente", cap.objetivo, AZUL_CLARO), espacio());
  cuerpo.push(h2("Desarrollo"));
  cap.desarrollo.forEach(([tipo, val]) => {
    if (tipo === "h3") cuerpo.push(h3(val));
    else if (tipo === "p") cuerpo.push(p(val));
    else if (tipo === "ul") { val.forEach((t) => cuerpo.push(vineta(t))); cuerpo.push(espacio()); }
    else if (tipo === "tabla") { cuerpo.push(tabla(val.filas, val.anchos), espacio()); }
  });
  cuerpo.push(espacio(), recuadro("Perla para el anestesiólogo", cap.perla, AMARILLO_CLARO), espacio());

  cuerpo.push(h2("Actividad práctica en la rotación"));
  cuerpo.push(p(cap.actividad.descripcion));
  cuerpo.push(h3("Desempeño esperado (estándar ideal)"));
  cap.actividad.esperado.forEach((t) => cuerpo.push(casilla(t)));

  cuerpo.push(h2("Preguntas para la discusión"));
  cap.preguntas.forEach((pr, i) => {
    cuerpo.push(h3(`Pregunta ${i + 1}. ${pr.q}`));
    cuerpo.push(recuadro("Respuesta modelo", pr.modelo, VERDE_CLARO), espacio());
    cuerpo.push(p("Elementos esenciales (para evaluar):", { run: { bold: true }, justificar: false }));
    pr.esenciales.forEach((t) => cuerpo.push(casilla(t)));
    cuerpo.push(p("Elementos que distinguen una respuesta excelente:", { run: { bold: true }, justificar: false }));
    pr.complementarios.forEach((t) => cuerpo.push(casilla(t)));
    cuerpo.push(espacio());
  });
});

// Resumen
cuerpo.push(h1("Anexo 1. Resumen de herramientas y umbrales"));
cuerpo.push(tabla(RESUMEN_UMBRALES, [2000, 1900, 4260, 1200]));

// Hoja de corrección
cuerpo.push(h1("Anexo 2. Hoja de corrección de preguntas de discusión"));
cuerpo.push(p("Registrar el nivel obtenido (0–4) en cada pregunta según la escala de la Presentación. El promedio por tema orienta el puntaje de los criterios de conocimiento de las pautas de la rotación."));
const filasCorr = [["Tema", "Pregunta", "Nivel (0–4)", "Observaciones"]];
CAPITULOS.forEach((cap) => cap.preguntas.forEach((pr, i) =>
  filasCorr.push([i === 0 ? cap.titulo : "", pr.q, "", ""])));
cuerpo.push(tabla(filasCorr, [2200, 4160, 1100, 1900]));
cuerpo.push(espacio(), p("Residente: ______________________   Evaluador: ______________________   Fecha: ____________", { justificar: false }));

// Referencias (todas las citas ya fueron numeradas)
cuerpo.push(h1("Referencias"));
orden.forEach((clave, i) => cuerpo.push(new Paragraph({
  numbering: { reference: "referencias", level: 0 }, spacing: { after: 80 },
  children: [new TextRun({ text: vancouver(clave), size: 18 })],
})));

const doc = new Document({
  creator: "Docente guía", title: "Prehabilitación quirúrgica – Documento de referencia",
  styles: {
    default: { document: { run: { font: "Arial", size: 21 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 30, bold: true, color: AZUL, font: "Arial" }, paragraph: { spacing: { before: 120, after: 200 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 25, bold: true, color: AZUL, font: "Arial" }, paragraph: { spacing: { before: 260, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true,
        run: { size: 22, bold: true, color: "404040", font: "Arial" }, paragraph: { spacing: { before: 180, after: 80 }, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [
    { reference: "vinetas", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 540, hanging: 270 } } } }] },
    { reference: "casillas", levels: [{ level: 0, format: LevelFormat.BULLET, text: "☐", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 540, hanging: 300 } } } }] },
    { reference: "referencias", levels: [{ level: 0, format: LevelFormat.DECIMAL, text: "%1.", alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 500, hanging: 500 } }, run: { size: 18 } } }] },
  ] },
  sections: [{
    properties: { page: { size: { width: 12240, height: 15840 }, margin: { top: 1440, bottom: 1440, left: 1440, right: 1440 } } },
    footers: { default: new Footer({ children: [new Paragraph({ alignment: AlignmentType.CENTER, children: [
      new TextRun({ text: "Prehabilitación quirúrgica – Documento de referencia · página ", size: 16, color: "808080" }),
      new TextRun({ children: [PageNumber.CURRENT], size: 16, color: "808080" })] })] }) },
    children: cuerpo,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync(SALIDA, buf);
  console.log(`OK ${path.basename(SALIDA)} · ${orden.length} referencias citadas`);
  const sinUso = Object.entries(ALIAS).filter(([, c]) => !orden.includes(c)).map(([a]) => a);
  if (sinUso.length) console.log("Alias no citados:", sinUso.join(", "));
});
