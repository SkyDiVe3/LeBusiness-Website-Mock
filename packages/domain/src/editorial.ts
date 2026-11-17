import { z } from "zod";

export const EditorialSectionTagSchema = z.enum([
  "stiri",
  "business-digest",
  "interviuri",
  "leader-insights",
  "business-drive",
  "webinarii",
  "ceo-conference",
  "business-evolution",
  "alte-evenimente"
]);

export type EditorialSectionTag = z.infer<typeof EditorialSectionTagSchema>;

export const EditorialItemSchema = z.object({
  id: z.string().uuid(),
  kind: z.enum(["news", "interview", "article", "event"]),
  sectionTag: EditorialSectionTagSchema.optional(),
  slug: z.string().regex(/^[a-z0-9-]+$/),
  title: z.string().min(10).max(240),
  excerpt: z.string().min(15).max(380),
  category: z.string().min(2).max(80),
  author: z.string().min(2).max(120),
  publishedAt: z.string().datetime(),
  readingMinutes: z.number().int().min(1).max(60),
  locale: z.enum(["ro", "en"]),
  coverImage: z.string().startsWith("/media/"),
  highlights: z.array(z.string().min(10).max(400)).min(2).max(5).optional()
});

export type EditorialItem = z.infer<typeof EditorialItemSchema>;

export const editorialSeeds = EditorialItemSchema.array().parse([
  // === STIRI (baseline/site/index.html) ===
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab1001",
    kind: "news",
    sectionTag: "stiri",
    slug: "rpia-devine-photovoltaic-storage-romania-9390",
    title: "RPIA devine Photovoltaic & Storage Romania, reflectand evolutia industriei solare si rolul tot mai important al stocarii energiei",
    excerpt: "De la inceputul anului, Romania si-a triplat capacitatea instalata in sistemele de stocare a energiei, consolidand tranzitia sectorului fotovoltaic.",
    category: "Energie",
    author: "PHOTOVOLTAIC & STORAGE ROMANIA",
    publishedAt: "2026-11-12T08:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/6af5cd072f594_cover.jpg",
    highlights: [
      "Noua identitate Photovoltaic & Storage Romania integreaza dezvoltatorii de parcuri solare si operatorii sistemelor de stocare a energiei in baterii.",
      "Expansiunea capacitatilor de stocare sustine echilibrarea sistemului energetic national si predictibilitatea investitiilor regenerabile."
    ]
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab1002",
    kind: "news",
    sectionTag: "stiri",
    slug: "the-shift-to-value-identifying-high-value-demand-9389",
    title: "The shift to value: Identifying high-value demand inside and beyond Europe",
    excerpt: "Hear Euromonitor's research experts discuss the latest industry, economic and consumer trends shaping resilient European demand.",
    category: "Piata & Cercetare",
    author: "EUROMONITOR INTERNATIONAL",
    publishedAt: "2026-11-12T07:30:00.000Z",
    readingMinutes: 4,
    locale: "en",
    coverImage: "/media/covers/6af5bbc5ba26d_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab1003",
    kind: "news",
    sectionTag: "stiri",
    slug: "ox2-si-scatec-parcul-eolian-urleasca-2-9387",
    title: "OX2 si Scatec marcheaza o etapa importanta in constructia parcului eolian Urleasca 2 de 77 MW",
    excerpt: "Dezvoltat de OX2 si achizitionat de Scatec in iulie 2026, proiectul reuneste mai multi parteneri intr-o investitie strategica in energia eoliana.",
    category: "Energie",
    author: "OX2 ROMANIA",
    publishedAt: "2026-11-11T08:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/6af4ea8f038cb_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab1004",
    kind: "news",
    sectionTag: "stiri",
    slug: "5-to-go-in-liga-marilor-lanturi-de-cafenele-9385",
    title: "5 to go, in liga marilor lanturi de cafenele: brandul romanesc ocupa locul 4 in Europa",
    excerpt: "Performanta 5 to go este cu atat mai relevanta cu cat brandul a fost lansat pe piata locala si a scalat constant reteaua de francize.",
    category: "Retail & HoReCa",
    author: "5 TO GO CONCEPT SRL",
    publishedAt: "2026-11-10T08:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/6af3689fe85ec_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab1005",
    kind: "news",
    sectionTag: "stiri",
    slug: "garanti-bbva-romania-grupul-raiffeisen-9383",
    title: "Garanti BBVA Romania devine parte din Grupul Raiffeisen Bank International (RBI)",
    excerpt: "Tranzactia fiind acum finalizata, Garanti BBVA Romania devine parte din Grupul Raiffeisen Bank International, consolidand sectorul bancar local.",
    category: "Banci & Finante",
    author: "RAIFFEISEN BANK SA",
    publishedAt: "2026-11-03T08:00:00.000Z",
    readingMinutes: 5,
    locale: "ro",
    coverImage: "/media/covers/6ae9d1cd5618f_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab1006",
    kind: "news",
    sectionTag: "stiri",
    slug: "oscar-downstream-investeste-70-milioane-lei-a7-9381",
    title: "OSCAR Downstream investeste 70 de milioane de lei in dezvoltarea a doua spatii de servicii pe Autostrada Moldovei A7",
    excerpt: "Contractul semnat cu CNAIR marcheaza startul unei directii strategice pentru infrastructura de mobilitate si servicii rutiere pe coridorul A7.",
    category: "Infrastructura",
    author: "OSCAR DOWNSTREAM SRL",
    publishedAt: "2026-11-02T08:00:00.000Z",
    readingMinutes: 5,
    locale: "ro",
    coverImage: "/media/covers/6ae86a044e8ad_cover.jpg"
  },

  // === BUSINESS DIGEST / ARTICOLE (baseline/site/index.html & articles/index.html) ===
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab2001",
    kind: "article",
    sectionTag: "business-digest",
    slug: "unde-si-cand-isi-pot-permite-liderii-de-business-sa-greseasca-9388",
    title: "Unde si cand isi pot permite liderii de business sa greseasca?",
    excerpt: "Autor: Constantin Magdalina, Expert Tendinte si Tehnologii Emergente. Analiza privind asumarea riscului calculat in conducerea executiva.",
    category: "Business Digest",
    author: "CONSTANTIN MAGDALINA",
    publishedAt: "2026-11-12T09:00:00.000Z",
    readingMinutes: 6,
    locale: "ro",
    coverImage: "/media/covers/6af5aa64e639b_magda.jpg",
    highlights: [
      "Experimentarea controlata in zone cu risc reversibil accelereaza invatarea organizationala fara a compromite stabilitatea financiara.",
      "Diferenta dintre o eroare strategica si o iteratie de inovare sta in viteza de corectie si claritatea parametrilor de decizie."
    ]
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab2002",
    kind: "article",
    sectionTag: "business-digest",
    slug: "secretul-psihologic-al-oamenilor-care-performeaza-9386",
    title: "Secretul psihologic al oamenilor care performeaza fara sa se piarda pe ei insisi",
    excerpt: "Autor: Elena Badea, Managing Director, Valoria Business Solutions. Cum raman liderii echilibrati sub presiunea obiectivelor ridicate.",
    category: "Business Digest",
    author: "VALORIA BUSINESS SOLUTIONS SRL",
    publishedAt: "2026-11-11T09:00:00.000Z",
    readingMinutes: 6,
    locale: "ro",
    coverImage: "/media/covers/6af4520599a4a_elena.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab2003",
    kind: "article",
    sectionTag: "business-digest",
    slug: "studiu-cpag-convergenta-economica-productivitate-9384",
    title: "Studiu CPAG: Urmatoarea etapa a convergentei economice a Romaniei trebuie sa fie condusa de productivitate",
    excerpt: "Principala concluzie este ca in Romania avantajul costurilor mici s-a disipat considerabil in ultimii ani, cand costul muncii a crescut.",
    category: "Macroeconomie",
    author: "CONSILIUM POLICY ADVISORS GROUP (CPAG)",
    publishedAt: "2026-11-03T09:00:00.000Z",
    readingMinutes: 7,
    locale: "ro",
    coverImage: "/media/covers/6ae9e4962c0bf_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab2004",
    kind: "article",
    sectionTag: "business-digest",
    slug: "passport-50-years-in-the-making-9379",
    title: "Passport. 50 years in the making. Everywhere in a moment",
    excerpt: "The intelligence you trust, wherever you need it. The next generation of Passport, now answering in the platform, in your workflow.",
    category: "Market Intelligence",
    author: "EUROMONITOR INTERNATIONAL",
    publishedAt: "2026-10-29T09:00:00.000Z",
    readingMinutes: 5,
    locale: "en",
    coverImage: "/media/covers/6ae36cc5bc50f_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab2005",
    kind: "article",
    sectionTag: "business-digest",
    slug: "fihr-romania-turism-motor-crestere-economica-9373",
    title: "FIHR: Romania poate transforma turismul intr-un motor de crestere economica. 6 prioritati strategice pentru investitii",
    excerpt: "In primele opt luni din 2026, incasarile Romaniei la categoria turism-calatorii din strainatate confirma potentialul accelerarii digitalizarii si promovarii destinatiilor.",
    category: "Turism & Investitii",
    author: "FEDERATIA INDUSTRIEI HOTELIERE DIN ROMANIA",
    publishedAt: "2026-10-27T09:00:00.000Z",
    readingMinutes: 6,
    locale: "ro",
    coverImage: "/media/covers/6ae08a602b515_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab2006",
    kind: "article",
    sectionTag: "business-digest",
    slug: "inca-o-nota-de-plata-pentru-romania-plastic-nereciclat-9371",
    title: "Inca o nota de plata pentru Romania: aproape 1 miliard de euro pentru plasticul nereciclat",
    excerpt: "Material de opinie de Adrian Teampau, Director Environmental Taxes and Circular Economy, si Anca Andrei-Cimbru, Deloitte Romania.",
    category: "Economie Circulara",
    author: "DELOITTE CONSULTANTA SRL",
    publishedAt: "2026-10-26T09:00:00.000Z",
    readingMinutes: 5,
    locale: "ro",
    coverImage: "/media/covers/6adf305a7b8f1_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab2007",
    kind: "article",
    sectionTag: "business-digest",
    slug: "3-din-10-romani-ignora-riscurile-protectie-financiara-9370",
    title: "3 din 10 romani ignora riscurile care le pot afecta protectia financiara. Locuinta, printre principalele prioritati",
    excerpt: "51% au luat in calcul o asigurare abia dupa ce au trecut printr-o situatie care i-a costat, desi putea fi asigurata printr-o polita dedicate protectiei financiare.",
    category: "Asigurari",
    author: "ALLIANZ-TIRIAC ASIGURARI",
    publishedAt: "2026-10-26T08:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/6adf2b840c909_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab2008",
    kind: "article",
    sectionTag: "business-digest",
    slug: "impozitul-minim-global-marile-grupuri-9366",
    title: "Impozitul minim global: cum functioneaza, care sunt termenele ce pun presiune pe marile grupuri si cum transforma functia fiscala",
    excerpt: "Autor: Razvan Ungureanu, Partner, International Tax Advisory Services Leader, EY Romania.",
    category: "Fiscalitate",
    author: "ERNST & YOUNG SRL",
    publishedAt: "2026-10-20T09:00:00.000Z",
    readingMinutes: 7,
    locale: "ro",
    coverImage: "/media/covers/6ad73e5eaf7d6_cover.jpg"
  },

  // === BUSINESS & DRIVE (baseline/site/business-drive/index.html) ===
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab3001",
    kind: "article",
    sectionTag: "business-drive",
    slug: "nissan-qashqai-20-ani-inovatie-9391",
    title: "Nissan Qashqai sarbatoreste 20 de ani de inovatie",
    excerpt: "Qashqai a devenit una dintre cele mai importante povesti de succes ale industriei auto, definind segmentul crossover la nivel european.",
    category: "Business & Drive",
    author: "NISSAN ROMANIA",
    publishedAt: "2026-11-12T06:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/6af5dda744519_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab3002",
    kind: "article",
    sectionTag: "business-drive",
    slug: "honda-trading-romania-garantie-8-ani-9382",
    title: "Honda Trading Romania introduce programul de Garantie de pana la 8 ani pentru automobilele Honda",
    excerpt: "Programul permite continuarea garantiei Honda dupa perioada standard de 3 ani sau 100.000 km, oferind predictibilitate flotelor corporate.",
    category: "Business & Drive",
    author: "HONDA TRADING ROMANIA SRL",
    publishedAt: "2026-11-02T06:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/6ae8f1d9af1cb_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab3003",
    kind: "article",
    sectionTag: "business-drive",
    slug: "intre-camioane-avioane-si-afaceri-stefano-albarosa-9376",
    title: "Intre camioane, avioane si afaceri: drumul romanesc al lui Stefano Albarosa",
    excerpt: "Interviu cu dn Stefano Albarosa, CEO, AIC TRUCKS, despre transportul comercial greu si antreprenoriatul in Romania.",
    category: "Business & Drive",
    author: "TOADER ILIE",
    publishedAt: "2026-10-28T06:00:00.000Z",
    readingMinutes: 7,
    locale: "ro",
    coverImage: "/media/covers/6ae216c51f4b3_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab3004",
    kind: "article",
    sectionTag: "business-drive",
    slug: "automobile-bavaria-unic-importator-lotus-9343",
    title: "Automobile Bavaria Group devine unic importator Lotus in Romania",
    excerpt: "Lotus imbina peste 75 de ani de traditie si expertiza in industria auto cu o noua generatie de vehicule electrice de performanta.",
    category: "Business & Drive",
    author: "AUTOMOBILE BAVARIA SRL",
    publishedAt: "2026-09-25T06:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/6aba38ac23a0c_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab3005",
    kind: "article",
    sectionTag: "business-drive",
    slug: "noua-definitie-a-luxului-mercedes-benz-9327",
    title: "Noua definitie a luxului dupa 140 de ani de istorie",
    excerpt: "Interviu cu dn Kai-Uwe Trillenberg, CEO Mercedes-Benz Romania, despre electrificare, experienta clientilor si mobilitatea executive.",
    category: "Business & Drive",
    author: "TOADER ILIE",
    publishedAt: "2026-09-14T06:00:00.000Z",
    readingMinutes: 6,
    locale: "ro",
    coverImage: "/media/covers/6aa7bd8a1d00b_cover.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab3006",
    kind: "article",
    sectionTag: "business-drive",
    slug: "numaratoarea-inversa-pentru-pixo-nissan-9322",
    title: "Numaratoarea inversa pentru PIXO: noul model electric urban compact Nissan vine in Europa",
    excerpt: "Modelul va fi prezentat pe 23 Septembrie 2026, extinzand gama urbana electrica Nissan pe piata europeana.",
    category: "Business & Drive",
    author: "NISSAN ROMANIA",
    publishedAt: "2026-09-10T06:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/6aa2c3517c93a_cover.jpg"
  },

  // === INTERVIURI LINKLEADERS (baseline/site/index.html & editorial/index.html) ===
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab4001",
    kind: "interview",
    sectionTag: "interviuri",
    slug: "putting-romanian-corporate-companies-on-the-international-business-scene-9040",
    title: "PUTTING ROMANIAN CORPORATE COMPANIES ON THE INTERNATIONAL BUSINESS SCENE",
    excerpt: "Interview with Mr. CRISTIAN SPORIS, Vice President, Corporate & Investment Banking and Member of the Management Board, Raiffeisen Bank.",
    category: "LinkLeaders Interviuri",
    author: "RAIFFEISEN BANK SA",
    publishedAt: "2026-01-19T08:00:00.000Z",
    readingMinutes: 9,
    locale: "en",
    coverImage: "/media/covers/6949bd498aa9e_poza_cristian_sporis.jpg",
    highlights: [
      "Romanian corporate groups are increasingly prepared for regional M&A and cross-border expansion backed by disciplined working capital structures.",
      "Capital markets and syndicated corporate lending play a decisive role in scaling energy, infrastructure, and industrial champions."
    ]
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab4002",
    kind: "interview",
    sectionTag: "interviuri",
    slug: "our-edge-will-come-from-being-the-most-digitalized-wholesaler-in-romania-9041",
    title: "OUR EDGE WILL COME FROM BEING THE MOST DIGITALIZED WHOLESALER IN ROMANIA",
    excerpt: "Interview with Mr. KARAN KHURANA, CEO, METRO ROMANIA, on digital wholesale transformation and partnerships with independent traders.",
    category: "LinkLeaders Interviuri",
    author: "METRO CASH & CARRY ROMANIA SRL",
    publishedAt: "2026-01-18T08:00:00.000Z",
    readingMinutes: 8,
    locale: "en",
    coverImage: "/media/covers/694a79937ea6d_poza_karan_khurana.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab4003",
    kind: "interview",
    sectionTag: "interviuri",
    slug: "coffee-is-our-love-language-9043",
    title: "COFFEE IS OUR LOVE LANGUAGE",
    excerpt: "Interview with Mr. MARIUS MELESTEU, CEO, STRAUSS ROMANIA, on brand discipline, local manufacturing, and consumer trends.",
    category: "LinkLeaders Interviuri",
    author: "STRAUSS ROMANIA SRL",
    publishedAt: "2026-01-17T08:00:00.000Z",
    readingMinutes: 7,
    locale: "en",
    coverImage: "/media/covers/694a8c48f2140_poza_marius_melesteu.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab4004",
    kind: "interview",
    sectionTag: "interviuri",
    slug: "building-the-future-of-energy-enevo-group-9044",
    title: "BUILDING THE FUTURE OF ENERGY: ENEVO GROUP'S ONE-STOP-SHOP MODEL FOR THE ENERGY TRANSITION",
    excerpt: "Interview with Mr. RAZVAN COPOIU, Deputy CEO, ENEVO Group, on engineering automation and grid integration across Europe.",
    category: "LinkLeaders Interviuri",
    author: "ENEVO GROUP SRL",
    publishedAt: "2026-01-16T08:00:00.000Z",
    readingMinutes: 8,
    locale: "en",
    coverImage: "/media/covers/694a9f2e7c1a8_poza_razvan_copoiu.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab4005",
    kind: "interview",
    sectionTag: "interviuri",
    slug: "rooted-in-romania-evantage-soft-9063",
    title: "ROOTED IN ROMANIA, BUILT TO DELIVER TECHNOLOGY FOR THE WORLD - EVANTAGE SOFT MODEL FOR GLOBAL IMPACT",
    excerpt: "Interview with Mr. ALEXANDRU ALDESCU, Managing Partner eVantage Soft, on scaling enterprise software engineering from Romania.",
    category: "LinkLeaders Interviuri",
    author: "EVANTAGE SOFT",
    publishedAt: "2026-01-15T08:00:00.000Z",
    readingMinutes: 7,
    locale: "en",
    coverImage: "/media/covers/6968e842a1ca6_poza_alexandru_aldescu.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab4006",
    kind: "interview",
    sectionTag: "interviuri",
    slug: "building-igna-instal-into-a-leader-9062",
    title: "BUILDING IGNA INSTAL INTO A LEADER IN ROMANIA'S INSTALLATIONS SECTOR",
    excerpt: "Interview with Mr. DOREL GUTU, General Manager, Igna Instal, on execution standards in industrial and commercial installations.",
    category: "LinkLeaders Interviuri",
    author: "IGNA INSTAL SRL",
    publishedAt: "2026-01-15T07:00:00.000Z",
    readingMinutes: 7,
    locale: "en",
    coverImage: "/media/covers/6968deed214b2_poza_dorel_gutu.jpg"
  },

  // === LEADER INSIGHTS / VIDEO INTERVIURI (baseline/site/editorial/index.html) ===
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab5001",
    kind: "interview",
    sectionTag: "leader-insights",
    slug: "anda-marian-ceo-conference-mastering-the-new-reality-cluj-24",
    title: "Anda Marian @CEO Conference - Mastering the New Reality - Radisson Blu Hotel, Cluj",
    excerpt: "Mastering the New Reality: perspective executive despre guvernanta medicala, investitii si rezilienta echipelor in climatul economic actual.",
    category: "Leader Insights",
    author: "DOINGBUSINESS.RO SRL",
    publishedAt: "2023-12-11T09:00:00.000Z",
    readingMinutes: 5,
    locale: "ro",
    coverImage: "/media/covers/657733f53c604_anda_marian_ceo_conference_cluj_2023.png"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab5002",
    kind: "interview",
    sectionTag: "leader-insights",
    slug: "anca-rarau-ceo-conference-mastering-the-new-reality-cluj-23",
    title: "Anca Rarau @CEO Conference - Mastering the New Reality - Radisson Blu Hotel, Cluj",
    excerpt: "Interviu video LinkLeaders: strategie de brand, increderea organizationala si adaptarea liderilor la schimbarile structurale ale pietei.",
    category: "Leader Insights",
    author: "DOINGBUSINESS.RO SRL",
    publishedAt: "2023-12-11T08:00:00.000Z",
    readingMinutes: 5,
    locale: "ro",
    coverImage: "/media/covers/6576daebb2671_anca_rarau_ceo_conference_cluj_2023.png"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab5003",
    kind: "interview",
    sectionTag: "leader-insights",
    slug: "florin-frunza-ceo-conference-mastering-the-new-reality-cluj-22",
    title: "Florin Frunza @CEO Conference - Mastering the New Reality - Radisson Blu Hotel, Cluj",
    excerpt: "Interviu video cu Florin Frunza, CEO MET Romania Energy, despre piata de energie, predictibilitate si decizii strategice.",
    category: "Leader Insights",
    author: "MET ROMANIA ENERGY SA",
    publishedAt: "2023-12-07T08:00:00.000Z",
    readingMinutes: 6,
    locale: "ro",
    coverImage: "/media/covers/6571c8c17d3d3_florin_frunza_ceoconference_cluj_2023.png"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab5004",
    kind: "interview",
    sectionTag: "leader-insights",
    slug: "florin-popa-ceo-conference-mastering-the-new-reality-cluj-21",
    title: "Florin Popa @CEO Conference - Mastering the New Reality - Radisson Blu Hotel, Cluj",
    excerpt: "Dialog executiv despre infrastructura digitala pentru companii, securitate cibernetica si transformarea operationala in companiile romanesti.",
    category: "Leader Insights",
    author: "ORANGE BUSINESS ROMANIA SA",
    publishedAt: "2023-12-05T09:00:00.000Z",
    readingMinutes: 5,
    locale: "ro",
    coverImage: "/media/covers/6570d4be3bd19_florin_popa_ceo_conference.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab5005",
    kind: "interview",
    sectionTag: "leader-insights",
    slug: "gabriel-pavel-ceo-conference-mastering-the-new-reality-cluj-20",
    title: "Gabriel Pavel @CEO Conference - Mastering the New Reality - Radisson Blu Hotel, Cluj",
    excerpt: "Conversatie video cu lideri executivi din Transilvania despre leadership colaborativ, capital uman si adaptare tehnologica.",
    category: "Leader Insights",
    author: "DOINGBUSINESS.RO SRL",
    publishedAt: "2023-12-05T08:00:00.000Z",
    readingMinutes: 5,
    locale: "ro",
    coverImage: "/media/covers/656ee9ad4c538_gabriel_pavel_ceo_conference_2023.jpg"
  },

  // === EVENIMENTE & WEBINARII (baseline/site/evenimente/index.html & editorial/index.html) ===
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab6001",
    kind: "event",
    sectionTag: "ceo-conference",
    slug: "ceo-conference-the-big-rethink",
    title: "CEO Conference - THE BIG RETHINK - LEADERSHIP IN AN OUT OF BALANCE WORLD",
    excerpt: "Conferinta anuala a comunitatii LinkLeaders dedicata decidentilor C-level din cele mai mari companii din Romania.",
    category: "CEO Conference",
    author: "DoingBusiness.ro",
    publishedAt: "2026-11-04T08:00:00.000Z",
    readingMinutes: 3,
    locale: "ro",
    coverImage: "/media/covers/6a6b46005091b_ceo_conference_2026.jpg",
    highlights: [
      "Platforma autentica de dezbatere pe baza de invitatie dedicata directorilor generali, fondatorilor si membrilor executivi de top.",
      "Agenda acopera modelele de crestere, capitalul si impactul transformarilor globale asupra economiei locale."
    ]
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab6002",
    kind: "event",
    sectionTag: "alte-evenimente",
    slug: "be-inspired-make-it-happen-cluj-9-decembrie",
    title: "Be Inspired. Make it Happen!, CLUJ, 9 Decembrie",
    excerpt: "Eveniment regional in Cluj-Napoca pentru antreprenori, lideri de echipa si manageri orientati catre actiune si schimbare.",
    category: "Alte Evenimente",
    author: "DoingBusiness.ro",
    publishedAt: "2026-12-09T09:00:00.000Z",
    readingMinutes: 3,
    locale: "ro",
    coverImage: "/media/covers/6a6c7f19cb562_cluj.png"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab6003",
    kind: "event",
    sectionTag: "ceo-conference",
    slug: "ceo-conference-leading-the-change-2025",
    title: "CEO Conference - Shaping the Future - Leading the Change - From V.U.C.A. to B.A.N.I. World",
    excerpt: "Editia dedicata instrumentelor de leadership necesare pentru navigarea incertitudinii si accelerarea inovatiei organizationale.",
    category: "CEO Conference",
    author: "DoingBusiness.ro",
    publishedAt: "2025-11-20T09:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/6895e431ba996_ceo_conference_2025.png"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab6004",
    kind: "event",
    sectionTag: "alte-evenimente",
    slug: "wealth-investment-forum-2026",
    title: "WEALTH & INVESTMENT FORUM 2026",
    excerpt: "Forum dedicat strategiilor de alocare a capitalului, investitiilor institutionale si administrarii activelor in Romania.",
    category: "Alte Evenimente",
    author: "DoingBusiness.ro",
    publishedAt: "2026-10-15T09:00:00.000Z",
    readingMinutes: 3,
    locale: "ro",
    coverImage: "/media/covers/6a6b52d242f06_wealtinvestment.png"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab6005",
    kind: "event",
    sectionTag: "business-evolution",
    slug: "business-evolution-hunedoara-2026",
    title: "Business Evolution - Crestere, Transformare, Adaptare",
    excerpt: "Seria regionala de conferinte B2B dedicata solutiilor practice de vanzari, finantare, digitalizare si eficienta operationala.",
    category: "Business Evolution",
    author: "DoingBusiness.ro",
    publishedAt: "2026-06-30T09:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/6a140b04b37ff_business_evolution_hunedoara_2026.jpeg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab7001",
    kind: "event",
    sectionTag: "webinarii",
    slug: "webinar-business-evolution-rethink-strategy-finantare-investitii-digitalizare-21",
    title: "Webinar - Business Evolution - RETHINK STRATEGY - Finantare Investitii Digitalizare",
    excerpt: "Sesiune practica online despre accesarea surselor de finantare, prioritizarea investitiilor si digitalizarea companiilor locale.",
    category: "Webinarii",
    author: "DoingBusiness Events",
    publishedAt: "2026-06-29T09:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/60db22fa1bd5e_cover_business_evolution.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab7002",
    kind: "event",
    sectionTag: "webinarii",
    slug: "canon-colaborarea-eficienta-a-echipei-intr-un-mediu-de-lucru-hibrid-20",
    title: "CANON - Colaborarea eficienta a echipei intr-un mediu de lucru hibrid",
    excerpt: "Webinar despre fluxurile documentare digitale si colaborarea echipelor distribuite in mediul enterprise.",
    category: "Webinarii",
    author: "CANON ROMANIA",
    publishedAt: "2026-06-28T09:00:00.000Z",
    readingMinutes: 3,
    locale: "ro",
    coverImage: "/media/covers/60db2114a3c06_cover_image_canon.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab7003",
    kind: "event",
    sectionTag: "webinarii",
    slug: "ceo-conference-shaping-the-future-strategy-in-the-disruption-storm-19",
    title: "CEO Conference - Shaping the Future - Strategy in the Disruption Storm",
    excerpt: "Dezbatere executiva despre adaptarea modelelor de business in industrii supuse schimbarilor tehnologice si geopolitice.",
    category: "Webinarii",
    author: "DoingBusiness Events",
    publishedAt: "2026-06-25T09:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/60db1e04bfa42_ceo_conference_3_martie_2021.jpg"
  },
  {
    id: "f9b99dc6-6d39-4c17-bc0a-7c247cab7004",
    kind: "event",
    sectionTag: "webinarii",
    slug: "ceo-conference-leading-people-organizational-culture-18",
    title: "CEO Conference - Leading people, fostering creativity towards a new organizational culture",
    excerpt: "Cum construiesc directorii generali o cultura organizationala performanta, orientata spre inovatie si retentia talentelor.",
    category: "Webinarii",
    author: "DoingBusiness Events",
    publishedAt: "2026-06-20T09:00:00.000Z",
    readingMinutes: 4,
    locale: "ro",
    coverImage: "/media/covers/5fd8d175e7304_new_organizational_culture_banner_spk.jpg"
  }
]);

export function getEditorialItems(kind?: EditorialItem["kind"]): EditorialItem[] {
  return kind ? editorialSeeds.filter((item) => item.kind === kind) : editorialSeeds;
}

export function getEditorialBySection(sectionTag: EditorialSectionTag): EditorialItem[] {
  return editorialSeeds.filter((item) => item.sectionTag === sectionTag);
}

export function findEditorialItem(kind: EditorialItem["kind"], slug: string): EditorialItem | null {
  return (
    editorialSeeds.find((item) => item.kind === kind && item.slug === slug) ??
    editorialSeeds.find((item) => item.slug === slug) ??
    null
  );
}
