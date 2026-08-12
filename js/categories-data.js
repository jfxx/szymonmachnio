/* ── Central category data — single source of truth ── */
const ORDINALS = [
  "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth",
  "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth",
  "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth",
  "twentyfirst", "twentysecond", "twentythird", "twentyfourth", "twentyfifth"
];

const CATEGORIES_BASE_PATH = "assets/images/Works/";

const CATEGORIES = {
  arctic: {
    titleKey: "cat.arctic.name",
    subtitleKey: "cat.arctic.subtitle",
    folder: "arctic",
    count: 18
  },
  astro: {
    titleKey: "cat.astro.name",
    subtitleKey: "cat.astro.subtitle",
    folder: "astro",
    count: 12
  },
  automotive: {
    titleKey: "cat.automotive.name",
    subtitleKey: "cat.automotive.subtitle",
    folder: "automotive",
    count: 25
  },
  blue: {
    titleKey: "cat.blue.name",
    subtitleKey: "cat.blue.subtitle",
    folder: "blue",
    count: 13
  },
  landscapes: {
    titleKey: "cat.landscapes.name",
    subtitleKey: "cat.landscapes.subtitle",
    folder: "landscapes",
    count: 14
  },
  portraits: {
    titleKey: "cat.portraits.name",
    subtitleKey: "cat.portraits.subtitle",
    folder: "portraits",
    count: 16
  },
  other: {
    titleKey: "cat.other.name",
    subtitleKey: "cat.other.subtitle",
    folder: "other",
    count: 20
  },
  interiors: {
    titleKey: "cat.interiors.name",
    subtitleKey: "cat.interiors.subtitle",
    folder: "interiors",
    count: 10
  }
};

/* Special file lists for folders with non-standard naming */
const SPECIAL_FILES = {
  astro: [
    "first", "second", "third", "fourth", "fifth", "sixth", "eighth", "nineth", "tenth",
    "eleventh", "twelfth", "thirteenth"
  ],
  automotive: [
    "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth",
    "ninth", "tenth", "eleventh", "twelfth", "thirteenth", "fourteenth",
    "fifteenth", "sixteenth", "seventeenth", "eighteenth", "nineteenth", "twentieth",
    "twentyfirst", "twentysecond", "twentythird", "twenty-fourth", "twenty-fifth"
  ],
  landscapes: [
    "first", "second", "third", "fourth", "fifth", "sixth", "seventh", "eighth",
    "eleventh", "twelfth", "thirteenth", "fourteenth", "fifteenth", "sixteenth"
  ]
};

/**
 * Get the list of file names for a given category key.
 * @param {string} catKey - The category key (e.g. "arctic", "astro").
 * @returns {string[]} Array of file base names.
 */
function getCategoryFileList(catKey) {
  if (SPECIAL_FILES[catKey]) return SPECIAL_FILES[catKey];
  const cat = CATEGORIES[catKey];
  if (!cat) return [];
  return ORDINALS.slice(0, cat.count);
}
