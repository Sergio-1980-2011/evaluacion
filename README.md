# evaluacion

## Rotación de Prehabilitación Quirúrgica (residente de Anestesiología · noviembre 2026)

Carpeta `rotacion-prehabilitacion/`:

| Archivo | Contenido |
|---|---|
| `Programa_Rotacion_Prehabilitacion.docx` | Programa de la rotación: identificación, resultados de aprendizaje, contenidos (8 unidades), metodología, 4 seminarios, cronograma, sistema de evaluación y bibliografía. Anexos: Pauta de presentación oral, Pauta de evaluación global, formato de bitácora y pauta de feedback. |
| `Guia_Docente_Prehabilitacion.docx` | Guía para el docente: conceptos clave y valores de referencia por tema, perlas para el anestesiólogo, actividades prácticas, preguntas de discusión, 5 casos clínicos (tórax, cardiaco, hepático, gástrico, oncológico) y ficha de evaluación funcional. |
| `Trabajo_Referencia_Prehabilitacion.docx` | Documento de referencia (estándar ideal de evaluación): desarrollo completo de los 8 temas con evidencia, desempeño esperado en cada actividad práctica, respuestas modelo a las preguntas de discusión con elementos esenciales para corregir, tabla de umbrales, hoja de corrección y 96 referencias Vancouver verificadas en PubMed (DOI y PMID). |
| `Planilla_Evaluacion_Rotacion.xlsx` | Planilla de evaluación: asistencia, seminarios, desempeño (formativa y final), bitácora, feedback, rúbricas, escala de notas y resumen con nota final y estado de aprobación automático. |

Los archivos se regeneran desde `fuentes/` (el contenido común está en `contenido.json`):

```bash
cd rotacion-prehabilitacion/fuentes
python3 generar_planilla.py
node generar_documentos.js
node generar_trabajo.js   # usa trabajo_contenido.js y pubmed_refs.json
```
