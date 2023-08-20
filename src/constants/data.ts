import {
  faBaseball,
  faBook,
  faBowlFood,
  faBurger,
  faDesktop,
  faEye,
  faGlassCheers,
  faGlasses,
  faInfoCircle,
  faPersonRunning,
  faPlane,
  faShoppingBag,
} from '@fortawesome/free-solid-svg-icons';

const TAGS = [
  {
    id: 1,
    name: 'Travel',
    color: '#DC0073',
    icon: faPlane,
  },
  {
    id: 2,
    name: 'Eat',
    color: '#d32',
    icon: faBurger,
  },
  {
    id: 3,
    name: 'Drink',
    color: '#0C4767',
    icon: faGlassCheers,
  },
  {
    id: 4,
    name: 'Shopping',
    color: '#F5B700',
    icon: faShoppingBag,
  },
  {
    id: 6,
    name: 'Studying',
    color: '#FE9920',
    icon: faGlasses,
  },
  {
    id: 7,
    name: 'Internet',
    color: '#566E3D',
    icon: faDesktop,
  },
  {
    id: 8,
    name: 'Sleep',
    color: '#011627',
    icon: faEye,
  },
  {
    id: 9,
    name: 'Reading',
    color: '#6369D1',
    icon: faBook,
  },
  {
    id: 10,
    name: 'Training',
    color: '#DB5A42',
    icon: faPersonRunning,
  },
  {
    id: 11,
    name: 'Sport',
    color: '#A57F60',
    icon: faBaseball,
  },
  {
    id: 12,
    name: 'Other',
    color: '#5C5D67',
    icon: faInfoCircle,
  },
];

const TASKS = [
  {
    id: 1,
    title: 'Do Final Year Project',
    date: '31-Jul-2022',
    timeFrom: new Date(),
    timeTo: new Date(),
    enableDND: true,
    message: 'Insaan bano, time per kro.',
    allowAutomaticMessageOnMissedCall: true,
    description: 'AOA! I am doing my FYP. Dont disturb me.',
    hasReminder: true,
    reminders: [
      {
        id: 1,
        name: 'FYP MUKAAO',
        time: '9:30',
        description: 'FYP URAO YAAR ',
        priority: 2,
      },
    ],
    tags: [
      TAGS[3],
      TAGS[10],
      TAGS[4],
      TAGS[0],
      TAGS[2],
      TAGS[10],
      TAGS[4],
      TAGS[0],
    ],
    numbersToOverrideQuietMode: [],
    priority: 1,
  },
  {
    id: 2,
    title: 'Go to Langar Khana',
    date: '01-Aug-2022',
    timeFrom: new Date(),
    timeTo: new Date(),
    enableDND: true,
    message: 'Insaan bano, time per kro.',
    allowAutomaticMessageOnMissedCall: true,
    description: 'AOA! Paijan Langar khana hai tou poncho galdi, Calls na kro',
    hasReminder: false,
    reminders: [
      {
        id: 1,
        name: 'Time py langar khany jana',
        time: '9:30',
        description: 'Rajh k khao r shopper mein daal k bhi laao ',
        priority: 2,
      },
    ],
    tags: [TAGS[5]],
    numbersToOverrideQuietMode: [],
    priority: 1,
  },
  {
    id: 3,
    title: 'Khao Peo Hago Mooto Sojao aur Soty Howe B*nd Na Do',
    date: '02-Aug-2022',
    timeFrom: new Date(),
    timeTo: new Date(),
    enableDND: true,
    message: 'Insaan bano, time per kro.',
    allowAutomaticMessageOnMissedCall: true,
    description: 'AOA! Paijan Tang na kro',
    hasReminder: true,
    reminders: [
      {
        id: 1,
        name: 'Hathi ka time',
        time: '12:30',
        description: 'shampoo k sath',
        priority: 1,
      },
    ],
    tags: [TAGS[0]],
    numbersToOverrideQuietMode: [],
    priority: 1,
  },
  {
    id: 4,
    title: 'Khao Peo Hago Mooto Sojao aur Soty Howe B*nd Na Do',
    date: '03-Aug-2022',
    timeFrom: new Date(),
    timeTo: new Date(),
    enableDND: true,
    message: 'Insaan bano, time per kro.',
    allowAutomaticMessageOnMissedCall: true,
    description: 'AOA! Paijan Tang na kro',
    hasReminder: true,
    reminders: [
      {
        id: 1,
        name: 'Hathi ka time',
        time: '12:30',
        description: 'shampoo k sath',
        priority: 1,
      },
    ],
    tags: [TAGS[0]],
    numbersToOverrideQuietMode: [],
    priority: 1,
  },
  {
    id: 5,
    title: 'Khao Peo Hago Mooto Sojao aur Soty Howe B*nd Na Do',
    date: '03-Aug-2022',
    timeFrom: new Date(),
    timeTo: new Date(),
    enableDND: true,
    message: 'Insaan bano, time per kro.',
    allowAutomaticMessageOnMissedCall: true,
    description: 'AOA! Paijan Tang na kro',
    hasReminder: true,
    reminders: [
      {
        id: 1,
        name: 'Hathi ka time',
        time: '12:30',
        description: 'shampoo k sath',
        priority: 1,
      },
    ],
    tags: [TAGS[0]],
    numbersToOverrideQuietMode: [],
    priority: 1,
  },
];

const VERSES = [
  {
    id: 1,
    verse:
      'Who believe in the unseen, establish prayer, and spend out of what We have provided for them, And who believe in what has been revealed to you, [O Muhammad], and what was revealed before you, and of the Hereafter they are certain.',
    reference: 'Surah Bakarah 2:3-4',
  },
  {
    id: 2,
    verse:
      'And establish prayer and give zakah and bow with those who bow [in worship and obedience].',
    reference: 'Surah Bakarah 2:43',
  },
  {
    id: 3,
    verse:
      'And seek help through patience and prayer, and indeed, it is difficult except for the humbly submissive [to Allah]',
    reference: 'Surah Bakarah 2:45',
  },
  {
    id: 4,
    verse:
      'Maintain with care the prayers and [in particular] the middle prayer and stand before Allah, devoutly obedient.',
    reference: 'Surah Bakarah 2:238',
  },
  {
    id: 5,
    verse:
      'And when you have completed the prayer, remember Allah standing, sitting, or [lying] on your sides. But when you become secure, re-establish [regular] prayer. Indeed, prayer has been decreed upon the believers a decree of specified times.',
    reference: 'Surah An-Nisa 4:103',
  },
];

const PRAYERS = [
  {
    id: 1,
    name: 'Fajar',
    allow: true,
    time: '04:13',
  },
  {
    id: 2,
    name: 'Dhuhar',
    allow: false,
    time: '14:30',
  },
  {
    id: 3,
    name: 'Ashar  ',
    allow: false,
    time: '17:10',
  },
  {
    id: 4,
    name: 'Magrib',
    allow: false,
    time: '18:10',
  },
  {
    id: 5,
    name: 'Ishaa  ',
    allow: false,
    time: '20:30',
  },
];

export {TAGS, TASKS, VERSES, PRAYERS};
