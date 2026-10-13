// Contenido del documento de referencia «Prehabilitación quirúrgica».
// Las citas se escriben como [[alias]] o [[alias1,alias2]]; el generador las numera
// en orden de aparición (estilo Vancouver) usando pubmed_refs.json y REFS_EXTRA.

const ALIAS = {
  // Capítulo 1
  silver13: "23756434", carlizav: "15585997", carli15: "25701926", gillis22: "35012741",
  ljung17: "28097305", gustafsson: "30426190", weimann: "34242915", protage: "23867520",
  levettgrim: "30604423", mills: "21295194", egholm: "30408162", munoz: "27996086",
  gillis14: "25076007", barberan: "28489682", carli20: "31968063", molenaar23: "36988937",
  hughes: "30788536", lambert: "33201129", gillisnut: "29750973", minnella16: "27476586",
  mcisaac22: "35589429", minnella18: "30193337", dunne: "26864728", west15: "25274049",
  molenaar21: "33813632",
  // Capítulo 2
  mets: "30070222", dasi20: "31864719", hlatky: "2782256", jette: "2204507", esc22: "36017553",
  aha24: "39316661", ats6mwt: "12091180", holland: "25359355", osses: "21249280", enright: "9817683",
  sinclair: "21980122", roberts: "21624928", jones30s: "10380242", sppb: "8126356",
  studenski: "21205966", tug: "1991946", ewgsop: "30312372", atsers: "12186831", lavenez: "30956204",
  // Capítulo 3
  levett18: "29452805", atsaccp: "12524257", older: "10453862", wilson10: "20573634",
  snowden: "20134313", brunelli: "23649437", borg: "7154893", batchelor: "30304509",
  // Capítulo 4
  kortebein: "17456818", puthu: "24108501", simonsen: "29373365", fragala: "31343601",
  williams07: "17638929", campbell: "31626055", galvao: "29036016",
  // Capítulo 5
  miskovic: "28186222", fernandez: "27829093", ariscat: "21045639", mazo: "24901240",
  katsura: "26436600", hulzebos: "17047215", boden: "29367198", sebio: "27226400",
  young19: "31587835", popular: "30224322", popping: "18936379", engelman: "31054241",
  // Capítulo 6
  clegg: "23395245", mcisaac20: "32384334", lin16: "27580947", cfs: "16129869", fried: "11253156",
  rolfson: "16757522", lai17: "28422306", aasld: "34233031", dent19: "31641726", hall17: "27902826",
  mohanty: "27049783", aldecoa: "37599617",
  // Capítulo 7
  brower: "20046130", tazreean: "35045757", almeida: "28981596", fiore17: "27997472",
  hodgson: "25475522", gan20: "32467512", joliat: "36310325",
  // Capítulo 8
  grocott17: "28649376", levett16: "27396803", haig: "16617948", hijazi: "28161527",
  // Fuentes sin PMID
  acsm: "ACSM", macmillan: "MACMILLAN",
};

const REFS_EXTRA = {
  ACSM: "American College of Sports Medicine; Liguori G, Feito Y, Fountaine C, Roy B, editores. ACSM's guidelines for exercise testing and prescription. 11.ª ed. Filadelfia: Wolters Kluwer; 2021.",
  MACMILLAN: "Macmillan Cancer Support, Royal College of Anaesthetists, National Institute for Health Research Cancer and Nutrition Collaboration. Principles and guidance for prehabilitation within the management and support of people with cancer. Londres: Macmillan Cancer Support; 2019.",
};

// Tipos de bloque: ["p", texto] · ["ul", [items]] · ["h3", texto] · ["tabla", {anchos, filas}] · ["nota", texto]
const CAPITULOS = [
  // ===================================================================== 1
  {
    titulo: "1. Concepto de prehabilitación",
    objetivo: "Que el residente entienda la prehabilitación como una intervención multimodal que aumenta la reserva fisiológica antes de la cirugía, y la diferencie de ERAS y de la rehabilitación postoperatoria.",
    desarrollo: [
      ["h3", "1.1 Definición"],
      ["p", "La prehabilitación se define como el proceso, dentro del continuo de la atención, que ocurre entre el diagnóstico y el inicio del tratamiento agudo (habitualmente la cirugía). Incluye una evaluación física y psicológica que establece el nivel funcional basal, identifica deterioros y entrega intervenciones dirigidas a mejorar la salud del paciente para reducir la incidencia y la gravedad de las complicaciones actuales y futuras [[silver13]]. En el contexto quirúrgico, su propósito es que el paciente llegue a la cirugía con mayor reserva fisiológica, tolere mejor el estrés quirúrgico y recupere antes su nivel funcional [[carli15,gillis22]]."],
      ["p", "Es importante diferenciar tres conceptos que el residente suele confundir:"],
      ["tabla", { anchos: [2000, 2300, 2500, 2560], filas: [
        ["Concepto", "Momento", "Objetivo", "Ejemplos"],
        ["Prehabilitación", "Desde el diagnóstico hasta la cirugía (semanas)", "Aumentar la reserva funcional antes del estrés quirúrgico", "Ejercicio aeróbico y de fuerza, IMT, nutrición, apoyo psicológico, cesación tabáquica, corrección de la anemia"],
        ["ERAS (Enhanced Recovery After Surgery)", "Pre, intra y postoperatorio inmediato (días)", "Reducir la respuesta al estrés quirúrgico y acelerar la recuperación", "Ayuno abreviado, carga de carbohidratos, analgesia multimodal, fluidos orientados a objetivos, alimentación y movilización precoces"],
        ["Rehabilitación", "Después de la cirugía (días a meses)", "Recuperar la función perdida", "Kinesiterapia respiratoria y motora, reacondicionamiento, rehabilitación ambulatoria"],
      ] }],
      ["p", "ERAS optimiza el manejo perioperatorio y reduce la agresión; la prehabilitación prepara al paciente para recibirla. Ambas son complementarias: la recuperación no es un proceso pasivo y comienza antes de la cirugía [[gillis22,ljung17]]."],
      ["h3", "1.2 Modelo de trayectoria funcional"],
      ["p", "El modelo propuesto por Carli y Zavorsky describe la capacidad funcional del paciente en el tiempo: la cirugía produce una caída aguda de la capacidad funcional, cuya magnitud y duración dependen de la reserva previa. Un paciente que parte con mayor reserva cae menos, cruza con menor probabilidad el umbral por debajo del cual aparecen la dependencia y las complicaciones, y recupera antes su nivel basal [[carlizav,carli15]]. La prehabilitación busca desplazar hacia arriba el punto de partida de esa curva; ERAS y la rehabilitación buscan atenuar la caída y acelerar la recuperación."],
      ["p", "Biológicamente, cualquier condición preoperatoria que impida tolerar el estrés quirúrgico (baja reserva cardiopulmonar, sarcopenia), que altere la respuesta al estrés (desnutrición, fragilidad) o que aumente la respuesta catabólica (resistencia a la insulina) es un factor de riesgo de malos resultados y un blanco de la prehabilitación [[gillis22]]."],
      ["h3", "1.3 Componentes del programa multimodal"],
      ["ul", [
        "Ejercicio: entrenamiento aeróbico (continuo o interválico) combinado con ejercicio de fuerza, con o sin entrenamiento muscular inspiratorio (IMT). Se desarrolla en los capítulos 3, 4 y 5.",
        "Nutrición: tamizaje de riesgo nutricional; aporte proteico de 1,2–1,5 g/kg/día en adultos mayores con enfermedad aguda o crónica [[protage]]; suplementos orales en pacientes en riesgo y terapia nutricional de 7–14 días antes de la cirugía mayor en pacientes con riesgo nutricional grave, aunque implique postergar la cirugía [[weimann]]. La suplementación proteica potencia el efecto del ejercicio de fuerza.",
        "Apoyo psicológico: la ansiedad, la depresión y la baja autoeficacia se asocian a peor recuperación y menor adherencia; las intervenciones incluyen educación, técnicas de relajación y estrategias de afrontamiento [[levettgrim]].",
        "Cesación de tabaco: en ensayos clínicos, dejar de fumar reduce las complicaciones postoperatorias en un 41 %; cada semana de abstinencia aumenta el efecto en un 19 % y los programas de al menos 4 semanas tienen un efecto significativamente mayor [[mills]].",
        "Cesación de alcohol: las intervenciones intensivas de cesación perioperatoria reducen las complicaciones postoperatorias (RR 0,62) [[egholm]].",
        "Optimización médica: diagnóstico y tratamiento de la anemia y de la deficiencia de hierro (Hb < 13 g/dL en ambos sexos como umbral perioperatorio; hierro endovenoso cuando el tiempo es corto o el hierro oral no es tolerado) [[munoz]], control glicémico, optimización de la EPOC y de la insuficiencia cardiaca, y revisión de fármacos.",
      ]],
      ["h3", "1.4 Ventana de oportunidad"],
      ["p", "La mayoría de los programas duran entre 3 y 6 semanas. En el ensayo de Gillis y cols., una mediana de 24,5 días fue suficiente para que un 53 % de los pacientes prehabilitados mejorara al menos 20 m en el TM6M antes de la cirugía (frente a un 15 % del grupo control) [[gillis14]]. En cirugía oncológica se aprovecha el intervalo entre el diagnóstico y la cirugía o el período posterior a la neoadyuvancia: la quimiorradioterapia neoadyuvante reduce la capacidad física, y un programa de ejercicio estructurado después de ella la devuelve al nivel basal en unas 6 semanas [[west15]]."],
      ["h3", "1.5 Evidencia"],
      ["tabla", { anchos: [2100, 2700, 4560], filas: [
        ["Estudio", "Población", "Resultado principal"],
        ["Gillis 2014 (ECA) [[gillis14]]", "Cáncer colorrectal; prehabilitación vs. rehabilitación", "Mejor capacidad funcional antes y 8 semanas después de la cirugía; sin diferencias en complicaciones ni estadía."],
        ["Barberan-Garcia 2018 (ECA) [[barberan]]", "Cirugía abdominal mayor, alto riesgo (> 70 años y/o ASA III–IV)", "Programa personalizado con entrenamiento interválico de alta intensidad: aumentó la capacidad aeróbica y redujo en 51 % el número de pacientes con complicaciones (RR 0,5)."],
        ["Minnella 2018 (ECA) [[minnella18]]", "Cáncer esofagogástrico", "Ejercicio + nutrición mejoraron la capacidad funcional antes y después de la cirugía."],
        ["Dunne 2016 (ECA) [[dunne]]", "Resección hepática por metástasis colorrectales", "4 semanas de ejercicio interválico mejoraron el VO2 en el umbral anaeróbico y la calidad de vida."],
        ["Carli 2020 (ECA) [[carli20]]", "Pacientes frágiles, cáncer colorrectal (mayoritariamente laparoscópica, con ERAS)", "Prehabilitación multimodal vs. rehabilitación postoperatoria: sin diferencias en complicaciones a 30 días."],
        ["McIsaac 2022 (ECA) [[mcisaac22]]", "Adultos mayores frágiles, cirugía oncológica; programa domiciliario", "Sin mejoría significativa de la recuperación; la adherencia aparece como mediador clave."],
        ["Molenaar 2023, PREHAB (ECA) [[molenaar23]]", "Cáncer colorrectal; 4 semanas supervisadas en el hospital, alta intensidad", "Menos complicaciones graves (CCI > 20: 17,1 % vs. 29,7 %) y menos complicaciones médicas (15,4 % vs. 27,3 %)."],
        ["Hughes 2019 (metaanálisis) [[hughes]]", "Cirugía abdominal mayor, 15 ECA", "Menor morbilidad global (OR 0,63) y pulmonar (OR 0,40); sin diferencias en estadía."],
        ["Lambert 2021 (metaanálisis) [[lambert]]", "Cirugía hepatobiliar, colorrectal y gastrointestinal alta", "Estadía 1,78 días menor; sin diferencias en complicaciones ni mortalidad."],
        ["Gillis 2018 (metaanálisis) [[gillisnut]]", "Cirugía colorrectal; prehabilitación nutricional ± ejercicio", "Estadía 2,2 días menor."],
      ] }],
      ["p", "La evidencia es consistente en mejorar la capacidad funcional y, en los programas supervisados, de alta intensidad y dirigidos a pacientes de alto riesgo, en reducir las complicaciones. Los resultados negativos (Carli 2020, McIsaac 2022) se explican principalmente por: (1) baja adherencia, sobre todo en programas domiciliarios no supervisados; (2) intensidad insuficiente del estímulo; (3) selección de pacientes (en población de bajo riesgo hay poco margen de mejoría, mientras que algunos pacientes muy frágiles no logran completar el programa); y (4) el contexto de un protocolo ERAS bien implementado y de cirugía mínimamente invasiva, que reduce la tasa basal de complicaciones [[carli20,mcisaac22,molenaar23]]."],
    ],
    perla: "La consulta preanestésica es el momento ideal para detectar al paciente de baja reserva y derivarlo a prehabilitación: el anestesiólogo puede ser quien active el programa. Para ello, la consulta debe realizarse con semanas de anticipación y no la víspera de la cirugía [[grocott17,levett16]].",
    actividad: {
      descripcion: "Revisar con el kinesiólogo el flujo de derivación del servicio: quién deriva, con qué criterios y en qué plazos. Elaborar una lista de criterios de derivación.",
      esperado: [
        "Describe el flujo actual (origen de la derivación, tiempos, registro) e identifica al menos un punto de mejora.",
        "Propone criterios de derivación objetivos y factibles, por ejemplo: cirugía mayor programada con ≥ 3 semanas de plazo y al menos uno de los siguientes: DASI ≤ 34 o < 4 METs; TM6M bajo el valor predicho o < 427 m; Clinical Frailty Scale ≥ 4; sarcopenia probable (prensión baja o sentarse-pararse 5 veces > 15 s); ARISCAT intermedio o alto; desnutrición o pérdida de peso; anemia; tabaquismo activo.",
        "Define criterios de exclusión o de precaución (contraindicaciones al ejercicio, cirugía urgente).",
        "Considera niveles de intervención (universal, dirigida o especializada) según el riesgo [[macmillan]].",
      ],
    },
    preguntas: [
      {
        q: "¿Qué pacientes se benefician más de la prehabilitación y cuáles probablemente no?",
        modelo: "Se benefician más los pacientes con baja reserva funcional que van a una cirugía mayor y disponen de una ventana de tiempo suficiente. Los pacientes con peor capacidad basal mejoran más con la prehabilitación (TM6M +46,5 m vs. +22,6 m en los más aptos) y recuperan con mayor frecuencia su nivel basal a las 4 semanas [[minnella16]]. El ensayo con resultados positivos más claros incluyó a pacientes de alto riesgo (> 70 años y/o ASA III–IV) con un programa supervisado y personalizado [[barberan]]. Probablemente se benefician poco: (a) los pacientes en buena condición física que van a cirugía menor, porque tienen poco margen de mejoría; (b) los que no tienen tiempo (cirugía urgente o muy próxima); y (c) los pacientes muy frágiles con programas domiciliarios de baja intensidad y baja adherencia, como sugieren los ensayos de Carli 2020 y McIsaac 2022 [[carli20,mcisaac22]]. En estos últimos, más que descartar la prehabilitación, se debe reforzar la supervisión y el componente nutricional, y alinear las metas de cuidado.",
        esenciales: [
          "Identifica la baja reserva funcional como el principal predictor de beneficio.",
          "Relaciona el beneficio con la magnitud de la cirugía y el tiempo disponible.",
          "Reconoce que la adherencia y la supervisión determinan la eficacia.",
          "Cita al menos un ensayo positivo y uno negativo e interpreta la diferencia.",
        ],
        complementarios: ["Menciona niveles de intervención según riesgo.", "Discute el rol de ERAS y de la cirugía mínimamente invasiva en la reducción de la tasa basal de complicaciones."],
      },
      {
        q: "¿Cuál es el tiempo mínimo útil de prehabilitación? ¿Se justifica postergar una cirugía oncológica para prehabilitar?",
        modelo: "No existe un mínimo definido, pero la mayoría de los programas eficaces duran entre 3 y 6 semanas; con una mediana de 24,5 días ya se observan mejorías funcionales [[gillis14]], y el entrenamiento interválico de alta intensidad logra cambios del VO2 en pocas semanas [[barberan,dunne]]. La cesación tabáquica requiere al menos 4 semanas para su máximo efecto [[mills]], y la corrección de la anemia ferropénica con hierro endovenoso necesita varias semanas [[munoz]]. En cirugía oncológica, la regla general es no postergar la cirugía, sino aprovechar el intervalo habitual entre el diagnóstico y la cirugía o el período posterior a la neoadyuvancia [[west15]]. Una revisión sistemática muestra que las guías recomiendan intervalos que van desde 2 hasta 7 semanas y que no hay evidencia concluyente de que un intervalo más largo empeore el pronóstico, lo que abre la posibilidad de usar ese período para optimizar al paciente [[molenaar21]]. La excepción es el paciente con riesgo nutricional grave, en quien las guías recomiendan 7–14 días de terapia nutricional aunque implique postergar la cirugía [[weimann]]. La decisión siempre es del equipo multidisciplinario, junto al cirujano y al oncólogo.",
        esenciales: [
          "Señala un rango realista (3–6 semanas) con fundamento.",
          "Afirma que, como regla, no se posterga la cirugía oncológica y se usa la ventana existente.",
          "Menciona la neoadyuvancia como oportunidad.",
          "Reconoce la decisión multidisciplinaria.",
        ],
        complementarios: ["Identifica la excepción nutricional (7–14 días).", "Relaciona plazos con tabaco (≥ 4 semanas) y anemia."],
      },
    ],
  },
  // ===================================================================== 2
  {
    titulo: "2. Evaluación funcional",
    objetivo: "Que el residente pase de una valoración subjetiva («¿cómo se siente?») a una evaluación funcional objetiva, reproducible y útil para estimar el riesgo y prescribir ejercicio.",
    desarrollo: [
      ["h3", "2.1 Limitaciones de la valoración subjetiva: el estudio METS"],
      ["p", "En el estudio prospectivo internacional METS (1401 pacientes de cirugía no cardiaca mayor), la estimación subjetiva de la capacidad funcional realizada por el anestesiólogo tuvo una sensibilidad de solo 19 % para detectar a los pacientes con una capacidad < 4 METs medida por CPET. De las herramientas evaluadas, el DASI se asoció de forma independiente con muerte o infarto a 30 días [[mets]]. La conclusión práctica es que la pregunta «¿cómo se siente?» no basta: la capacidad funcional debe medirse con instrumentos estructurados."],
      ["h3", "2.2 Equivalentes metabólicos (METs) y DASI"],
      ["p", "Un MET corresponde al consumo de oxígeno en reposo, aproximadamente 3,5 mL O2/kg/min [[jette]]. Una capacidad < 4 METs (no poder subir dos pisos de escalera o caminar rápido en plano) se considera baja capacidad funcional en las guías de evaluación cardiovascular perioperatoria [[esc22,aha24]]."],
      ["p", "El Duke Activity Status Index (DASI) es un cuestionario autoaplicado de 12 preguntas sobre actividades cotidianas, con puntaje de 0 a 58,2. Permite estimar el VO2 pico mediante la fórmula VO2 (mL/kg/min) = 0,43 × DASI + 9,6 [[hlatky]]. En el análisis secundario del estudio METS, un puntaje de 34 resultó ser el umbral bajo el cual aumenta el riesgo de muerte o infarto a 30 días y de complicaciones moderadas a graves, y sobre el cual el riesgo disminuye [[dasi20]]."],
      ["h3", "2.3 Prueba de caminata de 6 minutos (TM6M)"],
      ["p", "Procedimiento estandarizado según la ATS [[ats6mwt]] y el estándar técnico ERS/ATS [[holland]]:"],
      ["ul", [
        "Pasillo plano de 30 m señalizado cada 3 m, con conos en los extremos; el paciente camina lo más rápido posible, sin correr, durante 6 minutos.",
        "Frases de estímulo estandarizadas cada minuto; no caminar junto al paciente.",
        "Registrar en reposo y al final: SpO2, frecuencia cardiaca, presión arterial, disnea y fatiga de extremidades inferiores (escala de Borg modificada). Registrar SpO2 mínima, detenciones y uso de oxígeno.",
        "Se recomiendan dos pruebas por el efecto aprendizaje y registrar la mejor [[holland]].",
        "Contraindicaciones absolutas: angina inestable o infarto en el último mes. Relativas: FC de reposo > 120 lpm, PAS > 180 mmHg o PAD > 100 mmHg [[ats6mwt]].",
        "Detener ante dolor torácico, disnea intolerable, calambres, marcha inestable, diaforesis o palidez [[ats6mwt]].",
      ]],
      ["p", "Interpretación: comparar con el valor predicho. En sujetos chilenos sanos de 20 a 80 años la distancia media fue de 576 ± 87 m en mujeres y 644 ± 84 m en hombres; Osses y cols. publicaron ecuaciones de referencia por sexo según edad, talla y peso [[osses]]. Una alternativa son las ecuaciones de Enright y Sherrill: hombres = (7,57 × talla cm) − (5,02 × edad) − (1,76 × peso kg) − 309 m; mujeres = (2,11 × talla cm) − (2,29 × peso kg) − (5,78 × edad) + 667 m [[enright]]. La diferencia mínima clínicamente importante en enfermedad respiratoria crónica es de alrededor de 25–33 m [[holland]], útil para juzgar el efecto de la prehabilitación."],
      ["p", "Relación con el riesgo: en pacientes de cirugía mayor no cardiaca, el TM6M predijo un umbral anaeróbico < 11 mL/kg/min con un área bajo la curva de 0,85. Los autores propusieron que quienes caminan > 563 m no requieren CPET de rutina, mientras que quienes caminan < 427 m deberían ser derivados a una evaluación adicional [[sinclair]]."],
      ["h3", "2.4 Fuerza y desempeño físico"],
      ["tabla", { anchos: [2200, 3900, 3260], filas: [
        ["Prueba", "Procedimiento resumido", "Valor de alerta"],
        ["Dinamometría de prensión [[roberts]]", "Sentado, codo en 90°, 3 intentos con cada mano, registrar el valor máximo (protocolo de Southampton)", "< 27 kg en hombres; < 16 kg en mujeres [[ewgsop]]"],
        ["Sentarse y pararse 5 veces [[ewgsop]]", "Silla sin apoyabrazos, brazos cruzados, lo más rápido posible", "> 15 s"],
        ["Sentarse y pararse en 30 s [[jones30s]]", "Número de repeticiones completas en 30 s", "Comparar con valores normativos por edad y sexo"],
        ["SPPB [[sppb]]", "Equilibrio, velocidad de marcha en 4 m y 5 repeticiones de sentarse-pararse; puntaje 0–12", "≤ 8 puntos [[ewgsop]]"],
        ["Velocidad de marcha [[studenski]]", "Velocidad habitual en 4 m", "≤ 0,8 m/s [[ewgsop]]; cada 0,1 m/s adicional se asocia a mayor sobrevida [[studenski]]"],
        ["Timed Up and Go [[tug]]", "Levantarse, caminar 3 m, girar, volver y sentarse", "≥ 20 s [[ewgsop]]"],
      ] }],
      ["h3", "2.5 Fuerza muscular respiratoria"],
      ["p", "La presión inspiratoria máxima (PImax) y la presión espiratoria máxima (PEmax) se miden en la boca con un manómetro, con maniobras desde volumen residual (PImax) y desde capacidad pulmonar total (PEmax), según las recomendaciones ATS/ERS y ERS [[atsers,lavenez]]. Se comparan con valores predichos por edad y sexo. La PImax sirve para identificar debilidad inspiratoria y para dosificar la carga del IMT (capítulo 5)."],
    ],
    perla: "Una buena evaluación funcional cumple dos funciones: estratificar el riesgo y servir como línea base para prescribir y medir el efecto de la prehabilitación. Siempre se debe repetir la misma prueba, con el mismo protocolo, al final del programa.",
    actividad: {
      descripcion: "Aplicar con supervisión DASI, TM6M, dinamometría y SPPB a un mínimo de 5 pacientes por semana y registrarlos en la ficha de evaluación funcional.",
      esperado: [
        "Verifica contraindicaciones antes del TM6M y aplica el protocolo estandarizado sin desviaciones (frases de estímulo, registro de signos vitales y Borg).",
        "Calcula el valor predicho del TM6M y lo expresa como porcentaje.",
        "Calcula el VO2 estimado a partir del DASI y lo interpreta (umbral de 34).",
        "Aplica la dinamometría y el SPPB con técnica correcta y los interpreta según EWGSOP2.",
        "Integra los resultados en una síntesis funcional y en una decisión (por ejemplo, derivar a CPET o a prehabilitación).",
        "Registra en forma completa y comprensible para el equipo.",
      ],
    },
    preguntas: [
      {
        q: "¿Qué aporta el TM6M que no aporta la pregunta «¿puede subir dos pisos?»?",
        modelo: "La pregunta autorreportada es subjetiva, depende de la percepción y del recuerdo del paciente y de la interpretación del evaluador; el estudio METS mostró que la estimación subjetiva identifica solo al 19 % de los pacientes con baja capacidad funcional [[mets]]. El TM6M, en cambio, entrega una medición objetiva, cuantitativa y estandarizada [[ats6mwt]]: (1) permite compararla con valores de referencia, incluso chilenos [[osses]]; (2) registra la respuesta fisiológica al esfuerzo (desaturación, respuesta de la FC, disnea), lo que puede revelar una limitación no referida; (3) se relaciona con el umbral anaeróbico y permite decidir quién necesita CPET [[sinclair]]; y (4) es reproducible, por lo que sirve como línea base para prescribir y para medir el efecto de la prehabilitación según la diferencia mínima clínicamente importante [[holland]]. Su limitación es que no discrimina la causa de la limitación (cardiaca, pulmonar, muscular), lo que sí hace la CPET.",
        esenciales: [
          "Contrasta medición subjetiva vs. objetiva y cita la evidencia (METS).",
          "Menciona la comparación con valores predichos.",
          "Menciona la utilidad como línea base y para medir cambios.",
          "Reconoce al menos una limitación del TM6M.",
        ],
        complementarios: ["Menciona la desaturación al esfuerzo.", "Relaciona el TM6M con la indicación de CPET (puntos de corte de Sinclair)."],
      },
      {
        q: "Si el paciente no puede caminar por dolor o claudicación, ¿qué alternativas de evaluación existen?",
        modelo: "Primero se debe intentar tratar la causa (analgesia previa en dolor articular) y documentar la limitación. Alternativas: (1) CPET en cicloergómetro, que reduce la carga articular y permite medir VO2 y umbral anaeróbico [[levett18]]; en limitación de extremidades inferiores puede usarse ergometría de brazos; (2) cuestionarios estructurados como el DASI, reconociendo que la limitación ortopédica puede subestimar la capacidad cardiopulmonar [[hlatky,dasi20]]; (3) pruebas de fuerza que no requieren marcha: dinamometría de prensión y, si es posible, sentarse-pararse [[ewgsop]]; (4) PImax/PEmax [[atsers]]; (5) escalas de fragilidad como la Clinical Frailty Scale [[cfs]]; y (6) biomarcadores como el NT-proBNP, que las guías incorporan para estratificar el riesgo cardiovascular cuando la capacidad funcional es baja o no puede evaluarse [[esc22,aha24]]. En claudicación, además, se debe considerar la enfermedad arterial periférica como marcador de enfermedad coronaria.",
        esenciales: [
          "Propone la CPET en cicloergómetro (o ergometría de brazos).",
          "Propone al menos dos alternativas adicionales (DASI, prensión, PImax, fragilidad, NT-proBNP).",
          "Reconoce las limitaciones de cada alternativa.",
        ],
        complementarios: ["Plantea tratar el dolor antes de evaluar.", "Relaciona claudicación con riesgo cardiovascular."],
      },
    ],
  },
  // ===================================================================== 3
  {
    titulo: "3. Capacidad aeróbica y CPET",
    objetivo: "Que el residente interprete las variables principales de una prueba de esfuerzo cardiopulmonar (CPET) y las use para estratificar el riesgo y prescribir el ejercicio aeróbico.",
    desarrollo: [
      ["h3", "3.1 Fundamento fisiológico"],
      ["p", "La cirugía mayor aumenta la demanda de oxígeno de forma sostenida durante días. El paciente que no puede aumentar su aporte de oxígeno para cubrir esa demanda entra en déficit y tiene mayor riesgo de falla orgánica y complicaciones. La CPET mide de forma integrada la respuesta cardiovascular, respiratoria y muscular al ejercicio incremental, y permite cuantificar esa reserva [[atsaccp,levett18]]."],
      ["h3", "3.2 Variables principales"],
      ["ul", [
        "VO2 pico: consumo máximo de oxígeno alcanzado; depende del esfuerzo del paciente.",
        "Umbral anaeróbico (UA): VO2 en el punto en que la producción de energía comienza a depender del metabolismo anaeróbico; es independiente del esfuerzo máximo y por eso es muy útil en el preoperatorio.",
        "VE/VCO2 en el UA: eficiencia ventilatoria; valores elevados reflejan alteración de la relación ventilación/perfusión (insuficiencia cardiaca, hipertensión pulmonar, enfermedad pulmonar).",
        "Respuesta de la FC, de la presión arterial y del ECG (isquemia, arritmias), pulso de oxígeno y reserva ventilatoria.",
      ]],
      ["p", "Las guías de consenso del Perioperative Exercise Testing and Training Society describen indicaciones, realización e interpretación estandarizadas de la CPET perioperatoria [[levett18]]."],
      ["h3", "3.3 Umbrales de riesgo"],
      ["tabla", { anchos: [2600, 3500, 3260], filas: [
        ["Contexto", "Hallazgo", "Asociación"],
        ["Cirugía abdominal mayor, adultos mayores [[older]]", "UA < 11 mL/kg/min", "Mayor mortalidad cardiovascular postoperatoria"],
        ["Cirugía abdominal mayor [[wilson10]]", "UA ≤ 10,9 mL/kg/min; VE/VCO2 > 34", "Mortalidad hospitalaria y a 90 días (RR 6,8 y 4,6 respectivamente)"],
        ["Cirugía mayor electiva [[snowden]]", "UA óptimo de 10,1 mL/kg/min (AUC 0,85)", "Complicaciones y estadía hospitalaria"],
        ["Resección pulmonar (ACCP) [[brunelli]]", "VO2 máx < 10 mL/kg/min o < 35 % del predicho", "Alto riesgo: considerar alternativas a la resección mayor"],
        ["Resección pulmonar (ACCP) [[brunelli]]", "VO2 máx > 20 mL/kg/min o > 75 % del predicho", "Bajo riesgo"],
      ] }],
      ["p", "En la evaluación para resección pulmonar, la función pulmonar postoperatoria predicha (VEF1 y DLCO) orienta la necesidad de prueba de esfuerzo; la prueba de escalera y el shuttle walk test se usan como tamizaje y, si son insuficientes, se indica CPET [[brunelli]]. Los umbrales provienen de cohortes con distintas poblaciones y cirugías, por lo que deben interpretarse en conjunto con la clínica."],
      ["h3", "3.4 Prescripción del ejercicio aeróbico (FITT)"],
      ["ul", [
        "Frecuencia: 3 a 5 sesiones por semana [[acsm]].",
        "Intensidad: moderada (40–59 % de la FC de reserva o Borg 12–13/20) a vigorosa (60–89 % de la FC de reserva o Borg 14–17/20) [[acsm,borg]]; cuando se dispone de CPET, la carga puede calcularse sobre el umbral anaeróbico y el VO2 pico [[levett18]]. En pacientes con betabloqueadores se prefiere la escala de Borg a la FC.",
        "Tiempo: 20 a 40 minutos por sesión, incluyendo calentamiento y vuelta a la calma.",
        "Tipo: caminata, bicicleta estática o cicloergómetro.",
        "Entrenamiento interválico de alta intensidad (HIIT): alterna períodos cortos de alta intensidad con períodos de recuperación activa. En pacientes de alto riesgo, un programa personalizado con HIIT aumentó la capacidad aeróbica y redujo las complicaciones [[barberan]]; en cirugía hepática, 4 semanas de HIIT mejoraron el VO2 en el UA [[dunne]]. Es particularmente útil cuando la ventana preoperatoria es corta.",
      ]],
    ],
    perla: "La CPET no solo entrega un número: permite conversar con el paciente y el cirujano sobre el riesgo, decidir el destino postoperatorio (sala o unidad de paciente crítico) e individualizar el entrenamiento [[levett18]].",
    actividad: {
      descripcion: "Interpretar al menos 3 informes de CPET con el tutor. Calcular con el kinesiólogo la intensidad de entrenamiento (FC objetivo o carga en watts) de un paciente real.",
      esperado: [
        "Interpreta en forma sistemática: calidad del esfuerzo (RER, motivo de término), VO2 pico, UA, VE/VCO2, respuesta cardiovascular y ECG.",
        "Identifica el probable mecanismo limitante (cardiovascular, ventilatorio, periférico/desacondicionamiento).",
        "Traduce el resultado en una categoría de riesgo y en una recomendación (prehabilitación, destino postoperatorio, monitorización).",
        "Calcula correctamente la FC objetivo con la fórmula de Karvonen [FC objetivo = FC reposo + % × (FC máx − FC reposo)] o la carga en watts a partir del UA.",
      ],
    },
    preguntas: [
      {
        q: "Paciente con UA de 9 mL/kg/min programado para una gastrectomía: ¿qué cambia en su plan anestésico y en su destino postoperatorio?",
        modelo: "Un UA de 9 mL/kg/min está bajo los umbrales asociados a mayor morbimortalidad (< 10–11 mL/kg/min) [[older,wilson10,snowden]], por lo que el paciente es de alto riesgo. (1) Analizar la causa: revisar VE/VCO2, ECG, respuesta de la FC y de la presión, Hb y espirometría para distinguir limitación cardiaca, pulmonar o desacondicionamiento; investigar y tratar causas corregibles (anemia, insuficiencia cardiaca, EPOC) [[levett18,munoz]]. (2) Decisión compartida: informar el riesgo cuantificado al paciente y discutir con el cirujano la vía de abordaje (mínimamente invasiva si es factible) y el momento. (3) Prehabilitación: si hay ventana, indicar entrenamiento supervisado (idealmente HIIT) y nutricional, y repetir la CPET; el UA puede mejorar en pocas semanas [[barberan,west15]]. (4) Plan intraoperatorio: monitorización hemodinámica avanzada según el caso (línea arterial, terapia de fluidos orientada a objetivos), evitar la hipotensión, ventilación protectora, analgesia multimodal con técnica regional (epidural torácica u otra) que permita toser y movilizarse, profilaxis de NVPO y reversión completa del bloqueo neuromuscular [[young19,popping,gan20]]. (5) Destino postoperatorio: planificar una unidad de cuidados intermedios o intensivos, con un plan explícito de movilización precoz.",
        esenciales: [
          "Clasifica el riesgo como alto y cita el umbral.",
          "Busca la causa del UA bajo y corrige lo corregible.",
          "Propone prehabilitación y reevaluación si hay ventana.",
          "Propone destino postoperatorio monitorizado.",
          "Ajusta el plan anestésico (fluidos, monitorización, analgesia, ventilación).",
        ],
        complementarios: ["Plantea la decisión compartida y el consentimiento informado.", "Discute la vía de abordaje con el cirujano."],
      },
      {
        q: "¿Qué hacer cuando no hay CPET disponible?",
        modelo: "Usar una evaluación escalonada con las herramientas disponibles: (1) DASI, con su umbral de 34 puntos y la estimación del VO2 [[dasi20,hlatky]]; (2) TM6M, que permite identificar a quienes probablemente tienen un UA bajo (< 427 m) y a quienes probablemente no necesitan CPET (> 563 m) [[sinclair]]; (3) en cirugía pulmonar, la prueba de escalera o el shuttle walk test [[brunelli]]; (4) NT-proBNP y escalas de riesgo clínico, según las guías de evaluación cardiovascular [[esc22,aha24]]; y (5) pruebas de fuerza y de fragilidad [[ewgsop,cfs]]. Los pacientes de riesgo intermedio en los que el resultado cambiaría la conducta pueden derivarse a un centro con CPET. Para prescribir ejercicio sin CPET se usan la FC de reserva y la escala de Borg [[acsm,borg]].",
        esenciales: [
          "Propone al menos dos alternativas validadas con sus umbrales.",
          "Prescribe ejercicio sin CPET (FC de reserva/Borg).",
          "Identifica cuándo vale la pena derivar a CPET.",
        ],
        complementarios: ["Menciona el NT-proBNP.", "Diferencia la evaluación en cirugía pulmonar."],
      },
    ],
  },
  // ===================================================================== 4
  {
    titulo: "4. Importancia del ejercicio de fuerza",
    objetivo: "Que el residente reconozca la pérdida muscular perioperatoria como un determinante de los resultados y fundamente la prescripción del ejercicio de fuerza.",
    desarrollo: [
      ["h3", "4.1 Pérdida muscular perioperatoria"],
      ["p", "El reposo es por sí mismo un estímulo catabólico potente: en adultos mayores sanos, 10 días de reposo en cama produjeron una pérdida de alrededor de 1 kg de masa magra de las extremidades inferiores, con caída de la fuerza y de la capacidad aeróbica [[kortebein]]. En la enfermedad crítica, el área de sección del recto femoral disminuye cerca de un 18 % en 10 días, más aún con falla multiorgánica [[puthu]]. A esto se suman la inflamación, la resistencia anabólica, la desnutrición y los tratamientos oncológicos."],
      ["p", "La sarcopenia preoperatoria se asocia a mayor riesgo de complicaciones mayores (RR 1,40) y totales (RR 1,35) en cirugía oncológica gastrointestinal [[simonsen]], y la baja fuerza se relaciona con mayor estadía, pérdida de independencia e institucionalización [[ewgsop]]."],
      ["h3", "4.2 Beneficios del entrenamiento de fuerza"],
      ["p", "El ejercicio de fuerza aumenta la masa y la fuerza muscular, mejora la capacidad para realizar transferencias, la velocidad de marcha y el equilibrio, y es el principal componente de las intervenciones recomendadas para la fragilidad física [[fragala,dent19]]. Un programa exclusivamente aeróbico mejora la capacidad cardiorrespiratoria, pero tiene un efecto limitado sobre la masa y la fuerza muscular."],
      ["h3", "4.3 Prescripción"],
      ["ul", [
        "Frecuencia: 2–3 sesiones por semana, en días no consecutivos [[fragala]].",
        "Ejercicios: 6–10 ejercicios de grandes grupos musculares, con énfasis en extremidades inferiores (sentarse-pararse, sentadilla asistida, step, extensión de rodilla, puente de glúteos) y también extremidades superiores y tronco.",
        "Volumen: 1–3 series de 8–12 repeticiones.",
        "Intensidad: iniciar con cargas bajas o moderadas (esfuerzo percibido 5–6/10) y progresar hacia 70–85 % de 1RM según tolerancia [[fragala]]. En la práctica se usan bandas elásticas, peso corporal, mancuernas o máquinas.",
        "Progresión: aumentar la carga cuando el paciente completa con facilidad las repeticiones previstas; enseñar la respiración sin maniobra de Valsalva.",
      ]],
      ["h3", "4.4 Sinergia con la nutrición"],
      ["p", "El estímulo de fuerza requiere un aporte proteico adecuado para generar ganancia muscular: 1,0–1,2 g/kg/día en adultos mayores sanos y 1,2–1,5 g/kg/día en presencia de enfermedad aguda o crónica [[protage]], distribuidos durante el día y, si es posible, con una porción cercana al ejercicio. Los programas multimodales que combinan nutrición y ejercicio son los que han mostrado mejores resultados [[gillisnut,minnella18]]."],
    ],
    perla: "La fuerza de las extremidades inferiores es la que permite levantarse de la cama y deambular el día 1: es la base de la movilización precoz.",
    actividad: {
      descripcion: "Participar en 2 sesiones de ejercicio supervisado de fuerza y diseñar con el kinesiólogo una rutina domiciliaria con bandas elásticas para un paciente.",
      esperado: [
        "La rutina incluye 6–8 ejercicios de grandes grupos musculares con énfasis en extremidades inferiores.",
        "Especifica frecuencia, series, repeticiones, intensidad (color de banda o esfuerzo percibido) y criterio de progresión.",
        "Incluye instrucciones de seguridad (respiración, síntomas de alarma, cuándo detenerse) y un registro de adherencia.",
        "Considera las comorbilidades y restricciones del paciente y coordina el aporte proteico con nutrición.",
      ],
    },
    preguntas: [
      {
        q: "¿Por qué un programa solo aeróbico puede ser insuficiente en el adulto mayor sarcopénico?",
        modelo: "Porque el problema central del paciente sarcopénico es la baja masa y fuerza muscular, y el estímulo aeróbico tiene poco efecto sobre ellas. La fuerza de las extremidades inferiores determina la capacidad de realizar transferencias, caminar y mantener la independencia, y su déficit se asocia a más complicaciones [[ewgsop,simonsen]]. Además, el paciente muy débil puede no lograr la intensidad aeróbica necesaria hasta mejorar su fuerza. Por eso las guías recomiendan programas multicomponente con ejercicio de fuerza progresivo como base del tratamiento de la fragilidad física, junto con un aporte proteico adecuado [[dent19,fragala,protage]].",
        esenciales: [
          "Identifica la baja masa y fuerza como el déficit a tratar.",
          "Relaciona la fuerza con la función y la independencia.",
          "Propone un programa combinado (fuerza + aeróbico) con apoyo nutricional.",
        ],
        complementarios: ["Cita evidencia sobre sarcopenia y complicaciones.", "Menciona las recomendaciones de fragilidad (ICFSR)."],
      },
      {
        q: "¿Qué precauciones de ejercicio de fuerza considera en el paciente cardiópata o con metástasis óseas?",
        modelo: "Paciente cardiópata: el entrenamiento de fuerza es seguro en pacientes con enfermedad cardiovascular estable [[williams07]]. Antes de iniciarlo se deben descartar contraindicaciones como enfermedad coronaria inestable, insuficiencia cardiaca descompensada, arritmias no controladas, estenosis aórtica severa sintomática e hipertensión no controlada [[williams07,acsm]]. Se recomienda iniciar con cargas bajas (aproximadamente 30–40 % de 1RM en extremidades superiores y 50–60 % en inferiores), con más repeticiones y menos carga, evitar la maniobra de Valsalva, monitorizar la presión arterial y los síntomas, y usar la escala de Borg en pacientes con betabloqueadores [[williams07,borg]]. Paciente con metástasis óseas: el ejercicio es posible y seguro con un programa adaptado; un ensayo con un programa modular que evitaba cargar las zonas con lesiones mejoró la función física sin eventos esqueléticos [[galvao]]. Se debe conocer la ubicación y el riesgo de fractura de las lesiones (coordinar con oncología y traumatología), evitar cargas directas e impactos sobre las zonas afectadas y, en lesiones de columna, evitar la flexión y la rotación con carga. Además, considerar la anemia, la trombocitopenia, la neuropatía y el riesgo de caídas asociados a la quimioterapia [[campbell]].",
        esenciales: [
          "Cardiópata: descarta contraindicaciones, evita Valsalva, inicia con cargas bajas y monitoriza.",
          "Metástasis: conoce la localización y el riesgo de fractura y adapta el programa evitando cargar las lesiones.",
          "Afirma que el ejercicio no está contraindicado en forma absoluta en ninguno de los dos grupos.",
        ],
        complementarios: ["Usa Borg en pacientes betabloqueados.", "Menciona los efectos adversos de la quimioterapia."],
      },
    ],
  },
  // ===================================================================== 5
  {
    titulo: "5. Rehabilitación respiratoria",
    objetivo: "Que el residente estime el riesgo de complicaciones pulmonares postoperatorias (CPP) e indique estrategias de rehabilitación respiratoria pre y postoperatorias.",
    desarrollo: [
      ["h3", "5.1 Complicaciones pulmonares postoperatorias"],
      ["p", "Las CPP (atelectasia, neumonía, insuficiencia respiratoria, broncoespasmo, derrame pleural, necesidad prolongada de oxígeno) son frecuentes y graves. En un estudio multicéntrico de cirugía no cardiotorácica, un 33,4 % de los pacientes presentó al menos una CPP, y aun las leves se asociaron a mayor mortalidad precoz, ingreso a UCI y estadía [[fernandez]]. Su fisiopatología incluye la disminución de la capacidad residual funcional por la anestesia y la disfunción diafragmática, la atelectasia, la alteración del aclaramiento mucociliar y la tos ineficaz por dolor [[miskovic]]."],
      ["h3", "5.2 Estimación del riesgo: ARISCAT"],
      ["tabla", { anchos: [4680, 2340, 2340], filas: [
        ["Variable [[ariscat]]", "Categoría", "Puntos"],
        ["Edad", "51–80 años / > 80 años", "3 / 16"],
        ["SpO2 preoperatoria", "91–95 % / ≤ 90 %", "8 / 24"],
        ["Infección respiratoria en el último mes", "Sí", "17"],
        ["Anemia preoperatoria (Hb ≤ 10 g/dL)", "Sí", "11"],
        ["Incisión quirúrgica", "Abdominal alta / intratorácica", "15 / 24"],
        ["Duración de la cirugía", "2–3 h / > 3 h", "16 / 23"],
        ["Cirugía de urgencia", "Sí", "8"],
        ["Riesgo", "Bajo < 26 · intermedio 26–44 · alto ≥ 45", ""],
      ] }],
      ["p", "El score ARISCAT fue derivado en una cohorte poblacional [[ariscat]] y validado externamente en una cohorte europea [[mazo]]."],
      ["h3", "5.3 Intervenciones preoperatorias"],
      ["ul", [
        "Entrenamiento muscular inspiratorio (IMT): en la revisión Cochrane de 12 ECA en cirugía cardiaca y abdominal mayor, el IMT preoperatorio redujo la atelectasia (RR 0,53), la neumonía (RR 0,45) y la estadía (−1,33 días) [[katsura]]. En pacientes de alto riesgo sometidos a revascularización miocárdica, un IMT diario de al menos 2 semanas, iniciado con una carga del 30 % de la PImax y progresivo, redujo las CPP [[hulzebos]].",
        "Educación y entrenamiento preoperatorio: en el ensayo LIPPSMAck POP, una sola sesión de kinesiología preoperatoria (educación y entrenamiento en ejercicios respiratorios para realizar inmediatamente al despertar) redujo aproximadamente a la mitad las CPP tras cirugía abdominal alta [[boden]].",
        "Ejercicio aeróbico preoperatorio: en cáncer pulmonar mejora la capacidad de ejercicio y puede reducir las complicaciones y la estadía [[sebio]]; las guías ERAS de cirugía torácica y cardiaca lo incorporan [[batchelor,engelman]].",
        "Cesación tabáquica y optimización de la enfermedad pulmonar crónica [[mills]].",
      ]],
      ["h3", "5.4 Intervenciones postoperatorias"],
      ["p", "Ejercicios de expansión pulmonar y respiración profunda, inspirometría incentiva como complemento, tos asistida con protección de la herida, posición semisentada, oxigenoterapia ajustada a metas y, sobre todo, movilización precoz [[miskovic]]."],
      ["h3", "5.5 Factores anestésicos modificables"],
      ["ul", [
        "Ventilación protectora: volumen corriente de 6–8 mL/kg de peso ideal, PEEP individualizada y maniobras de reclutamiento cuando estén indicadas [[young19]].",
        "Bloqueo neuromuscular: su uso se asocia a mayor riesgo de CPP; se debe monitorizar cuantitativamente y asegurar la reversión completa antes de la extubación [[popular]].",
        "Analgesia: la analgesia epidural redujo la neumonía (OR 0,54) en cirugía abdominal y torácica [[popping]]; en cirugía torácica, el bloqueo paravertebral es una alternativa [[batchelor]]. La meta es una analgesia que permita respirar profundo, toser y movilizarse con mínima sedación.",
        "Otros: evitar la sobrecarga de fluidos, minimizar sondas nasogástricas y sedantes, y profilaxis de NVPO.",
      ]],
    ],
    perla: "El mejor «ejercicio respiratorio» del postoperatorio es sacar al paciente de la cama; una buena analgesia es la condición para lograrlo.",
    actividad: {
      descripcion: "Calcular el ARISCAT de todos los pacientes evaluados; medir la PImax y supervisar una sesión de IMT; acompañar la primera sesión de kinesiterapia respiratoria postoperatoria.",
      esperado: [
        "Calcula correctamente el ARISCAT y distingue los factores modificables de los no modificables.",
        "Mide la PImax con técnica correcta (desde volumen residual, mejor de al menos 3 maniobras reproducibles) y la compara con el valor predicho.",
        "Prescribe el IMT con parámetros explícitos (carga inicial ≈ 30 % PImax, frecuencia, duración, progresión).",
        "En el postoperatorio, identifica las barreras para la kinesiterapia respiratoria (dolor, sedación, NVPO) y propone soluciones.",
      ],
    },
    preguntas: [
      {
        q: "¿Qué factores del ARISCAT son modificables por el anestesiólogo?",
        modelo: "La edad y el carácter urgente de la cirugía no son modificables. Son modificables, total o parcialmente: (1) la anemia, que puede corregirse si se detecta con semanas de anticipación (hierro endovenoso, tratamiento de la causa) [[munoz]]; (2) la infección respiratoria reciente, ante la cual se puede postergar la cirugía electiva hasta su resolución; (3) la SpO2 preoperatoria, que puede mejorar con la optimización de la EPOC, la insuficiencia cardiaca o el tratamiento de una infección; (4) la duración de la cirugía, en parte, mediante planificación y eficiencia del equipo; y (5) el tipo de incisión, cuando la vía mínimamente invasiva es factible, decisión que se discute con el cirujano [[ariscat,miskovic]]. Además, el anestesiólogo controla factores que no están en el ARISCAT pero influyen en las CPP: ventilación protectora, bloqueo neuromuscular y su reversión, analgesia, fluidos y sondas [[young19,popular,popping]].",
        esenciales: [
          "Diferencia factores modificables y no modificables.",
          "Identifica la anemia, la infección reciente y la SpO2 como optimizables.",
          "Menciona factores intraoperatorios no incluidos en el score.",
        ],
        complementarios: ["Menciona la discusión de la vía de abordaje con el cirujano.", "Cita la validación externa del ARISCAT."],
      },
      {
        q: "¿Cómo influye el tipo de analgesia en la función respiratoria tras una toracotomía o una laparotomía supraumbilical?",
        modelo: "Estas incisiones producen una caída marcada de la capacidad vital y de la capacidad residual funcional por dolor, limitación voluntaria de la respiración y disfunción diafragmática, lo que favorece la atelectasia y la tos ineficaz [[miskovic]]. Una analgesia basada solo en opioides sistémicos produce sedación, depresión respiratoria y supresión de la tos, y suele controlar mal el dolor dinámico. La analgesia regional controla mejor el dolor con la tos y la respiración profunda: la epidural redujo la neumonía postoperatoria (OR 0,54) [[popping]], y en cirugía torácica el bloqueo paravertebral ofrece una analgesia comparable con menos efectos adversos [[batchelor]]. Se deben considerar sus riesgos: la hipotensión, el bloqueo motor y la retención urinaria pueden dificultar la movilización, por lo que se ajustan las concentraciones y se integra un esquema multimodal (paracetamol, AINE si no están contraindicados, adyuvantes) [[ljung17]].",
        esenciales: [
          "Explica la fisiopatología (dolor, restricción, disfunción diafragmática).",
          "Compara la analgesia sistémica con opioides vs. la regional.",
          "Cita evidencia de reducción de neumonía con analgesia regional.",
          "Considera los efectos adversos que interfieren con la movilización.",
        ],
        complementarios: ["Menciona alternativas a la epidural (paravertebral, bloqueos fasciales).", "Integra la analgesia multimodal."],
      },
    ],
  },
  // ===================================================================== 6
  {
    titulo: "6. Fragilidad",
    objetivo: "Que el residente identifique la fragilidad y la sarcopenia con instrumentos validados y comprenda sus implicancias en la toma de decisiones perioperatorias.",
    desarrollo: [
      ["h3", "6.1 Concepto"],
      ["p", "La fragilidad es un estado de vulnerabilidad derivado de la declinación acumulada de múltiples sistemas fisiológicos, que reduce la capacidad de mantener la homeostasis frente a estresores [[clegg]]. Entre el 30 y el 50 % de los adultos mayores que van a cirugía mayor viven con fragilidad, lo que más que duplica el riesgo de morbilidad, mortalidad y nueva discapacidad [[mcisaac20]]. Se asocia, además, a mayor estadía y a egreso a instituciones de cuidado [[lin16]]."],
      ["h3", "6.2 Instrumentos de evaluación"],
      ["tabla", { anchos: [2400, 4000, 2960], filas: [
        ["Instrumento", "Descripción", "Punto de corte"],
        ["Clinical Frailty Scale [[cfs]]", "Escala de juicio clínico de 1 (muy en forma) a 9 (enfermo terminal), basada en la funcionalidad", "≥ 5 frágil; 4 vulnerable"],
        ["Fenotipo de Fried [[fried]]", "Pérdida de peso no intencionada, agotamiento, baja actividad física, marcha lenta y prensión débil", "≥ 3 criterios frágil; 1–2 prefrágil"],
        ["Edmonton Frail Scale [[rolfson]]", "Escala multidimensional (cognición, estado de salud, funcionalidad, apoyo social, fármacos, nutrición, ánimo, continencia, desempeño)", "Mayor puntaje, mayor fragilidad"],
        ["EWGSOP2 (sarcopenia) [[ewgsop]]", "Baja fuerza (prensión o sentarse-pararse) = sarcopenia probable; + baja masa muscular = confirmada; + bajo desempeño = severa", "Ver capítulo 2"],
        ["Liver Frailty Index [[lai17]]", "Prensión, sentarse-pararse y equilibrio; desarrollado en pacientes con cirrosis", "Frágil ≥ 4,5 [[aasld]]"],
      ] }],
      ["p", "La Clinical Frailty Scale es la herramienta más factible en la consulta preanestésica, y su capacidad predictiva no difiere significativamente de la de otros instrumentos [[mcisaac20]]. En el paciente hepático, la sarcopenia y la desnutrición son muy frecuentes, y las guías de la AASLD recomiendan evaluarlas sistemáticamente [[aasld]]."],
      ["h3", "6.3 Intervención"],
      ["ul", [
        "Prehabilitación multimodal con ejercicio de fuerza progresivo como base, junto a apoyo nutricional (suplementación calórica y proteica si hay pérdida de peso o desnutrición) [[dent19]].",
        "Revisión de fármacos y reducción de la polifarmacia [[dent19,mohanty]].",
        "Evaluación cognitiva y del riesgo de delirio; plan de prevención [[aldecoa,mohanty]].",
        "Evaluación del apoyo social y planificación del alta desde el preoperatorio.",
        "Toma de decisiones compartida, con metas de cuidado explícitas y discusión de alternativas no quirúrgicas o menos invasivas [[mohanty]].",
      ]],
      ["p", "Implementar un tamizaje sistemático de fragilidad, con revisión de los pacientes frágiles por el equipo, se asoció a una disminución de la mortalidad a 30, 180 y 365 días (en frágiles, de 12,2 % a 3,8 % a 30 días) [[hall17]]."],
    ],
    perla: "La fragilidad cambia la conversación preoperatoria: además del riesgo de muerte, hay que hablar del riesgo de perder independencia.",
    actividad: {
      descripcion: "Aplicar la CFS y los criterios EWGSOP2 a todos los pacientes ≥ 65 años evaluados; comparar la clasificación con la impresión clínica inicial.",
      esperado: [
        "Asigna la CFS basándose en la funcionalidad de las 2 semanas previas a la enfermedad aguda, no en la impresión visual.",
        "Aplica el algoritmo EWGSOP2 (encontrar, evaluar, confirmar, graduar).",
        "Compara su impresión inicial con el resultado y reflexiona sobre la discrepancia (bitácora).",
        "Propone intervenciones concretas para los pacientes frágiles (ejercicio, nutrición, fármacos, delirio, metas de cuidado).",
      ],
    },
    preguntas: [
      {
        q: "¿La fragilidad es reversible? ¿Qué componentes pueden modificarse en 4 semanas?",
        modelo: "La fragilidad es un estado dinámico y potencialmente reversible, sobre todo en sus etapas iniciales (prefragilidad) [[clegg,dent19]]. En 4 semanas pueden modificarse los componentes físicos (fuerza, velocidad de marcha, resistencia aeróbica), el estado nutricional, la anemia, la polifarmacia y algunos aspectos psicológicos y de apoyo social; en cambio, el deterioro cognitivo establecido y la multimorbilidad son poco modificables en ese plazo. La evidencia de la prehabilitación preoperatoria en pacientes frágiles es aún contradictoria: dos ensayos (uno supervisado parcialmente y otro domiciliario) no demostraron menos complicaciones ni mejor recuperación, y la adherencia apareció como un factor determinante [[carli20,mcisaac22]]. Por ello, en el paciente frágil la intervención debe ser supervisada, multicomponente y realista, y acompañarse de una conversación sobre metas de cuidado.",
        esenciales: [
          "Afirma que es un estado dinámico y parcialmente reversible.",
          "Identifica componentes modificables en 4 semanas (físico, nutricional, fármacos, anemia).",
          "Reconoce la evidencia contradictoria de la prehabilitación en frágiles.",
        ],
        complementarios: ["Plantea la supervisión como estrategia para mejorar la adherencia.", "Incluye las metas de cuidado."],
      },
      {
        q: "¿Cómo cambia el manejo anestésico en un paciente frágil (dosis, profundidad anestésica, prevención del delirio)?",
        modelo: "Dosis: la disminución de la masa magra y del agua corporal, la menor depuración renal y hepática y la mayor sensibilidad del sistema nervioso central hacen necesario reducir y titular las dosis de hipnóticos y opioides, con inducción lenta y mayor atención a la hipotensión. Profundidad anestésica: evitar la anestesia excesivamente profunda, idealmente guiada por monitorización EEG procesada, en línea con las guías de delirio postoperatorio de la ESAIC [[aldecoa]]. Prevención del delirio: tamizaje preoperatorio de riesgo, evitar benzodiacepinas y fármacos anticolinérgicos, analgesia multimodal ahorradora de opioides y técnicas regionales cuando sea posible, mantener la normotermia y la estabilidad hemodinámica, permitir lentes y audífonos, favorecer el sueño, la orientación y la presencia de la familia, y movilización precoz; además, tamizaje postoperatorio sistemático del delirio [[aldecoa,mohanty]]. Finalmente, revisar con el paciente y su familia las metas de cuidado y las directivas anticipadas [[mohanty]].",
        esenciales: [
          "Ajusta y titula las dosis con fundamento farmacológico.",
          "Propone evitar la anestesia profunda con monitorización EEG procesada.",
          "Enumera al menos 3 medidas de prevención del delirio.",
          "Incluye las metas de cuidado.",
        ],
        complementarios: ["Menciona el tamizaje postoperatorio del delirio.", "Cita las guías ESAIC o ACS/AGS."],
      },
    ],
  },
  // ===================================================================== 7
  {
    titulo: "7. Movilización precoz",
    objetivo: "Que el residente comprenda la movilización precoz como un objetivo compartido del equipo y reconozca cómo las decisiones anestésicas la facilitan o la impiden.",
    desarrollo: [
      ["h3", "7.1 Fundamento"],
      ["p", "El reposo en cama produce pérdida de masa y fuerza muscular, desacondicionamiento cardiovascular, resistencia a la insulina, atelectasia, tromboembolismo venoso, úlceras por presión y delirio [[brower,kortebein]]. La movilización precoz es un componente central de los protocolos ERAS [[ljung17,gustafsson]]."],
      ["h3", "7.2 Evidencia"],
      ["p", "Un programa de movilización precoz supervisado tras cirugía oncológica abdominal mayor fue seguro y mejoró la capacidad funcional, aunque su impacto en los resultados clínicos no fue concluyente [[almeida]]. En un programa ERAS de cirugía colorrectal, aumentar la facilitación de la movilización por parte del personal incrementó el tiempo fuera de la cama, pero no mejoró los resultados [[fiore17]]. La interpretación más razonable es que la movilización es un indicador y un componente de una recuperación exitosa, que depende del conjunto de medidas (analgesia, NVPO, fluidos, retiro de dispositivos) más que de una intervención aislada [[tazreean]]."],
      ["h3", "7.3 Objetivos y criterios de seguridad"],
      ["ul", [
        "Objetivos habituales: sedestación o bipedestación el mismo día de la cirugía y deambulación progresiva desde el día 1, ajustados al tipo de cirugía y al estado del paciente [[gustafsson,tazreean]].",
        "Criterios de seguridad (adaptados del consenso para la movilización en pacientes críticos [[hodgson]]): estabilidad hemodinámica sin aumento reciente de drogas vasoactivas ni arritmias o isquemia activas; SpO2 adecuada con el soporte disponible y sin aumento de los requerimientos de oxígeno; ausencia de sangrado activo; paciente vigil y colaborador; dolor controlado; y ausencia de restricciones quirúrgicas.",
      ]],
      ["h3", "7.4 Barreras y rol del anestesiólogo"],
      ["tabla", { anchos: [3000, 6360], filas: [
        ["Barrera", "Estrategia anestésica"],
        ["Dolor", "Analgesia multimodal ahorradora de opioides; técnicas regionales que no bloqueen la función motora; plan de rescate claro [[ljung17]]"],
        ["Náuseas y vómitos", "Evaluación del riesgo y profilaxis multimodal según el número de factores de riesgo [[gan20]]"],
        ["Hipotensión ortostática", "Manejo de fluidos orientado a objetivos, evitar la sobrecarga y la hipovolemia; ajustar la concentración del anestésico local epidural"],
        ["Bloqueo motor", "Elegir técnicas y concentraciones que preserven la fuerza de extremidades inferiores"],
        ["Catéteres, drenajes y sondas", "Minimizar su uso y planificar su retiro precoz [[gustafsson]]"],
        ["Sedación y delirio", "Evitar benzodiacepinas y exceso de opioides; prevención del delirio [[aldecoa]]"],
      ] }],
    ],
    perla: "Al planificar la analgesia hay que preguntarse: ¿permite que este paciente se siente y camine mañana?",
    actividad: {
      descripcion: "Hacer seguimiento de pacientes prehabilitados en el postoperatorio (días 0–3), registrar el día y la distancia de la primera deambulación y las barreras encontradas.",
      esperado: [
        "Registra en forma sistemática para cada paciente: día y hora de la primera sedestación, bipedestación y deambulación, y la distancia recorrida.",
        "Identifica las barreras y las clasifica (analgesia, NVPO, hemodinamia, dispositivos, motivación, organización).",
        "Propone al menos una intervención anestésica concreta para cada barrera relacionada con la anestesia.",
        "Comunica sus hallazgos al equipo de kinesiología y al equipo tratante.",
      ],
    },
    preguntas: [
      {
        q: "¿Qué técnica analgésica elegiría en una hepatectomía abierta para favorecer la movilización?",
        modelo: "La elección se basa en un esquema multimodal y en las características de la resección. Las guías ERAS de cirugía hepática consideran la epidural torácica, la morfina intratecal y los catéteres de infiltración continua de la herida como alternativas dentro de una analgesia multimodal [[joliat]]. La epidural torácica ofrece una excelente analgesia dinámica, pero exige precaución por la hipotensión (que puede llevar a sobrecarga de fluidos) y por la alteración transitoria de la coagulación tras una hepatectomía mayor, que condiciona el momento del retiro del catéter. La morfina intratecal y los catéteres de herida, junto con paracetamol (ajustando la dosis según la función hepática) y adyuvantes, son alternativas que interfieren menos con la hemodinamia y con la movilización. Se deben evitar los AINE en pacientes con cirrosis o riesgo renal. La respuesta ideal define la técnica según la extensión de la resección, la función hepática y la experiencia del equipo, con la meta explícita de lograr sedestación el día 0 y deambulación el día 1.",
        esenciales: [
          "Propone un esquema multimodal con al menos una técnica regional o neuroaxial.",
          "Considera la coagulopatía postoperatoria y la hipotensión en la elección.",
          "Ajusta los fármacos a la función hepática (paracetamol, AINE).",
          "Relaciona la elección con el objetivo de movilización.",
        ],
        complementarios: ["Cita la guía ERAS de cirugía hepática.", "Compara ventajas y desventajas de al menos dos técnicas."],
      },
      {
        q: "¿Cuándo está contraindicado movilizar a un paciente postoperado?",
        modelo: "La movilización debe postergarse cuando hay inestabilidad hemodinámica (necesidad creciente de drogas vasoactivas, hipotensión sintomática, arritmia no controlada o isquemia miocárdica activa), insuficiencia respiratoria (desaturación persistente pese al oxígeno, aumento de los requerimientos, trabajo respiratorio aumentado), sangrado activo, compromiso de conciencia, agitación o paciente no colaborador, fracturas o lesiones de columna inestables y restricciones quirúrgicas explícitas [[hodgson]]. La mayoría son contraindicaciones transitorias: se deben reevaluar a diario. El dolor, las náuseas o la presencia de drenajes no son contraindicaciones, sino barreras que se deben resolver.",
        esenciales: [
          "Enumera criterios hemodinámicos, respiratorios, neurológicos y quirúrgicos.",
          "Distingue contraindicaciones de barreras modificables.",
          "Señala la reevaluación diaria.",
        ],
        complementarios: ["Cita el consenso de criterios de seguridad.", "Propone una lista de verificación previa a la movilización."],
      },
    ],
  },
  // ===================================================================== 8
  {
    titulo: "8. Rol del kinesiólogo en medicina perioperatoria",
    objetivo: "Que el residente conozca las competencias del kinesiólogo y las integre en la planificación perioperatoria mediante una comunicación efectiva.",
    desarrollo: [
      ["h3", "8.1 Competencias"],
      ["ul", [
        "Evaluación funcional y respiratoria: TM6M, pruebas de fuerza y desempeño, PImax/PEmax, fragilidad (capítulos 2 y 6).",
        "Prescripción, supervisión y progresión del ejercicio aeróbico y de fuerza (capítulos 3 y 4).",
        "Entrenamiento muscular inspiratorio y educación respiratoria preoperatoria (capítulo 5).",
        "Kinesiterapia respiratoria y movilización precoz en el postoperatorio (capítulos 5 y 7).",
        "Educación del paciente y de la familia, promoción de la adherencia y continuidad de la rehabilitación tras el alta.",
      ]],
      ["p", "En la mayoría de los programas de prehabilitación, el componente de ejercicio es diseñado y supervisado por kinesiólogos (fisioterapeutas) [[hijazi]]. El ensayo LIPPSMAck POP mostró que una única intervención kinésica preoperatoria puede reducir a la mitad las CPP [[boden]], y los programas supervisados han mostrado mejores resultados que los domiciliarios no supervisados [[molenaar23,mcisaac22]]. El kinesiólogo es quien más tiempo pasa con el paciente durante la prehabilitación, por lo que detecta precozmente la falta de adherencia, la aparición de síntomas y los cambios clínicos."],
      ["h3", "8.2 Trabajo interdisciplinario"],
      ["p", "La medicina perioperatoria moderna propone rediseñar el camino hacia la cirugía: aprovechar el período preoperatorio como un «momento educable», identificar precozmente el riesgo y coordinar intervenciones entre anestesiólogos, cirujanos, kinesiólogos, nutricionistas, psicólogos y enfermería [[grocott17,levett16]]. Las reuniones breves de caso y un registro común de la evaluación funcional evitan duplicaciones y permiten tomar decisiones compartidas."],
      ["h3", "8.3 Comunicación efectiva"],
      ["p", "Una derivación y un traspaso efectivos deben ser estructurados. El formato SBAR (Situación, Antecedentes, Evaluación y Recomendación) es una herramienta validada para mejorar la comunicación entre profesionales [[haig]]. Aplicado a la derivación a kinesiología: Situación (diagnóstico, cirugía y fecha probable), Antecedentes (comorbilidades, restricciones cardiacas, ortopédicas u oncológicas), Evaluación (resultado de la evaluación funcional y del riesgo) y Recomendación (objetivo concreto: por ejemplo, aumentar 30 m en el TM6M e iniciar IMT en 4 semanas)."],
    ],
    perla: "Una buena derivación a kinesiología incluye: diagnóstico y cirugía planificada, fecha probable, riesgo estimado, restricciones (cardiacas, ortopédicas, oncológicas) y un objetivo concreto.",
    actividad: {
      descripcion: "Presentar 1 caso semanal en la reunión con el equipo de kinesiología, con la propuesta de plan conjunto.",
      esperado: [
        "Presenta el caso en forma estructurada (SBAR) y en un tiempo acotado (≈ 5 minutos).",
        "Integra la evaluación funcional, el riesgo y el plan de prehabilitación con objetivos medibles.",
        "Escucha e incorpora la opinión del kinesiólogo y define responsables y plazos.",
        "Hace seguimiento del caso en la semana siguiente.",
      ],
    },
    preguntas: [
      {
        q: "¿Qué información del intraoperatorio es útil para el kinesiólogo que moviliza al paciente al día siguiente?",
        modelo: "Un traspaso útil incluye: (1) cirugía realizada, vía de abordaje e incisiones, y restricciones quirúrgicas (posiciones, carga, uso de faja); (2) técnica anestésica y analgésica: tipo de bloqueo o catéter (epidural, paravertebral, de herida), fármacos, concentración, bloqueo motor esperado y su duración, y plan de analgesia de rescate; (3) eventos intraoperatorios: inestabilidad hemodinámica, uso de vasopresores, sangrado y transfusión, arritmias, broncoespasmo, desaturación o atelectasia, vía aérea difícil, aspiración; (4) balance de fluidos y riesgo de hipotensión ortostática; (5) bloqueo neuromuscular y su reversión; (6) dispositivos: drenajes, sondas, catéteres y su manejo; (7) riesgo de NVPO y profilaxis administrada; y (8) destino postoperatorio, metas de oxigenación y objetivos de movilización acordados. Idealmente, se transmite en formato estructurado (SBAR) y queda registrado [[haig,gustafsson]].",
        esenciales: [
          "Incluye la técnica analgésica y el bloqueo motor esperado.",
          "Incluye los eventos intraoperatorios relevantes y la hemodinamia.",
          "Incluye dispositivos y restricciones quirúrgicas.",
          "Propone un formato estructurado de traspaso.",
        ],
        complementarios: ["Menciona el balance de fluidos y el riesgo ortostático.", "Incluye el riesgo de NVPO y las metas de oxigenación."],
      },
    ],
  },
];

const RESUMEN_UMBRALES = [
  ["Dominio", "Herramienta", "Valor de alerta", "Ref."],
  ["Capacidad funcional autorreportada", "METs / DASI", "< 4 METs; DASI < 34", "[[esc22,dasi20]]"],
  ["Capacidad aeróbica (campo)", "TM6M", "Bajo el valor predicho; < 427 m sugiere UA bajo; cambio mínimo importante ≈ 25–33 m", "[[osses,sinclair,holland]]"],
  ["Capacidad aeróbica (laboratorio)", "CPET", "UA < 10–11 mL/kg/min; VE/VCO2 > 34; resección pulmonar: VO2 máx < 10 mL/kg/min", "[[older,wilson10,brunelli]]"],
  ["Fuerza", "Prensión / sentarse-pararse 5 veces", "< 27 kg (H) y < 16 kg (M); > 15 s", "[[ewgsop]]"],
  ["Desempeño físico", "SPPB / marcha / TUG", "≤ 8 puntos; ≤ 0,8 m/s; ≥ 20 s", "[[ewgsop]]"],
  ["Fragilidad", "CFS / Fried / LFI", "CFS ≥ 5; Fried ≥ 3; LFI ≥ 4,5", "[[cfs,fried,aasld]]"],
  ["Riesgo pulmonar", "ARISCAT", "Intermedio 26–44; alto ≥ 45", "[[ariscat]]"],
  ["Anemia", "Hemoglobina", "< 13 g/dL (ambos sexos)", "[[munoz]]"],
  ["Nutrición", "Aporte proteico", "Meta 1,2–1,5 g/kg/día en enfermedad", "[[protage,weimann]]"],
];

module.exports = { ALIAS, REFS_EXTRA, CAPITULOS, RESUMEN_UMBRALES };
