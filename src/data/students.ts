import { Student, AITaskType } from '../types';

export const INITIAL_STUDENTS: Student[] = [
  { id: 1, name: 'Аружан', isPresent: false, avatarColor: 'from-pink-500 to-rose-500', gender: 'female' },
  { id: 2, name: 'Данияр', isPresent: false, avatarColor: 'from-blue-500 to-indigo-600', gender: 'male' },
  { id: 3, name: 'Айбек', isPresent: false, avatarColor: 'from-sky-500 to-cyan-600', gender: 'male' },
  { id: 4, name: 'Мадина', isPresent: false, avatarColor: 'from-purple-500 to-violet-600', gender: 'female' },
  { id: 5, name: 'Нұрсұлтан', isPresent: false, avatarColor: 'from-emerald-500 to-teal-600', gender: 'male' },
  { id: 6, name: 'Әсем', isPresent: false, avatarColor: 'from-amber-500 to-orange-500', gender: 'female' },
  { id: 7, name: 'Аян', isPresent: false, avatarColor: 'from-blue-600 to-teal-500', gender: 'male' },
  { id: 8, name: 'Диана', isPresent: false, avatarColor: 'from-rose-500 to-red-500', gender: 'female' },
  { id: 9, name: 'Санжар', isPresent: false, avatarColor: 'from-indigo-500 to-purple-600', gender: 'male' },
  { id: 10, name: 'Алина', isPresent: false, avatarColor: 'from-teal-500 to-emerald-600', gender: 'female' },
];

export const AI_CLASSIFICATION_TASKS: AITaskType[] = [
  {
    id: 'recognition',
    title: '1. Тану міндеті (Recognition & Computer Vision)',
    category: 'Бейнені / Нысанды тану',
    tag: 'Осы жобада қолданылады',
    description: 'Компьютердің камера немесе сурет арқылы адам бетін, заттарды, қолжазбаны немесе дауысты ажыратып тану қабілеті.',
    example: 'Бет-әлпетті тану (Face ID), көлік нөмірлерін оқу, Smart Attendance камерасы.',
    relationToSchool: 'Камера оқушының бет әлпетін видеоағыннан сканерлеп, деректер қорындағы үлгімен сәйкестендіріп, автоматты белгілейді.'
  },
  {
    id: 'classification',
    title: '2. Классификациялау міндеті (Classification)',
    category: 'Санаттарға топтастыру',
    tag: 'Екілік / Көпкласты',
    description: 'Кіріс ақпаратты алдын ала белгіленген санаттардың (сыныптардың) біріне жатқызу (мысалы: Келді / Келмеді, Спам / Спам емес).',
    example: 'Электрондық поштаны спамға бөлу, медициналық диагноз қою, оқушы қатысуын екілік классификациялау (0 немесе 1).',
    relationToSchool: 'Оқушының мәртебесін «Қатысты (1)» немесе «Қатыспады (0)» деп екі санатқа ажырату.'
  },
  {
    id: 'prediction',
    title: '3. Болжау міндеті (Prediction / Regression)',
    category: 'Сандық мәнді алдын ала анықтау',
    tag: 'Аналитика',
    description: 'Бұрынғы жиналған деректер негізінде болашақта болатын оқиғаларды немесе сандық көрсеткіштерді болжау.',
    example: 'Ауа райын болжау, акция бағасы, тоқсандық бағаларды болжау.',
    relationToSchool: 'Оқушының соңғы айлардағы қатысуына сүйеніп, тоқсан соңындағы орташа балын немесе сабақты босату ықтималдығын болжау.'
  },
  {
    id: 'nlp',
    title: '4. Табиғи тілді өңдеу (Natural Language Processing)',
    category: 'Тілдік модельдер',
    tag: 'Мәтін & Сөйлеу',
    description: 'Адамның табиғи тіліндегі (қазақ, ағылшын және т.б.) жазбаша және ауызша сөзін түсіну, талдау және мәтін тудыру.',
    example: 'ChatGPT, Google Translate, дауыстық көмекшілер (Siri, Алиса).',
    relationToSchool: 'Мұғалімнің «Бүгін Аружан мен Данияр келді ме?» деген дауыстық сұрағын түсініп жауап беру.'
  },
  {
    id: 'decision_making',
    title: '5. Шешім қабылдау және басқару (Decision Making)',
    category: 'Автономды жүйелер',
    tag: 'Басқару жүйелері',
    description: 'Қоршаған ортадан алынған деректерге сүйеніп, мақсатқа жету үшін ең оңтайлы іс-қимылды таңдау.',
    example: 'Автопилоттағы көліктер (Tesla), шахмат ойнайтын бағдарламалар (AlphaGo), робототехника.',
    relationToSchool: 'Егер оқушы себепсіз 3 күн сабақтан қалса, ата-анасына автоматты түрде SMS хабарлама жіберу шешімін қабылдау.'
  }
];
