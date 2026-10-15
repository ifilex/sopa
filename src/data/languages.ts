import { LanguageCode, LanguageMeta, WordDefinition } from '../types';

export const LANGUAGES: Record<LanguageCode, LanguageMeta> = {
  es: { code: 'es', name: 'Español', nativeName: 'Español', flag: '🇪🇸', script: 'latin' },
  en: { code: 'en', name: 'English', nativeName: 'English', flag: '🇬🇧', script: 'latin' },
  fr: { code: 'fr', name: 'Français', nativeName: 'Français', flag: '🇫🇷', script: 'latin' },
  pt: { code: 'pt', name: 'Português', nativeName: 'Português', flag: '🇧🇷', script: 'latin' },
  de: { code: 'de', name: 'Deutsch', nativeName: 'Deutsch', flag: '🇩🇪', script: 'latin' },
  it: { code: 'it', name: 'Italiano', nativeName: 'Italiano', flag: '🇮🇹', script: 'latin' },
  ru: { code: 'ru', name: 'Ruso', nativeName: 'Русский', flag: '🇷🇺', script: 'cyrillic' },
  zh: { code: 'zh', name: 'Chino', nativeName: '中文', flag: '🇨🇳', script: 'cjk' },
  ja: { code: 'ja', name: 'Japonés', nativeName: '日本語', flag: '🇯🇵', script: 'cjk' },
};

export interface LanguageWordBank {
  logopedia: WordDefinition[];
  left_hemisphere: WordDefinition[];
  visual_memory: WordDefinition[];
  attention_focus: WordDefinition[];
  zen_calm: WordDefinition[];
  zenQuotes: { quote: string; author: string }[];
}

export const WORD_BANK: Record<LanguageCode, LanguageWordBank> = {
  es: {
    logopedia: [
      { word: 'LENGUA', clue: 'Órgano esencial para articular sonidos y palabras', phonetic: '/ˈleŋ.ɡwa/', category: 'Logopedia', therapeuticNote: 'Estimula la discriminación fonológica lingual.' },
      { word: 'SONIDO', clue: 'Vibración acústica percibida por el oído', phonetic: '/soˈni.do/', category: 'Logopedia', therapeuticNote: 'Percepción y evocación auditiva.' },
      { word: 'HABLA', clue: 'Acto individual del ejercicio del lenguaje', phonetic: '/ˈa.bla/', category: 'Logopedia', therapeuticNote: 'Coordinación motora oral.' },
      { word: 'VOZ', clue: 'Sonido producido por la vibración de las cuerdas vocales', phonetic: '/boθ/', category: 'Logopedia', therapeuticNote: 'Tono y resonancia laríngea.' },
      { word: 'RITMO', clue: 'Cadencia y fluidez temporal al pronunciar', phonetic: '/ˈrit.mo/', category: 'Logopedia', therapeuticNote: 'Prosodia y fluidez verbal.' },
      { word: 'FRASE', clue: 'Conjunto de palabras con sentido completo', phonetic: '/ˈfɾa.se/', category: 'Logopedia', therapeuticNote: 'Sintaxis y estructuración.' },
      { word: 'LETRA', clue: 'Signo gráfico que representa un fonema', phonetic: '/ˈle.tɾa/', category: 'Logopedia', therapeuticNote: 'Correspondencia grafema-fonema.' },
      { word: 'PALABRA', clue: 'Unidad léxica con significado propio', phonetic: '/paˈla.βɾa/', category: 'Logopedia', therapeuticNote: 'Denominación y memoria léxica.' },
    ],
    left_hemisphere: [
      { word: 'LOGICA', clue: 'Razonamiento estructurado y coherente', phonetic: '/ˈlo.xi.ka/', category: 'Hemisferio Izquierdo', therapeuticNote: 'Activación del lóbulo frontal izquierdo.' },
      { word: 'MEMORIA', clue: 'Capacidad cerebral de retener y evocar información', phonetic: '/meˈmo.ɾja/', category: 'Hemisferio Izquierdo', therapeuticNote: 'Memoria semántica y de trabajo.' },
      { word: 'ANALISIS', clue: 'Descomposición minuciosa para comprender', phonetic: '/aˈna.li.sis/', category: 'Hemisferio Izquierdo', therapeuticNote: 'Procesamiento secuencial analítico.' },
      { word: 'CALCULO', clue: 'Operación mental de resolución cuantitativa', phonetic: '/ˈkal.ku.lo/', category: 'Hemisferio Izquierdo', therapeuticNote: 'Giro angular y corteza parietal.' },
      { word: 'CONCEPTO', clue: 'Idea abstracta que representa la realidad', phonetic: '/konˈθep.to/', category: 'Hemisferio Izquierdo', therapeuticNote: 'Categorización conceptual.' },
      { word: 'ORDEN', clue: 'Secuencia estructurada y armónica', phonetic: '/ˈoɾ.den/', category: 'Hemisferio Izquierdo', therapeuticNote: 'Planificación ejecutiva.' },
      { word: 'LECTURA', clue: 'Decodificación visual comprensiva de símbolos', phonetic: '/lekˈtu.ɾa/', category: 'Hemisferio Izquierdo', therapeuticNote: 'Área de Wernicke y Broca.' },
    ],
    visual_memory: [
      { word: 'COLORES', clue: 'Percepción visual de longitudes de onda', phonetic: '/koˈlo.ɾes/', category: 'Memoria Visual' },
      { word: 'FIGURAS', clue: 'Formas geométricas en el espacio', phonetic: '/fiˈɣu.ɾas/', category: 'Memoria Visual' },
      { word: 'PAISAJE', clue: 'Extensión de terreno que se divisa', phonetic: '/paiˈsa.xe/', category: 'Memoria Visual' },
      { word: 'FORMAS', clue: 'Aspecto exterior y contorno de los objetos', phonetic: '/ˈfoɾ.mas/', category: 'Memoria Visual' },
      { word: 'SIMETRIA', clue: 'Correspondencia exacta en la disposición', phonetic: '/si.meˈtɾi.a/', category: 'Memoria Visual' },
      { word: 'MIRADA', clue: 'Acción consciente de dirigir la vista', phonetic: '/miˈɾa.da/', category: 'Memoria Visual' },
    ],
    attention_focus: [
      { word: 'ENFOQUE', clue: 'Dirección precisa de la energía mental', phonetic: '/enˈfo.ke/', category: 'Atención' },
      { word: 'DETALLE', clue: 'Elemento minucioso de una totalidad', phonetic: '/deˈta.ʎe/', category: 'Atención' },
      { word: 'CLARIDAD', clue: 'Estado de lucidez y nitidez mental', phonetic: '/kla.ɾiˈðað/', category: 'Atención' },
      { word: 'ALERTA', clue: 'Vigilancia activa y receptividad', phonetic: '/aˈleɾ.ta/', category: 'Atención' },
      { word: 'DESTREZA', clue: 'Habilidad y precisión en la ejecución', phonetic: '/desˈtɾe.θa/', category: 'Atención' },
      { word: 'PRECISION', clue: 'Ajuste riguroso y exacto', phonetic: '/pɾe.θiˈsjon/', category: 'Atención' },
    ],
    zen_calm: [
      { word: 'SERENO', clue: 'Tranquilo, sosegado y libre de agitación', phonetic: '/seˈɾe.no/', category: 'Zen & Calma' },
      { word: 'RESPIRA', clue: 'Inhalar y exhalar con plena presencia', phonetic: '/resˈpi.ɾa/', category: 'Zen & Calma' },
      { word: 'PAZ', clue: 'Estado de equilibrio interior y armonía', phonetic: '/paθ/', category: 'Zen & Calma' },
      { word: 'SILENCIO', clue: 'Espacio calmo donde florece la mente', phonetic: '/siˈlen.θjo/', category: 'Zen & Calma' },
      { word: 'ARMONIA', clue: 'Concordancia y proporción equilibrada', phonetic: '/aɾ.moˈni.a/', category: 'Zen & Calma' },
      { word: 'FLORECER', clue: 'Desarrollarse con belleza y vitalidad', phonetic: '/flo.ɾeˈθeɾ/', category: 'Zen & Calma' },
      { word: 'GRATITUD', clue: 'Sentimiento de aprecio consciente', phonetic: '/ɡɾa.tiˈtuð/', category: 'Zen & Calma' },
    ],
    zenQuotes: [
      { quote: 'LA CALMA INTERIOR ES LA FUERZA MAS PROFUNDA DE TU MENTE', author: 'Sabiduría Zen' },
      { quote: 'CADA PALABRA ENCONTRADA ENCIENDE UN NUEVO SENDERO NEURONAL', author: 'Neuroplasticidad Consciente' },
      { quote: 'EL SILENCIO Y LA ATENCION TRANSFORMAN EL PENSAMIENTO EN LUZ', author: 'Proverbio de la Calma' },
      { quote: 'LA CONSTANCIA DIARIA ES LA LLAVE DE LA REGENERACION COGNITIVA', author: 'Neuro-Rehabilitación' },
    ],
  },
  en: {
    logopedia: [
      { word: 'TONGUE', clue: 'Muscular organ used for tasting, swallowing, and speech', phonetic: '/tʌŋ/', category: 'Logopedics' },
      { word: 'VOICE', clue: 'Sound produced in a person’s larynx', phonetic: '/vɔɪs/', category: 'Logopedics' },
      { word: 'SPEECH', clue: 'Expression of thoughts in spoken words', phonetic: '/spiːtʃ/', category: 'Logopedics' },
      { word: 'SOUND', clue: 'Vibrations traveling through the air', phonetic: '/saʊnd/', category: 'Logopedics' },
      { word: 'RHYTHM', clue: 'A regular repeated pattern of movement or sound', phonetic: '/ˈrɪð.əm/', category: 'Logopedics' },
      { word: 'PHRASE', clue: 'A small group of words standing together', phonetic: '/freɪz/', category: 'Logopedics' },
      { word: 'BREATH', clue: 'Air taken into the lungs', phonetic: '/breθ/', category: 'Logopedics' },
    ],
    left_hemisphere: [
      { word: 'LOGIC', clue: 'Reasoning conducted according to strict principles', phonetic: '/ˈlɒdʒ.ɪk/', category: 'Left Brain' },
      { word: 'MEMORY', clue: 'The faculty by which the mind stores information', phonetic: '/ˈmem.ər.i/', category: 'Left Brain' },
      { word: 'REASON', clue: 'The power of the mind to think and judge', phonetic: '/ˈriː.zən/', category: 'Left Brain' },
      { word: 'SYNTAX', clue: 'Arrangement of words into phrases and sentences', phonetic: '/ˈsɪn.tæks/', category: 'Left Brain' },
      { word: 'NUMBER', clue: 'An arithmetical value', phonetic: '/ˈnʌm.bər/', category: 'Left Brain' },
      { word: 'SYSTEM', clue: 'A set of connected things forming a complex whole', phonetic: '/ˈsɪs.təm/', category: 'Left Brain' },
    ],
    visual_memory: [
      { word: 'COLOR', clue: 'Visual appearance of light wavelengths', phonetic: '/ˈkʌl.ər/', category: 'Visual Memory' },
      { word: 'SHAPES', clue: 'External geometric outlines', phonetic: '/ʃeɪps/', category: 'Visual Memory' },
      { word: 'VISION', clue: 'The faculty of sight and mental imagery', phonetic: '/ˈvɪʒ.ən/', category: 'Visual Memory' },
      { word: 'MIRROR', clue: 'Reflective surface revealing form', phonetic: '/ˈmɪr.ər/', category: 'Visual Memory' },
      { word: 'SYMBOLS', clue: 'Marks representing meaning or objects', phonetic: '/ˈsɪm.bəlz/', category: 'Visual Memory' },
    ],
    attention_focus: [
      { word: 'FOCUS', clue: 'Center of interest or targeted attention', phonetic: '/ˈfoʊ.kəs/', category: 'Attention' },
      { word: 'CLARITY', clue: 'Quality of being clear and lucid', phonetic: '/ˈklær.ə.ti/', category: 'Attention' },
      { word: 'AWARE', clue: 'Having knowledge or conscious perception', phonetic: '/əˈweər/', category: 'Attention' },
      { word: 'INTENT', clue: 'Purposive mental direction', phonetic: '/ɪnˈtent/', category: 'Attention' },
      { word: 'ALERT', clue: 'Quick to notice and act', phonetic: '/əˈlɜːt/', category: 'Attention' },
    ],
    zen_calm: [
      { word: 'SERENE', clue: 'Calm, peaceful, and untroubled', phonetic: '/sɪˈriːn/', category: 'Zen Calm' },
      { word: 'PEACE', clue: 'Freedom from disturbance and tranquil state', phonetic: '/piːs/', category: 'Zen Calm' },
      { word: 'BREATHE', clue: 'Take air into the lungs and expel it', phonetic: '/briːð/', category: 'Zen Calm' },
      { word: 'STILL', clue: 'Not moving or making sound', phonetic: '/stɪl/', category: 'Zen Calm' },
      { word: 'HARMONY', clue: 'Pleasing arrangement of parts', phonetic: '/ˈhɑː.mə.ni/', category: 'Zen Calm' },
      { word: 'GRACE', clue: 'Elegance of movement and kindness', phonetic: '/ɡreɪs/', category: 'Zen Calm' },
    ],
    zenQuotes: [
      { quote: 'PEACE OF MIND IS THE HIGHEST FORM OF HEALTH AND STRENGTH', author: 'Zen Wisdom' },
      { quote: 'EVERY WORD UNLOCKED EXPANDS THE PATHWAYS OF THE BRAIN', author: 'Neuroplasticity' },
      { quote: 'QUIET FOCUS TURNS EVERY MOMENT INTO RENEWED VITALITY', author: 'Mindful Healing' },
    ],
  },
  fr: {
    logopedia: [
      { word: 'LANGUE', clue: 'Organe de la parole et du goût', phonetic: '/lɑ̃ɡ/', category: 'Orthophonie' },
      { word: 'PAROLE', clue: 'Faculté d’exprimer sa pensée par des mots', phonetic: '/pa.ʁɔl/', category: 'Orthophonie' },
      { word: 'VOIX', clue: 'Ensemble des sons produits par les cordes vocales', phonetic: '/vwa/', category: 'Orthophonie' },
      { word: 'SON', clue: 'Sensation auditive produite par des vibrations', phonetic: '/sɔ̃/', category: 'Orthophonie' },
      { word: 'RYTHME', clue: 'Mouvement régulier et cadence de l’élocution', phonetic: '/ʁitm/', category: 'Orthophonie' },
      { word: 'LETTRE', clue: 'Signe de l’alphabet représentant un son', phonetic: '/lɛtʁ/', category: 'Orthophonie' },
    ],
    left_hemisphere: [
      { word: 'LOGIQUE', clue: 'Manière de raisonner juste et cohérente', phonetic: '/lɔ.ʒik/', category: 'Cerveau Gauche' },
      { word: 'MEMOIRE', clue: 'Faculté de conserver et de rappeler des idées', phonetic: '/me.mwaʁ/', category: 'Cerveau Gauche' },
      { word: 'PENSEE', clue: 'Activité psychique et réflexion intérieure', phonetic: '/pɑ̃.se/', category: 'Cerveau Gauche' },
      { word: 'CALCUL', clue: 'Opération mathématique de résolution', phonetic: '/kal.kyl/', category: 'Cerveau Gauche' },
      { word: 'NOTION', clue: 'Connaissance élémentaire d’une chose', phonetic: '/nɔ.sjɔ̃/', category: 'Cerveau Gauche' },
    ],
    visual_memory: [
      { word: 'COULEUR', clue: 'Impression produite sur l’œil par la lumière', phonetic: '/ku.lœʁ/', category: 'Mémoire Visuelle' },
      { word: 'FORMES', clue: 'Contours géométriques et figures', phonetic: '/fɔʁm/', category: 'Mémoire Visuelle' },
      { word: 'VISION', clue: 'Perception visuelle et regard', phonetic: '/vi.zjɔ̃/', category: 'Mémoire Visuelle' },
      { word: 'REGARD', clue: 'Manière de diriger les yeux', phonetic: '/ʁə.ɡaʁ/', category: 'Mémoire Visuelle' },
    ],
    attention_focus: [
      { word: 'CLARTE', clue: 'Caractère de ce qui est net et compréhensible', phonetic: '/klaʁ.te/', category: 'Attention' },
      { word: 'EVEIL', clue: 'État d’attention vive et réceptive', phonetic: '/e.vɛj/', category: 'Attention' },
      { word: 'LUCIDE', clue: 'Qui voit les choses avec clarté', phonetic: '/ly.sid/', category: 'Attention' },
    ],
    zen_calm: [
      { word: 'SEREIN', clue: 'Plein de calme, de paix et de pureté', phonetic: '/sə.ʁɛ̃/', category: 'Zen & Calme' },
      { word: 'PAIX', clue: 'Absence de trouble et sérénité', phonetic: '/pɛ/', category: 'Zen & Calme' },
      { word: 'SOUFFLE', clue: 'Air respiré, symbole de vie et de calme', phonetic: '/sufl/', category: 'Zen & Calme' },
      { word: 'HARMONIE', clue: 'Accord parfait et équilibre bienfaisant', phonetic: '/aʁ.mɔ.ni/', category: 'Zen & Calme' },
      { word: 'CALME', clue: 'Tranquillité de l’âme et du corps', phonetic: '/kalm/', category: 'Zen & Calme' },
    ],
    zenQuotes: [
      { quote: 'LE CALME DE L ESPRIT EST LA PLUS BELLE DES FORCES', author: 'Sagesse Zen' },
      { quote: 'CHAQUE MOT DECOUVRE UN NOUVEL HORIZON COGNITIF', author: 'Neuroplasticité' },
    ],
  },
  pt: {
    logopedia: [
      { word: 'LINGUA', clue: 'Órgão muscular da cavidade bucal', phonetic: '/ˈlĩ.ɡwɐ/', category: 'Fonoaudiologia' },
      { word: 'FALA', clue: 'Ato de articular sons em palavras', phonetic: '/ˈfa.lɐ/', category: 'Fonoaudiologia' },
      { word: 'VOZ', clue: 'Som emitido pelas pregas vocais', phonetic: '/vɔs/', category: 'Fonoaudiologia' },
      { word: 'SOM', clue: 'Sensação auditiva produzida por ondas sonoras', phonetic: '/sõ/', category: 'Fonoaudiologia' },
      { word: 'RITMO', clue: 'Cadência melódica da fala', phonetic: '/ˈʁi.tmu/', category: 'Fonoaudiologia' },
      { word: 'LETRA', clue: 'Símbolo gráfico da escrita', phonetic: '/ˈlɛ.tɾɐ/', category: 'Fonoaudiologia' },
    ],
    left_hemisphere: [
      { word: 'LOGICA', clue: 'Raciocínio coerente e dedutivo', phonetic: '/ˈlɔ.ʒi.kɐ/', category: 'Hemisfério Esquerdo' },
      { word: 'MEMORIA', clue: 'Capacidade de registrar e recuperar dados', phonetic: '/meˈmɔ.ɾjɐ/', category: 'Hemisfério Esquerdo' },
      { word: 'ANALISE', clue: 'Exame detalhado de cada componente', phonetic: '/ɐˈna.li.zi/', category: 'Hemisfério Esquerdo' },
      { word: 'ORDEM', clue: 'Estruturação harmoniosa', phonetic: '/ˈɔʁ.dẽj̃/', category: 'Hemisfério Esquerdo' },
      { word: 'LEITURA', clue: 'Decodificação e compreensão textual', phonetic: '/lejˈtu.ɾɐ/', category: 'Hemisfério Esquerdo' },
    ],
    visual_memory: [
      { word: 'CORES', clue: 'Tons perceptíveis pela visão', phonetic: '/ˈkɔ.ɾis/', category: 'Memória Visual' },
      { word: 'FORMAS', clue: 'Configuração espacial dos objetos', phonetic: '/ˈfɔʁ.mɐs/', category: 'Memória Visual' },
      { word: 'OLHAR', clue: 'Ato de fixar a visão', phonetic: '/oˈʎaʁ/', category: 'Memória Visual' },
    ],
    attention_focus: [
      { word: 'FOCO', clue: 'Ponto de convergência da atenção', phonetic: '/ˈfɔ.ku/', category: 'Atenção' },
      { word: 'CLAREZA', clue: 'Nitidez de pensamento e expressão', phonetic: '/klɐˈɾe.zɐ/', category: 'Atenção' },
      { word: 'ALERTA', clue: 'Estado de vigilância ativa', phonetic: '/ɐˈlɛʁ.tɐ/', category: 'Atenção' },
    ],
    zen_calm: [
      { word: 'SERENO', clue: 'Tranquilo e em perfeita paz', phonetic: '/seˈɾẽ.nu/', category: 'Zen & Calma' },
      { word: 'PAZ', clue: 'Ausência de agitação e harmonia plena', phonetic: '/pas/', category: 'Zen & Calma' },
      { word: 'RESPIRA', clue: 'Inspirar e expirar com calma', phonetic: '/ʁesˈpi.ɾɐ/', category: 'Zen & Calma' },
      { word: 'HARMONIA', clue: 'Acordo suave entre mente e corpo', phonetic: '/ɐʁ.muˈni.ɐ/', category: 'Zen & Calma' },
    ],
    zenQuotes: [
      { quote: 'A TRANQUILIDADE INTERIOR TRANSFORMA O PENSAMENTO EM SABEDORIA', author: 'Sabedoria Zen' },
      { quote: 'CADA PALAVRA REVELADA RENOVA A MENTE E O EQUILIBRIO', author: 'Neuroplasticidade' },
    ],
  },
  de: {
    logopedia: [
      { word: 'SPRACHE', clue: 'Fähigkeit des Menschen zu sprechen und zu kommunizieren', phonetic: '/ˈʃpʁaːxə/', category: 'Logopädie' },
      { word: 'STIMME', clue: 'Der durch die Stimmlippen erzeugte Klang', phonetic: '/ˈʃtɪmə/', category: 'Logopädie' },
      { word: 'WORT', clue: 'Kleinste selbstständige Spracheinheit', phonetic: '/vɔʁt/', category: 'Logopädie' },
      { word: 'LAUT', clue: 'Kleinstes hörbares Element der Sprache', phonetic: '/laʊ̯t/', category: 'Logopädie' },
      { word: 'KLANG', clue: 'Angenehmes Geräusch oder Tonfolge', phonetic: '/klaŋ/', category: 'Logopädie' },
      { word: 'SATZ', clue: 'Syntaktisch abgeschlossene Einheit', phonetic: '/zats/', category: 'Logopädie' },
    ],
    left_hemisphere: [
      { word: 'LOGIK', clue: 'Lehre vom folgerichtigen Denken', phonetic: '/ˈloːɡɪk/', category: 'Linke Gehirnhälfte' },
      { word: 'DENKEN', clue: 'Geistige Tätigkeit und Reflexion', phonetic: '/ˈdɛŋkn̩/', category: 'Linke Gehirnhälfte' },
      { word: 'ORDNUNG', clue: 'Strukturierte und harmonische Anordnung', phonetic: '/ˈʔɔʁdnʊŋ/', category: 'Linke Gehirnhälfte' },
      { word: 'SYSTEM', clue: 'Strukturiertes Ganzes aus Teilen', phonetic: '/zʏsˈteːm/', category: 'Linke Gehirnhälfte' },
    ],
    visual_memory: [
      { word: 'FARBE', clue: 'Visueller Sinneseindruck des Lichts', phonetic: '/ˈfaʁbə/', category: 'Visuelles Gedächtnis' },
      { word: 'FORMEN', clue: 'Äußere Gestalt von Gegenständen', phonetic: '/ˈfɔʁmən/', category: 'Visuelles Gedächtnis' },
      { word: 'BLICK', clue: 'Richtung der visuellen Wahrnehmung', phonetic: '/blɪk/', category: 'Visuelles Gedächtnis' },
    ],
    attention_focus: [
      { word: 'FOKUS', clue: 'Mittelpunkt der mentalen Aufmerksamkeit', phonetic: '/ˈfoːkʊs/', category: 'Aufmerksamkeit' },
      { word: 'KLARHEIT', clue: 'Zustand geistiger Deutlichkeit', phonetic: '/ˈklaːɐ̯haɪ̯t/', category: 'Aufmerksamkeit' },
    ],
    zen_calm: [
      { word: 'RUHE', clue: 'Zustand der Stille und Gelassenheit', phonetic: '/ˈʁuːə/', category: 'Zen & Ruhe' },
      { word: 'FRIEDEN', clue: 'Eintracht und seelische Ausgeglichenheit', phonetic: '/ˈfʁiːdn̩/', category: 'Zen & Ruhe' },
      { word: 'ATMEN', clue: 'Ein- und Ausatmen mit Achtsamkeit', phonetic: '/ˈʔaːtmən/', category: 'Zen & Ruhe' },
      { word: 'HARMONIE', clue: 'Einklang und wohlige Balance', phonetic: '/haʁmoˈniː/', category: 'Zen & Ruhe' },
    ],
    zenQuotes: [
      { quote: 'IN DER RUHE LIEGT DIE WAHRE KRAFT DES GEISTES', author: 'Zen Weisheit' },
      { quote: 'JEDES GEFUNDENE WORT WEITERENTWICKELT DIE SYNAPSEN', author: 'Neuroplastizität' },
    ],
  },
  it: {
    logopedia: [
      { word: 'LINGUA', clue: 'Organo essenziale della fonazione e del gusto', phonetic: '/ˈliŋ.ɡwa/', category: 'Logopedia' },
      { word: 'VOCE', clue: 'Suono emesso dall’apparato vocale', phonetic: '/ˈvo.tʃe/', category: 'Logopedia' },
      { word: 'PAROLA', clue: 'Elemento fondamentale del discorso', phonetic: '/paˈrɔ.la/', category: 'Logopedia' },
      { word: 'SUONO', clue: 'Vibrazione sonora percepita dall’orecchio', phonetic: '/ˈswɔ.no/', category: 'Logopedia' },
      { word: 'RITMO', clue: 'Cadenza ordinata e armonica', phonetic: '/ˈrit.mo/', category: 'Logopedia' },
      { word: 'LETTERA', clue: 'Carattere dell’alfabeto', phonetic: '/ˈlɛt.te.ra/', category: 'Logopedia' },
    ],
    left_hemisphere: [
      { word: 'LOGICA', clue: 'Capacità di ragionamento rigoroso', phonetic: '/ˈlɔ.dʒi.ka/', category: 'Emisfero Sinistro' },
      { word: 'MEMORIA', clue: 'Facoltà di trattenere ed evocare pensieri', phonetic: '/meˈmɔ.rja/', category: 'Emisfero Sinistro' },
      { word: 'PENSIERO', clue: 'Attività interiore e meditazione della mente', phonetic: '/penˈsje.ro/', category: 'Emisfero Sinistro' },
      { word: 'ORDINE', clue: 'Disposizione chiara e coordinata', phonetic: '/ˈor.di.ne/', category: 'Emisfero Sinistro' },
    ],
    visual_memory: [
      { word: 'COLORI', clue: 'Gradazioni visive della luce', phonetic: '/koˈlo.ri/', category: 'Memoria Visiva' },
      { word: 'FORME', clue: 'Contorni nello spazio', phonetic: '/ˈfɔr.me/', category: 'Memoria Visiva' },
      { word: 'SGUARDO', clue: 'Atto di posare gli occhi con attenzione', phonetic: '/ˈzɡwar.do/', category: 'Memoria Visiva' },
    ],
    attention_focus: [
      { word: 'FUOCO', clue: 'Punto di massima concentrazione', phonetic: '/ˈfwɔ.ko/', category: 'Attenzione' },
      { word: 'CHIAREZZA', clue: 'Nitidezza di comprensione', phonetic: '/kjaˈret.tsa/', category: 'Attenzione' },
    ],
    zen_calm: [
      { word: 'SERENO', clue: 'Libero da inquietudini e calmo', phonetic: '/seˈre.no/', category: 'Zen & Calma' },
      { word: 'PACE', clue: 'Tranquillità profonda dello spirito', phonetic: '/ˈpa.tʃe/', category: 'Zen & Calma' },
      { word: 'RESPIRO', clue: 'Atto ritmico che dona vita e calma', phonetic: '/resˈpi.ro/', category: 'Zen & Calma' },
      { word: 'ARMONIA', clue: 'Perfetto equilibrio e melodia interiore', phonetic: '/ar.moˈni.a/', category: 'Zen & Calma' },
    ],
    zenQuotes: [
      { quote: 'LA CALMA DELL ANIMA E LA PIU ALTA FORMA DI INTELLIGENZA', author: 'Saggezza Zen' },
      { quote: 'OGNI PAROLA RITROVATA ILLUMINA UN NUOVO SENTIERO NEURONALE', author: 'Neuroplasticità' },
    ],
  },
  ru: {
    logopedia: [
      { word: 'ЯЗЫК', clue: 'Орган речи и вкуса', phonetic: '[jɪˈzɨk]', category: 'Логопедия' },
      { word: 'ГОЛОС', clue: 'Звук, издаваемый голосовыми связками', phonetic: '[ˈɡoləs]', category: 'Логопедия' },
      { word: 'СЛОВО', clue: 'Основная единица языка', phonetic: '[ˈslovə]', category: 'Логопедия' },
      { word: 'ЗВУК', clue: 'Физическое акустическое колебание', phonetic: '[zvuk]', category: 'Логопедия' },
      { word: 'РИТМ', clue: 'Равномерное чередование звуков', phonetic: '[rɨtm]', category: 'Логопедия' },
      { word: 'РЕЧЬ', clue: 'Способность выражать мысли звуками', phonetic: '[rʲetɕ]', category: 'Логопедия' },
    ],
    left_hemisphere: [
      { word: 'ЛОГИКА', clue: 'Наука о правильном мышлении', phonetic: '[ˈloɡʲɪkə]', category: 'Левое полушарие' },
      { word: 'ПАМЯТЬ', clue: 'Способность сохранять опыт и знания', phonetic: '[ˈpamʲɪtʲ]', category: 'Левое полушарие' },
      { word: 'МЫСЛЬ', clue: 'Действие ума и сознания', phonetic: '[mɨs⁽ʲ⁾lʲ]', category: 'Левое полушарие' },
      { word: 'ПОРЯДОК', clue: 'Гармоничное правильное расположение', phonetic: '[pɐˈrʲadək]', category: 'Левое полушарие' },
    ],
    visual_memory: [
      { word: 'ЦВЕТ', clue: 'Зрительное ощущение света', phonetic: '[tsvʲet]', category: 'Зрительная память' },
      { word: 'ФОРМА', clue: 'Внешние очертания предмета', phonetic: '[ˈformə]', category: 'Зрительная память' },
      { word: 'ВЗГЛЯД', clue: 'Направление зрительного внимания', phonetic: '[vzɡlʲat]', category: 'Зрительная память' },
    ],
    attention_focus: [
      { word: 'ФОКУС', clue: 'Центр зрительного и мысленного внимания', phonetic: '[ˈfokʊs]', category: 'Внимание' },
      { word: 'ЯСНОСТЬ', clue: 'Чистота и четкость восприятия', phonetic: '[ˈjasnəsʲtʲ]', category: 'Внимание' },
    ],
    zen_calm: [
      { word: 'ПОКОЙ', clue: 'Состояние душевного равновесия и тишины', phonetic: '[pɐˈkoj]', category: 'Дзен и покой' },
      { word: 'ТИШИНА', clue: 'Отсутствие шума и глубокий мир', phonetic: '[tʲɪʂɨˈna]', category: 'Дзен и покой' },
      { word: 'ДЫХАНИЕ', clue: 'Процесс вдоха и выдоха жизни', phonetic: '[dɨˈxanʲɪje]', category: 'Дзен и покой' },
      { word: 'ГАРМОНИЯ', clue: 'Согласие и созвучие частей', phonetic: '[ɡɐrˈmonʲɪjə]', category: 'Дзен и покой' },
    ],
    zenQuotes: [
      { quote: 'ДУШЕВНЫЙ ПОКОЙ ЕСТЬ ВЕЛИЧАЙШАЯ СИЛА РАЗУМА', author: 'Мудрость Дзен' },
      { quote: 'КАЖДОЕ НАЙДЕННОЕ СЛОВО ОБНОВЛЯЕТ НЕЙРОННЫЕ СВЯЗИ', author: 'Нейропластичность' },
    ],
  },
  zh: {
    logopedia: [
      { word: '语言', clue: '人类沟通与思维的符号系统 (Yǔyán)', phonetic: 'yǔ yán', category: '言语治疗' },
      { word: '声音', clue: '声带振动发出的声波 (Shēngyīn)', phonetic: 'shēng yīn', category: '言语治疗' },
      { word: '发音', clue: '发出语音的动作 (Fāyīn)', phonetic: 'fā yīn', category: '言语治疗' },
      { word: '文字', clue: '记录思想与语言的符号 (Wénzì)', phonetic: 'wén zì', category: '言语治疗' },
      { word: '语调', clue: '说话的抑扬顿挫 (Yǔdiào)', phonetic: 'yǔ diào', category: '言语治疗' },
    ],
    left_hemisphere: [
      { word: '逻辑', clue: '思维的规律性与条理性 (Luójí)', phonetic: 'luó jí', category: '左脑逻辑' },
      { word: '记忆', clue: '大脑保持与再现信息的能力 (Jìyì)', phonetic: 'jì yì', category: '左脑逻辑' },
      { word: '思考', clue: '大脑对事物的分析与理解 (Sīkǎo)', phonetic: 'sī kǎo', category: '左脑逻辑' },
      { word: '智慧', clue: '辨析与解决问题的深层悟性 (Zhìhuì)', phonetic: 'zhì huì', category: '左脑逻辑' },
    ],
    visual_memory: [
      { word: '色彩', clue: '眼睛感知的丰富光影 (Sècǎi)', phonetic: 'sè cǎi', category: '视觉记忆' },
      { word: '形态', clue: '事物的外部轮廓 (Xíngtài)', phonetic: 'xíng tài', category: '视觉记忆' },
      { word: '目光', clue: '注视专注的眼神 (Mùguāng)', phonetic: 'mù guāng', category: '视觉记忆' },
    ],
    attention_focus: [
      { word: '专注', clue: '精神集中于一处 (Zhuānzhù)', phonetic: 'zhuān zhù', category: '注意力' },
      { word: '明晰', clue: '思路清晰通透 (Míngxī)', phonetic: 'míng xī', category: '注意力' },
    ],
    zen_calm: [
      { word: '宁静', clue: '心境祥和安定 (Níngjìng)', phonetic: 'níng jìng', category: '禅心平静' },
      { word: '呼吸', clue: '吐故纳新的生命节律 (Hūxī)', phonetic: 'hū xī', category: '禅心平静' },
      { word: '平和', clue: '不温不火的从容心态 (Pínghé)', phonetic: 'píng hé', category: '禅心平静' },
      { word: '和谐', clue: '身心内外的圆融平衡 (Héxié)', phonetic: 'hé xié', category: '禅心平静' },
    ],
    zenQuotes: [
      { quote: '内心宁静是智慧与心智最强大的力量', author: '禅意格言' },
      { quote: '每一次专注的寻觅都在点亮新的脑神经通路', author: '神经重塑' },
    ],
  },
  ja: {
    logopedia: [
      { word: '言語', clue: '意思疎通と論理的思考の体系 (Gengo)', phonetic: 'げんご', category: '言語聴覚療法' },
      { word: '言葉', clue: '心や考えを表す音声や文字 (Kotoba)', phonetic: 'ことば', category: '言語聴覚療法' },
      { word: '音声', clue: '声帯と息から生まれる音 (Onsei)', phonetic: 'おんせい', category: '言語聴覚療法' },
      { word: '発音', clue: '言葉を口から正しく発すること (Hatsuon)', phonetic: 'はつおん', category: '言語聴覚療法' },
      { word: '会話', clue: '人と人が互いに話すこと (Kaiwa)', phonetic: 'かいわ', category: '言語聴覚療法' },
    ],
    left_hemisphere: [
      { word: '論理', clue: '筋道の通った正しい考え方 (Ronri)', phonetic: 'ろんり', category: '左脳刺激' },
      { word: '記憶', clue: '過去の経験や知識をとどめること (Kioku)', phonetic: 'きおく', category: '左脳刺激' },
      { word: '思考', clue: '心の中で筋道立てて考えること (Shikou)', phonetic: 'しこう', category: '左脳刺激' },
      { word: '知恵', clue: '物事の道理を悟り判断する力 (Chie)', phonetic: 'ちえ', category: '左脳刺激' },
    ],
    visual_memory: [
      { word: '色彩', clue: '光の波長がもたらす色合い (Shikisai)', phonetic: 'しきさい', category: '視覚記憶' },
      { word: '形態', clue: '空間における形や姿 (Keitai)', phonetic: 'けいたい', category: '視覚記憶' },
      { word: '視線', clue: '目を向ける方向やまなざし (Shisen)', phonetic: 'しせん', category: '視覚記憶' },
    ],
    attention_focus: [
      { word: '集中', clue: '一つの事に気持ちを注ぐこと (Shuuchuu)', phonetic: 'しゅうちゅう', category: '注意力' },
      { word: '明晰', clue: '思考が澄みわたること (Meiseki)', phonetic: 'めいせき', category: '注意力' },
    ],
    zen_calm: [
      { word: '平穏', clue: '心が静かで波風が立たないこと (Heion)', phonetic: 'へいおん', category: '禅と静寂' },
      { word: '呼吸', clue: '深く息を吸い吐くこと (Kokyuu)', phonetic: 'こきゅう', category: '禅と静寂' },
      { word: '静寂', clue: '音もなく落ち着いた心の状態 (Seijaku)', phonetic: 'せいじゃく', category: '禅と静寂' },
      { word: '調和', clue: 'バランスが保たれ一体となること (Chouwa)', phonetic: 'ちょうわ', category: '禅と静寂' },
    ],
    zenQuotes: [
      { quote: '心の静けさは精神の真の強さである', author: '禅の言葉' },
      { quote: '言葉を紡ぐたびに新しい神経の回路が育まれる', author: '脳の可塑性' },
    ],
  },
};

export const COLOR_PALETTES = [
  { bg: 'bg-emerald-500/25', border: 'border-emerald-400', text: 'text-emerald-300', fill: '#10b981', line: '#34d399' },
  { bg: 'bg-cyan-500/25', border: 'border-cyan-400', text: 'text-cyan-300', fill: '#06b6d4', line: '#22d3ee' },
  { bg: 'bg-amber-500/25', border: 'border-amber-400', text: 'text-amber-300', fill: '#f59e0b', line: '#fbbf24' },
  { bg: 'bg-rose-500/25', border: 'border-rose-400', text: 'text-rose-300', fill: '#f43f5e', line: '#fb7185' },
  { bg: 'bg-indigo-500/25', border: 'border-indigo-400', text: 'text-indigo-300', fill: '#6366f1', line: '#818cf8' },
  { bg: 'bg-teal-500/25', border: 'border-teal-400', text: 'text-teal-300', fill: '#14b8a6', line: '#2dd4bf' },
  { bg: 'bg-violet-500/25', border: 'border-violet-400', text: 'text-violet-300', fill: '#8b5cf6', line: '#a78bfa' },
  { bg: 'bg-orange-500/25', border: 'border-orange-400', text: 'text-orange-300', fill: '#f97316', line: '#fb923c' },
  { bg: 'bg-lime-500/25', border: 'border-lime-400', text: 'text-lime-300', fill: '#84cc16', line: '#a3e635' },
  { bg: 'bg-sky-500/25', border: 'border-sky-400', text: 'text-sky-300', fill: '#0ea5e9', line: '#38bdf8' },
];

export const INITIAL_BADGES = [
  {
    id: 'first_word',
    title: 'Primer Destello',
    description: 'Encuentra tu primera palabra en cualquier idioma.',
    icon: 'Sparkles',
    unlocked: false,
    category: 'rehab' as const,
  },
  {
    id: 'zen_quote_1',
    title: 'Frase Zen Revelada',
    description: 'Completa una sopa y descubre el mensaje sabio de las letras libres.',
    icon: 'Quote',
    unlocked: false,
    category: 'zen' as const,
  },
  {
    id: 'speed_master',
    title: 'Fluidez Mental',
    description: 'Encuentra todas las palabras con promedio menor a 15 segundos.',
    icon: 'Zap',
    unlocked: false,
    category: 'speed' as const,
  },
  {
    id: 'polyglot_3',
    title: 'Mente Políglota',
    description: 'Juega partidas en al menos 3 idiomas diferentes.',
    icon: 'Globe',
    unlocked: false,
    category: 'multilingual' as const,
  },
  {
    id: 'daily_streak_3',
    title: 'Constancia Diaria',
    description: 'Completa sesiones cognitivas durante 3 días seguidos.',
    icon: 'Flame',
    unlocked: false,
    category: 'streak' as const,
  },
  {
    id: 'logopedia_hero',
    title: 'Maestría Lingüística',
    description: 'Completa 5 ejercicios enfocados en logopedia y hemisferio izquierdo.',
    icon: 'Activity',
    unlocked: false,
    category: 'rehab' as const,
  },
];
